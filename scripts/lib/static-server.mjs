// A minimal static file server over a built dist/ directory, resolving URLs
// the way Vercel does for this site: `/en` and `/en/` both serve
// `en/index.html`, unknown paths get `404.html`. Used by the CV generator so
// the PDFs are printed from the production build, never from the dev server.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
}

/** Maps a request path to the file that answers it, or null for a 404. */
export async function resolveFile(root, urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  const safe = path.normalize(clean).replace(/^(\.\.[/\\])+/, '')
  const base = path.join(root, safe)
  if (!base.startsWith(root)) return null

  const candidates = safe.endsWith('/')
    ? [path.join(base, 'index.html')]
    : [base, `${base}.html`, path.join(base, 'index.html')]

  for (const candidate of candidates) {
    const info = await stat(candidate).catch(() => null)
    if (info?.isFile()) return candidate
  }
  return null
}

/** Starts the server on an OS-assigned port and resolves with `{ url, close }`. */
export function serveStatic(root, { host = '127.0.0.1', port = 0 } = {}) {
  const absoluteRoot = path.resolve(root)

  const server = createServer(async (req, res) => {
    const file = await resolveFile(absoluteRoot, req.url ?? '/')
    const target = file ?? path.join(absoluteRoot, '404.html')
    const body = await readFile(target).catch(() => null)
    if (body === null) {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found')
      return
    }
    res.writeHead(file ? 200 : 404, {
      'content-type': TYPES[path.extname(target)] ?? 'application/octet-stream',
      'content-length': body.length,
    })
    res.end(body)
  })

  return new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, host, () => {
      const address = server.address()
      resolve({
        url: `http://${host}:${address.port}`,
        close: () => new Promise((done) => server.close(done)),
      })
    })
  })
}
