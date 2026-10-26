<script setup lang="ts">
import type { ContactStatus } from '#shared/contact'

usePageSeo({
  title: 'Kontakt',
  description:
    'Plánujete vstup na nový trh, hledáte spolehlivé obchodní partnery nebo potřebujete zajistit řízení lokálních provozních procesů? Kontaktujte Silverdahl.',
  path: '/kontakt',
})

// Stav doručování se zjišťuje při SSR ze serverové konfigurace; do prohlížeče jde jen výsledná hodnota.
const deliveryReady = useState('contact-delivery-ready', () => {
  if (import.meta.server) {
    const config = useRuntimeConfig()
    return Boolean(config.smtpHost && config.contactFrom && config.contactTo)
  }
  return false
})

const route = useRoute()
const knownStatuses: ContactStatus[] = ['odeslano', 'nenapojeno', 'chyba', 'neplatne']
const initialStatus = computed(() => {
  const value = route.query.stav
  return typeof value === 'string' && (knownStatuses as string[]).includes(value) ? (value as ContactStatus) : null
})

const isDev = import.meta.dev

// TODO: Doplnit ověřené kontaktní údaje (e-mail, telefon, adresa sídla, IČO). Podklady je zatím neobsahují,
// proto se na stránce nezobrazují.
</script>

<template>
  <div>
    <PageIntro eyebrow="Kontakt" title="Pojďme společně rozvíjet vaše podnikání">
      <p>
        Plánujete vstup na nový trh, hledáte spolehlivé obchodní partnery nebo potřebujete zajistit řízení lokálních
        provozních procesů?
      </p>
    </PageIntro>

    <section class="section">
      <div class="container contact">
        <div class="contact__text">
          <p class="statement">Rádi s vámi probereme vaše potřeby a navrhneme možnosti spolupráce.</p>
          <p class="contact__body">
            Kontaktujte nás a společně najdeme řešení, které vám umožní soustředit se na vaše obchodní cíle, zatímco my
            se postaráme o organizaci a koordinaci potřebných služeb.
          </p>

          <div v-if="isDev" class="dev-note" role="note">
            <strong>Poznámka pro vývojáře (zobrazuje se jen při <code>npm run dev</code>)</strong>
            <p>
              Doručování formuláře je
              <b>{{ deliveryReady ? 'nakonfigurováno (SMTP)' : 'NEnakonfigurováno' }}</b>.
              Pro zprovoznění nastavte proměnné <code>NUXT_SMTP_HOST</code>, <code>NUXT_SMTP_PORT</code>,
              <code>NUXT_SMTP_USER</code>, <code>NUXT_SMTP_PASS</code>, <code>NUXT_CONTACT_FROM</code> a
              <code>NUXT_CONTACT_TO</code> (viz <code>.env.example</code>). Bez nich endpoint
              <code>/api/contact</code> vrací 503 a formulář uživateli oznámí, že zpráva odeslána nebyla.
            </p>
          </div>
        </div>

        <ContactForm :delivery-ready="deliveryReady" :initial-status="initialStatus" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  gap: var(--space-7);
}

@media (min-width: 60rem) {
  .contact {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.3fr);
    gap: var(--space-8);
    align-items: start;
  }
}

.contact__body {
  margin-top: var(--space-5);
  color: var(--color-text-muted);
}

.dev-note {
  margin-top: var(--space-7);
  padding: var(--space-4) var(--space-5);
  border: 1px dashed var(--color-navy-600);
  border-radius: var(--radius);
  background: var(--color-navy-50);
  font-size: var(--text-sm);
}

.dev-note p {
  margin-top: var(--space-2);
}

.dev-note code {
  font-size: 0.85em;
  overflow-wrap: anywhere;
}
</style>
