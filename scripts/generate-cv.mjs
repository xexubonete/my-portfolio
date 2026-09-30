// Generates pixel-perfect, margin-free CV PDFs from the /cv and /en/cv routes
// using headless Chromium. Requires the dev (or preview) server to be running.
//
//   1) pnpm dev         (in another terminal)
//   2) pnpm cv:pdf
//
// Override the base URL with CV_BASE_URL if the server runs elsewhere.
//
// This script used to print whatever the page happened to show. That is how a
// transient dev-server hiccup ended up inside a downloadable CV: Vite rendered its
// error overlay under the resume, Chromium printed it, and the good PDF was
// overwritten without a word. Every check below exists to make that impossible --
// a bad run now fails loudly and leaves the previous PDF alone.
import { readFile, rename, unlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import puppeteer from 'puppeteer'

const BASE = process.env.CV_BASE_URL ?? 'http://localhost:4321'

const targets = [
  { url: `${BASE}/cv`, out: 'public/CV_Jesus_Bonete_ES.pdf', expect: 'Bonete' },
  {
    url: `${BASE}/en/cv`,
    out: 'public/CV_Jesus_Bonete_EN.pdf',
    expect: 'Bonete',
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

// The toolchain this project was built against. Astro 4.15 ships Vite 5, which
// predates recent Node majors; running it on a much newer runtime is the most
// likely source of the intermittent compile-metadata race.
async function warnOnNodeMismatch() {
  if (!existsSync('.nvmrc')) return

  const wanted = (await readFile('.nvmrc', 'utf8')).trim().replace(/^v/, '')
  const running = process.versions.node.split('.')[0]

  if (wanted && wanted.split('.')[0] !== running) {
    console.warn(
      `! Node ${running} is running, but .nvmrc asks for ${wanted}.\n` +
        `  Astro ${'4.x'} was not built for this runtime; if the page fails to compile,\n` +
        `  run "nvm use" before "pnpm dev" and regenerate.`,
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

    // Written beside the real file and moved into place only once everything above
    // has passed, so a failed run can never replace a good CV with a broken one.
    const pending = `${target.out}.pending`
    await page.pdf({
      path: pending,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

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
}

if (failures.length) {
  console.error(
    `\n${failures.length} of ${targets.length} CVs were not generated. ` +
      `The previous PDFs are untouched.`,
  )
  process.exit(1)
}
