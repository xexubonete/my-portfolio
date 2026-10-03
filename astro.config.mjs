import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import staticPipeline from './scripts/integrations/static-pipeline.mjs'

export default defineConfig({
  // Every page is prerendered at build time and served from Vercel's CDN as a
  // plain file: no adapter, no serverless function, nothing runs per request.
  // The two things that used to need a server (the language redirect at `/`
  // and the years-of-experience counter) are a few lines of inline script.
  output: 'static',
  site: 'https://xexubonete.dev',
  trailingSlash: 'ignore',
  build: {
    // The whole stylesheet travels inside the HTML, so the first paint never
    // waits on a second request. It is small enough that this is a net win.
    inlineStylesheets: 'always',
  },
  integrations: [
    // Post-build pass over dist/: subsets and content-hashes the self-hosted
    // fonts, preloads the ones each page uses, and gives every raster <img>
    // AVIF/WebP sources with explicit dimensions. See scripts/integrations/.
    staticPipeline({
      // Only the display and body faces are worth a preload: they shape the
      // first paint. The mono and the serif italic can arrive with the swap.
      preload: (url) => /bricolage|instrument-sans/.test(url),
    }),
  ],
  vite: {
    // Tailwind 4 is a Vite plugin, not an Astro integration: @astrojs/tailwind
    // was archived and never supported Astro 6 or 7.
    plugins: [tailwindcss()],
    // Pre-bundled at start-up instead of being discovered on the first request.
    // The ClientRouter pulls these in lazily, so Vite found them mid-page-load,
    // re-optimised, and forced a reload -- which answered the requests already in
    // flight with 504s. Harmless while developing, not harmless when the CV PDFs
    // are printed from this very server.
    optimizeDeps: {
      include: [
        'astro/virtual-modules/transitions-router.js',
        'astro/virtual-modules/transitions-events.js',
        'astro/virtual-modules/transitions-swap-functions.js',
        'astro/virtual-modules/transitions-types.js',
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
