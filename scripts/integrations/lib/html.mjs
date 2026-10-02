// Small, dependency-free text transforms over the HTML and CSS that Astro has
// already written to dist/. They are kept pure so the integration stays a thin
// shell around them and they can be tested without a build.
import { createHash } from 'node:crypto'

/** `name.ext` -> `name.<8 hex chars of the content hash>.ext`. */
export function hashedName(fileName, content) {
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 8)
  const dot = fileName.lastIndexOf('.')
  if (dot <= 0) return `${fileName}.${hash}`
  return `${fileName.slice(0, dot)}.${hash}${fileName.slice(dot)}`
}

/**
 * Replaces every occurrence of the keys of `map` (absolute URL paths) with
 * their values. Longer paths are replaced first so a path that is a prefix of
 * another can never clobber it.
 */
export function rewriteUrls(text, map) {
  const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length)
  let out = text
  for (const [from, to] of entries) out = out.split(from).join(to)
  return out
}

/** The `href` of every `<link rel="stylesheet">` in the document. */
export function linkedStylesheets(html) {
  const hrefs = []
  for (const tag of html.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = parseAttributes(tag[0])
    if (/\bstylesheet\b/i.test(attrs.rel ?? '') && attrs.href) {
      hrefs.push(attrs.href)
    }
  }
  return hrefs
}

/**
 * Inserts `<link rel="preload">` tags for the given font URLs as early in
 * `<head>` as possible: before the first stylesheet or `<style>` block, so the
 * preload scanner meets them before it meets the CSS that needs them.
 */
export function injectFontPreloads(html, urls) {
  if (urls.length === 0) return html
  const links = urls
    .map(
      (url) =>
        `<link rel="preload" as="font" type="${fontMime(url)}" href="${url}" crossorigin>`,
    )
    .join('')
  const head = html.search(/<head\b[^>]*>/i)
  if (head === -1) return html
  const headEnd = html.indexOf('>', head) + 1
  const anchor = html
    .slice(headEnd)
    .search(/<(?:style\b|link\b[^>]*rel=["']?stylesheet|\/head)/i)
  const at = anchor === -1 ? html.length : headEnd + anchor
  return `${html.slice(0, at)}${links}${html.slice(at)}`
}

export function fontMime(url) {
  if (url.endsWith('.woff2')) return 'font/woff2'
  if (url.endsWith('.woff')) return 'font/woff'
  if (url.endsWith('.otf')) return 'font/otf'
  return 'font/ttf'
}

/** Every code point above U+007F used in the text, as a single string. */
export function nonAsciiCharacters(text) {
  const chars = new Set()
  for (const char of text) if (char.codePointAt(0) > 0x7f) chars.add(char)
  return [...chars].sort().join('')
}

/** Attributes of a single start tag, as `{ name: value }` (value '' for bare attributes). */
export function parseAttributes(tag) {
  const attrs = {}
  const body = tag.replace(/^<[a-zA-Z][^\s/>]*/, '').replace(/\/?>$/, '')
  for (const m of body.matchAll(
    /([^\s"'=<>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g,
  )) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? ''
  }
  return attrs
}

/**
 * Walks every `<img>` that is not already inside a `<picture>` and lets
 * `replace(tag, attrs)` return a replacement string (or null to keep it).
 */
export async function transformImages(html, replace) {
  // Segments that are inside <picture> are copied through untouched.
  const parts = html.split(/(<picture\b[\s\S]*?<\/picture>)/i)
  for (let i = 0; i < parts.length; i += 2) {
    const tags = [...parts[i].matchAll(/<img\b[^>]*>/gi)]
    let out = ''
    let cursor = 0
    for (const tag of tags) {
      const replacement = await replace(tag[0], parseAttributes(tag[0]))
      out += parts[i].slice(cursor, tag.index)
      out += replacement ?? tag[0]
      cursor = tag.index + tag[0].length
    }
    parts[i] = out + parts[i].slice(cursor)
  }
  return parts.join('')
}

/** Rebuilds an `<img>` start tag from its attributes, in insertion order. */
export function imgTag(attrs) {
  const body = Object.entries(attrs)
    .map(([k, v]) => (v === '' ? k : `${k}="${v}"`))
    .join(' ')
  return `<img ${body}>`
}

/**
 * The range of font weights the stylesheets ask for, as `{ min, max }`.
 * Two-value `font-weight: 200 800` declarations are @font-face ranges, not
 * uses, so they are skipped. 400 and 700 are always inside the range because
 * `normal` text and `<b>`/`<strong>` resolve to them whether or not a rule
 * says so.
 */
export function usedWeightRange(css) {
  const weights = [400, 700]
  const KEYWORDS = { normal: 400, bold: 700 }
  for (const m of css.matchAll(/font-weight\s*:\s*([^;}]+)/g)) {
    const parts = m[1].trim().split(/\s+/)
    if (parts.length !== 1) continue
    const value = KEYWORDS[parts[0]] ?? Number(parts[0])
    if (Number.isFinite(value)) weights.push(value)
  }
  for (const m of css.matchAll(/['"]wght['"]\s+(\d+(?:\.\d+)?)/g)) {
    weights.push(Number(m[1]))
  }
  return { min: Math.min(...weights), max: Math.max(...weights) }
}
