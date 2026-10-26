// Sdílená definice a validace kontaktního formuláře (používá ji klient i server).
// Validace vrací kódy chyb – texty hlášek jsou v překladech (contact.form.errors.<pole>.<kód>).
import { defaultLocale, isLocale, type Locale } from './locales'

/** Hodnoty pole „předmět“. Názvy služeb se nepřekládají, 'other' má popisek v překladech. */
export const contactSubjects = [
  'Market Entry Support',
  'Partner Sourcing & Management',
  'Local Operations Management',
  'other',
] as const

export type ContactSubject = (typeof contactSubjects)[number]

export interface ContactPayload {
  name: string
  company: string
  email: string
  subject: string
  message: string
  /** Jazyk webu, ze kterého zpráva přišla. */
  locale: Locale
}

export type ContactField = Exclude<keyof ContactPayload, 'locale'>
export type ContactErrorCode = 'required' | 'tooLong' | 'tooShort' | 'invalid'
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>

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
    locale: isLocale(input.locale) ? input.locale : defaultLocale,
  }
}

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {}

  if (!data.name) errors.name = 'required'
  else if (data.name.length > contactLimits.name) errors.name = 'tooLong'

  if (data.company.length > contactLimits.company) errors.company = 'tooLong'

  if (!data.email) errors.email = 'required'
  else if (data.email.length > contactLimits.email || !emailPattern.test(data.email)) errors.email = 'invalid'

  if (!(contactSubjects as readonly string[]).includes(data.subject)) errors.subject = 'required'

  if (!data.message) errors.message = 'required'
  else if (data.message.length < contactLimits.messageMin) errors.message = 'tooShort'
  else if (data.message.length > contactLimits.message) errors.message = 'tooLong'

  return errors
}

/** Výsledek odeslání. Hodnoty se používají i v URL (?stav=…) pro variantu bez JavaScriptu. */
export type ContactStatus = 'odeslano' | 'nenapojeno' | 'chyba' | 'neplatne'
