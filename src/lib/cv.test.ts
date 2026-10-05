// Run with: pnpm test
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { CV_LINKS, displayUrl } from './cv.ts'

describe('displayUrl', () => {
  it('drops the scheme and the www prefix', () => {
    assert.equal(
      displayUrl('https://www.linkedin.com/in/jesus-bonete-sanchez'),
      'linkedin.com/in/jesus-bonete-sanchez',
    )
  })

  it('drops trailing slashes', () => {
    assert.equal(
      displayUrl('https://www.linkedin.com/in/jesus-bonete-sanchez/'),
      'linkedin.com/in/jesus-bonete-sanchez',
    )
    assert.equal(displayUrl('https://xexubonete.dev//'), 'xexubonete.dev')
  })

  it('accepts http and upper-case schemes', () => {
    assert.equal(
      displayUrl('http://github.com/xexubonete'),
      'github.com/xexubonete',
    )
    assert.equal(
      displayUrl('HTTPS://WWW.github.com/xexubonete'),
      'github.com/xexubonete',
    )
  })

  it('drops the query string and the fragment', () => {
    assert.equal(
      displayUrl('https://xexubonete.dev/?ref=cv#top'),
      'xexubonete.dev',
    )
  })

  it('keeps the path and its case', () => {
    assert.equal(
      displayUrl('https://github.com/Xexu/My-Repo'),
      'github.com/Xexu/My-Repo',
    )
  })

  it('leaves an already short address alone', () => {
    assert.equal(displayUrl('xexubonete.dev'), 'xexubonete.dev')
    assert.equal(displayUrl('  xexubonete.dev  '), 'xexubonete.dev')
  })

  it('only strips a leading www', () => {
    assert.equal(
      displayUrl('https://example.com/www.page'),
      'example.com/www.page',
    )
  })

  it('returns an empty string for an empty input', () => {
    assert.equal(displayUrl(''), '')
  })
})

describe('CV_LINKS', () => {
  it('prints the short form of each profile, in order', () => {
    assert.deepEqual(
      CV_LINKS.map((link) => link.text),
      [
        'linkedin.com/in/jesus-bonete-sanchez',
        'github.com/xexubonete',
        'xexubonete.dev',
      ],
    )
  })

  it('still links to the full URL', () => {
    for (const link of CV_LINKS) {
      assert.match(link.href, /^https:\/\//)
      assert.ok(link.href.includes(link.text))
    }
  })
})
