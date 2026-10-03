// Run with: pnpm test
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { formatYears, groupByCompany, yearsOfExperience } from './experience.ts'

describe('yearsOfExperience', () => {
  it('counts full years since February 2022', () => {
    assert.deepEqual(yearsOfExperience(new Date(2026, 9, 2)), {
      years: 4,
      exact: false,
    })
  })

  it('does not count the current year before the anniversary month', () => {
    assert.deepEqual(yearsOfExperience(new Date(2026, 0, 31)), {
      years: 3,
      exact: false,
    })
  })

  it('is exact during the anniversary month', () => {
    assert.deepEqual(yearsOfExperience(new Date(2026, 1, 15)), {
      years: 4,
      exact: true,
    })
  })

  it('is zero in the starting month', () => {
    assert.deepEqual(yearsOfExperience(new Date(2022, 1, 1)), {
      years: 0,
      exact: true,
    })
  })
})

describe('formatYears', () => {
  const template = { plus: 'Experience (+{n}yr)', exact: 'Experience ({n}yr)' }

  it('uses the plus form outside the anniversary month', () => {
    assert.equal(
      formatYears(template, new Date(2026, 9, 2)),
      'Experience (+4yr)',
    )
  })

  it('uses the exact form during the anniversary month', () => {
    assert.equal(
      formatYears(template, new Date(2027, 1, 1)),
      'Experience (5yr)',
    )
  })

  it('leaves a template without a placeholder untouched', () => {
    assert.equal(
      formatYears({ plus: 'Experience', exact: 'Experience' }),
      'Experience',
    )
  })
})

describe('groupByCompany', () => {
  const role = (company: string, start: string, end: string) => ({
    company,
    location: `${company} HQ`,
    link: `https://${company}.example`,
    start,
    end,
  })

  it('returns no groups for no roles', () => {
    assert.deepEqual(groupByCompany([]), [])
  })

  it('merges consecutive roles at one company and spans their dates', () => {
    const groups = groupByCompany([
      role('a', '01/2026', '09/2026'),
      role('b', '12/2023', '05/2024'),
      role('b', '06/2022', '12/2023'),
      role('b', '02/2022', '06/2022'),
    ])

    assert.equal(groups.length, 2)
    assert.equal(groups[0].roles.length, 1)
    assert.equal(groups[1].roles.length, 3)
    assert.equal(groups[1].start, '02/2022')
    assert.equal(groups[1].end, '05/2024')
    assert.equal(groups[1].location, 'b HQ')
    assert.equal(groups[1].link, 'https://b.example')
  })

  it('keeps separate stints at the same company apart', () => {
    const groups = groupByCompany([
      role('a', '01/2026', '09/2026'),
      role('b', '05/2024', '12/2025'),
      role('a', '02/2022', '05/2024'),
    ])

    assert.deepEqual(
      groups.map((group) => group.company),
      ['a', 'b', 'a'],
    )
  })

  it('does not mutate the input', () => {
    const roles = [
      role('a', '06/2022', '12/2023'),
      role('a', '02/2022', '06/2022'),
    ]
    const snapshot = structuredClone(roles)
    groupByCompany(roles)
    assert.deepEqual(roles, snapshot)
  })
})
