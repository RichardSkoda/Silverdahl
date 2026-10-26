import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_VERSION,
  optionalCategoryIds,
  type OptionalCategoryId,
} from '~/data/cookies'

export type ConsentChoices = Record<OptionalCategoryId, boolean>

export interface StoredConsent extends ConsentChoices {
  v: number
  /** Kdy návštěvník volbu udělal (ISO 8601) – slouží jako doklad o souhlasu. */
  date: string
}

/** Všechny volitelné kategorie nastavené na stejnou hodnotu. */
export function allChoices(value: boolean): ConsentChoices {
  return Object.fromEntries(optionalCategoryIds.map((id) => [id, value])) as ConsentChoices
}

/** Jen volitelné kategorie (bez verze a data), chybějící jako false. */
function choicesOf(source: Partial<ConsentChoices> | null): ConsentChoices {
  return Object.fromEntries(optionalCategoryIds.map((id) => [id, source?.[id] ?? false])) as ConsentChoices
}

function parseConsent(value: unknown): StoredConsent | null {
  if (!value || typeof value !== 'object') return null
  const c = value as Partial<StoredConsent>
  const valid =
    c.v === CONSENT_VERSION &&
    optionalCategoryIds.every((id) => typeof c[id] === 'boolean') &&
    typeof c.date === 'string'
  return valid ? (c as StoredConsent) : null
}

/**
 * Souhlas s cookies. Volba se ukládá do nezbytné cookie a čte se až v prohlížeči
 * (plugin consent.client.ts) – stránky jsou předgenerované, server volbu návštěvníka nezná.
 */
export function useCookieConsent() {
  const cookie = useCookie<unknown>(CONSENT_COOKIE, {
    maxAge: CONSENT_MAX_AGE_DAYS * 24 * 60 * 60,
    sameSite: 'lax',
    path: '/',
    secure: !import.meta.dev,
  })

  const consent = useState<StoredConsent | null>('cookie-consent', () => null)
  const isReady = useState('cookie-consent-ready', () => false)
  const settingsOpen = useState('cookie-settings-open', () => false)

  function load() {
    consent.value = parseConsent(cookie.value)
    isReady.value = true
  }

  function save(choices: ConsentChoices) {
    const value: StoredConsent = { v: CONSENT_VERSION, ...choicesOf(choices), date: new Date().toISOString() }
    cookie.value = value
    consent.value = value
    settingsOpen.value = false
  }

  return {
    consent: readonly(consent),
    isReady: readonly(isReady),
    settingsOpen,
    hasDecided: computed(() => consent.value !== null),
    hasConsent: (category: OptionalCategoryId) => consent.value?.[category] === true,
    /** Aktuální volba jako výchozí stav přepínačů v nastavení. */
    currentChoices: () => choicesOf(consent.value),
    load,
    save,
    /** Souhlas s jednou kategorií (např. tlačítko „Zobrazit mapu“) – ostatní volby zůstanou beze změny. */
    allow: (category: OptionalCategoryId) => save({ ...choicesOf(consent.value), [category]: true }),
    acceptAll: () => save(allChoices(true)),
    rejectAll: () => save(allChoices(false)),
    openSettings: () => {
      settingsOpen.value = true
    },
  }
}
