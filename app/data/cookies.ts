// Kategorie cookies, název cookie se souhlasem a přehled používaných cookies (stránka /cookies).
// Texty (názvy kategorií, popisy, účel cookies) jsou v překladech pod klíčem cookies.*.
// Při zapojení měřicího nebo marketingového nástroje doplňte jeho cookies do `cookieList` (+ texty
// v překladech) a zvyšte CONSENT_VERSION – návštěvníci pak budou o souhlas požádáni znovu.

export const CONSENT_COOKIE = 'silverdahl_consent'
export const CONSENT_VERSION = 2
export const CONSENT_MAX_AGE_DAYS = 182

export const optionalCategoryIds = ['analytics', 'marketing', 'external'] as const
export type OptionalCategoryId = (typeof optionalCategoryIds)[number]
export type CategoryId = 'necessary' | OptionalCategoryId

export interface ConsentCategory {
  /** Texty v překladech: cookies.categories.<id>.title / .description */
  id: CategoryId
  /** Nezbytné cookies nelze vypnout. */
  required?: boolean
}

export const consentCategories: ConsentCategory[] = [
  { id: 'necessary', required: true },
  { id: 'analytics' },
  { id: 'marketing' },
  { id: 'external' },
]

export interface CookieInfo {
  /** Texty v překladech: cookies.list.<key>.provider / .purpose / .expiry (a .name, pokud chybí `name`). */
  key: string
  /** Technický název cookie (nepřekládá se). */
  name?: string
  category: CategoryId
}

export const cookieList: CookieInfo[] = [
  { key: 'consent', name: CONSENT_COOKIE, category: 'necessary' },
  { key: 'google', category: 'external' },
]
