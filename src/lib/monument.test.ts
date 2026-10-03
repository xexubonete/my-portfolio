// Run with: pnpm test
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { emWidth, roman } from './monument.ts'

describe('emWidth', () => {
  it('adds up the advances of a word at both weights', () => {
    const { black, hairline } = emWidth('BONETE')
    assert.deepEqual({ black, hairline }, { black: 2.969, hairline: 2.667 })
  })

  it('measures lowercase as the capitals it is set in', () => {
    assert.deepEqual(emWidth('cv'), emWidth('CV'))
  })

  it('measures figures and signs', () => {
    assert.equal(emWidth('+4').black, 0.963)
    assert.equal(emWidth('+4').hairline, 0.79)
    assert.equal(emWidth('.NET').black, 1.677)
    assert.equal(emWidth('.NET').hairline, 1.477)
  })

  it('measures an accented letter as its base letter', () => {
    assert.deepEqual(emWidth('Jesús'), emWidth('JESUS'))
    assert.deepEqual(emWidth('ñ'), emWidth('N'))
  })

  it('gives an unknown glyph the widest advance, so a word never overflows', () => {
    assert.equal(emWidth('€').black, 0.729)
    assert.equal(emWidth('€').hairline, 0.649)
  })

  it('is zero for an empty word', () => {
    assert.deepEqual(emWidth(''), {
      black: 0,
      hairline: 0,
      bearing: { black: 0, hairline: 0 },
    })
  })

  it('reports the blank before the first glyph', () => {
    assert.deepEqual(emWidth('Bonete').bearing, {
      black: 0.04,
      hairline: 0.065,
    })
    assert.deepEqual(emWidth('AI').bearing, { black: 0, hairline: 0 })
  })
})

describe('roman', () => {
  it('numbers the rooms', () => {
    assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 19, 39].map(roman), [
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
      'X',
      'XIV',
      'XIX',
      'XXXIX',
    ])
  })

  it('refuses what it cannot write', () => {
    assert.throws(() => roman(0), RangeError)
    assert.throws(() => roman(40), RangeError)
  })
})
