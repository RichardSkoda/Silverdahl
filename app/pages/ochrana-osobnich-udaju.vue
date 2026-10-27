<script setup lang="ts">
import { company } from '~/data/company'

// Zásady ochrany osobních údajů (GDPR). Texty v překladech privacy.*.
// TODO: Jde o vzorový text podle toho, jak web skutečně funguje (kontaktní formulář, cookies, mapa Google).
// Před spuštěním ho nechat zkontrolovat právníkem a doplnit skutečné údaje správce (data/company.ts),
// poskytovatele hostingu a e-mailu a datum účinnosti.
const { t } = useI18n()
const localePath = useLocalePath()
const { strings } = useMessageList()

usePageSeo({
  title: () => t('privacy.seo.title'),
  description: () => t('privacy.seo.description'),
  page: 'ochrana-osobnich-udaju',
})

const sectionKeys = ['data', 'purposes', 'retention', 'recipients', 'transfers', 'rights', 'security'] as const
const sections = computed(() =>
  sectionKeys.map((key) => ({
    key,
    title: t(`privacy.sections.${key}.title`),
    paragraphs: strings(`privacy.sections.${key}.paragraphs`),
    items: strings(`privacy.sections.${key}.items`),
  })),
)
</script>

<template>
  <div>
    <PageIntro :eyebrow="$t('cookies.page.eyebrow')" :title="$t('privacy.title')">
      <p>{{ $t('privacy.intro') }}</p>
    </PageIntro>

    <section class="section">
      <div class="container container--narrow prose policy">
        <h2>{{ $t('privacy.controller.title') }}</h2>
        <p>{{ $t('privacy.controller.text') }}</p>
        <address class="policy__card">
          <strong>{{ company.name }}</strong><br />
          {{ company.address.street }}, {{ company.address.postalCode }} {{ company.address.city }}<br />
          {{ $t('footer.ico') }} {{ company.legal.ico }}<br />
          {{ $t('footer.register', { file: company.legal.registerFile }) }}<br />
          {{ $t('contact.details.email') }}: <a :href="`mailto:${company.email}`">{{ company.email }}</a><br />
          {{ $t('contact.details.phone') }}: <a :href="company.phone.href">{{ company.phone.label }}</a>
        </address>

        <template v-for="section in sections" :key="section.key">
          <h2>{{ section.title }}</h2>
          <p v-for="(paragraph, i) in section.paragraphs" :key="i">{{ paragraph }}</p>
          <ul v-if="section.items.length" class="policy__list">
            <li v-for="(item, i) in section.items" :key="i">{{ item }}</li>
          </ul>
        </template>

        <h2>{{ $t('privacy.cookies.title') }}</h2>
        <i18n-t keypath="privacy.cookies.text" tag="p" scope="global">
          <template #link>
            <NuxtLink :to="localePath('cookies')">{{ $t('footer.cookiePolicy') }}</NuxtLink>
          </template>
        </i18n-t>

        <h2>{{ $t('privacy.contact.title') }}</h2>
        <i18n-t keypath="privacy.contact.text" tag="p" scope="global">
          <template #email>
            <a :href="`mailto:${company.email}`">{{ company.email }}</a>
          </template>
        </i18n-t>
        <p class="policy__updated">{{ $t('privacy.updated') }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.policy h2 {
  margin-top: var(--space-7);
  font-size: var(--text-2xl);
}

.policy h2:first-child {
  margin-top: 0;
}

.policy > p,
.policy__list {
  color: var(--color-text-muted);
}

.policy__card {
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface-muted);
  font-style: normal;
  line-height: 1.7;
}

.policy__list {
  display: grid;
  gap: var(--space-2);
  padding-left: 1.25rem;
}

.policy__updated {
  margin-top: var(--space-7);
  font-size: var(--text-sm);
}
</style>
