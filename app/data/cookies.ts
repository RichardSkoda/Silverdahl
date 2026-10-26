// Kategorie cookies, název cookie se souhlasem a přehled používaných cookies (stránka /cookies).
// Při zapojení měřicího nebo marketingového nástroje doplňte jeho cookies do `cookieList`
// a zvyšte CONSENT_VERSION – návštěvníci pak budou o souhlas požádáni znovu.

export const CONSENT_COOKIE = 'silverdahl_consent'
export const CONSENT_VERSION = 2
export const CONSENT_MAX_AGE_DAYS = 182

export const optionalCategoryIds = ['analytics', 'marketing', 'external'] as const
export type OptionalCategoryId = (typeof optionalCategoryIds)[number]
export type CategoryId = 'necessary' | OptionalCategoryId

export interface ConsentCategory {
  id: CategoryId
  title: string
  description: string
  /** Nezbytné cookies nelze vypnout. */
  required?: boolean
}

export const consentCategories: ConsentCategory[] = [
  {
    id: 'necessary',
    title: 'Nezbytné',
    description:
      'Zajišťují základní fungování webu, například uložení vaší volby ohledně cookies. Bez nich web nemůže správně fungovat, proto je nelze vypnout.',
    required: true,
  },
  {
    id: 'analytics',
    title: 'Analytické',
    description:
      'Pomáhají nám porozumět, jak návštěvníci web používají – například kolik je návštěv a které stránky se čtou nejvíce. Údaje vyhodnocujeme souhrnně.',
  },
  {
    id: 'marketing',
    title: 'Marketingové',
    description: 'Slouží k měření účinnosti reklamních kampaní a k zobrazování relevantní reklamy na jiných webech.',
  },
  {
    id: 'external',
    title: 'Externí obsah',
    description:
      'Umožňují zobrazit obsah jiných služeb přímo na webu – například mapu Google na stránce Kontakt. Tyto služby mohou ukládat vlastní cookies a zpracovávat vaši IP adresu.',
  },
]

export interface CookieInfo {
  name: string
  category: CategoryId
  provider: string
  purpose: string
  expiry: string
}

export const cookieList: CookieInfo[] = [
  {
    name: CONSENT_COOKIE,
    category: 'necessary',
    provider: 'Silverdahl (tento web)',
    purpose: 'Uložení vaší volby ohledně cookies, aby se lišta nezobrazovala při každé návštěvě.',
    expiry: '6 měsíců',
  },
  {
    name: 'NID a další cookies Googlu',
    category: 'external',
    provider: 'Google Ireland Ltd. (Google Maps)',
    purpose:
      'Ukládá je Google při zobrazení vložené mapy na stránce Kontakt – k uložení předvoleb, zabezpečení a pro vlastní účely Googlu. Mapa se načte jen s vaším souhlasem.',
    expiry: 'podle zásad Googlu (NID 6 měsíců)',
  },
]
