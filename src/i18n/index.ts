import { EXPERIENCE, STUDIES as STUDIES_EN, LINKS } from '@/lib/constants'
import { SPANISH, STUDIES as STUDIES_ES } from '@/lib/constants-es'
import { CONTENT } from './content'
import type { Lang } from './routes'

export { LANGS, isLang, otherLang, pagePath } from './routes'
export type { Lang, PageId } from './routes'

/** All UI strings for a language. Content lives in `./content.ts`. */
export function t(lang: Lang) {
  return CONTENT[lang]
}

/** Experience entries per language (same shape, translated content). */
export const experienceByLang = { es: SPANISH, en: EXPERIENCE } as const

/** Study/learning entries per language. */
export const studiesByLang = { es: STUDIES_ES, en: STUDIES_EN } as const

export type ProjectLink = { label: string; href: string; live?: boolean }

/** Project links shown in the "Projects" section — identical across languages. */
export const PROJECT_LINKS: ProjectLink[] = [
  { label: 'pilot-api', href: 'https://github.com/xexubonete/pilot-api' },
  { label: 'mediator-api', href: 'https://github.com/xexubonete/mediator-api' },
  { label: 'dapper-api', href: 'https://github.com/xexubonete/dapper-api' },
  {
    label: 'my-portfolio',
    href: 'https://github.com/xexubonete/my-portfolio',
    live: true,
  },
]

export { LINKS }

export { leafNav, leafTitles } from './book'
export type { LeafLink, LeafNav } from './book'
