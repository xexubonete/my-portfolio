import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  output: 'server',
  site: 'https://xexubonete.dev',
  adapter: vercel(),
  integrations: [react()],
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
