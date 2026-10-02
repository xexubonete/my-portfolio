# 🎯 My portfolio

A modern, responsive portfolio website built with Astro, React, and Tailwind CSS. Features a bilingual interface (English/Spanish) and a dark/light theme toggle.

## 🚀 Features

- **Bilingual Support**: Automatically detects browser language and switches between English and Spanish
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: A bento-style grid that reflows from 1 → 2 → 4 columns
- **Modern Stack**: Built with Astro, React, and Tailwind CSS
- **Fully Static**: every page is prerendered at build time and served from Vercel's CDN — no server function runs per request
- **Performance Optimized**: self-hosted subsetted fonts with preload, AVIF/WebP images with explicit sizes, and the CSS inlined into each page
- **SEO Friendly**: Includes meta tags and proper SEO structure

## 🛠️ Tech Stack

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide Icons](https://lucide.dev/)
- [Motion](https://motion.dev/)

> Package manager: **pnpm** (pinned via the `packageManager` field). Use `corepack enable` to get the matching version automatically.

## 🏗️ Project Structure

```
├── astro.config.mjs              # output: 'static', inlined CSS, build pipeline
├── components.json
├── package.json
├── pnpm-lock.yaml
├── public/                       # static assets (CV PDF, images, memojis)
├── scripts
│   ├── generate-cv.mjs           # prints the CV PDFs from the production build
│   ├── integrations/             # static-pipeline: font subsetting + image formats
│   └── lib/                      # static file server used by the scripts
├── src
│   ├── components
│   │   ├── bento
│   │   │   ├── BentoGrid.astro    # responsive bento layout + entry animation
│   │   │   ├── Card.astro         # shared card shell (fills its grid cell)
│   │   │   ├── Container.astro
│   │   │   ├── ContentCard.astro
│   │   │   └── cards/             # one bilingual component per card
│   │   ├── layout                 # Header, Footer, HeadSEO, Pulse
│   │   └── ui/                    # shadcn/ui primitives (React)
│   ├── i18n
│   │   └── index.ts               # Lang type + per-language data helpers
│   ├── layouts/                   # BaseLayout, TopLayout, BottomLayout
│   ├── lib/                       # constants, constants-es, types, utils
│   ├── pages
│   │   ├── 404.astro
│   │   ├── index.astro            # redirects by browser language
│   │   ├── en/{index,work}.astro  # thin route entries
│   │   └── es/{index,work}.astro
│   └── styles/                    # fonts.css, globals.css
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
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
```

5. Regenerate the CV PDFs (builds the site, serves `dist/` and prints `/cv` and `/en/cv` with headless Chromium):

```bash
pnpm cv:pdf
```

## ⚙️ Build pipeline

`pnpm build` prerenders every route into `dist/`. A post-build integration (`scripts/integrations/static-pipeline.mjs`) then:

- subsets every font under `public/fonts/` to the characters the site uses, writes it to `/_astro/fonts/` with a content hash in the name, rewrites the CSS to point at it and preloads it from the pages that use it;
- gives every raster `<img>` served from `public/` AVIF and WebP sources at its displayed size (1x and 2x), wrapped in a `<picture>` with explicit `width`/`height`.

`vercel.json` marks everything under `/_astro/` as immutable for a year, so hashed assets are cached by browsers and the CDN.

## 🎨 Customization

- Edit `src/lib/constants.ts` (English) and `src/lib/constants-es.ts` (Spanish) for experience and study data.
- Card copy lives co-located inside each bilingual component under `src/components/bento/cards/` (a small `strings[lang]` object per card).
- Adjust the grid (column/row spans, gaps) in `src/components/bento/BentoGrid.astro`.
- Modify theme colors in `src/styles/globals.css`.

## 📱 Cards

`IntroCard`, `SkillsCard`, `CVCard`, `AvailableCard`, `ProjectsCard`, `AboutCard`, `GoalsCard`, `ExperienceCard`, `QuoteCard`, `StudyCard`, `ContactsCard` — each is a single component rendered for both languages.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- Email: [xexubonete@gmail.com](mailto:xexubonete@gmail.com)
