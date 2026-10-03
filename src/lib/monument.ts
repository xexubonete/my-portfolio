/**
 * The monumental words are set to span a wall exactly, with no script: the
 * font size is the wall width divided by the word's width in em. That width
 * is known ahead of time from the advances of the display face (Archivo at
 * its narrowest, `wdth` 62), in thousandths of an em, at the two weights the
 * art direction uses: black for the white room, hairline for the dark one.
 * The face has no kerning between these glyphs, so the sum is the word.
 * Accented letters are measured as their base letter. Each glyph also lists
 * its left side bearing, the blank before its first stroke.
 *
 * Measured in Chromium from public/fonts/archivo-latin.woff2. A glyph that is
 * not listed falls back to the widest letter, which can only make a word
 * smaller than its wall, never wider.
 */
type Metrics = readonly [
  black: number,
  hairline: number,
  bearingBlack: number,
  bearingHairline: number,
]

const GLYPHS: Record<string, Metrics> = {
  '0': [444, 368, 27, 21],
  '1': [371, 329, 22, 36],
  '2': [427, 386, 25, 38],
  '3': [440, 372, 18, 21],
  '4': [435, 346, 10, 8],
  '5': [437, 391, 21, 40],
  '6': [445, 366, 27, 21],
  '7': [396, 324, 6, 0],
  '8': [432, 359, 16, 22],
  '9': [445, 366, 23, 27],
  A: [530, 398, 0, 0],
  B: [498, 441, 40, 65],
  C: [513, 474, 30, 38],
  D: [509, 483, 40, 65],
  E: [462, 421, 40, 65],
  F: [402, 373, 40, 65],
  G: [543, 496, 30, 38],
  H: [513, 477, 40, 65],
  I: [263, 178, 40, 65],
  J: [453, 331, 5, 3],
  K: [510, 434, 40, 65],
  L: [432, 342, 40, 65],
  M: [705, 567, 40, 65],
  N: [518, 477, 40, 65],
  O: [554, 507, 30, 38],
  P: [485, 424, 40, 65],
  Q: [554, 507, 30, 38],
  R: [509, 465, 40, 65],
  S: [469, 404, 25, 32],
  T: [475, 400, 15, 12],
  U: [503, 470, 36, 61],
  V: [490, 414, 0, 22],
  W: [729, 616, 2, 23],
  X: [500, 443, -8, 5],
  Y: [481, 476, -14, 35],
  Z: [475, 424, 15, 33],
  '+': [528, 444, 40, 66],
  '.': [222, 179, 40, 60],
  '@': [688, 649, 30, 38],
  '-': [240, 240, 0, 0],
  '/': [278, 248, 0, 0],
  ' ': [110, 135, 0, 0],
}

const WIDEST: Metrics = [729, 649, 0, 0]

/**
 * The width of an uppercase word in em at the black and hairline weights,
 * and the blank the face leaves before its first glyph. A word that has to
 * meet the edge of its wall is pulled back by that blank.
 */
export function emWidth(word: string): {
  black: number
  hairline: number
  bearing: { black: number; hairline: number }
} {
  // Accents add no width: É is as wide as E.
  const bare = word.normalize('NFD').replace(/\p{M}/gu, '').toUpperCase()
  let black = 0
  let hairline = 0
  for (const glyph of bare) {
    const [b, h] = GLYPHS[glyph] ?? WIDEST
    black += b
    hairline += h
  }
  const [, , bearingBlack, bearingHairline] = GLYPHS[bare[0] ?? ''] ?? WIDEST
  return {
    black: black / 1000,
    hairline: hairline / 1000,
    bearing: { black: bearingBlack / 1000, hairline: bearingHairline / 1000 },
  }
}

const NUMERALS: readonly [number, string][] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

/** Room numbers are Roman, as on the lintel of a gallery door: 1 to 39. */
export function roman(n: number): string {
  let rest = Math.trunc(n)
  if (rest < 1 || rest > 39) throw new RangeError(`no numeral for ${n}`)
  let out = ''
  for (const [value, numeral] of NUMERALS) {
    while (rest >= value) {
      out += numeral
      rest -= value
    }
  }
  return out
}
