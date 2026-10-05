# DESIGN.md — art direction for xexubonete.dev

> Working name: **Drafting sheet**. The portfolio of a backend engineer who
> cares about clean architecture, typeset like an engineering drawing: a
> warm paper, one orange ink, hairline rules, mono annotations, and headlines
> big enough to read from across the room.

This document is the source of truth for the look. The CSS is split so the
Astro build and the static mockups load the very same files:

| File                                               | Holds                                                                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`src/styles/tokens.css`](src/styles/tokens.css)   | Every token, light / dark / system blocks. Plain CSS.                                               |
| [`src/styles/fonts.css`](src/styles/fonts.css)     | `@font-face` for the four self-hosted families + metric fallbacks.                                  |
| [`src/styles/base.css`](src/styles/base.css)       | Element defaults: margins, focus ring, selection, headings. Plain CSS.                              |
| [`src/styles/recipes.css`](src/styles/recipes.css) | Component recipes **and** every section layout. Plain CSS.                                          |
| [`src/styles/cv.css`](src/styles/cv.css)           | The A4 CV sheet (always paper, print-safe).                                                         |
| [`src/styles/globals.css`](src/styles/globals.css) | Tailwind entry: imports the above, maps tokens into `@theme`, `dark` variant.                       |
| [`design/*.html`](design/)                         | High-fidelity mockups with the real content: `home`, `work`, `cv`, `404`, each also as `*-es.html`. |
| [`design/build.mjs`](design/build.mjs)             | Renders the mockups from `design/content.mjs` (which imports the real `src/lib/constants*.ts`).     |

To review the mockups, serve the repository root (any static server, e.g.
`python3 -m http.server 8787`) and open `/design/home.html`. With no
`?theme` parameter the page follows the OS colour scheme, exactly like the
real site does for a visitor with no stored choice; `?theme=light|dark`
forces one, and the sun/moon button in the header flips it in place. The
`EN · ES` switch (and the language link in the footer) goes to the Spanish
version of the same page, rendered from the real Spanish content. The
mockups load `src/styles/*.css` directly and the fonts from `public/fonts/`,
so what you see is exactly what the build ships. After editing a template or
a string, run `node design/build.mjs` to re-render all eight files.

Links: every link that leaves the site, plus the CV (view/download), opens in
a new tab (`target="_blank" rel="noopener noreferrer"`). Internal navigation
(the work page, the language switch, "back home") stays in the same tab.

---

## 1. Point of view

The site has one argument, taken from its own content: _"The only way to go
fast, is to go well."_ Everything on the page should feel **built with care and
read fast**. That gives us a concrete visual language:

| Content says                       | The design does                                                                           |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| Clean Architecture, layers, CQRS   | A strict grid, numbered sections (`01 — Stack`), one rule per boundary, nothing floating. |
| Backend, contracts, gRPC, APIs     | Mono annotations for every piece of metadata: dates, labels, counts, status.              |
| "Go well": craft                   | Typography does the work. No card chrome, no gradients, no glassmorphism, no emoji icons. |
| "Go fast": speed                   | Four self-hosted font files, zero runtime UI libraries, motion that is CSS-only.          |
| The orange hoodie memoji, the logo | One ink: orange. Kept from the current brand, pushed from "button colour" to "signature". |

What it is **not**: a bento grid, a dark "hacker" terminal, a Linear/Vercel
clone, a shadcn default. It should be recognisable in a thumbnail.

## 2. Color

Two palettes that each stand on their own. Light is _paper_, dark is _night
shift_: a blue-black, the complement of the orange, so the accent glows at
night instead of just sitting there.

