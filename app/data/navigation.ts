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

/** Krátký název stránky (klíč v překladech) – drobečková navigace na webu i ve strukturovaných datech. */
export const pageLabelKeys: Record<PageName, string> = {
  index: 'nav.home',
  sluzby: 'nav.services',
  'vstup-na-trh': 'nav.marketEntry',
  'caste-dotazy': 'nav.faq',
  'case-study': 'nav.caseStudy',
  'o-nas': 'nav.about',
  kontakt: 'nav.contact',
  cookies: 'footer.cookiePolicy',
  'ochrana-osobnich-udaju': 'footer.privacy',
}
