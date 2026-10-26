import type { PageName } from '#shared/locales'

export interface NavItem {
  /** Klíč popisku v překladech. */
  labelKey: string
  /** Název stránky – cestu v aktuálním jazyce vrací localePath(). */
  page: PageName
}

export const mainNavigation: NavItem[] = [
  { labelKey: 'nav.home', page: 'index' },
  { labelKey: 'nav.services', page: 'sluzby' },
  { labelKey: 'nav.caseStudy', page: 'case-study' },
  { labelKey: 'nav.about', page: 'o-nas' },
  { labelKey: 'nav.contact', page: 'kontakt' },
]