| Token                           | Light (paper) | Dark (night) | Role                                                            |
| ------------------------------- | ------------- | ------------ | --------------------------------------------------------------- |
| `--color-bg`                    | `#F3EEE4`     | `#0C1117`    | Page.                                                           |
| `--color-surface`               | `#FBF8F2`     | `#141B24`    | A sheet laid on the page (CV preview, panels).                  |
| `--color-surface-2`             | `#E8E1D2`     | `#1C2531`    | Recessed wells: tags, code, hover washes.                       |
| `--color-text`                  | `#17130E`     | `#EDE7DA`    | Ink. Warm, never pure black or white.                           |
| `--color-text-muted`            | `#5E5649`     | `#A3ABB7`    | Secondary text. 6.3:1 / 8.2:1 on bg.                            |
| `--color-border`                | `#D2C9B6`     | `#283240`    | Hairline rules (decorative).                                    |
| `--color-border-strong`         | = text        | = text       | Structural rules: section tops, the tape, the title block.      |
| `--color-accent`                | `#A8480A`     | `#FF8E3C`    | Orange **ink**: links, numbers, emphasis. AA on bg (5.0 / 8.3). |
| `--color-accent-contrast`       | `#FBF8F2`     | `#17130E`    | Text on an accent fill.                                         |
| `--color-accent-vivid`          | `#F26B1D`     | `#FF8E3C`    | Orange **paint**: large fills only (quote band, marks).         |
| `--color-accent-vivid-contrast` | `#17130E`     | `#17130E`    | Text on a vivid fill (6.1 / 8.1).                               |
| `--color-focus`                 | `#1D4ED8`     | `#8DB8FF`    | Blueprint blue, focus ring only. 5.8 / 9.4 on bg.               |
| `--color-success`               | `#1D7A3E`     | `#5BD37D`    | The "Available" beacon. 4.65 / 10 on bg.                        |
| `--color-grid`                  | ink @ 7%      | paper @ 6%   | The drafting grid behind the hero.                              |

Rules:

- Orange is **ink** at text size and **paint** at poster size. Never set small
  text in `--color-accent-vivid` on the page background (2.5:1 in light).
- Blue appears **only** as the focus ring. It is not a second accent.
- Green appears **only** on the availability beacon and the live-site dot.
- Every contrast above was computed, not eyeballed; re-run the numbers if a
  value changes (see "Accessibility").

## 3. Typography

Four self-hosted families, all under the SIL Open Font License, Latin subsets
in WOFF2 (~240 KB total, `font-display: swap`, metric-matched fallbacks so the
swap does not shift layout).

