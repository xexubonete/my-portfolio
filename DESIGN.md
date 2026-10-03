# DESIGN.md — art direction for xexubonete.dev

> Working name: **Capítulo**. The portfolio is a book: the opening of an
> adventure novel in which a backend engineer's career is told the way an old
> soldier would tell a campaign. There is a frontispiece, a title page, an
> index, six chapters and an appendix. Typography and prose carry everything.

This document is the source of truth for the look.

| File                                               | Holds                                                                             |
| -------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`src/styles/tokens.css`](src/styles/tokens.css)   | Every token: two inks, one paper, both themes. Plain CSS.                         |
| [`src/styles/fonts.css`](src/styles/fonts.css)     | `@font-face` for the four self-hosted files and their metric-matched fallbacks.   |
| [`src/styles/base.css`](src/styles/base.css)       | Element defaults: margins, focus ring, selection, headings.                       |
| [`src/styles/book.css`](src/styles/book.css)       | The book: leaves, pages, openings, marginalia, plates, the page turn, the candle. |
| [`src/styles/cv.css`](src/styles/cv.css)           | The A4 CV sheet (always paper, print-safe).                                       |
| [`src/styles/globals.css`](src/styles/globals.css) | Tailwind entry: imports the above and maps the tokens into `@theme`.              |
| [`src/i18n/content.ts`](src/i18n/content.ts)       | Every word of the book, in both languages, in one typed shape.                    |
| [`scripts/engrave.mjs`](scripts/engrave.mjs)       | Turns the memoji into the engraved plates and the favicon.                        |

---

## 1. Concept, and why it surprises

A developer portfolio is expected to be a dashboard: cards, tags, a grid, a
gradient. This one is a printed book, and it commits to that all the way
down.

| A portfolio usually has | This one has                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| A hero with a headshot  | A **frontispiece**: the memoji, engraved in hatched lines inside an oval, facing the title. |
| A headline              | A **title page** worded like a 17th-century printed account, set in two inks.               |
| A navbar of sections    | An **index** with dotted leaders and page numbers, and a running head.                      |
| Sections you scroll     | **Chapters** you turn to. One spread on screen at a time; the page really turns.            |
| Bullet points           | **Prose**, with a drop cap, and the dates and job titles moved out to the **margin**.       |
| Tag clouds              | **Inventories**: the stack listed the way a quartermaster lists powder and shot.            |
| A dark mode             | **The same book by candlelight**: a warm flame behind the spine, and a light that wavers.   |
| A "Download CV" button  | An **appendix** with the CV in facsimile, framed like a plate, and a cartouche to open it.  |
| A footer                | A **colophon**.                                                                             |

