import type { ContactPayload } from '#shared/contact'

/** Doručování je aktivní jen při kompletní SMTP konfiguraci. */
export function isContactDeliveryConfigured(): boolean {
  const config = useRuntimeConfig()
  return Boolean(config.smtpHost && config.contactFrom && config.contactTo)
}

/**
 * Odešle zprávu z formuláře e-mailem přes SMTP.
 * Pro jiný způsob doručení (CRM, helpdesk, webhook…) stačí upravit tuto funkci.
 */
export async function deliverContactMessage(data: ContactPayload): Promise<void> {
  const config = useRuntimeConfig()
  const { createTransport } = await import('nodemailer')

  const transporter = createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: String(config.smtpSecure) === 'true',
    auth: config.smtpUser ? { user: config.smtpUser, pass: config.smtpPass } : undefined,
  })

  // E-mail pro firmu je česky; jazyk webu napoví, v jakém jazyce odpovědět.
  const subject = data.subject === 'other' ? 'Jiný dotaz' : data.subject
  const lines = [
    `Jméno: ${data.name}`,
    `Firma: ${data.company || '—'}`,
    `E-mail: ${data.email}`,
    `Předmět: ${subject}`,
    `Jazyk webu: ${data.locale.toUpperCase()}`,
    '',
    data.message,
  ]

  await transporter.sendMail({
    from: config.contactFrom,
    to: config.contactTo,
    replyTo: data.email,
    subject: `Web Silverdahl – ${subject}`,
    text: lines.join('\n'),
  })
}
