/**
 * The short form of a URL as printed on the CV: no scheme, no `www.` and no
 * trailing slash, e.g. `linkedin.com/in/jesus-bonete-sanchez`. ATS parsers
 * still recognise it as a profile, and the link itself keeps the full URL.
 */
export function displayUrl(url: string): string {
  return url
    .trim()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '')
}