| Role             | Family                             | File                                          | Why                                                                                                   |
| ---------------- | ---------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--font-display` | **Bricolage Grotesque** (variable) | `bricolage-grotesque-latin.woff2` (128 KB)    | Optical size + width axes: condensed and heavy at poster size, with ink traps that give it character. |
| `--font-body`    | **Instrument Sans** (variable)     | `instrument-sans-latin.woff2` (56 KB)         | Neutral, slightly narrow, excellent at 16–18 px; does not fight the display face.                     |
| `--font-accent`  | **Instrument Serif** italic        | `instrument-serif-italic-latin.woff2` (15 KB) | One or two emphasised words per section (`go *well*`). The editorial counterpoint.                    |
| `--font-mono`    | **JetBrains Mono** (variable)      | `jetbrains-mono-latin.woff2` (40 KB)          | The .NET developer's font (Rider). Every label, date, number and tag.                                 |

Licenses (all SIL OFL 1.1, which permits self-hosting, subsetting and bundling
with this site):

- Bricolage Grotesque — © 2022 The Bricolage Grotesque Project Authors, Mathieu Triay. https://github.com/ateliertriay/bricolage
- Instrument Sans — © 2022 The Instrument Sans Project Authors, Rodrigo Fuenzalida. https://github.com/Instrument/instrument-sans
- Instrument Serif — © 2022 The Instrument Serif Project Authors, Rodrigo Fuenzalida. https://github.com/Instrument/instrument-serif
- JetBrains Mono — © 2020 The JetBrains Mono Project Authors. https://github.com/JetBrains/JetBrainsMono

The Latin subset covers English and Spanish (`á é í ó ú ñ ¿ ¡ —`). It does
**not** include `→` / `↗`: arrows are inline SVG (`.link-arrow .arrow`), never
characters.

### Scale

Fluid, `clamp()`-based, with the big sizes growing far more than the small
ones so the desktop reads as a poster and the phone stays legible:

| Token         | 390 px  | 1280 px | Use                                               |
| ------------- | ------- | ------- | ------------------------------------------------- |
| `--text-xs`   | 11.5 px | 12.5 px | Eyebrows, tags, title-block fields.               |
| `--text-sm`   | 13.5 px | 14.4 px | Intro paragraphs on the sheet, captions, buttons. |
| `--text-base` | 16 px   | 18 px   | Body; the intro paragraphs on phones.             |
| `--text-lg`   | 18 px   | 20.8 px | Company and project names, the tape.              |
| `--text-xl`   | 20.8 px | 25.6 px | Hero lead, column titles, role titles.            |
| `--text-2xl`  | 25.6 px | 33.6 px | Reserved; the sheet uses `xl` and below.          |
| `--text-3xl`  | 32 px   | 46 px   | Contact links, the company on `/work`.            |
| `--text-4xl`  | 40 px   | 64 px   | Page titles, the quote.                           |
| `--text-5xl`  | 48 px   | 80 px   | Reserved for posters; unused on the home.         |
| `--text-hero` | 68 px   | 136 px  | The name (60 px floor on a 320 px screen).        |

Line heights: `0.86` on the hero, `0.92` on display, `1.1` on headings,
`1.5` on body, `1.65` on the long intro paragraph. Tracking tightens as size
grows (`-0.04em` hero, `-0.02em` headings, `0` body) and opens on mono caps
(`0.12em`).

Measure: long prose sits in `--content-narrow` (44 rem, ~70 characters). The
intro is the one place we break this: its first sentence is set as a lead at
`--text-xl`, and the two paragraphs sit beside it as two more columns on the
desktop sheet (at `--text-sm`; `--text-base` on phones).

## 4. Spacing and layout

4 px base. `--space-1 … --space-8` are fixed (4 → 64 px); `--space-9 … --space-12`
are the **section rhythm** and are fluid but deliberately tight (40 → 128 px).
The page column is `--content-max` (80 rem) with a fluid `--gutter`
(16 → 40 px); 16 px is the minimum at any width and nothing scrolls
horizontally.

### The sheet

The home page is **not** a scroll of full-width sections: it is composed like
one drawing sheet. After the hero come two **bands** of three columns each,
divided by hairlines, then the quote strip and the contact band. Each column
carries its own compact head (`01 Experience`), so the page reads across as
much as down. Measured at 1440 × 900 the whole home is ~2.5 viewports tall
(the previous bento was 2.0, the first drafting-sheet cut was 7.4); on a
390 px phone it is ~5 viewports.

```
┌────────────────────────────────────────────────────────────┐
│ HERO   Jesús / Bonete   ○ memoji   │ title block │ intro ×3 │  ≈ 560
├────────────────────────────────────────────────────────────┤
│ tape (one thin line of the stack)                          │  ≈ 44
├──────────────┬──────────────────┬──────────────────────────┤
│ CV sheet     │ 01 Experience    │ 02 Stack                 │  ≈ 540
│ + download   │ 3 rows · view all│ 5 groups of tags         │
├──────────────┼──────────────────┼──────────────────────────┤
│ 03 Projects  │ 04 Goals (2×2)   │ 05 Profile (chips)       │  ≈ 430
├──────────────┴──────────────────┴──────────────────────────┤
│ “The only way to go fast, is to go well.”  (orange strip)  │  ≈ 150
├─────────────────────────────────────────────┬──────────────┤
│ 06 Contact   Call me · Email me · LinkedIn · GitHub │ memoji │  ≈ 260
└─────────────────────────────────────────────┴──────────────┘
```

Breakpoints: under 48 rem everything is one column in this order: hero, tape,
**CV** (a compact ticket: thumbnail + caption + button), experience, stack,
projects, goals, profile, quote, contact. From 48 rem each band is two
columns with the third column spanning a row beneath. From 64 rem the full
three-column sheet (`3fr 4fr 5fr` for the first band, `3fr 5fr 4fr` for the
second).

Why the CV sits first in the first band: a visitor already has LinkedIn; what
the portfolio adds is context and the downloadable CV, so both come right
after the intro. On desktop the sheet's top edge is visible at the fold.

### Shape and depth

Small radii (4 / 8 / 16 px) — this is paper, not pebbles. Shadows are warm
and only on things that are physically "on top" of the page: the CV sheet, the
raised buttons on hover. Flat everywhere else.

## 5. Layout direction, section by section

### Header

A 52 px bar: a hairline underneath and the page behind, blurred. Left: the
brand is the mono label `DOTNET DEVELOPER` in ink with a small orange square
before it (no monogram). Right: `GitHub ↗`, `LinkedIn ↗` (hidden under 48 rem),
the `EN · ES` pill (mono, the active one on an ink pill) and the round
sun/moon toggle. Everything is vertically centred on one line.

### `/en` — Home

**Hero** (`design/home.html#hero`). Compact, not full-height. Behind it the
drafting grid fading downwards. Left: eyebrow `welcome`, then the name as two
stacked lines of `--text-hero` (60 → 136 px) in condensed Bricolage, `Bonete`
in orange paint. Right, in its own grid column: the laptop memoji cropped by a
circle with registration marks, sized to the two lines of the name
(5.5 → 13 rem). The two are grid items, so they never overlap at any width.
Under both, the full-width **title block**: four mono fields with hairlines
(`ROLE · BASED · EXPERIENCE · STATUS ● Available`). Then the intro as three
columns on desktop: the lead sentence in display type, and the two paragraphs
at `--text-sm`.

