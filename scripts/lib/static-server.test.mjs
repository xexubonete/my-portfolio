import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { after, before, describe, it } from 'node:test'
import { resolveFile, serveStatic } from './static-server.mjs'

let root
let server

before(async () => {
  root = await mkdtemp(path.join(tmpdir(), 'static-server-'))
  await mkdir(path.join(root, 'en', 'work'), { recursive: true })
  await writeFile(path.join(root, 'index.html'), 'root')
  await writeFile(path.join(root, 'en', 'index.html'), 'en home')
  await writeFile(path.join(root, 'en', 'work', 'index.html'), 'en work')
  await writeFile(path.join(root, 'cv.html'), 'cv file')
  await writeFile(path.join(root, '404.html'), 'missing')
  await writeFile(path.join(root, 'me.png'), 'png')
  server = await serveStatic(root)
})

after(async () => {
  await server.close()
})

describe('resolveFile', () => {
  it('serves a directory index with and without the trailing slash', async () => {
    assert.equal(
      await resolveFile(root, '/en'),
      path.join(root, 'en', 'index.html'),
    )
    assert.equal(
      await resolveFile(root, '/en/'),
      path.join(root, 'en', 'index.html'),
    )
    assert.equal(
      await resolveFile(root, '/en/work'),
      path.join(root, 'en', 'work', 'index.html'),
    )
  })

  it('serves plain files and clean URLs for .html files', async () => {
    assert.equal(await resolveFile(root, '/me.png'), path.join(root, 'me.png'))
    assert.equal(await resolveFile(root, '/cv'), path.join(root, 'cv.html'))
  })

  it('ignores the query string', async () => {
    assert.equal(
      await resolveFile(root, '/en?x=1'),
      path.join(root, 'en', 'index.html'),
    )
  })

  it('returns null for unknown paths and never escapes the root', async () => {
    assert.equal(await resolveFile(root, '/nope'), null)
    assert.equal(await resolveFile(root, '/../../etc/passwd'), null)
  })
})

describe('serveStatic', () => {
  it('answers 200 with the right content type', async () => {
    const res = await fetch(`${server.url}/en/work`)
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('content-type'), 'text/html; charset=utf-8')
    assert.equal(await res.text(), 'en work')
  })

  it('answers unknown paths with 404.html', async () => {
    const res = await fetch(`${server.url}/does-not-exist`)
    assert.equal(res.status, 404)
    assert.equal(await res.text(), 'missing')
  })

  it('uses a generic type for unknown extensions', async () => {
    await writeFile(path.join(root, 'blob.bin'), 'x')
    const res = await fetch(`${server.url}/blob.bin`)
    assert.equal(res.headers.get('content-type'), 'application/octet-stream')
  })
})
