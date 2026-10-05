// Run with: pnpm test
//
// Pins what the committed CV PDFs must keep whatever the design does: one A4
// page, the ATS metadata, real links behind the short profile text, and a
// text layer that reads in one logical order. Regenerate with `pnpm cv:pdf`.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { describe, it } from 'node:test'
import { PDFDocument, PDFName } from 'pdf-lib'
import { CONTENT } from '../src/i18n/content.ts'

const CVS = [
  {
    lang: 'es',
    file: 'public/CV_Jesus_Bonete_ES.pdf',
    title: 'Jesús Bonete Sánchez — Currículum (Desarrollador .NET Senior)',
    role: 'Desarrollador .NET Senior',
    contact:
      'Elda, Alicante, España · xexubonete@gmail.com · (+34) 722 243 881',
    headings: [
      'Perfil profesional',
      'Habilidades técnicas',
      'Experiencia profesional',
      'Formación',
      'Idiomas',
    ],
  },
  {
    lang: 'en',
    file: 'public/CV_Jesus_Bonete_EN.pdf',
    title: 'Jesús Bonete Sánchez — Resume (Senior .NET Developer)',
    role: 'Senior .NET Developer',
    contact: 'Elda, Alicante, Spain · xexubonete@gmail.com · (+34) 722 243 881',
    headings: [
      'Summary',
      'Technical Skills',
      'Experience',
      'Education',
      'Languages',
    ],
  },
]

const PROFILES =
  'linkedin.com/in/jesus-bonete-sanchez · github.com/xexubonete · xexubonete.dev'
const PROFILE_LINKS = [
  'https://www.linkedin.com/in/jesus-bonete-sanchez/',
  'https://github.com/xexubonete',
  'https://xexubonete.dev/',
]

// A4 in PDF points, as Chromium prints it.
const A4 = { width: 595, height: 842 }

const hasPdftotext = spawnSync('pdftotext', ['-v']).error === undefined

/** The PDF's text as poppler extracts it, one trimmed line per entry. */
function extractLines(file, args) {
  const result = spawnSync('pdftotext', [...args, file, '-'], {
    encoding: 'utf8',
  })
  assert.equal(result.status, 0, result.stderr)
  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

/** Every link target on the page, in document order. */
function linkTargets(page) {
  const annots = page.node.Annots()
  const targets = []
  for (let i = 0; i < (annots?.size() ?? 0); i++) {
    const action = annots.lookup(i).lookup(PDFName.of('A'))
    const uri = action?.lookup(PDFName.of('URI'))
    if (uri) targets.push(uri.decodeText())
  }
  return targets
}

for (const cv of CVS) {
  describe(`${cv.file}`, () => {
    it('is exactly one A4 page', async () => {
      const pdf = await PDFDocument.load(await readFile(cv.file))
      assert.equal(pdf.getPageCount(), 1)
      const { width, height } = pdf.getPage(0).getSize()
      assert.ok(Math.abs(width - A4.width) < 1, `width ${width}`)
      assert.ok(Math.abs(height - A4.height) < 1, `height ${height}`)
    })

    it('keeps the ATS metadata', async () => {
      const pdf = await PDFDocument.load(await readFile(cv.file))
      assert.equal(pdf.getTitle(), cv.title)
      assert.equal(pdf.getAuthor(), 'Jesús Bonete Sánchez')
      assert.ok(pdf.getSubject()?.includes(cv.role))
      for (const keyword of ['C#', '.NET', 'Clean Architecture', 'Azure']) {
        assert.ok(pdf.getKeywords()?.includes(keyword), keyword)
      }
    })

    it('links the short profiles to their full URLs', async () => {
      const pdf = await PDFDocument.load(await readFile(cv.file))
      const targets = linkTargets(pdf.getPage(0))
      assert.deepEqual(targets.slice(0, PROFILE_LINKS.length), PROFILE_LINKS)
      assert.ok(!targets.some((target) => target.startsWith('mailto:')))
    })

    for (const args of [[], ['-layout']]) {
      const mode = args.length ? 'pdftotext -layout' : 'pdftotext'

      it(
        `reads in one logical order with ${mode}`,
        { skip: !hasPdftotext && 'pdftotext (poppler) is not installed' },
        () => {
          const lines = extractLines(cv.file, args)
          const text = lines.join('\n')

          // Header: name, role, then the two contact lines, short and whole.
          assert.deepEqual(lines.slice(0, 4), [
            'Jesús Bonete Sánchez',
            cv.role,
            cv.contact,
            PROFILES,
          ])
          assert.ok(!text.includes('https://'), 'a full URL is printed')
          assert.ok(!text.includes('www.'), 'a www. prefix is printed')

          // The standard headings, each on its own line, in this order.
          const positions = cv.headings.map((heading) => lines.indexOf(heading))
          assert.ok(!positions.includes(-1), `headings at ${positions}`)
          assert.deepEqual(
            positions,
            positions.toSorted((a, b) => a - b),
          )

          // Every date range shares its line with the title it belongs to;
          // none is stranded on a line of its own or pushed out of order.
          const dated = lines.filter((line) => /\d{4} – \d{2,4}/.test(line))
          assert.equal(dated.length, 7)
          for (const line of dated) {
            assert.match(line, /^(\d{2}\/)?\d{4} – (\d{2}\/)?\d{4} \S/)
          }
          const experience = lines.slice(positions[2] + 1, positions[3])
          assert.match(
            experience[0],
            /^01\/2026 – 09\/2026 Senior \.NET Developer · Cafler /,
          )
          assert.match(
            lines[positions[3] + 1],
            /^2020 – 2022 .+ · IES Mare Nostrum /,
          )

          // Every Technical Skills keyword, spelled as on the site, unbroken.
          const skills = lines
            .slice(positions[1] + 1, positions[2])
            .join(' ')
            .replace(/\s+/g, ' ')
          for (const group of CONTENT[cv.lang].skills.groups) {
            for (const item of group.items) {
              assert.ok(skills.includes(item), `missing skill: ${item}`)
            }
          }

          // No letter-spaced word came out letter by letter.
          assert.doesNotMatch(text, /(?:\b\p{L} ){4,}/u)
        },
      )
    }
  })
}
