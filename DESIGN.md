# DESIGN.md — art direction for xexubonete.dev

> Working name: **Drafting sheet**. The portfolio of a backend engineer who
> cares about clean architecture, typeset like an engineering drawing: a
> warm paper, one orange ink, hairline rules, mono annotations, and headlines
> big enough to read from across the room.

This document is the source of truth for the look. The CSS is split so the
Astro build and the static mockups load the very same files:

| File                                                   | Holds                                                                    |
| ------------------------------------------------------ | ------------------------------------------------------------------------ |
| [`src/styles/tokens.css`](src/styles/tokens.css)       | Every token, light / dark / system blocks. Plain CSS.                    |
| [`src/styles/fonts.css`](src/styles/fonts.css)         | `@font-face` for the four self-hosted families + metric fallbacks.       |
| [`src/styles/base.css`](src/styles/base.css)           | Element defaults: margins, focus ring, selection, headings. Plain CSS.   |
| [`src/styles/recipes.css`](src/styles/recipes.css)     | Component recipes **and** every section layout. Plain CSS.               |
| [`src/styles/cv.css`](src/styles/cv.css)               | The A4 CV sheet (always paper, print-safe).                              |
| [`src/styles/globals.css`](src/styles/globals.css)     | Tailwind entry: imports the above, maps tokens into `@theme`, `dark` variant. |
| [`design/*.html`](design/)                             | High-fidelity mockups with the real content: `home`, `work`, `cv`, `404`. |

To review the mockups, serve the repository root (any static server, e.g.
`python3 -m http.server 8787`) and open `/design/home.html?theme=light` or
`?theme=dark`; the floating sun/moon button flips the theme in place. They
load `src/styles/*.css` directly and the fonts from `public/fonts/`, so what
you see is exactly what the build ships.

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

| Token                            | Light (paper)       | Dark (night)        | Role                                                            |
| -------------------------------- | ------------------- | ------------------- | --------------------------------------------------------------- |
| `--color-bg`                     | `#F3EEE4`           | `#0C1117`           | Page.                                                           |
| `--color-surface`                | `#FBF8F2`           | `#141B24`           | A sheet laid on the page (CV preview, panels).                  |
| `--color-surface-2`              | `#E8E1D2`           | `#1C2531`           | Recessed wells: tags, code, hover washes.                       |
| `--color-text`                   | `#17130E`           | `#EDE7DA`           | Ink. Warm, never pure black or white.                           |
| `--color-text-muted`             | `#5E5649`           | `#A3ABB7`           | Secondary text. 6.3:1 / 8.2:1 on bg.                            |
| `--color-border`                 | `#D2C9B6`           | `#283240`           | Hairline rules (decorative).                                    |
| `--color-border-strong`          | = text              | = text              | Structural rules: section tops, the tape, the title block.      |
| `--color-accent`                 | `#A8480A`           | `#FF8E3C`           | Orange **ink**: links, numbers, emphasis. AA on bg (5.0 / 8.3). |
| `--color-accent-contrast`        | `#FBF8F2`           | `#17130E`           | Text on an accent fill.                                         |
| `--color-accent-vivid`           | `#F26B1D`           | `#FF8E3C`           | Orange **paint**: large fills only (quote band, marks).         |
| `--color-accent-vivid-contrast`  | `#17130E`           | `#17130E`           | Text on a vivid fill (6.1 / 8.1).                               |
| `--color-focus`                  | `#1D4ED8`           | `#8DB8FF`           | Blueprint blue, focus ring only. 5.8 / 9.4 on bg.               |
| `--color-success`                | `#1D7A3E`           | `#5BD37D`           | The "Available" beacon. 4.65 / 10 on bg.                        |
| `--color-grid`                   | ink @ 7%            | paper @ 6%          | The drafting grid behind the hero.                              |

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

