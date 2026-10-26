// Sdílená definice a validace kontaktního formuláře (používá ji klient i server).

export const contactSubjects = [
  'Market Entry Support',
  'Partner Sourcing & Management',
  'Local Operations Management',
  'Jiný dotaz',
] as const

export type ContactSubject = (typeof contactSubjects)[number]

export interface ContactPayload {
  name: string
  company: string
  email: string
  subject: string
  message: string
}

export type ContactField = keyof ContactPayload
export type ContactErrors = Partial<Record<ContactField, string>>

export const contactLimits = {
  name: 120,
  company: 160,
  email: 200,
  message: 5000,
  messageMin: 10,
} as const

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeContact(input: Record<string, unknown>): ContactPayload {
  const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
  return {
    name: text(input.name),
    company: text(input.company),
    email: text(input.email),
    subject: text(input.subject),
    message: text(input.message),
  }
}

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {}

  if (!data.name) errors.name = 'Vyplňte prosím své jméno.'
  else if (data.name.length > contactLimits.name) errors.name = `Jméno může mít nejvýše ${contactLimits.name} znaků.`

  if (data.company.length > contactLimits.company)
    errors.company = `Název firmy může mít nejvýše ${contactLimits.company} znaků.`

  if (!data.email) errors.email = 'Vyplňte prosím e-mailovou adresu.'
  else if (data.email.length > contactLimits.email || !emailPattern.test(data.email))
    errors.email = 'Zadejte prosím platnou e-mailovou adresu, např. jmeno@firma.cz.'

  if (!(contactSubjects as readonly string[]).includes(data.subject)) errors.subject = 'Vyberte prosím, čeho se dotaz týká.'

  if (!data.message) errors.message = 'Napište nám prosím zprávu.'
  else if (data.message.length < contactLimits.messageMin)
    errors.message = `Zpráva by měla mít alespoň ${contactLimits.messageMin} znaků.`
  else if (data.message.length > contactLimits.message)
    errors.message = `Zpráva může mít nejvýše ${contactLimits.message} znaků.`

  return errors
}

/** Výsledek odeslání. Hodnoty se používají i v URL (?stav=…) pro variantu bez JavaScriptu. */
export type ContactStatus = 'odeslano' | 'nenapojeno' | 'chyba' | 'neplatne'
