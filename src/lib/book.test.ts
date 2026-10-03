// Run with: pnpm test
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  LEAF_IDS,
  folios,
  neighbours,
  roman,
  slug,
  withLeadIn,
} from './book.ts'

describe('LEAF_IDS', () => {
  it('opens on the cover and has no repeated ids', () => {
    assert.equal(LEAF_IDS[0], 'cover')
    assert.equal(new Set(LEAF_IDS).size, LEAF_IDS.length)
  })
})

describe('roman', () => {
  it('writes the additive numerals', () => {
    assert.equal(roman(1), 'I')
    assert.equal(roman(3), 'III')
    assert.equal(roman(6), 'VI')
    assert.equal(roman(2026), 'MMXXVI')
  })

  it('writes the subtractive numerals', () => {
    assert.equal(roman(4), 'IV')
    assert.equal(roman(9), 'IX')
    assert.equal(roman(40), 'XL')
    assert.equal(roman(90), 'XC')
    assert.equal(roman(400), 'CD')
    assert.equal(roman(1999), 'MCMXCIX')
  })

  it('rejects what Rome had no numeral for', () => {
    assert.throws(() => roman(0), RangeError)
    assert.throws(() => roman(-3), RangeError)
    assert.throws(() => roman(1.5), RangeError)
  })
})

describe('folios', () => {
  it('leaves the cover unnumbered', () => {
    assert.equal(folios(0), null)
    assert.equal(folios(-1), null)
  })

  it('puts even numbers on the left and odd ones on the right', () => {
    assert.deepEqual(folios(1), { verso: 2, recto: 3 })
    assert.deepEqual(folios(4), { verso: 8, recto: 9 })
  })
})

describe('neighbours', () => {
  const ids = ['a', 'b', 'c'] as const

  it('returns both sides of a middle leaf', () => {
    assert.deepEqual(neighbours(ids, 1), { prev: 'a', next: 'c' })
  })

  it('has nothing before the first leaf or after the last', () => {
    assert.deepEqual(neighbours(ids, 0), { prev: undefined, next: 'b' })
    assert.deepEqual(neighbours(ids, 2), { prev: 'b', next: undefined })
  })

  it('has no neighbours in a book of one leaf', () => {
    assert.deepEqual(neighbours(['only'], 0), {
      prev: undefined,
      next: undefined,
    })
  })
})

describe('slug', () => {
  it('lower-cases and joins words with hyphens', () => {
    assert.equal(slug('NTT DATA'), 'ntt-data')
    assert.equal(slug('Savia by Berger-Levrault'), 'savia-by-berger-levrault')
  })

  it('drops accents and stray punctuation', () => {
    assert.equal(slug('  Jesús & Cía. '), 'jesus-cia')
  })

  it('is empty for a name with nothing to keep', () => {
    assert.equal(slug('—'), '')
  })
})

describe('withLeadIn', () => {
  it('wraps the opening words and keeps the rest', () => {
    assert.equal(
      withLeadIn('He started in 2022.', 'He started'),
      '<span class="lead-in">He started</span> in 2022.',
    )
  })

  it('leaves the text alone when it opens differently', () => {
    assert.equal(
      withLeadIn('In 2022 he started.', 'He started'),
      'In 2022 he started.',
    )
  })

  it('leaves the text alone when there is no lead-in', () => {
    assert.equal(withLeadIn('He started.', ''), 'He started.')
  })
})