| Role                | Family                                  | File                                       | Why                                                                                                   |
| ------------------- | --------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `--font-display`    | **Bricolage Grotesque** (variable)      | `bricolage-grotesque-latin.woff2` (128 KB) | Optical size + width axes: condensed and heavy at poster size, with ink traps that give it character. |
| `--font-body`       | **Instrument Sans** (variable)          | `instrument-sans-latin.woff2` (56 KB)      | Neutral, slightly narrow, excellent at 16–18 px; does not fight the display face.                     |
| `--font-accent`     | **Instrument Serif** italic             | `instrument-serif-italic-latin.woff2` (15 KB) | One or two emphasised words per section (`go *well*`). The editorial counterpoint.                 |
| `--font-mono`       | **JetBrains Mono** (variable)           | `jetbrains-mono-latin.woff2` (40 KB)       | The .NET developer's font (Rider). Every label, date, number and tag.                                 |

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

| Token         | 390 px   | 1280 px  | Use                                        |
| ------------- | -------- | -------- | ------------------------------------------ |
| `--text-xs`   | 11.5 px  | 12.5 px  | Eyebrows, tags, title-block fields.        |
| `--text-sm`   | 13.5 px  | 14.4 px  | Metadata, captions, buttons.               |
| `--text-base` | 16 px    | 18 px    | Body.                                      |
| `--text-lg`   | 18 px    | 20.8 px  | Lead paragraph lines, list items.          |
| `--text-xl`   | 20.8 px  | 25.6 px  | Hero lead, role titles.                    |
| `--text-2xl`  | 25.6 px  | 33.6 px  | Company names, project names.              |
| `--text-3xl`  | 32 px    | 46 px    | Section titles.                            |
| `--text-4xl`  | 40 px    | 64 px    | Page titles (`Work experience`).           |
| `--text-5xl`  | 52 px    | 96 px    | The quote, contact links.                  |
| `--text-hero` | 82 px    | 216 px   | The name.                                  |

Line heights: `0.86` on the hero, `0.92` on display, `1.1` on headings,
`1.5` on body, `1.65` on the long intro paragraph. Tracking tightens as size
grows (`-0.04em` hero, `-0.02em` headings, `0` body) and opens on mono caps
(`0.12em`).

Measure: long prose sits in `--content-narrow` (44 rem, ~70 characters). The
intro paragraph is the one place we break this: its first sentence is set as a
lead at `--text-xl`, the rest flows in two columns on desktop.

## 4. Spacing and layout

4 px base. `--space-1 … --space-8` are fixed (4 → 64 px); `--space-9 … --space-12`
are the **section rhythm** and are fluid (64 → 224 px) so vertical breathing
grows with the type. The page column is `--content-max` (80 rem) with a fluid
`--gutter` (16 → 40 px); 16 px is the minimum at any width and nothing scrolls
horizontally.

The whole site is one 12-column grid on desktop that collapses to a single
column under 48 rem (`768px`) with a 2-column intermediate for lists where it
helps. Columns are separated by **rules, not cards**. A section always opens
with the same header: a 1 px ink rule, a mono number in orange, the title.

```
───────────────────────────────────────────────────────────
01 — Stack                                            [5 groups]
```

### Shape and depth

Small radii (4 / 8 / 16 px) — this is paper, not pebbles. Shadows are warm
and only on things that are physically "on top" of the page: the CV sheet, the
raised buttons on hover, the 404 panel. Flat everywhere else.

## 5. Layout direction, section by section

### Header

A 56 px bar, not sticky-blurred-glass: a hairline underneath and the page
behind. Left: `JB` monogram in display + the mono `dotnet developer` label.
Right: `GitHub ↗`, `LinkedIn ↗`, a two-letter language switch `EN · ES`
(mono, the active one in ink, the other muted) and a theme toggle drawn as a
small sun/moon glyph. Everything is text; no icon library.

### `/en` — Home

00 · **Hero** (`design/home.html#hero`). Full-height on desktop. Behind it,
the drafting grid fading downwards. Eyebrow `welcome` in mono. The name set as
two stacked lines of `--text-hero` (`Jesús` / `Bonete`) in condensed Bricolage,
the surname's dot of the `é` and the final line in orange. The laptop memoji sits
in the right third, large, overlapping the baseline of the second line, cropped
by a circle with registration marks at its corners. Under the name, a
**title block** — four mono fields in a 4-up row with hairlines, like the box in
the corner of a drawing:

