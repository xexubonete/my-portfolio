/**
 * The home page is a book: a run of leaves, each one an open spread with a
 * left page (verso) and a right page (recto). Only the leaf named by the URL
 * fragment is on show, so the ids are shared by both languages and the
 * language switch can keep the reader on the same leaf.
 */
export const LEAF_IDS = [
  'cover',
  'index',
  'i',
  'ii',
  'iii',
  'iv',
  'v',
  'vi',
  'cv',
] as const

export type LeafId = (typeof LEAF_IDS)[number]

const NUMERALS: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

/** A positive integer in Roman numerals: 2026 -> "MMXXVI". */
export function roman(value: number): string {
  if (!Number.isInteger(value) || value < 1) {
    throw new RangeError(`roman() takes a positive integer, got ${value}`)
  }
  let rest = value
  let out = ''
  for (const [amount, numeral] of NUMERALS) {
    while (rest >= amount) {
      out += numeral
      rest -= amount
    }
  }
  return out
}

/**
 * Page numbers of the leaf at `index`. As in any book, the left page is even
 * and the right one odd; the cover (index 0) carries no numbers at all.
 */
export function folios(index: number): { verso: number; recto: number } | null {
  if (index <= 0) return null
  return { verso: index * 2, recto: index * 2 + 1 }
}

/** The leaves before and after the one at `index`, where they exist. */
export function neighbours<Id>(
  ids: readonly Id[],
  index: number,
): { prev: Id | undefined; next: Id | undefined } {
  return { prev: ids[index - 1], next: ids[index + 1] }
}

/** A URL-fragment-safe id from a name: "Savia by Berger-Levrault" -> "savia-by-berger-levrault". */
export function slug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Marks the first words of a chapter so they can be set in small capitals.
 * `text` is HTML; it is returned untouched when it does not open with `leadIn`.
 */
export function withLeadIn(text: string, leadIn: string): string {
  if (!leadIn || !text.startsWith(leadIn)) return text
  return `<span class="lead-in">${leadIn}</span>${text.slice(leadIn.length)}`
}
