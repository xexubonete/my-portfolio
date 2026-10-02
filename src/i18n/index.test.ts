// Run with: node --test src/
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { CONTENT } from './content.ts'
import { LANGS, isLang, otherLang, pagePath } from './routes.ts'

describe('isLang', () => {
  it('accepts the two supported languages', () => {
    for (const lang of LANGS) assert.equal(isLang(lang), true)
  })

  it('rejects anything else', () => {
    assert.equal(isLang('fr'), false)
    assert.equal(isLang(''), false)
    assert.equal(isLang('EN'), false)
  })
})

describe('otherLang', () => {
  it('flips between the two languages', () => {
    assert.equal(otherLang('es'), 'en')
    assert.equal(otherLang('en'), 'es')
  })
})

describe('pagePath', () => {
  it('keeps every historical URL', () => {
    assert.equal(pagePath('en', 'home'), '/en/')
    assert.equal(pagePath('es', 'home'), '/es/')
    assert.equal(pagePath('en', 'work'), '/en/work')
    assert.equal(pagePath('es', 'work'), '/es/work')
    assert.equal(pagePath('en', 'cv'), '/en/cv')
    assert.equal(pagePath('es', 'cv'), '/cv')
  })
})

describe('content parity', () => {
  const shape = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(shape)
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, shape(item)]),
      )
    }
    return typeof value
  }

  it('has the same structure in both languages', () => {
    assert.deepEqual(shape(CONTENT.es), shape(CONTENT.en))
  })

  it('has no empty strings', () => {
    const walk = (value: unknown, path: string) => {
      if (typeof value === 'string') {
        assert.notEqual(value.trim(), '', `${path} is empty`)
      } else if (value && typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) {
          walk(item, `${path}.${key}`)
        }
      }
    }
    walk(CONTENT, 'CONTENT')
  })

  it('links the same contact targets in both languages', () => {
    assert.deepEqual(
      CONTENT.es.contact.items.map((item) => item.href),
      CONTENT.en.contact.items.map((item) => item.href),
    )
  })
})
