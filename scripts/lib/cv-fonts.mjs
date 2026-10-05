// The static fonts of the CV: one file per style the sheet uses, each cut
// from one of the site's variable fonts with its axes pinned.
//
// The site sets its type in variable fonts. Chromium cannot embed a variable
// font in a PDF as a font: it draws each glyph as a Type 3 procedure, which
// text extractors read less reliably (poppler's raw mode, for one, runs the
// words together). A static font is embedded as plain TrueType, so the CV
// uses these instead. src/styles/cv.css declares them.

/** The Latin range the site's font files cover (src/styles/fonts.css). */
export const LATIN_RANGES = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x131, 0x131],
  [0x152, 0x153],
  [0x2bb, 0x2bc],
  [0x2c6, 0x2c6],
  [0x2da, 0x2da],
  [0x2dc, 0x2dc],
  [0x2000, 0x206f],
  [0x20ac, 0x20ac],
  [0x2122, 0x2122],
  [0x2191, 0x2191],
  [0x2193, 0x2193],
  [0x2212, 0x2212],
  [0x2215, 0x2215],
]

/** Every character of a list of inclusive code-point ranges, as one string. */
export function charset(ranges) {
  let text = ''
  for (const [first, last] of ranges) {
    for (let code = first; code <= last; code++) {
      text += String.fromCodePoint(code)
    }
  }
  return text
}

/** `out` is written under public/fonts/cv/; `axes` are pinned in `source`. */
export const CV_FONTS = [
  // Instrument Sans: body, company names, labels and emphasis.
  {
    source: 'instrument-sans-latin',
    out: 'sans-400',
    axes: { wght: 400, wdth: 100 },
  },
  {
    source: 'instrument-sans-latin',
    out: 'sans-600',
    axes: { wght: 600, wdth: 100 },
  },
  {
    source: 'instrument-sans-latin',
    out: 'sans-700',
    axes: { wght: 700, wdth: 100 },
  },
  // Bricolage Grotesque at its display optical size: the name, the section
  // titles and the job titles, each at its own width.
  {
    source: 'bricolage-grotesque-latin',
    out: 'display-800-78',
    axes: { wght: 800, wdth: 78, opsz: 96 },
  },
  {
    source: 'bricolage-grotesque-latin',
    out: 'display-700-85',
    axes: { wght: 700, wdth: 85, opsz: 96 },
  },
  {
    source: 'bricolage-grotesque-latin',
    out: 'display-700-90',
    axes: { wght: 700, wdth: 90, opsz: 96 },
  },
  // JetBrains Mono: dates, the role line and the stack label.
  { source: 'jetbrains-mono-latin', out: 'mono-400', axes: { wght: 400 } },
  { source: 'jetbrains-mono-latin', out: 'mono-500', axes: { wght: 500 } },
  { source: 'jetbrains-mono-latin', out: 'mono-600', axes: { wght: 600 } },
]
