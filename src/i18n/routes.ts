export const LANGS = ['es', 'en'] as const
export type Lang = (typeof LANGS)[number]

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value)
}

/** The language a visitor switches to from `lang`. */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es'
}

/** Pages that exist in both languages. */
export type PageId = 'home' | 'work' | 'cv'

/**
 * Public URL of a page in a language. The Spanish CV keeps its historical
 * `/cv` address; every other page lives under its language prefix.
 */
export function pagePath(lang: Lang, page: PageId): string {
  if (page === 'cv') return lang === 'es' ? '/cv' : '/en/cv'
  if (page === 'work') return `/${lang}/work`
  return `/${lang}/`
}
