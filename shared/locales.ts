// Jazykové verze webu a přeložené cesty stránek.
// Používá je nuxt.config (i18n routing, prerender) i server (přesměrování formuláře bez JavaScriptu).

export const locales = ['cs', 'en', 'de'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'cs'

/** Jazykový tag pro vyhledávače a strukturovaná data (BCP 47). */
export const languageTags: Record<Locale, string> = { cs: 'cs-CZ', en: 'en-GB', de: 'de-DE' }
/** Formát pro Open Graph (og:locale). */
export const ogLocales: Record<Locale, string> = { cs: 'cs_CZ', en: 'en_GB', de: 'de_DE' }

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/** Cesty stránek bez jazykové předpony (klíč = název stránky v app/pages). Čeština je bez předpony. */
export const localizedPaths = {
  index: { cs: '/', en: '/', de: '/' },
  sluzby: { cs: '/sluzby', en: '/services', de: '/leistungen' },
  'vstup-na-trh': { cs: '/vstup-na-cesky-trh', en: '/czech-market-entry', de: '/markteintritt-tschechien' },
  'caste-dotazy': { cs: '/caste-dotazy', en: '/faq', de: '/haeufige-fragen' },
  'case-study': { cs: '/case-study', en: '/case-study', de: '/fallstudie' },
  'o-nas': { cs: '/o-nas', en: '/about-us', de: '/ueber-uns' },
  kontakt: { cs: '/kontakt', en: '/contact', de: '/kontakt' },
  cookies: { cs: '/cookies', en: '/cookies', de: '/cookies' },
  'ochrana-osobnich-udaju': { cs: '/ochrana-osobnich-udaju', en: '/privacy-policy', de: '/datenschutz' },
} as const satisfies Record<string, Record<Locale, string>>

export type PageName = keyof typeof localizedPaths

/** Úplná cesta stránky včetně jazykové předpony (např. /en/contact). */
export function pagePath(page: PageName, locale: Locale): string {
  const path = localizedPaths[page][locale]
  if (locale === defaultLocale) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}
