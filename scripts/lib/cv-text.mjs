// Checks on the text a PDF extractor gets out of the printed CV.
//
// The CV is a single column of text: the header, then the sections. An ATS
// has to read it in that order, with nothing lost, moved or read twice.
// Chromium writes the text in source order, but extractors that rebuild the
// page from glyph positions (poppler, and the parsers built on it) decide the
// order themselves, and a layout change -- a second column, say -- can tip
// them over. `pnpm cv:pdf` runs these checks so that never ships unseen.

/**
 * Text reduced to what has to match between the page and its extraction:
 * the words, in order, in lower case (CSS upper-cases the role line), one
 * space apart whatever the line breaks, and without hyphens (extractors join
 * a word hyphenated at a line end). The spaces are kept on purpose: an
 * extraction that runs the words together is a failure.
 */
export function normalizeText(text) {
  return text.toLowerCase().replace(/-\s*/g, '').replace(/\s+/g, ' ').trim()
}

/**
 * Compares the extracted text of a CV with the text of the page, taken in
 * source order as the browser lays it out (`innerText`). Returns a list of
 * problems, empty when the extraction reads the same words in the same
 * order.
 */
export function readingOrderProblems(expected, extracted) {
  const want = normalizeText(expected)
  const text = normalizeText(extracted)
  if (text === want) return []

  let at = 0
  while (at < want.length && want[at] === text[at]) at++
  const around = (value) => value.slice(Math.max(0, at - 20), at + 20)

  if (at === want.length) {
    return [`there is text after the end of the CV: "${around(text)}…"`]
  }
  if (at === text.length) {
    return [`the text stops short, before "…${around(want)}"`]
  }
  return [
    `the text leaves the source order: expected "…${around(want)}" but ` +
      `found "…${around(text)}"`,
  ]
}
