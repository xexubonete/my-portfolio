import { LINKS } from './constants.ts'

/**
 * The short form of a URL as printed on the CV: no scheme, no `www.` and no
 * trailing slash ("https://www.linkedin.com/in/x/" -> "linkedin.com/in/x").
 * ATS parsers still recognise it as a profile link, and it reads much lighter
 * than the full address. The link itself keeps pointing at the full URL.
 */
export function displayUrl(url: string): string {
  return url
    .trim()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/[?#].*$/, '')
    .replace(/\/+$/, '')
}

export type CvLink = { href: string; text: string }

/** The profile links of the CV header, in print order. */
export const CV_LINKS: readonly CvLink[] = [
  LINKS.linkedin,
  LINKS.github,
  'https://xexubonete.dev',
].map((href) => ({ href, text: displayUrl(href) }))