```
ROLE                     BASED                EXPERIENCE         STATUS
Senior .NET Developer    Elda, Alicante, ES   +4 yr              ● Available
```

Then the intro paragraph: first sentence as lead, the rest in two columns.

00b · **Tape**. A single line of the stack's headline items (`C#  .NET 10  gRPC
CQRS  Clean Architecture  Azure  MSSQL  PostgreSQL …`) in display at
`--text-2xl`, scrolling slowly between two ink rules. Pauses on hover; static
and wrapped under reduced motion.

01 · **Stack**. The five groups as a definition list: label column (mono,
muted, sticky on desktop) and the items as `.tag`s on the right. No emoji
prefixes: the group number does that job. Dense on purpose; the tags are the
texture of the page.

02 · **Experience**. Each company is a row: years in mono on the left
(`2026`), company at `--text-2xl` with an arrow link, the position and the
date range beneath, the description muted. Rows separated by hairlines. The
latest row carries the `● Available` beacon and the Cafler mark. Ends with
`View all →` to `/en/work`.

03 · **Projects**. Four repos as full-width rows, the name at `--text-2xl` in
display, the arrow travelling on hover, the row washing `--color-surface-2`.
`my-portfolio` gets the green live dot and the mono note `you are here`.

04 · **Goals**. The intro sentence, then the four goals in a 2×2 grid divided by
hairlines (4 columns ≥ 64 rem). Each cell: a mono index `01`, the label in
display at `--text-xl`, the text at `--text-sm`.

05 · **Quote**. The visual climax: a full-bleed band in `--color-accent-vivid`
with the quote at `--text-5xl` in display, the words `go well` in Instrument
Serif italic, the attribution in mono at the bottom-right of the band.

06 · **Profile**. Three columns separated by rules — _About me_ (the two
paragraphs, the emoji may stay here as inline characters: they are personality,
not icons), _Study_ (the institutions as arrow links in a list) and _Languages
+ Soft skills_ (two mono-labelled lists). Memoji-free.

07 · **CV**. Left: eyebrow, title, the caption and a `.btn--accent` `View &
download CV`. Right: the A4 sheet, scaled, slightly rotated (−1.5°, 0° on
hover), with `--shadow-sheet`. On mobile the sheet comes first and is cropped
to its top third.

08 · **Contact**. Four links as giant lines at `--text-5xl` (`Call me`,
`Email me`, `LinkedIn`, `GitHub`) each with an arrow; the chillin' memoji
sits to the right at the bottom, cut by the footer rule.

**Footer** — the title block, full width: `© 2026 Jesús Bonete`, `Built with
Astro`, the GitHub and LinkedIn links, `EN · ES`. Mono, hairline above.

### `/en/work` — Work experience

Page title at `--text-4xl` with the live years. Each company group is a
two-column row: the company name sticky on the left (display, `--text-2xl`,
arrow link, location in mono beneath), the roles stacked on the right, each
with its date range in mono, position in display at `--text-xl`, description,
responsibilities as a plain list with orange `▹` markers, and the stack as a
run of `.tag`s. Groups separated by `--color-border-strong`.

### `/en/cv` and `/cv` — CV

The sheet is always **paper**, regardless of theme: it prints, and it is
embedded as a preview. The page around it follows the theme. The sheet keeps
its two-column structure (it fits A4 and the PDF generator), but is retyped:
name in Bricolage, section titles in mono caps with an orange rule, body in
Instrument Sans, the side column in ink (`--color-text`) with paper text
instead of the orange gradient, so the orange is reserved for titles and
markers. Chips become `.tag`s.

### `404`

The drafting grid, `404` at `--text-hero` in orange outline (`-webkit-text-stroke`),
the chillin' memoji, `Page not found` and a `.btn` home.

## 6. Motion

Motion is for **orientation**, never decoration. Every value reads a token so
`prefers-reduced-motion` collapses all of it to 0 ms in one place
(`tokens.css`), and anything that starts hidden must start visible when motion
is reduced or when JavaScript never runs.

| Where                | What                                                                              | Token                             |
| -------------------- | --------------------------------------------------------------------------------- | --------------------------------- |
| Page load            | Hero lines rise 20 px and fade in, staggered 80 ms; the memoji 120 ms later.      | `--duration-reveal`, `--ease-out` |
| Scroll               | Sections reveal once (`.reveal` + `.is-visible` from an IntersectionObserver).    | `--duration-reveal`               |
| Hover on links       | The arrow travels up-right 0.15 em; the colour turns orange.                      | `--duration-fast`                 |
| Hover on buttons     | 1 px lift and the ink/orange swap.                                                | `--duration-fast`                 |
| Theme switch         | Colours cross-fade; layout never moves. Opt-in via `html.theme-transition`.       | `--duration-base`, `--ease-in-out`|
| Tape                 | 40 s linear loop; pauses on hover; static and wrapped under reduced motion.       | —                                 |
| Beacon               | A 2.2 s pulse ring; off under reduced motion.                                     | —                                 |
| CV sheet             | −1.5° → 0° on hover.                                                              | `--duration-base`, `--ease-spring`|

Not allowed: parallax, cursor followers, scroll-jacking, auto-playing
anything louder than the tape, and animating `width`/`height`/`top`/`left`.

## 7. Accessibility

- Every text/background pair above is ≥ 4.5:1 (AA) in both themes; large
  display text on the vivid band is ≥ 6:1.
- Focus: one global `:focus-visible` style, a 2 px `--color-focus` ring with a
  3 px offset, so it reads on paper, on ink and on orange.
- Text stays readable at every width: minimum 16 px body on phones, a 16 px
  gutter, no horizontal scroll, the hero shrinks to 82 px and still fits
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
- Tailwind utilities: `bg-canvas`, `bg-surface`, `bg-surface-2`, `text-ink`,
  `text-muted`, `text-accent`, `border-line`, `border-line-strong`,
  `font-display`, `font-mono`, `font-accent`, `text-hero … text-xs`,
  `p-s1 … p-s12`, `max-w-content`, `max-w-narrow`, `rounded-s/m/l/pill`,
  `shadow-s/m/l/sheet`, `ease-out-soft`, `duration-*`.
- Recipes (`recipes.css`, Tailwind `components` layer): `.wrap`, `.display`,
  `.display-hero`, `.accent-word`, `.eyebrow`, `.section-head`, `.section-num`,
  `.section-title`, `.rule`, `.tag`, `.btn` (+ `--accent`, `--outline`,
  `--ghost`), `.link-arrow`, `.link`, `.beacon`, `.sheet`, `.marks`,
  `.grid-bg`, `.reveal`, `.tape`.
- Section layouts (same file): `.site-header` / `.brand` / `.site-nav` /
  `.lang-switch` / `.theme-toggle`, `.hero` / `.hero__name` / `.hero__portrait`
  / `.title-block` / `.hero__intro` / `.lead` / `.prose`, `.section`,
  `.stack`, `.exp`, `.projects` / `.project`, `.goals` / `.goal`,
  `.quote-band`, `.profile` / `.list-plain`, `.cv` / `.cv__sheet`, `.contact`,
  `.site-footer`, `.page-title` / `.work-group` / `.role`, and `cv.css` for
  the sheet. Every one of them is exercised in `design/*.html`: copy the
  markup from there, it is already semantic (`<dl>` title block, `<article>`
  rows, `<figure>` quote, `<address>`-able contact list).
- The CV preview embeds `/en/cv` in an iframe at its native 794 px and scales
  it with `--cv-scale = wrapper width / 794` (10-line script in
  `design/home.html`). The theme toggle swaps two inline SVG glyphs via
  `.icon-sun` / `.icon-moon`.
- The language switch is the `EN · ES` pill: `aria-current="true"` marks the
  active language; the footer repeats the other language as a plain link.
- The legacy shadcn aliases (`bg-background`, `text-primary`, …) are mapped
  onto the tokens so the old components still compile; delete the alias block
  in `globals.css` once nothing uses them.
- Arrows are inline SVG; the markup is in the mockups.
