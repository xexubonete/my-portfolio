# DESIGN.md — art direction for xexubonete.dev

> Working name: **Silencio**. A portfolio that speaks with almost nothing: an
> exhibition travelled sideways, one room per screen, one monumental word per
> room, one sentence on the wall. A white cube with the lights on, a cinema
> with the lights off.

This document is the source of truth for the look.

| File                                               | Holds                                                                         |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| [`src/styles/tokens.css`](src/styles/tokens.css)   | Every token, and everything that differs between the two themes.              |
| [`src/styles/fonts.css`](src/styles/fonts.css)     | `@font-face` for the one self-hosted family and its metric fallbacks.         |
| [`src/styles/base.css`](src/styles/base.css)       | Element defaults: margins, focus ring, selection.                             |
| [`src/styles/recipes.css`](src/styles/recipes.css) | The frame, the hall, the room, the word, and each room's body.                |
| [`src/styles/cv.css`](src/styles/cv.css)           | The A4 CV sheet (always paper, print-safe).                                   |
| [`src/styles/globals.css`](src/styles/globals.css) | Tailwind entry: imports the above, maps tokens into `@theme`, `dark` variant. |
| [`src/lib/monument.ts`](src/lib/monument.ts)       | Glyph widths of the display face, so a word spans its wall with no script.    |

---

## 1. Concept

A backend developer builds what nobody sees. The site takes that literally and
shows almost nothing: no cards, no icons, no hero image, no paragraphs. What is
left is scale and space.

- **An exhibition, not a page.** The site does not scroll down. It is a hall of
  rooms laid side by side, each exactly one screen, travelled sideways with the
  wheel, the arrow keys, a swipe, or the index on the floor.
- **One word per room.** `BONETE`, `CV`, `+4`, `.NET`, `IA`, `@`, a year. Set
  so large that it stops being text and becomes the object on show.
- **One sentence per room.** Short, dry and final. Everything else on the wall
  is a label: small, factual, the size of the card beside a painting.
- **One colour.** A single vermilion dot: it marks "available", marks the
  repository the visitor is standing in, and travels along the floor to show
  how far down the hall they are.
- **One typeface.** Archivo, in one variable file, used at its extremes.

Why it surprises: a developer portfolio is expected to be a long column of
sections. This one has no column. The first screen is a surname the width of
the wall, and the only way forward is sideways.

## 2. Two rooms, not one room in two colours

The themes are two art directions built on the same skeleton. Every difference
is a token in `tokens.css`, so no component asks which theme is in force.

|                 | Light: **the white cube**                  | Dark: **the cinema**                                |
| --------------- | ------------------------------------------ | --------------------------------------------------- |
| The word        | Black mass (weight 900): sculpture         | A hairline of light (weight 100) with a faint bloom |
| Where it stands | On the floor line, at the foot of the room | In the middle of the screen                         |
| The sentence    | Wall text: large, top left, in ink         | A subtitle: bottom centre, in 35 mm yellow          |
| Labels          | Sentence case, like a museum card          | Capitals, widely tracked, like credits              |
| The frame       | More wall above, a strip of floor below    | True-black masking above and below the screen       |
| The room        | Flat, even light                           | A pool of projector light fading to the edges       |
| The switch      | "Lights off"                               | "Lights on"                                         |

The first load follows the system preference; only an explicit use of the
light switch is stored (`localStorage.theme`).

### Color

| Token                | Light     | Dark      | Role                                          |
| -------------------- | --------- | --------- | --------------------------------------------- |
| `--color-bg`         | `#F5F4F0` | `#0A0A09` | The wall / the screen.                        |
| `--color-floor`      | `#E7E5DE` | `#000000` | The strip under the rooms, holding the index. |
| `--color-lintel`     | `#F5F4F0` | `#000000` | The strip above the rooms, holding the frame. |
| `--color-text`       | `#0B0B0A` | `#EFE9DD` | Ink / lamp light. 18:1 and 16:1 on the wall.  |
| `--color-text-muted` | `#57564F` | `#A19C91` | Labels. 6.7:1 and 7.2:1 on the wall.          |
| `--color-line`       | = text    | `#F3D463` | The sentence. The subtitle yellow is 13:1.    |
| `--color-accent`     | `#E03A12` | `#FF5126` | The dot. Never used for text.                 |
| `--color-border`     | ink @ 16% | light 18% | Hairlines.                                    |

Rules: the accent is only ever a dot (or the hover colour of a monumental
link); focus is a 2px outline in the text colour, so it shows on wall, floor
and screen alike.

## 3. Typography

One self-hosted family under the SIL Open Font License: **Archivo** variable
(`wdth` 62–125, `wght` 100–900), Latin subset, one WOFF2 file (88 kB, 75 kB
after the build subsets it).

- © 2020 The Archivo Project Authors, Omnibus-Type. https://github.com/Omnibus-Type/Archivo

| Use      | Settings                                                                                    |
| -------- | ------------------------------------------------------------------------------------------- |
| The word | `wdth` 62, weight 900 (light) or 100 (dark), capitals, line box 0.668 em                    |
| Sentence | normal width, weight 400, 24–40 px, tracking −0.022 em (light); weight 500, 17–24 px (dark) |
| Labels   | normal width, weight 500–700, 13 px (light); 11 px capitals, tracking 0.14 em (dark)        |
| Body     | normal width, weight 400, 14–15 px                                                          |

