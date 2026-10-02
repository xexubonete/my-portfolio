import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  fontMime,
  hashedName,
  imgTag,
  injectFontPreloads,
  linkedStylesheets,
  nonAsciiCharacters,
  parseAttributes,
  rewriteUrls,
  transformImages,
  usedWeightRange,
} from './html.mjs'

describe('hashedName', () => {
  it('inserts an 8-character content hash before the extension', () => {
    const name = hashedName('geist.woff2', Buffer.from('abc'))
    assert.match(name, /^geist\.[0-9a-f]{8}\.woff2$/)
  })

  it('is stable for the same content and different for different content', () => {
    const a = hashedName('a.css', 'one')
    assert.equal(a, hashedName('a.css', 'one'))
    assert.notEqual(a, hashedName('a.css', 'two'))
  })

  it('appends the hash when there is no extension', () => {
    assert.match(hashedName('LICENSE', 'x'), /^LICENSE\.[0-9a-f]{8}$/)
  })
})

describe('rewriteUrls', () => {
  it('replaces every occurrence of every key', () => {
    const out = rewriteUrls('url(/fonts/a.woff2) url(/fonts/a.woff2)', {
      '/fonts/a.woff2': '/x/a.1.woff2',
    })
    assert.equal(out, 'url(/x/a.1.woff2) url(/x/a.1.woff2)')
  })

  it('never lets a shorter key clobber a longer one', () => {
    const out = rewriteUrls('/fonts/a.woff2 /fonts/a.woff2.bak', {
      '/fonts/a.woff2': '/x/short',
      '/fonts/a.woff2.bak': '/x/long',
    })
    assert.equal(out, '/x/short /x/long')
  })

  it('leaves text without matches untouched', () => {
    assert.equal(rewriteUrls('plain', { '/fonts/a': '/b' }), 'plain')
  })
})

describe('linkedStylesheets', () => {
  it('returns the href of stylesheet links only', () => {
    const html =
      '<link rel="icon" href="/i.png"><link rel="stylesheet" href="/a.css"><link href="/b.css" rel=stylesheet>'
    assert.deepEqual(linkedStylesheets(html), ['/a.css', '/b.css'])
  })

  it('returns nothing when there are no links', () => {
    assert.deepEqual(linkedStylesheets('<p>hi</p>'), [])
  })
})

describe('injectFontPreloads', () => {
  it('puts the preloads before the first <style> in head', () => {
    const html =
      '<html><head><meta charset="utf-8"><style>a{}</style></head></html>'
    const out = injectFontPreloads(html, ['/_astro/fonts/a.woff2'])
    assert.equal(
      out,
      '<html><head><meta charset="utf-8"><link rel="preload" as="font" type="font/woff2" href="/_astro/fonts/a.woff2" crossorigin><style>a{}</style></head></html>',
    )
  })

  it('puts them before a stylesheet link when that comes first', () => {
    const html = '<head><link rel="stylesheet" href="/a.css"></head>'
    const out = injectFontPreloads(html, ['/f.woff2'])
    assert.ok(out.indexOf('rel="preload"') < out.indexOf('rel="stylesheet"'))
  })

  it('falls back to the end of head', () => {
    const html = '<head><title>t</title></head><body></body>'
    const out = injectFontPreloads(html, ['/f.woff2'])
    assert.ok(out.indexOf('rel="preload"') < out.indexOf('</head>'))
    assert.ok(out.indexOf('rel="preload"') > out.indexOf('</title>'))
  })

  it('does nothing without fonts or without a head', () => {
    assert.equal(injectFontPreloads('<head></head>', []), '<head></head>')
    assert.equal(injectFontPreloads('<p>x</p>', ['/f.woff2']), '<p>x</p>')
  })
})

describe('fontMime', () => {
  it('maps the extension to a font MIME type', () => {
    assert.equal(fontMime('/a.woff2'), 'font/woff2')
    assert.equal(fontMime('/a.woff'), 'font/woff')
    assert.equal(fontMime('/a.otf'), 'font/otf')
    assert.equal(fontMime('/a.ttf'), 'font/ttf')
  })
})

describe('nonAsciiCharacters', () => {
  it('collects each non-ASCII character once, sorted', () => {
    assert.equal(nonAsciiCharacters('años — más — Jesús'), 'áñú—')
  })

  it('is empty for plain ASCII', () => {
    assert.equal(nonAsciiCharacters('abc 123'), '')
  })
})

describe('parseAttributes', () => {
  it('reads double-quoted, single-quoted, bare and valueless attributes', () => {
    const attrs = parseAttributes(
      `<img src="/a.png" alt='x y' width=40 hidden />`,
    )
    assert.deepEqual(attrs, {
      src: '/a.png',
      alt: 'x y',
      width: '40',
      hidden: '',
    })
  })

  it('lower-cases attribute names', () => {
    assert.deepEqual(parseAttributes('<IMG SRC="/a">'), { src: '/a' })
  })
})

describe('imgTag', () => {
  it('rebuilds the tag keeping attribute order', () => {
    assert.equal(
      imgTag({ src: '/a.png', alt: '', hidden: '' }),
      '<img src="/a.png" alt hidden>',
    )
  })
})

describe('transformImages', () => {
  it('replaces images outside <picture> and leaves the rest alone', async () => {
    const html =
      '<img src="/a.png"><picture><img src="/b.png"></picture><img src="/c.png">'
    const out = await transformImages(html, async (tag, attrs) =>
      attrs.src === '/c.png' ? null : `[${attrs.src}]`,
    )
    assert.equal(
      out,
      '[/a.png]<picture><img src="/b.png"></picture><img src="/c.png">',
    )
  })

  it('passes parsed attributes to the callback', async () => {
    let seen
    await transformImages('<img src="/a.png" width="40">', async (_, attrs) => {
      seen = attrs
      return null
    })
    assert.deepEqual(seen, { src: '/a.png', width: '40' })
  })

  it('returns the input unchanged when there are no images', async () => {
    assert.equal(
      await transformImages('<p>no</p>', async () => 'x'),
      '<p>no</p>',
    )
  })
})

describe('usedWeightRange', () => {
  it('spans the single-value weights found in the CSS', () => {
    const css = 'h1{font-weight:800}p{font-weight: 500;}em{font-weight:bold}'
    assert.deepEqual(usedWeightRange(css), { min: 400, max: 800 })
  })

  it('ignores @font-face ranges and reads wght variation settings', () => {
    const css =
      "@font-face{font-weight:100 900}b{font-variation-settings:'wght' 650}"
    assert.deepEqual(usedWeightRange(css), { min: 400, max: 700 })
  })

  it('always covers normal and bold', () => {
    assert.deepEqual(usedWeightRange(''), { min: 400, max: 700 })
    assert.deepEqual(usedWeightRange('x{font-weight:300}'), {
      min: 300,
      max: 700,
    })
  })
})
