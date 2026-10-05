// Checks on the text a PDF extractor gets out of the printed CV.
//
// The CV is a header above two zones that stand side by side. An ATS has to
// read it as header, side zone, main zone -- never a line of one zone in the
// middle of the other. Chromium writes the text in source order, but
// extractors that rebuild columns from glyph positions (poppler, and the
// parsers built on it) decide the order themselves, and a layout change can
// tip them over. `pnpm cv:pdf` runs these checks so that never ships unseen.

/**
 * Text reduced to what has to match between the page and its extraction:
 * lower case (the role line is upper-cased by CSS), no whitespace, and no
 * hyphens (extractors join a word hyphenated at a line end).
 */
export function normalizeText(text) {
  return text.toLowerCase().replace(/[\s-]+/g, '')
}

/**
 * Compares the extracted text of a CV with the text of its three zones, taken
 * from the page in source order. Returns a list of problems, empty when the
 * extraction reads header, then the side zone in full, then the main zone.
 *
 * The header and the side zone must match character for character. Inside
 * the main zone an extractor may still move a right-aligned date by a line,
 * so there only the content is compared, not its exact order.
 */
export function readingOrderProblems({ header, side, main }, extracted) {
  const text = normalizeText(extracted)
  const lead = normalizeText(header) + normalizeText(side)
  const rest = normalizeText(main)
  const problems = []

  if (!text.startsWith(lead)) {
    let at = 0
    while (at < lead.length && lead[at] === text[at]) at++
    problems.push(
      `the text does not read header, then the side zone: expected ` +
        `"…${lead.slice(Math.max(0, at - 20), at + 20)}" but found ` +
        `"…${text.slice(Math.max(0, at - 20), at + 20)}"`,
    )
    return problems
  }

  const sorted = (value) => [...value].sort().join('')
  if (sorted(text.slice(lead.length)) !== sorted(rest)) {
    problems.push(
      'the text after the side zone is not the main zone: something is ' +
        'missing, repeated or was read twice',
    )
  }

  return problems
}