**Fitting a word to its wall.** `src/lib/monument.ts` holds the advance of
every display glyph at both weights. A word's width in em is the sum of its
glyphs, so `font-size = wall width ÷ em width` in plain CSS (container query
units), capped at a share of the room's height. No script measures anything
and nothing shifts when the font arrives. The line box is the face's ascent
minus its descent (0.668 em), which puts the baseline on the box's lower edge:
the letters stand exactly on the floor line.

The font carries no arrows; the two the site uses are inline SVG
(`Sprite.astro`).

## 4. Layout

```
┌──────────────────────────────────────────────┐
│ Jesús Bonete                 CV ↗  ES EN  ◐  │  frame (fixed)
├──────────────────────────────────────────────┤
│ III  Trade              2026  Cafler         │
│ Intern to senior.       2024  Savia          │  wall: label + sentence | body
│ Three firms, one trade. 2022  NTT DATA       │
│                                              │
│ ╋ ┃┃                                         │  the word, on the floor
├──────────────────────────────────────────────┤
│ I  II  III Trade  IV  V  VI  VII  VIII   ← → │  floor: index (fixed)
└──────────────────────────────────────────────┘
```

- **Home** is eight rooms: I Entrance (`BONETE`), II CV (`CV`, the word is the
  link), III Trade (`+4`), IV Tooling (`.NET`), V Projects (the four repository
  names are the monument), VI Heading (`IA` / `AI`), VII Self-portrait (no
  word: one small framed picture on a large wall), VIII Contact (`@`).
- **The CV comes second**, and is also in the frame on every page.
- **Work** is one room per role under the year it ended: 2026, 2025, 2024,
  2023, 2022. Walking the hall counts the years back.
- **404** is a single room.
- **Narrow screens** stack the wall in one column. On an upright phone the
  entrance word is stood on end and spans the height of the room.
- **Short screens**: a room whose wall does not fit scrolls inside itself; the
  hall never grows a vertical scroll.
- Room ids are the same in both languages, and the language switch keeps the
  visitor in the room they are standing in.

## 5. Motion

One movement, driven by the scroll position itself (CSS scroll-driven
animations, no script): while a room goes by, its word travels faster than its
wall, as anything near does, and changes weight. In the white cube the mass
thins to a hairline between rooms and fills again on arrival; in the cinema the
hairline flares to full weight between scenes. The wall fades with it. The dot
on the floor line travels with the hall.

- Where scroll-driven animations are not supported the rooms simply slide.
- `prefers-reduced-motion: reduce` turns all of it off, and room changes jump
  instead of gliding.
- The script (inline, ~2 kB) is comfort only: it turns wheel and arrow keys
  into steps from room to room, marks the room in view in the index, and keeps
  the language switch on the current room. Without it the hall is still a
  snap-scrolling container and the index is a list of anchors.

## 6. Voice

Texts are nearly absent. Where there is a sentence it is written in the manner
of Arturo Pérez-Reverte, in our own words: dry, precise, a little ironic, the
cadence of someone who has done the work and does not need to dress it up.
Short sentences. Nouns, not adjectives. English is an equivalent voice, not a
translation.

| Room          | Español                                                    | English                                                           |
| ------------- | ---------------------------------------------------------- | ----------------------------------------------------------------- |
| Entrance      | Backend. Lo que nadie ve y aguanta todo lo demás.          | Backend. What nobody sees, holding up everything else.            |
| CV            | Una hoja. Sin adjetivos.                                   | One sheet. No adjectives.                                         |
| Trade         | De becario a senior. Tres casas, un oficio.                | Intern to senior. Three firms, one trade.                         |
| Tooling       | Código limpio. El otro se paga después, y con intereses.   | Clean code. The other kind gets paid for later, with interest.    |
| Projects      | Código a la vista. Que cada cual juzgue.                   | Code in plain sight. Judge for yourself.                          |
| Heading       | La IA ya trabaja conmigo… Con evals, no con fe.            | AI already works beside me… On evals, not on faith.               |
| Self-portrait | Hierro, vida sana y airsoft… Cada cual descansa como sabe. | Iron, clean living and airsoft… Everyone rests the way they know. |
| Contact       | El teléfono funciona. El correo, también.                  | The phone works. So does the mail.                                |
| 404           | Puerta equivocada. Detrás no hay nada.                     | Wrong door. Nothing behind it.                                    |

The facts underneath (roles, dates, stack, studies, contact) are unchanged and
live in `src/lib/constants*.ts` and `src/i18n/content.ts`.

## 7. Accessibility

- Landmarks: `header`, `nav` (primary), `main` (the hall), `nav` (the index).
  Each room is a labelled `section` with a real heading; the monumental words
  are decorative (`aria-hidden`) except `CV`, which is a labelled link.
- Every room is in the document in reading order; nothing is hidden behind
  interaction. Tabbing into a room brings it into view.
- Every link that leaves the page opens in a new tab with
  `rel="noopener noreferrer"` and says so to screen readers.
- Contrast: body and labels are AA or better in both themes (table above).
- Reduced motion is honoured (see Motion).

## 8. The CV sheet

Always paper, whatever the theme: it prints to A4 and `pnpm cv:pdf` renders it
to the two PDFs. Same language as the site: the full name spans the sheet in
the display face, one dot, hairline rules, the stack written as a line of
materials rather than chips.
