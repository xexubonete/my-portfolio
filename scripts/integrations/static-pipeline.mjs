// Astro integration: a post-build pass over dist/ that does the two things a
// static host cannot do for us.
//
//   Fonts   Every font under public/fonts/ is subsetted to the characters the
//           site can actually show (Basic Latin, Latin-1 and whatever else the
//           built pages contain), written under /_astro/fonts/ with a content
//           hash in its name so it can be cached forever, and preloaded by the
//           pages whose CSS refers to it. The source files in public/fonts/
//           are left untouched, so the design lane keeps working on the full
//           fonts and the dev server keeps serving them as they are.
//
//   Images  Every raster <img> that points at a file in public/ is given AVIF
//           and WebP sources at the size it is displayed (1x and 2x when the
//           tag carries a width), wrapped in a <picture>, and completed with
//           explicit width/height so nothing shifts while it loads. The
//           original file keeps its URL as the fallback, and images that are
//           already optimised (astro:assets output, anything inside a
//           <picture>, anything with a srcset) are skipped.
//
// The pure text transforms live in ./lib/html.mjs and are unit-tested there.
import {
  mkdir,
  readdir,
  readFile,
  stat,
  unlink,
  writeFile,
} from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import subsetFont from 'subset-font'
import {
  hashedName,
  imgTag,
  injectFontPreloads,
  linkedStylesheets,
  nonAsciiCharacters,
  rewriteUrls,
  transformImages,
  usedWeightRange,
} from './lib/html.mjs'

const FONT_EXTENSIONS = {
  '.woff2': 'woff2',
  '.woff': 'woff',
  '.ttf': 'sfnt',
  '.otf': 'sfnt',
}
const RASTER = /\.(png|jpe?g)$/i

// Basic Latin and Latin-1: enough for both languages even for text that only
// appears after an inline script has run (the live years-of-experience count).
const BASE_CHARSET = Array.from({ length: 0xff - 0x20 + 1 }, (_, i) =>
  String.fromCodePoint(0x20 + i),
).join('')

/**
 * @param {object} [options]
 * @param {(url: string) => boolean} [options.preload]
 *   Which of the fonts a page references get a preload link. Defaults to all
 *   of them; narrow it down if a page ever references more than a handful.
 * @param {number} [options.avifQuality]
 * @param {number} [options.webpQuality]
 */
export default function staticPipeline(options = {}) {
  const { preload = () => true, avifQuality = 62, webpQuality = 82 } = options

  return {
    name: 'static-pipeline',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const dist = fileURLToPath(dir)
        const files = await walk(dist)
        const htmlFiles = files.filter((f) => f.endsWith('.html'))
        const cssFiles = files.filter((f) => f.endsWith('.css'))

        const fonts = await processFonts(dist, files, htmlFiles, cssFiles)
        if (fonts.count) {
          logger.info(
            `fonts: ${fonts.count} subsetted and hashed (${fonts.saved})`,
          )
        }

        const images = await processImages(dist, htmlFiles, {
          avifQuality,
          webpQuality,
        })
        if (images.count)
          logger.info(`images: ${images.count} given AVIF/WebP sources`)

        // Preloads are injected last so they point at the final font URLs.
        let preloads = 0
        for (const file of htmlFiles) {
          const html = await readFile(file, 'utf8')
          const urls = await fontsUsedBy(html, dist, fonts.urls).then((list) =>
            list.filter(preload),
          )
          if (urls.length === 0) continue
          await writeFile(file, injectFontPreloads(html, urls))
          preloads += urls.length
        }
        if (preloads) logger.info(`fonts: ${preloads} preload links injected`)
      },
    },
  }
}