It should be recognisable from a thumbnail, and it should start an argument:
some will say a portfolio must be scannable in five seconds. For them the CV is
one click away from every page, and the book says so itself ("it is what one
sends to people with no time for chapters, and they are right not to have it").

What it is **not**: a parchment texture, a skeuomorphic leather binding, a
"vintage" theme. There are no fake stains and no page curls. The paper is a
flat colour; the bookishness comes from typographic discipline.

## 2. The structure of the book

The home page (`/es/`, `/en/`) is one document holding nine **leaves**. A leaf
is an open spread: a left page (_verso_) and a right page (_recto_).

| Leaf    | Verso                                    | Recto                                         |
| ------- | ---------------------------------------- | --------------------------------------------- |
| `cover` | Frontispiece: the author, engraved       | Title page, status, the two calls, imprint    |
| `index` | Epigraph (the Robert C. Martin line)     | Index of chapters, appendix, and volume II    |
| `i`     | Chapter opening, first paragraph, margin | The rest of the introduction                  |
| `ii`    | Opening, the first years, margin notes   | The later campaigns, link to the full record  |
| `iii`   | Opening, frameworks and libraries        | Patterns, databases, DevOps, tools            |
| `iv`    | Opening, the intent                      | The four things to master, as numbered items  |
| `v`     | Opening, off duty, studies               | Languages, soft skills, repositories          |
| `vi`    | Opening, the contact ledger              | Tailpiece engraving, CV cartouche, colophon   |
| `cv`    | The CV in facsimile, as a plate          | Appendix opening, "open the sheet", both PDFs |

`/es/work` and `/en/work` are **volume II**, "The campaigns, at length": one
leaf per company, newest first, with every role, task and tool. `/cv` and
`/en/cv` are the CV sheet. The 404 is a spread with a page torn out.

Navigation answers the captain's objection to long scrolling:

- **Only one leaf is on show.** Which one is decided in CSS from the URL
  fragment (`.leaf:target`, and the cover when nothing is targeted), so it
  works with JavaScript off and every leaf has an address (`/en/#iii`).
- **Each page foot** carries the folio and, in the outer corner, a pointing
  hand to the previous or next leaf.
- **The running head** (site header) is on every page: name (back to the
  cover), the index, the CV, the language switch, the theme.
- **The arrow keys** turn pages.
- At 1440×800 every spread fits the window without scrolling. On a phone a
  leaf is a single column of roughly one and a half screens.

The language switch keeps the open leaf: leaf ids are the same in both
languages.

## 3. Typography

Two families, four files, all self-hosted and OFL-licensed.

| Role                    | Face                              | Notes                                                                                 |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------------------------- |
| Text, notes, small caps | **EB Garamond** (roman, italic)   | Variable weight. True small capitals, superiors, fleurons and the printer's fist (☞). |
| Titles, drop caps       | **IM Fell French Canon** (r., i.) | A digitisation of the 17th-century Fell types, ink spread included. Used large only.  |

- **One text size**, as in a book (`--text-base`, 18–21px), set at
  `--leading-text: 1.42`. On a spread it also answers to the window height.
- **Vertical rhythm is counted in lines**: `--line` is one line of text and
  spacing is a multiple of it.
- **Text is justified and hyphenated** (`hyphens: auto`, per language).
  Paragraphs follow one another with a 1.5em indent and no gap.
- **Chapter openings**: ordinal in letterspaced red small caps ("Chapter the
  Second"), title in Fell italic, then the _argument_, the one-sentence
  summary old novels put under a chapter title ("In which it is told how…"),
  and a short red rule.
- **First paragraph**: a three-line red initial in Fell, and the first words
  in small capitals.
- **Small capitals are real** (`font-variant-caps`, from the font's `smcp` /
  `c2sc`), always letterspaced (`--tracking-caps`).
- **Figures are lining** in text, because dates and versions (`01/2026`,
  `.NET 10`) must not be misread; folios use old-style figures.
- **No monospace anywhere.** Technology names are set as text.
- **Ornaments are type, not images**: ❦ and ❧ from EB Garamond, ☜ ☞ for the
  page turns, ¶ for list items.

The source files in `public/fonts/` are Latin subsets keeping only the
OpenType features the design uses (`kern liga calt locl mark mkmk ccmp smcp
c2sc onum lnum sups`). The build subsets them again to the characters the
pages actually contain.

Licenses: EB Garamond and IM Fell French Canon are both under the SIL Open
Font License 1.1.

## 4. Color

Two inks on one paper: a book printed in black and red, the way title pages
and rubrics were.

| Token                 | Day (printed page) | Candlelight | Role                                            |
| --------------------- | ------------------ | ----------- | ----------------------------------------------- |
| `--color-bg`          | `#E6DCC6`          | `#0B0806`   | The table the book lies on.                     |
| `--color-surface`     | `#F5EFE2`          | `#19130C`   | The paper.                                      |
| `--color-text`        | `#1C1712`          | `#E9DCC1`   | The black ink. Warm, never pure.                |
| `--color-text-muted`  | `#584E42`          | `#B6A686`   | Marginalia, arguments, folios. 7.1 / 7.6 : 1.   |
| `--color-border`      | `#CDC1A8`          | `#3B2F1F`   | Hairline rules.                                 |
| `--color-accent`      | `#9A2318`          | `#F0955C`   | The red ink; by candlelight, ember. 7.2 / 7.7.  |
| `--color-focus`       | `#1D4ED8`          | `#9CC2FF`   | Focus ring only.                                |
| `--color-spine`       | brown @ 16%        | black @ 30% | Shadow where the pages curve into the spine.    |
| `--color-glow`        | transparent        | amber @ 17% | The candle.                                     |
| `--color-plate-paper` | transparent        | `#D9C8A4`   | Lit paper behind a framed engraving, dark only. |

Rules:

- Red is for what a rubricator would have touched: initials, chapter
  ordinals, numerals, ornaments, labels, link underlines, the primary call.
  Never for running text.
- **Light reads like a printed page.** Flat paper, a soft shadow at the spine,
  the book resting on a slightly darker table.
- **Dark reads like the same book by candlelight.** Not an inverted palette:
  a brown-black room, the paper lit from a flame standing behind the spine and
  falling off towards the corners. The light wavers slowly (`candle`
  keyframes, 7s, never below 80%). The frontispiece stays a _positive_ print,
  dark ink on an oval of lit paper, instead of becoming its own negative.
- The first load follows the visitor's system theme; only an explicit toggle
  choice is stored. The toggle is a candle by day and a sun by candlelight.

## 5. Layout

- **The spread** (`min-width: 70rem`): two pages side by side, margins as a
  book has them, narrow at the spine and wide at the fore-edge. The text block
  sits in the same place on every page. Pages composed on the whole sheet
  (plates, the title page) opt out with `page--full`.
- **Marginalia**: dates, job titles and the "sheet" of facts live in the
  fore-edge margin, level with the paragraph they annotate (`.passage` +
  `.note`), right-aligned on a verso, left-aligned on a recto. In a single
  column a note follows its paragraph, small, ruled off in red.
- **Single column** (below 70rem): the verso, then the recto, on one sheet,
  with one page foot holding both turns.
- **The cartouche** is the only button a book can have: small caps inside a
  double frame. The red one is the primary call. Everything else is a text
  link or a pointing hand.
- **Plates**: the engravings are produced by `scripts/engrave.mjs` from the
  memoji. Tone is carried by the thickness of hatched lines, shadows get a
  second cut across the first, contours are drawn where the light breaks. The
  files are ink on transparency and are applied as CSS masks, so they print in
  the ink of the theme in force.
- **The CV sheet** uses the same types and inks, with none of the literature:
  it is the appendix, and prints to one A4 page.

## 6. Motion

CSS-first, and all of it respects `prefers-reduced-motion`.

- **The page turn.** Changing leaf is wrapped in a view transition. On a
  spread the two pages are captured separately and a real turn is played in
  two halves: the page being left lifts and closes on the spine, then the page
  arriving opens from it on the other side (`perspective` + `rotateY`, 340ms
  each, the page darkening as it stands on edge). In a single column it is a
  short cross-fade. Without view-transition support the leaf simply changes.
- **Lighting the candle.** Toggling the theme spreads the new light in a
  circle from the button.
- **The flame** wavers in the dark theme.
- Hover: the pointing hands lean the way they point; cartouches fill.

The only JavaScript is inline and small: the theme (before paint, and the
toggle), the page turn / arrow keys / language links keeping the open leaf,
the live years-of-experience figure, the copyright year and the scale of the
CV facsimile. With JavaScript off, the book still opens, turns and reads.

## 7. Voice

The texts are written for this design, in the manner of Arturo Pérez-Reverte
and in our own words: none of it quotes his books.

- **Spanish**: dry, exact, ironic, a little melancholic, with the cadence of an
  old soldier. Short sentences; now and then a long one that unfolds. Precise
  nouns, no padding. _"Solo quiere decir solo."_ _"Trabajo sin gloria, de ese
  que enseña más que la gloria."_
- **English**: an equivalent voice, not a translation. _"It was no Trafalgar,
  but one has to start somewhere."_
- A third-person narrator tells the engineer's campaigns; the reader is
  addressed as _usted_.
- Chapter titles follow the old formula (_De las campañas_, _Of the arms_),
  and so do the arguments (_Donde se cuenta…_, _In which it is told…_).
- **The facts underneath are exactly the captain's**: companies, dates, roles,
  tasks, tools, studies, hobbies and contact details come from
  `src/lib/constants*.ts` and are never embellished. The margin notes and
  volume II render that data directly.

## 8. Accessibility

- Contrast: text 15:1, muted text and red ink above 7:1 on the paper, in both
  themes.
- One visible focus ring for everything (`:focus-visible`, blue, offset).
- Landmarks: `header`, `main`, `nav` (running head and index), `footer`; each
  leaf is a labelled `section`. Hidden leaves are `display: none`, so they are
  out of the tab order and the accessibility tree until opened; opening one
  moves focus to it.
- The engravings are `role="img"` with a description; ornaments are
  `aria-hidden`.
- Every link that leaves the site, plus the CV and its PDFs, opens in a new
  tab with `rel="noopener noreferrer"` and says so to screen readers.
- A skip link, `lang` on the document and on the epigraph, and no content that
  depends on hover.
