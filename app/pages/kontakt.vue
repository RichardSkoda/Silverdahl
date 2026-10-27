<script setup lang="ts">
import type { ContactStatus } from '#shared/contact'
import { company } from '~/data/company'

const { t } = useI18n()

usePageSeo({
  title: () => t('contact.seo.title'),
  description: () => t('contact.seo.description'),
  page: 'kontakt',
  schemaType: 'ContactPage',
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

// Adresa, telefon a e-mail jsou převzaté ze současného webu (viz data/company.ts).
// TODO: Doplnit IČO a další firemní údaje, až budou ověřeny.
</script>

<template>
  <div>
    <PageIntro :eyebrow="$t('contact.intro.eyebrow')" :title="$t('contact.intro.title')">
      <p>{{ $t('contact.intro.text') }}</p>
    </PageIntro>

    <section class="section">
      <div class="container contact">
        <div class="contact__text">
          <p class="statement">{{ $t('contact.statement') }}</p>
          <p class="contact__body">{{ $t('contact.body') }}</p>

          <address>
            <dl class="details">
              <div class="details__item">
                <dt class="details__label">{{ $t('contact.details.address') }}</dt>
                <dd>
                  {{ company.address.street }}<br />
                  {{ company.address.city }}<br />
                  {{ $t('contact.details.country') }}
                </dd>
              </div>
              <div class="details__item">
                <dt class="details__label">{{ $t('contact.details.phone') }}</dt>
                <dd><a :href="company.phone.href">{{ company.phone.label }}</a></dd>
              </div>
              <div class="details__item">
                <dt class="details__label">{{ $t('contact.details.email') }}</dt>
                <dd><a :href="`mailto:${company.email}`">{{ company.email }}</a></dd>
              </div>
            </dl>
          </address>

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

    <section class="section section--muted" aria-labelledby="mapa-nadpis">
      <div class="container">
        <div class="section-head map-head">
          <p class="eyebrow">{{ $t('contact.map.eyebrow') }}</p>
          <h2 id="mapa-nadpis">{{ company.address.street }}, {{ company.address.city }}</h2>
        </div>
        <GoogleMap :query="company.mapQuery" :label="`${company.name}, ${company.address.street}, ${company.address.city}`" />
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

address {
  font-style: normal;
}

.details {
  display: grid;
  gap: var(--space-5);
  margin: var(--space-6) 0 0;
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.details__label {
  margin-bottom: var(--space-1);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

.details__item dd {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  line-height: 1.45;
  color: var(--color-navy-800);
}

.details__item a {
  color: inherit;
  text-decoration-color: var(--color-border-strong);
}

.details__item a:hover {
  text-decoration-color: currentColor;
}

.map-head {
  margin-bottom: var(--space-6);
}

.map-head h2 {
  font-size: var(--text-2xl);
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
