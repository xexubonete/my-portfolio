// Run with: pnpm test
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { normalizeText, readingOrderProblems } from './cv-text.mjs'

const page =
  'Jesús Bonete Sánchez\nSenior .NET Developer\nxexubonete.dev\n' +
  'Summary\nA renewable-energy company.\nTechnical Skills\nC#, SQL\n' +
  'Experience\nBackend Intern · 02/2022 – 06/2022\nAn API in .NET.'

describe('normalizeText', () => {
  it('ignores case and line breaks, and keeps the words apart', () => {
    assert.equal(
      normalizeText('  SENIOR .NET\n Developer\n\nC#,  SQL '),
      'senior .net developer c#, sql',
    )
  })

  it('drops hyphens, with the line break after them', () => {
    assert.equal(normalizeText('renewable-\nenergy'), 'renewableenergy')
    assert.equal(normalizeText('renewable-energy'), 'renewableenergy')
  })

  it('keeps punctuation and accents', () => {
    assert.equal(normalizeText('Jesús: C#, CI/CD'), 'jesús: c#, ci/cd')
  })
})

describe('readingOrderProblems', () => {
  it('accepts the same text in the same order', () => {
    assert.deepEqual(readingOrderProblems(page, page), [])
  })

  it('accepts other line breaks, the upper-cased role and a joined word', () => {
    const extracted = page
      .replace('Senior .NET Developer', 'SENIOR .NET DEVELOPER')
      .replace('renewable-energy', 'renewableenergy')
      .replaceAll('\n', '\n\n   ')
    assert.deepEqual(readingOrderProblems(page, extracted), [])
  })

  it('rejects words run together', () => {
    const extracted = page.replace('Jesús Bonete Sánchez', 'JesúsBoneteSánchez')
    const problems = readingOrderProblems(page, extracted)
    assert.equal(problems.length, 1)
    assert.match(problems[0], /expected "…jesús bonete/)
  })

  it('rejects a date read lines after its title', () => {
    const extracted = page.replace(
      'Backend Intern · 02/2022 – 06/2022\nAn API in .NET.',
      'Backend Intern ·\nAn API in .NET.\n02/2022 – 06/2022',
    )
    const problems = readingOrderProblems(page, extracted)
    assert.equal(problems.length, 1)
    assert.match(problems[0], /leaves the source order: expected "….*02\/2022/)
  })

  it('rejects two columns read line by line', () => {
    const extracted = page.replace(
      'xexubonete.dev\nSummary',
      'Summary\nxexubonete.dev',
    )
    const problems = readingOrderProblems(page, extracted)
    assert.equal(problems.length, 1)
    assert.match(problems[0], /leaves the source order/)
  })

  it('rejects text that stops short', () => {
    const extracted = page.slice(0, page.indexOf('Experience'))
    const problems = readingOrderProblems(page, extracted)
    assert.equal(problems.length, 1)
    assert.match(problems[0], /stops short, before "….*experience backend/)
  })

  it('rejects text after the end of the CV', () => {
    const problems = readingOrderProblems(page, `${page}\nSummary`)
    assert.equal(problems.length, 1)
    assert.match(problems[0], /text after the end of the CV/)
  })
})