**Tape.** One thin line (`--text-lg`) of the stack's headline items scrolling
slowly between two ink rules. Pauses on hover; static and wrapped under
reduced motion.

**Band 1 — CV | 01 Experience | 02 Stack.**

- **CV** (3 cols). Eyebrow `A4 · PDF · EN / ES`, title `CV`, the A4 sheet
  (the real `/en/cv` in an iframe, scaled, −1.5°, 0° on hover, `--shadow-sheet`),
  the caption and the `.btn--accent` `View & download CV`. On phones it is a
  ticket: a 7 rem thumbnail of the sheet on the left, caption and button on the
  right.
- **01 Experience** (4 cols). One row per company: the end year in the mono
  margin, company in display `--text-lg` with the arrow, position (`· 3 roles`
  when grouped), dates and city in mono, one line of description. The latest
  row carries the Cafler mark. `View more` (outline button) goes to `/en/work`.
- **02 Stack** (5 cols). Five groups, each a mono-numbered label and a run of
  `.tag`s. No emoji prefixes: the number does that job.

**Band 2 — 03 Projects | 04 Goals | 05 Profile.**

- **03 Projects** (3 cols). Four rows: index, repo name in display, arrow
  travelling on hover, the row washing `--color-surface-2`. `my-portfolio` gets
  the live dot and `you are here`. Then `All repositories ↗`.
- **04 Goals** (5 cols). The intro line and the four goals in a 2 × 2 grid of
  cells divided by hairlines: mono index, title in display `--text-base`, text
  at `--text-xs`.
- **05 Profile** (4 cols). _About me_ (two short paragraphs, the emoji stay as
  inline characters), then **chips** for _Study_ (arrow links with the date),
  _Languages_ (level in mono) and _Soft skills_ (check mark). Chips are
  body-type, bordered, no fill: a lighter texture than the mono tags of the
  stack.

**Quote.** A compact full-bleed strip in `--color-accent-vivid`: the quote at
`--text-4xl` with `go well` in Instrument Serif italic, the attribution in mono
at the bottom-right.

**06 Contact.** Four links in two columns: the label in display `--text-3xl`,
the detail in mono beneath, the arrow at the right spanning both lines. The
chillin' memoji sits in its own column at the right (hidden margins, no
negative offsets), so it never touches a rule, the links or the footer. On
phones it is centred under the links at 8 rem.

