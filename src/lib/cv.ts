/** The personal site, as linked from the CV. */
export const CV_WEBSITE = 'https://xexubonete.dev'

/**
 * The short form of a profile URL as printed on the CV: no scheme, no `www.`
 * and no trailing slash, e.g. "linkedin.com/in/jesus-bonete-sanchez". The
 * link itself keeps the full URL; ATS parsers still recognise the short text.
 */
export function shortUrl(href: string): string {
  return href
    .replace(/^[a-z][a-z0-9+.-]*:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '')
}
