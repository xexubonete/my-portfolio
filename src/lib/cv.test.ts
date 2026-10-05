// Run with: pnpm test
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { LINKS } from './constants.ts'
import { CV_WEBSITE, shortUrl } from './cv.ts'

describe('shortUrl', () => {
  it('prints the CV profiles without scheme, www or trailing slash', () => {
    assert.equal(
      shortUrl(LINKS.linkedin),
      'linkedin.com/in/jesus-bonete-sanchez',
    )
    assert.equal(shortUrl(LINKS.github), 'github.com/xexubonete')
    assert.equal(shortUrl(CV_WEBSITE), 'xexubonete.dev')
  })

  it('strips http and upper-case prefixes too', () => {
    assert.equal(shortUrl('http://WWW.example.com/a/'), 'example.com/a')
    assert.equal(shortUrl('HTTPS://example.com'), 'example.com')
  })

  it('removes every trailing slash but keeps inner ones', () => {
    assert.equal(shortUrl('https://example.com/a/b//'), 'example.com/a/b')
  })

  it('leaves an already short form untouched', () => {
    assert.equal(shortUrl('github.com/xexubonete'), 'github.com/xexubonete')
    assert.equal(shortUrl(''), '')
  })

  it('only drops a leading www, not one inside the host or path', () => {
    assert.equal(
      shortUrl('https://my.www.example.com/www.'),
      'my.www.example.com/www.',
    )
  })
})