**Footer** — one mono strip: `© 2026 Jesús Bonete`, `Built with Astro`,
`GitHub · LinkedIn · ES`.

### `/es` — the same sheet in Spanish

`design/home-es.html` and the other `*-es.html` files are rendered from the
same templates with the Spanish strings (`src/lib/constants-es.ts` for
experience and studies; the card copy from the components). The layout is
identical; Spanish runs ~8 % longer, which the columns absorb (desktop home
2356 px vs 2283 px).

### `/en/work` — Work experience

Page title at `--text-4xl` with the live years in the serif italic. Each
company group is a two-column row: the company sticky on the left (display,
`--text-3xl`, arrow link, dates and city in mono beneath), the roles stacked
on the right, each with its date range in mono, position in display
`--text-xl`, description, responsibilities with orange `▹` markers, and the
stack as `.tag`s. Groups separated by `--color-border-strong`.

### `/en/cv` and `/cv` — CV

The sheet is always **paper**, regardless of theme: it prints, and it is
embedded as a preview. The page around it follows the theme. One A4 page,
one column of text: the name in Bricolage, the role and two lines of contact
details beside the portrait, then summary, technical skills, languages,
experience and education. A tinted panel holds the portrait and runs on as a
strip down the left edge; it carries no text, so a PDF text extractor has a
single column to read, and `pnpm cv:pdf` checks that it reads it in source
order. The paper carries the hero's drafting grid. Section titles run into a
hairline, body in Instrument Sans, dates in mono after each title, orange only
for the surname, company names, profile links, labels and markers. The sheet
uses static cuts of the three families (`public/fonts/cv/`) so the PDF embeds
plain TrueType. The toolbar has
`Download PDF` and `Back to site`.

### `404`

The drafting grid, `404` at `--text-hero` in orange paint, `Page not found`,
one line of copy, a `.btn` home, and the chillin' memoji in the right column.

## 6. Motion

Motion is for **orientation**, never decoration. Every value reads a token so
`prefers-reduced-motion` collapses all of it to 0 ms in one place
(`tokens.css`), and anything that starts hidden must start visible when motion
is reduced or when JavaScript never runs.

| Where            | What                                                                                                                              | Token                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Page load        | `.rise` elements in the hero rise 20 px and fade in, staggered 80 ms via `--reveal-delay`.                                        | `--duration-reveal`, `--ease-out`  |
| Scroll           | `[data-reveal]` sections get `.is-visible` once from an IntersectionObserver (12 % bottom margin); their `.reveal` children rise. | `--duration-reveal`                |
| Hover on links   | The arrow travels up-right 0.15 em; the colour turns orange.                                                                      | `--duration-fast`                  |
| Hover on buttons | 1 px lift and the ink/orange swap.                                                                                                | `--duration-fast`                  |
| Theme switch     | Colours cross-fade; layout never moves. Opt-in via `html.theme-transition`.                                                       | `--duration-base`, `--ease-in-out` |
| Tape             | 40 s linear loop; pauses on hover; static and wrapped under reduced motion.                                                       | —                                  |
| Chips and tags   | Border and text turn orange on hover; the arrow travels.                                                                          | `--duration-fast`                  |
| Beacon           | A 2.2 s pulse ring; off under reduced motion.                                                                                     | —                                  |
| CV sheet         | −1.5° → 0° on hover.                                                                                                              | `--duration-base`, `--ease-spring` |

Not allowed: parallax, cursor followers, scroll-jacking, auto-playing
anything louder than the tape, and animating `width`/`height`/`top`/`left`.

## 7. Accessibility

- Every text/background pair above is ≥ 4.5:1 (AA) in both themes; large
  display text on the vivid band is ≥ 6:1.
- Focus: one global `:focus-visible` style, a 2 px `--color-focus` ring with a
  3 px offset, so it reads on paper, on ink and on orange.
- Text stays readable at every width: minimum 16 px body on phones, a 16 px
  gutter, no horizontal scroll, the hero shrinks to 60 px and still fits
  `Bonete` on a 320 px screen.
