import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { displayUrl } from './cv.ts'

describe('displayUrl', () => {
  it('drops the scheme, www. and the trailing slash', () => {
    assert.equal(
      displayUrl('https://www.linkedin.com/in/jesus-bonete-sanchez/'),
      'linkedin.com/in/jesus-bonete-sanchez',
    )
  })

  it('keeps the path of a URL without www.', () => {
    assert.equal(
      displayUrl('https://github.com/xexubonete'),
      'github.com/xexubonete',
    )
  })

  it('reduces a bare site to its host', () => {
    assert.equal(displayUrl('https://xexubonete.dev'), 'xexubonete.dev')
    assert.equal(displayUrl('http://WWW.xexubonete.dev///'), 'xexubonete.dev')
  })

  it('leaves an already short form alone, apart from outer whitespace', () => {
    assert.equal(displayUrl('  xexubonete.dev  '), 'xexubonete.dev')
  })

  it('only strips a leading www., never one inside the address', () => {
    assert.equal(
      displayUrl('https://example.com/www.page'),
      'example.com/www.page',
    )
  })
})
