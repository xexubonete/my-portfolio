import { LEAF_IDS, neighbours, type LeafId } from '../lib/book.ts'
import { CONTENT } from './content.ts'
import type { Lang } from './routes.ts'

export type LeafLink = { href: string; label: string }

export type LeafNav = {
  id: LeafId
  /** Position in the book; the cover is 0. */
  index: number
  label: string
  prev: LeafLink | undefined
  next: LeafLink | undefined
}

/** What each leaf of the home book is called, for the index and the pager. */
export function leafTitles(lang: Lang): Record<LeafId, string> {
  const c = CONTENT[lang]
  return {
    cover: c.nav.home,
    index: c.contents.title,
    i: c.author.title,
    ii: c.campaigns.title,
    iii: c.arms.title,
    iv: c.course.title,
    v: c.offDuty.title,
    vi: c.contact.title,
    cv: c.cv.title,
  }
}

/** Where a leaf sits in the home book and which leaves it turns to. */
export function leafNav(lang: Lang, id: LeafId): LeafNav {
  const titles = leafTitles(lang)
  const index = LEAF_IDS.indexOf(id)
  const { prev, next } = neighbours(LEAF_IDS, index)
  const link = (target: LeafId | undefined) =>
    target && { href: `#${target}`, label: titles[target] }
  return { id, index, label: titles[id], prev: link(prev), next: link(next) }
}