- Hairlines are decorative; anything that must be perceived (section tops,
  the tape) uses `--color-border-strong` (= ink).
- Motion respects `prefers-reduced-motion` at the token level.
- Emoji are not used as icons. Where they survive (About me), they are inline
  characters inside a sentence.

To re-check contrast after changing a value:

```sh
node -e 'const L=h=>{const c=h.slice(1);const[r,g,b]=[0,2,4].map(i=>parseInt(c.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*r+.7152*g+.0722*b};const r=(a,b)=>{const[x,y]=[L(a),L(b)].sort((p,q)=>q-p);return((x+.05)/(y+.05)).toFixed(2)};console.log(r(process.argv[1],process.argv[2]))' '#A8480A' '#F3EEE4'
```

## 8. Handoff notes for the frontend lane

- Import only `src/styles/globals.css`; it pulls `tokens.css` and `fonts.css`.
- Set `data-theme="light|dark"` on `<html>` before first paint; leave it unset
  to follow the OS. Add `theme-transition` to `<html>` for the duration of a
  toggle if you want the cross-fade.
- Every outbound link and the CV link: `target="_blank" rel="noopener noreferrer"`.
- Tailwind utilities: `bg-canvas`, `bg-surface`, `bg-surface-2`, `text-ink`,
  `text-muted`, `text-accent`, `border-line`, `border-line-strong`,
  `font-display`, `font-mono`, `font-accent`, `text-hero … text-xs`,
  `p-s1 … p-s12`, `max-w-content`, `max-w-narrow`, `rounded-s/m/l/pill`,
  `shadow-s/m/l/sheet`, `ease-out-soft`, `duration-*`.
- Recipes (`recipes.css`, Tailwind `components` layer): `.wrap`, `.display`,
  `.display-hero`, `.accent-word`, `.eyebrow`, `.section-num`,
  `.section-title`, `.rule`, `.tag`, `.btn` (+ `--accent`, `--outline`,
  `--ghost`, `.btn__arrow`), `.link-arrow`, `.link`, `.beacon`, `.sheet`,
  `.marks`, `.grid-bg`, `.reveal`, `.tape`.
- Layout (same file): `.site-header` / `.brand` / `.site-nav` / `.lang-switch`
  / `.theme-toggle`; `.hero` / `.hero__top` / `.hero__name` / `.hero__portrait`
  / `.title-block` / `.hero__intro` / `.lead` / `.prose`; `.band` /
  `.band__grid` (+ `--second`) / `.col` / `.section-head` / `.col__foot`;
  `.cv-plate` / `.cv__sheet`; `.exp` / `.exp__row`; `.stack` / `.stack__group`;
  `.projects` / `.project`; `.goals__intro` / `.goals` / `.goal`; `.profile` /
  `.profile__title` / `.chips`; `.quote-band`; `.contact` / `.contact__links` /
  `.contact__label` / `.contact__aside`; `.site-footer`; `.page-title` /
  `.work-group` / `.role` / `.page-foot`; `.not-found*`; and `cv.css` for the
  sheet. Every one is exercised in `design/*.html`: copy the markup from
  there, it is already semantic (`<dl>` title block, `<article>` rows,
  `<figure>` quote, a list of links for contact). `design/build.mjs` shows
  how each block is generated from the data, which maps one-to-one onto the
  Astro components.
- The CV preview embeds `/en/cv` (or `/cv`) in an iframe at its native 794 px
  and scales it with `--cv-scale = wrapper width / 794` (10-line script in
  `design/home.html`). On phones the wrapper is a 7 rem thumbnail.
- The theme toggle swaps two inline SVG glyphs via `.icon-sun` / `.icon-moon`.
- The language switch is the `EN · ES` pill: `aria-current="true"` marks the
  active language and the other letter links to the same page in the other
  language; the footer repeats that link.
- The legacy shadcn aliases (`bg-background`, `text-primary`, …) are mapped
  onto the tokens so the old components still compile; delete the alias block
  in `globals.css` once nothing uses them.
- Arrows are inline SVG; the markup is in the mockups.
