// Generates pixel-perfect, margin-free CV PDFs from the /cv and /en/cv routes
// using headless Chromium. Requires the dev (or preview) server to be running.
//
//   1) pnpm dev         (in another terminal)
//   2) pnpm cv:pdf
//
// Override the base URL with CV_BASE_URL if the server runs elsewhere.
import puppeteer from 'puppeteer'

const BASE = process.env.CV_BASE_URL ?? 'http://localhost:4321'

const targets = [
  { url: `${BASE}/cv`, out: 'public/CV_Jesus_Bonete_ES.pdf' },
  { url: `${BASE}/en/cv`, out: 'public/CV_Jesus_Bonete_EN.pdf' },
]

const browser = await puppeteer.launch({ headless: true })

try {
  for (const target of targets) {
    const page = await browser.newPage()
    await page.goto(target.url, { waitUntil: 'networkidle0' })
    await page.pdf({
      path: target.out,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })
    console.log(`✓ ${target.out}`)
    await page.close()
  }
} finally {
  await browser.close()
}
