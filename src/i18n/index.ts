import { EXPERIENCE, STUDIES as STUDIES_EN, LINKS } from '@/lib/constants'
import { SPANISH, STUDIES as STUDIES_ES } from '@/lib/constants-es'

export const LANGS = ['es', 'en'] as const
export type Lang = (typeof LANGS)[number]

/**
 * Years of professional experience, counted from February 2022.
 * `exact` is true during the anniversary month (February) — show "N";
 * otherwise show "+N". Recomputed on each server render, so it stays current.
 */
export function yearsOfExperience(now: Date = new Date()): {
  years: number
  exact: boolean
} {
  const START_YEAR = 2022
  const START_MONTH = 2 // February
  const month = now.getMonth() + 1
  let years = now.getFullYear() - START_YEAR
  if (month < START_MONTH) years -= 1
  return { years, exact: month === START_MONTH }
}

/** Experience entries per language (same shape, translated content). */
export const experienceByLang = { es: SPANISH, en: EXPERIENCE } as const

/** Study/learning entries per language. */
export const studiesByLang = { es: STUDIES_ES, en: STUDIES_EN } as const

export type ProjectLink = { label: string; href: string; outline?: boolean }

/** Project links shown in the "Projects" card — identical across languages. */
export const PROJECT_LINKS: ProjectLink[] = [
  { label: 'pilot-api', href: 'https://github.com/xexubonete/pilot-api' },
  { label: 'mediator-api', href: 'https://github.com/xexubonete/mediator-api' },
  { label: 'dapper-api', href: 'https://github.com/xexubonete/dapper-api' },
  {
    label: 'my-portfolio',
    href: 'https://github.com/xexubonete/my-portfolio',
    outline: true,
  },
]

export { LINKS }