async function processFonts(dist, files, htmlFiles, cssFiles) {
  const fontDir = path.join(dist, 'fonts')
  const sources = files.filter(
    (f) =>
      f.startsWith(fontDir + path.sep) && path.extname(f) in FONT_EXTENSIONS,
  )
  if (sources.length === 0) return { count: 0, urls: [] }

  // Characters the pages can show: the base set plus everything non-ASCII the
  // build actually emitted, from any page or stylesheet.
  let extra = ''
  for (const file of [...htmlFiles, ...cssFiles]) {
    extra += nonAsciiCharacters(await readFile(file, 'utf8'))
  }
  const text = BASE_CHARSET + nonAsciiCharacters(extra)

  // Variable fonts also carry every weight they were drawn with; the weight
  // axis is cut down to the range the stylesheets use. Width and optical-size
  // axes are left alone since the design uses them fluidly.
  let css = ''
  for (const file of [...htmlFiles, ...cssFiles])
    css += await readFile(file, 'utf8')
  const wght = usedWeightRange(css)

  const outDir = path.join(dist, '_astro', 'fonts')
  await mkdir(outDir, { recursive: true })

  const urlMap = {}
  const processed = []
  let before = 0
  let after = 0
  for (const source of sources) {
    const original = await readFile(source)
    const targetFormat = FONT_EXTENSIONS[path.extname(source)]
    // A static font has no axes to instance and makes harfbuzz throw.
    const subset = await subsetFont(original, text, {
      targetFormat,
      variationAxes: { wght },
    }).catch(() => subsetFont(original, text, { targetFormat }))
    const relative = path.relative(fontDir, source).split(path.sep).join('/')
    const name = hashedName(relative.replaceAll('/', '-'), subset)
    await writeFile(path.join(outDir, name), subset)
    urlMap[`/fonts/${relative}`] = `/_astro/fonts/${name}`
    processed.push({ source, url: `/fonts/${relative}` })
    before += original.length
    after += subset.length
  }

  const textFiles = files.filter((f) => /\.(html|css|js|mjs)$/.test(f))
  for (const file of textFiles) {
    const text = await readFile(file, 'utf8')
    const rewritten = rewriteUrls(text, urlMap)
    if (rewritten !== text) await writeFile(file, rewritten)
  }

  // The unsubsetted copies are dead weight once nothing points at them; a
  // reference the rewrite could not reach (one built inside a script, say)
  // keeps its file in place.
  const remaining = (
    await Promise.all(textFiles.map((f) => readFile(f, 'utf8')))
  ).join('\n')
  for (const { source, url } of processed) {
    if (!remaining.includes(url)) await unlink(source)
  }

  return {
    count: sources.length,
    urls: Object.values(urlMap),
    saved: `${kb(before)} → ${kb(after)}`,
  }
}

/** The hashed font URLs referenced by a page, inline or through its stylesheets. */
async function fontsUsedBy(html, dist, urls) {
  let css = html
  for (const href of linkedStylesheets(html)) {
    if (!href.startsWith('/')) continue
    css += await readFile(path.join(dist, href), 'utf8').catch(() => '')
  }
  return urls.filter((url) => css.includes(url))
}

async function processImages(dist, htmlFiles, { avifQuality, webpQuality }) {
  const outDir = path.join(dist, '_astro', 'img')
  const cache = new Map()
  let count = 0

  // One encode per (file, width, format), however many pages use it.
  async function variant(file, width, format) {
    const key = `${file}|${width}|${format}`
    if (!cache.has(key)) {
      cache.set(
        key,
        (async () => {
          const source = await readFile(file)
          const quality = format === 'avif' ? avifQuality : webpQuality
          const image = sharp(source).resize({
            width,
            withoutEnlargement: true,
          })
          const encoded = await (
            format === 'avif'
              ? image.avif({ quality, effort: 6 })
              : image.webp({ quality })
          ).toBuffer()
          const base = path.basename(file).replace(RASTER, '')
          const name = hashedName(`${base}.${width}.${format}`, encoded)
          await mkdir(outDir, { recursive: true })
          await writeFile(path.join(outDir, name), encoded)
          return `/_astro/img/${name}`
        })(),
      )
    }
    return cache.get(key)
  }

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, 'utf8')
    const out = await transformImages(html, async (tag, attrs) => {
      const src = attrs.src ?? ''
      if (
        !src.startsWith('/') ||
        src.startsWith('/_astro/') ||
        !RASTER.test(src)
      ) {
        return null
      }
      if (attrs.srcset) return null
      const file = path.join(dist, src)
      const meta = await sharp(file)
        .metadata()
        .catch(() => null)
      if (!meta?.width || !meta?.height) return null

      // Displayed width: the tag's own width when it has one, else the file's.
      const displayed = Number.parseInt(attrs.width ?? '', 10) || meta.width
      const width1x = Math.min(displayed, meta.width)
      const width2x = Math.min(displayed * 2, meta.width)
      const sizes = width2x > width1x ? [width1x, width2x] : [width1x]

      const sources = []
      for (const format of ['avif', 'webp']) {
        const set = await Promise.all(
          sizes.map(
            async (w, i) => `${await variant(file, w, format)} ${i + 1}x`,
          ),
        )
        sources.push(
          `<source type="image/${format}" srcset="${set.join(', ')}">`,
        )
      }

      const next = { ...attrs }
      if (!next.width || !next.height) {
        // Keep the file's aspect ratio whichever dimension the author gave.
        if (next.width) {
          next.height = String(
            Math.round((displayed * meta.height) / meta.width),
          )
        } else if (next.height) {
          const h = Number.parseInt(next.height, 10)
          next.width = String(Math.round((h * meta.width) / meta.height))
        } else {
          next.width = String(meta.width)
          next.height = String(meta.height)
        }
      }
      if (!next.decoding) next.decoding = 'async'
      count += 1
      return `<picture>${sources.join('')}${imgTag(next)}</picture>`
    })
    if (out !== html) await writeFile(htmlFile, out)
  }
  return { count }
}

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if ((await stat(full)).isFile()) out.push(full)
  }
  return out
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} kB`
}
