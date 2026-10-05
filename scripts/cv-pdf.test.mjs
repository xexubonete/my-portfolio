// Run with: pnpm test
//
// Pins what the committed CV PDFs must keep whatever the sheet looks like:
// one A4 page each, the ATS metadata, and real links to the full profile
// URLs behind the short addresses printed in the header. Regenerate the
// PDFs with `pnpm cv:pdf` after changing the CV; this fails if the result
// spills onto a second page or loses a link.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { describe, it } from 'node:test'
import { PDFArray, PDFDict, PDFDocument, PDFName } from 'pdf-lib'

const CVS = [
  {
    file: 'public/CV_Jesus_Bonete_ES.pdf',
    title: 'Jesús Bonete Sánchez — Currículum (Desarrollador .NET Senior)',
  },
  {
    file: 'public/CV_Jesus_Bonete_EN.pdf',
    title: 'Jesús Bonete Sánchez — Resume (Senior .NET Developer)',
  },
]

const PROFILE_LINKS = [
  'https://www.linkedin.com/in/jesus-bonete-sanchez/',
  'https://github.com/xexubonete',
  'https://xexubonete.dev/',
]

// A4 in PDF points, with the rounding Chromium applies.
const A4 = { width: 595, height: 842 }

/** Every URI a page links to, in annotation order. */
function linkTargets(page) {
  const annots = page.node.lookupMaybe(PDFName.of('Annots'), PDFArray)
  if (!annots) return []

  const targets = []
  for (let i = 0; i < annots.size(); i++) {
    const action = annots
      .lookup(i, PDFDict)
      .lookupMaybe(PDFName.of('A'), PDFDict)
    const uri = action?.lookup(PDFName.of('URI'))
    if (uri) targets.push(uri.decodeText())
  }
  return targets
}

for (const cv of CVS) {
  describe(cv.file, async () => {
    const pdf = await PDFDocument.load(await readFile(cv.file))

    it('is exactly one A4 page', () => {
      assert.equal(pdf.getPageCount(), 1)
      const { width, height } = pdf.getPage(0).getSize()
      assert.ok(Math.abs(width - A4.width) < 1, `width ${width}`)
      assert.ok(Math.abs(height - A4.height) < 1, `height ${height}`)
    })

    it('keeps the ATS metadata', () => {
      assert.equal(pdf.getTitle(), cv.title)
      assert.equal(pdf.getAuthor(), 'Jesús Bonete Sánchez')
      assert.ok(pdf.getSubject())
      for (const keyword of ['C#', '.NET', 'SQL Server', 'Azure', 'gRPC']) {
        assert.ok(pdf.getKeywords().includes(keyword), keyword)
      }
    })

    it('links the short profile addresses to their full URLs', () => {
      const targets = linkTargets(pdf.getPage(0))
      for (const link of PROFILE_LINKS) {
        assert.ok(targets.includes(link), `${link} not in ${targets}`)
      }
    })
  })
}
