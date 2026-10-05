# 🎯 My portfolio

A fully static, zero-JavaScript-framework portfolio built with Astro and Tailwind CSS. Bilingual (English/Spanish), light and dark themes, and an art direction of its own — see [`DESIGN.md`](DESIGN.md).

## 🚀 Features

- **Bilingual Support**: `/` detects the browser language and sends visitors to `/en/` or `/es/`; every page has its twin in the other language, one click away
- **Dark/Light Theme**: follows the system preference by default, persists an explicit choice, and never flashes the wrong theme on load
- **Fully Static**: every page is prerendered at build time and served from Vercel's CDN — no server function runs per request
- **Near-zero JavaScript**: no framework on the client; the theme toggle, the language switch and the live years-of-experience count are a few lines of inline script
- **Performance Optimized**: self-hosted subsetted fonts with preload, AVIF/WebP images with explicit sizes, and all CSS inlined into each page
- **Responsive and accessible**: one drafting-sheet layout from phone to wide desktop, semantic landmarks, visible focus, `prefers-reduced-motion` respected
- **SEO Friendly**: canonical and `hreflang` links, Open Graph and Twitter metadata, a proper 404

## 🛠️ Tech Stack

- [Astro](https://astro.build/) (static output)
- [Tailwind CSS](https://tailwindcss.com/) v4 on top of plain CSS tokens and recipes
- [TypeScript](https://www.typescriptlang.org/)
- [sharp](https://sharp.pixelplumbing.com/) and [subset-font](https://github.com/papandreou/subset-font) in the build pipeline
- [Puppeteer](https://pptr.dev/) to print the CV PDFs, [pdf-lib](https://pdf-lib.js.org/) to set their ATS metadata

> Package manager: **pnpm** (pinned via the `packageManager` field). Use `corepack enable` to get the matching version automatically. Node 24 (see `.nvmrc`).

## 🏗️ Project Structure

```
├── DESIGN.md                     # art direction: tokens, type, layout, motion rules
├── astro.config.mjs              # output: 'static', inlined CSS, build pipeline
├── design/                       # static HTML mockups rendered from the real content
├── package.json
├── pnpm-lock.yaml
├── public/                       # CV PDFs, images, memojis, fonts/ (self-hosted)
├── scripts
│   ├── generate-cv.mjs           # prints the CV PDFs from the production build
│   ├── integrations/             # static-pipeline: font subsetting + image formats
│   └── lib/                      # static file server used by the scripts
├── src
│   ├── components
│   │   ├── cv/Resume.astro        # the A4 CV page
│   │   ├── layout/                # Header, Footer, HeadSEO, ThemeScript, ThemeToggle, LanguageSwitch
│   │   ├── pages/                 # HomePage and WorkPage, rendered once per language
│   │   ├── sections/              # Hero, Experience, Stack, Projects, Goals, About, Quote, Contact…
│   │   └── ui/                    # SectionHead, ExpYears, Glyph, Sprite
│   ├── i18n
│   │   ├── content.ts             # every UI string, both languages, one typed shape
│   │   ├── routes.ts              # Lang type, language-aware paths
│   │   └── index.ts               # per-language data helpers
│   ├── layouts/BaseLayout.astro
│   ├── lib/                       # constants (EN), constants-es (ES), experience helpers, types
│   ├── pages
│   │   ├── 404.astro
│   │   ├── index.astro            # redirects by browser language
│   │   ├── cv.astro               # /cv (Spanish CV)
│   │   ├── en/{index,work,cv}.astro
│   │   └── es/{index,work}.astro
│   └── styles/                    # tokens, fonts, base, recipes, cv, globals (Tailwind entry)
├── tsconfig.json
└── vercel.json                   # build settings and cache/security headers
```

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/xexubonete/my-portfolio.git
```

2. Install dependencies:

```bash
corepack enable   # activates the pinned pnpm version
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Type-check, test and build for production:

```bash
pnpm check
pnpm test
pnpm build
pnpm preview   # serves the production build from dist/
```

5. Regenerate the CV PDFs (builds the site, serves `dist/` and prints `/cv` and `/en/cv` with headless Chromium):

```bash
pnpm cv:pdf
```

The script fails, and leaves the previous PDFs alone, if a CV is not exactly one page or if `pdftotext` (poppler, e.g. `brew install poppler`) does not read its text in source order with every word apart, in default, `-raw` and `-layout` mode. Without poppler that check is skipped with a warning. The CV sheet uses static cuts of the site's fonts from `public/fonts/cv/`, so the PDF embeds them as plain TrueType; rebuild them with `pnpm cv:fonts` after changing a font file.

## ⚙️ Build pipeline

`pnpm build` prerenders every route into `dist/`. A post-build integration (`scripts/integrations/static-pipeline.mjs`) then:

- subsets every font under `public/fonts/` to the characters the site uses and to the weight range the stylesheets ask for, writes it to `/_astro/fonts/` with a content hash in the name, rewrites the CSS to point at it and preloads the display and body faces from the pages that use them;
- gives every raster `<img>` served from `public/` AVIF and WebP sources at its displayed size (1x and 2x), wrapped in a `<picture>` with explicit `width`/`height`.

`vercel.json` marks everything under `/_astro/` as immutable for a year, so hashed assets are cached by browsers and the CDN.

## 🎨 Customization

- Edit `src/lib/constants.ts` (English) and `src/lib/constants-es.ts` (Spanish) for experience and study data.
- Every other string lives in `src/i18n/content.ts`, typed so both languages always carry the same keys.
- Colours, type scale, spacing and motion tokens live in `src/styles/tokens.css`; component and section recipes in `src/styles/recipes.css`. The rationale is in `DESIGN.md`.
- The mockups under `design/` are rendered from the real content with `node design/build.mjs`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- Email: [xexubonete@gmail.com](mailto:xexubonete@gmail.com)
