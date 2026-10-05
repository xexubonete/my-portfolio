// Run with: pnpm test
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { describe, it } from 'node:test'
import { CV_FONTS, LATIN_RANGES, charset } from './cv-fonts.mjs'

describe('charset', () => {
  it('expands inclusive ranges in order', () => {
    assert.equal(
      charset([
        [0x41, 0x43],
        [0x61, 0x61],
      ]),
      'ABCa',
    )
  })

  it('returns an empty string for no ranges', () => {
    assert.equal(charset([]), '')
  })

  it('handles code points beyond the basic plane', () => {
    assert.equal(charset([[0x1f600, 0x1f600]]), '\u{1f600}')
  })

  it('covers what the CV prints with the Latin ranges', () => {
    const latin = charset(LATIN_RANGES)
    for (const char of 'Jesús Sánchez · C# – — 01/2026 (+34) @ & ñ ¿') {
      assert.ok(latin.includes(char), `missing ${JSON.stringify(char)}`)
    }
  })
})

describe('CV_FONTS', () => {
  it('names every output once', () => {
    const names = CV_FONTS.map((font) => font.out)
    assert.equal(new Set(names).size, names.length)
  })

  it('cuts every font from a file that exists', () => {
    for (const font of CV_FONTS) {
      assert.ok(existsSync(`public/fonts/${font.source}.woff2`), font.source)
    }
  })

  it('has every output built and declared in cv.css', async () => {
    const css = await readFile('src/styles/cv.css', 'utf8')
    for (const font of CV_FONTS) {
      const url = `/fonts/cv/${font.out}.woff2`
      assert.ok(existsSync(`public${url}`), `${url} is not built`)
      assert.ok(css.includes(url), `${url} is not declared in cv.css`)
    }
  })
})
