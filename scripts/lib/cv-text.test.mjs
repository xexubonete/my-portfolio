// Run with: pnpm test
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { normalizeText, readingOrderProblems } from './cv-text.mjs'

const zones = {
  header: 'Jesús Bonete Sánchez\nSenior .NET Developer',
  side: 'Contact\nxexubonete.dev\nTechnical Skills\nC#, SQL',
  main: 'Summary\nA renewable-energy company.\nExperience\n01/2026 – 09/2026',
}

describe('normalizeText', () => {
  it('ignores case, whitespace and hyphens', () => {
    assert.equal(
      normalizeText('SENIOR .NET\n Developer  renewable-\nenergy'),
      'senior.netdeveloperrenewableenergy',
    )
  })

  it('keeps punctuation and accents', () => {
    assert.equal(normalizeText('Jesús: C#, CI/CD'), 'jesús:c#,ci/cd')
  })
})

describe('readingOrderProblems', () => {
  it('accepts header, side zone, main zone', () => {
    const extracted = [zones.header, zones.side, zones.main].join('\n\n')
    assert.deepEqual(readingOrderProblems(zones, extracted), [])
  })

  it('accepts the upper-cased role and a word joined at a line end', () => {
    const extracted =
      'Jesús Bonete Sánchez\nSENIOR .NET DEVELOPER\n' +
      `${zones.side}\nSummary\nA renewableenergy company.\n` +
      'Experience\n01/2026 – 09/2026'
    assert.deepEqual(readingOrderProblems(zones, extracted), [])
  })

  it('accepts a date moved by a line inside the main zone', () => {
    const extracted =
      `${zones.header}\n${zones.side}\n` +
      'Summary\nA renewable-energy company.\n01/2026 – 09/2026\nExperience'
    assert.deepEqual(readingOrderProblems(zones, extracted), [])
  })

  it('rejects a main-zone line read before the side zone', () => {
    const extracted = `${zones.header}\nSummary\n${zones.side}\n${zones.main}`
    const problems = readingOrderProblems(zones, extracted)
    assert.equal(problems.length, 1)
    assert.match(problems[0], /does not read header, then the side zone/)
  })

  it('rejects the two zones interleaved', () => {
    const extracted =
      `${zones.header}\nContact\nxexubonete.dev\nSummary\n` +
      'Technical Skills\nC#, SQL\nA renewable-energy company.\n' +
      'Experience\n01/2026 – 09/2026'
    const problems = readingOrderProblems(zones, extracted)
    assert.equal(problems.length, 1)
    assert.match(problems[0], /expected "….*technicalskills/)
  })

  it('rejects text missing from the main zone', () => {
    const extracted = `${zones.header}\n${zones.side}\nSummary\nExperience`
    assert.deepEqual(readingOrderProblems(zones, extracted), [
      'the text after the side zone is not the main zone: something is ' +
        'missing, repeated or was read twice',
    ])
  })

  it('rejects text repeated after the main zone', () => {
    const extracted = `${zones.header}\n${zones.side}\n${zones.main}\nSummary`
    assert.equal(readingOrderProblems(zones, extracted).length, 1)
  })
})
