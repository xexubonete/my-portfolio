// Generates pixel-perfect, margin-free CV PDFs from the /cv and /en/cv routes
// using headless Chromium. The site is static, so the script serves the
// production build in dist/ itself: `pnpm cv:pdf` builds and then prints.
//
// Set CV_BASE_URL to print from another server instead (a preview deployment,
// a dev server), in which case dist/ is not needed.
//
// This script used to print whatever the page happened to show. That is how a
// transient dev-server hiccup ended up inside a downloadable CV: Vite rendered its
// error overlay under the resume, Chromium printed it, and the good PDF was
// overwritten without a word. Every check below exists to make that impossible --
// a bad run now fails loudly and leaves the previous PDF alone.
import { execFile } from 'node:child_process'
import { readFile, rename, unlink, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { promisify } from 'node:util'
import puppeteer from 'puppeteer'
import { PDFDocument } from 'pdf-lib'
import { readingOrderProblems } from './lib/cv-text.mjs'
import { serveStatic } from './lib/static-server.mjs'

const run = promisify(execFile)

const server = process.env.CV_BASE_URL ? null : await serveDist()
const BASE = process.env.CV_BASE_URL ?? server.url

// Keywords are the technologies actually listed in the CV's Technical Skills
// section (src/i18n/content.ts: frameworks, patterns, databases, devops,
// tools), in their canonical spelling, repeated here only so an ATS keyword
// search also matches the PDF's own metadata -- nothing here is invented.
const KEYWORDS = [
  'C#',
  'SQL',
  '.NET',
  '.NET Core',
  '.NET Framework',
  'REST APIs',
  'gRPC',
  'RabbitMQ',
  'Microservices',
  'Dapper',
  'Entity Framework Core',
  'Entity Framework',
  'Hangfire',
  'MediatR',
  'AutoMapper',
  'FluentValidation',
  'SignalR',
  'xUnit',
  'MSTest',
  'Serilog',
  'Swagger',
  'OpenAPI',
  'Angular',
  'Clean Architecture',
  'Domain-Driven Design',
  'CQRS',
  'Repository',
  'Unit of Work',
  'PostgreSQL',
  'SQL Server',
  'Azure Cosmos DB',
  'Azure',
  'Azure Blob Storage',
  'Azure DevOps',
  'CI/CD',
  'Jenkins',
  'Git',
  'GitHub',
  'Postman',
  'Bruno',
].join(', ')

const targets = [
  {
    url: `${BASE}/cv`,
    out: 'public/CV_Jesus_Bonete_ES.pdf',
    expect: 'Bonete',
    lang: 'es',
    title: 'Jesús Bonete Sánchez — Currículum (Desarrollador .NET Senior)',
    subject: 'Currículum vitae — Desarrollador .NET Senior',
  },
  {
    url: `${BASE}/en/cv`,
    out: 'public/CV_Jesus_Bonete_EN.pdf',
    expect: 'Bonete',
    lang: 'en',
    title: 'Jesús Bonete Sánchez — Resume (Senior .NET Developer)',
    subject: 'Resume — Senior .NET Developer',
  },
]

// Text that only ever appears when something has gone wrong. Vite injects its
// overlay as a custom element, and Astro's dev error page carries the stack trace.
const ERROR_MARKERS = [
  'vite-error-overlay',
  'No cached compile metadata',
  'An error occurred.',
  'LoadPluginContext',
]

// Without CV_BASE_URL the PDFs come from dist/, which has to exist first.
async function serveDist() {
  if (!existsSync('dist/cv/index.html') && !existsSync('dist/cv.html')) {
    console.error(
      'dist/ has no CV page. Run "pnpm build" first (or "pnpm cv:pdf").',
    )
    process.exit(1)
  }
  return serveStatic('dist')
}

// What poppler's pdftotext reads out of a PDF in one of its modes, or null
// when poppler is not installed. It rebuilds the page from glyph positions,
// like the parsers many ATS are built on, so it is the extraction worth
// checking.
async function extractText(file, mode = []) {
  try {
    const { stdout } = await run('pdftotext', [...mode, file, '-'])
    return stdout
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

// The Node the project pins. Astro 7 needs 22.12 or newer, so a mismatch here is
// worth saying out loud before a confusing compile failure appears instead.
async function warnOnNodeMismatch() {
  if (!existsSync('.nvmrc')) return

  const wanted = (await readFile('.nvmrc', 'utf8')).trim().replace(/^v/, '')
  const running = process.versions.node.split('.')[0]

  if (wanted && wanted.split('.')[0] !== running) {
    console.warn(
      `! Node ${running} is running, but .nvmrc asks for ${wanted}.\n` +
        `  Run "nvm use" before "pnpm build" if the page fails to compile.`,
    )
  }
}

async function render(browser, target) {
  const page = await browser.newPage()

  // Noise the page made on the way in. Collected rather than inspected afterwards,
  // because console output is gone by the time we look -- but only ever reported,
  // never fatal.
  //
  // These do not decide whether the PDF is good. Chromium asks every page for
  // /favicon.ico by itself, so a site without one produces a 404 on every single
  // run; failing on that would have refused to build a perfectly correct CV. A
  // check that blocks good output is a check that gets deleted, so what the page
  // says is a warning and what the page *is* -- the three tests below -- decides.
  const noise = []
  page.on('pageerror', (error) => noise.push(`uncaught: ${error.message}`))
  page.on('requestfailed', (req) => {
    noise.push(`request failed: ${req.url()} (${req.failure()?.errorText})`)
  })

  // Watched by response rather than by console message: the console only says
  // "Failed to load resource", with no URL, so there is no way to tell the
  // browser's own favicon request from something the page actually needed.
  page.on('response', (res) => {
    if (res.status() < 400) return
    if (new URL(res.url()).pathname === '/favicon.ico') return
    noise.push(`${res.status()} ${res.url()}`)
  })

  try {
    const response = await page.goto(target.url, { waitUntil: 'networkidle0' })

    if (!response?.ok()) {
      throw new Error(`${target.url} answered ${response?.status()}`)
    }

    // Web fonts decide the layout. Printing before they land gives a PDF that is
    // subtly wrong in a way nobody notices until it is already sent to someone.
    await page.evaluate(() => document.fonts.ready)

    const body = await page.evaluate(() => document.body.innerText)
    const html = await page.content()

    const found = ERROR_MARKERS.filter(
      (marker) => body.includes(marker) || html.includes(marker),
    )

    if (found.length) {
      throw new Error(`the page is showing an error (${found.join(', ')})`)
    }

    // The positive check, which is the one that catches a page that broke in a way
    // nobody thought to look for: if the resume is not in there, it is not a CV.
    if (!body.includes(target.expect)) {
      throw new Error(
        `the page does not contain ${JSON.stringify(target.expect)}`,
      )
    }

    // The text of the CV in source order: what an extractor has to give back
    // from the PDF, in this order.
    const expected = await page.evaluate(
      () => document.querySelector('.cv-sheet')?.innerText ?? '',
    )

    // Written beside the real file and moved into place only once everything above
    // has passed, so a failed run can never replace a good CV with a broken one.
    const pending = `${target.out}.pending`
    const pdfBytes = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    // Chromium's print-to-pdf sets the PDF /Title from <title> but nothing
    // else; an ATS reads this metadata too, so it gets the same canonical
    // wording as the page content.
    const pdfDoc = await PDFDocument.load(pdfBytes)

    // The CV is one A4 page. Content that grew past it would otherwise spill
    // onto a second page without a word.
    if (pdfDoc.getPageCount() !== 1) {
      throw new Error(
        `the CV takes ${pdfDoc.getPageCount()} pages instead of 1; ` +
          `shorten the content or tighten src/styles/cv.css`,
      )
    }

    pdfDoc.setTitle(target.title)
    pdfDoc.setAuthor('Jesús Bonete Sánchez')
    pdfDoc.setSubject(target.subject)
    pdfDoc.setKeywords(KEYWORDS.split(', '))
    pdfDoc.setLanguage(target.lang)
    await writeFile(pending, await pdfDoc.save())

    // The CV is one column of text, and every way of extracting it has to
    // say so: reading order rebuilt from the glyphs (the default), the order
    // of the PDF's own text stream (-raw) and the physical layout (-layout),
    // which puts side-by-side columns on shared lines if there are any.
    for (const mode of [[], ['-raw'], ['-layout']]) {
      const extracted = await extractText(pending, mode)
      if (extracted === null) {
        noise.push(
          'pdftotext (poppler) is not installed: the reading order of the PDF was not checked',
        )
        break
      }
      const problems = readingOrderProblems(expected, extracted)
      if (problems.length) {
        throw new Error(
          `pdftotext ${mode[0] ?? '(default)'} reads the PDF out of order: ${problems[0]}`,
        )
      }
    }

    await rename(pending, target.out)
    console.log(`✓ ${target.out}`)

    if (noise.length) {
      console.warn(
        `  warnings (the PDF is still fine)\n    - ${noise.join('\n    - ')}`,
      )
    }
  } finally {
    await page.close()
  }
}

await warnOnNodeMismatch()

const browser = await puppeteer.launch({ headless: true })
const failures = []

try {
  for (const target of targets) {
    try {
      await render(browser, target)
    } catch (error) {
      failures.push(`${target.url}: ${error.message}`)
      await unlink(`${target.out}.pending`).catch(() => {})
      console.error(`✗ ${target.out}\n    ${error.message}`)
    }
  }
} finally {
  await browser.close()
  await server?.close()
}

if (failures.length) {
  console.error(
    `\n${failures.length} of ${targets.length} CVs were not generated. ` +
      `The previous PDFs are untouched.`,
  )
  process.exit(1)
}
