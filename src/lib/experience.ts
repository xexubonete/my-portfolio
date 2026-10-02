/** First month of professional experience: February 2022. */
export const CAREER_START = { year: 2022, month: 2 } as const

/**
 * Years of professional experience, counted from February 2022.
 * `exact` is true during the anniversary month (February) — show "N";
 * otherwise show "+N".
 */
export function yearsOfExperience(now: Date = new Date()): {
  years: number
  exact: boolean
} {
  const month = now.getMonth() + 1
  let years = now.getFullYear() - CAREER_START.year
  if (month < CAREER_START.month) years -= 1
  return { years, exact: month === CAREER_START.month }
}

/** A phrase in its two forms; `{n}` stands for the number of years. */
export type YearsTemplate = { plus: string; exact: string }

/** Fills a years template, e.g. "Experience (+{n}yr)" -> "Experience (+4yr)". */
export function formatYears(
  template: YearsTemplate,
  now: Date = new Date(),
): string {
  const { years, exact } = yearsOfExperience(now)
  return (exact ? template.exact : template.plus).replace('{n}', String(years))
}

export type CompanyGroup<Role> = {
  company: string
  location: string
  link?: string
  roles: Role[]
  /** Start of the earliest role and end of the latest one. */
  start: string
  end: string
}

/**
 * Groups consecutive roles at the same company (e.g. NTT DATA's 3 stages), so
 * the company shows once with its full date range. Roles are newest first.
 */
export function groupByCompany<
  Role extends {
    company: string
    location: string
    link?: string
    start: string
    end: string
  },
>(roles: readonly Role[]): CompanyGroup<Role>[] {
  const groups: CompanyGroup<Role>[] = []
  for (const role of roles) {
    const last = groups[groups.length - 1]
    if (last && last.company === role.company) {
      last.roles.push(role)
      last.start = role.start
    } else {
      groups.push({
        company: role.company,
        location: role.location,
        link: role.link,
        roles: [role],
        start: role.start,
        end: role.end,
      })
    }
  }
  return groups
}
