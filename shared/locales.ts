// Jazykové verze webu a přeložené cesty stránek.
// Používá je nuxt.config (i18n routing, prerender) i server (přesměrování formuláře bez JavaScriptu).

export const locales = ['cs', 'en', 'de'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'cs'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/** Cesty stránek bez jazykové předpony (klíč = název stránky v app/pages). Čeština je bez předpony. */
export const localizedPaths = {
  index: { cs: '/', en: '/', de: '/' },
  sluzby: { cs: '/sluzby', en: '/services', de: '/leistungen' },
  'case-study': { cs: '/case-study', en: '/case-study', de: '/fallstudie' },
  'o-nas': { cs: '/o-nas', en: '/about-us', de: '/ueber-uns' },
  kontakt: { cs: '/kontakt', en: '/contact', de: '/kontakt' },
  cookies: { cs: '/cookies', en: '/cookies', de: '/cookies' },
} as const satisfies Record<string, Record<Locale, string>>

export type PageName = keyof typeof localizedPaths

/** Úplná cesta stránky včetně jazykové předpony (např. /en/contact). */
export function pagePath(page: PageName, locale: Locale): string {
  const path = localizedPaths[page][locale]
  if (locale === defaultLocale) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}
