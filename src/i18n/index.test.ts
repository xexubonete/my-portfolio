// Run with: pnpm test
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { EXPERIENCE } from '../lib/constants.ts'
import { SPANISH } from '../lib/constants-es.ts'
import { LEAF_IDS } from '../lib/book.ts'
import { leafNav, leafTitles } from './book.ts'
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

describe('the prose', () => {
  const proseOf = (lang: 'es' | 'en') => {
    const c = CONTENT[lang]
    return [
      { leadIn: c.author.leadIn, first: c.author.paragraphs[0] },
      { leadIn: c.campaigns.leadIn, first: c.campaigns.paragraphs[0]?.text },
      { leadIn: c.arms.leadIn, first: c.arms.paragraphs[0] },
      { leadIn: c.course.leadIn, first: c.course.paragraphs[0] },
      { leadIn: c.offDuty.leadIn, first: c.offDuty.paragraphs[0] },
      { leadIn: c.contact.leadIn, first: c.contact.paragraphs[0] },
      { leadIn: c.cv.leadIn, first: c.cv.paragraphs[0] },
    ]
  }

  it('opens every chapter with its lead-in words', () => {
    for (const lang of LANGS) {
      for (const { leadIn, first } of proseOf(lang)) {
        assert.ok(first?.startsWith(leadIn), `${lang}: "${leadIn}"`)
      }
    }
  })

  it('opens every outbound link in a new tab without an opener', () => {
    const walk = (value: unknown) => {
      if (typeof value === 'string') {
        for (const tag of value.match(/<a\b[^>]*>/g) ?? []) {
          assert.match(tag, /target="_blank"/)
          assert.match(tag, /rel="noopener noreferrer"/)
        }
      } else if (value && typeof value === 'object') {
        Object.values(value).forEach(walk)
      }
    }
    walk(CONTENT)
  })
})

describe('the campaigns chapter', () => {
  const roles = { es: SPANISH, en: EXPERIENCE }

  it('annotates every role exactly once, in both languages', () => {
    for (const lang of LANGS) {
      const noted = CONTENT[lang].campaigns.paragraphs.flatMap((p) => p.roles)
      assert.deepEqual(
        [...noted].sort(),
        roles[lang].map((_, i) => i),
        lang,
      )
    }
  })

  it('has an ordinal for every company on the work page', () => {
    for (const lang of LANGS) {
      const companies = new Set(roles[lang].map((role) => role.company))
      assert.ok(CONTENT[lang].work.ordinals.length >= companies.size, lang)
    }
  })
})

describe('leafTitles', () => {
  it('names every leaf in both languages', () => {
    for (const lang of LANGS) {
      const titles = leafTitles(lang)
      assert.deepEqual(Object.keys(titles), [...LEAF_IDS])
      for (const title of Object.values(titles)) assert.notEqual(title, '')
    }
  })
})

describe('leafNav', () => {
  it('starts at the cover, which has nothing before it', () => {
    const cover = leafNav('en', 'cover')
    assert.equal(cover.index, 0)
    assert.equal(cover.prev, undefined)
    assert.deepEqual(cover.next, { href: '#index', label: 'Contents' })
  })

  it('links a middle leaf to both of its neighbours', () => {
    const chapter = leafNav('es', 'ii')
    assert.equal(chapter.label, 'De las campañas')
    assert.deepEqual(chapter.prev, {
      href: '#i',
      label: 'Del autor y de su oficio',
    })
    assert.deepEqual(chapter.next, { href: '#iii', label: 'De las armas' })
  })

  it('ends at the appendix, which has nothing after it', () => {
    const last = leafNav('en', 'cv')
    assert.equal(last.index, LEAF_IDS.length - 1)
    assert.equal(last.next, undefined)
    assert.deepEqual(last.prev, { href: '#vi', label: 'Of his whereabouts' })
  })

  it('can be walked from the cover to the last leaf', () => {
    const seen = []
    let nav = leafNav('en', 'cover')
    for (;;) {
      seen.push(nav.id)
      if (!nav.next) break
      nav = leafNav('en', nav.next.href.slice(1) as (typeof LEAF_IDS)[number])
    }
    assert.deepEqual(seen, [...LEAF_IDS])
  })
})
