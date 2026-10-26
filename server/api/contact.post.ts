import { normalizeContact, validateContact, type ContactStatus } from '#shared/contact'
import { pagePath } from '#shared/locales'

/**
 * POST /api/contact
 * - JSON požadavek (formulář s JavaScriptem) → JSON odpověď se stavovým kódem.
 * - Klasický POST formuláře (bez JavaScriptu) → přesměrování zpět na kontakt v jazyce formuláře (?stav=…).
 *
 * Nikdy nehlásí úspěch, pokud zpráva nebyla skutečně předána k doručení.
 */
export default defineEventHandler(async (event) => {
  const isJson = (getRequestHeader(event, 'content-type') ?? '').includes('application/json')
  const body = ((await readBody(event).catch(() => null)) ?? {}) as Record<string, unknown>

  const data = normalizeContact(body)

  const respond = (status: ContactStatus, httpStatus: number, extra: Record<string, unknown> = {}) => {
    if (!isJson) return sendRedirect(event, `${pagePath('kontakt', data.locale)}?stav=${status}#formular`, 303)
    setResponseStatus(event, httpStatus)
    return { status, ...extra }
  }

  // Ochrana proti spamu: skryté pole „website“ vyplňují jen roboti.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return respond('chyba', 400)
  }

  const errors = validateContact(data)
  if (Object.keys(errors).length > 0) {
    return respond('neplatne', 422, { errors })
  }

  if (!isContactDeliveryConfigured()) {
    console.warn('[contact] Doručování není nakonfigurováno (NUXT_SMTP_HOST, NUXT_CONTACT_FROM, NUXT_CONTACT_TO). Zpráva nebyla odeslána.')
    return respond('nenapojeno', 503)
  }

  try {
    await deliverContactMessage(data)
  } catch (error) {
    console.error('[contact] Odeslání e-mailu selhalo:', error)
    return respond('chyba', 502)
  }

  return respond('odeslano', 200)
})
