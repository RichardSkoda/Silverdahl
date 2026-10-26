<script setup lang="ts">
import { consentCategories, cookieList } from '~/data/cookies'

const { t } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: () => t('cookies.page.seo.title'),
  description: () => t('cookies.page.seo.description'),
  page: 'cookies',
})

const { openSettings } = useCookieConsent()

// TODO: Doplnit odkaz na zásady ochrany osobních údajů a kontakt na správce (název, sídlo, IČO, e-mail),
// až budou k dispozici. Podklady je zatím neobsahují.
</script>

<template>
  <div>
    <PageIntro :eyebrow="$t('cookies.page.eyebrow')" :title="$t('cookies.page.title')">
      <p>{{ $t('cookies.page.intro') }}</p>
    </PageIntro>

    <section class="section">
      <div class="container container--narrow prose policy">
        <h2>{{ $t('cookies.page.whatTitle') }}</h2>
        <p>{{ $t('cookies.page.whatText') }}</p>

        <h2>{{ $t('cookies.page.categoriesTitle') }}</h2>
        <dl class="policy__categories">
          <div v-for="category in consentCategories" :key="category.id">
            <dt>
              {{ $t(`cookies.categories.${category.id}.title`) }}
              <span v-if="category.required" class="policy__badge">{{ $t('cookies.page.badgeRequired') }}</span>
              <span v-else class="policy__badge policy__badge--optional">{{ $t('cookies.page.badgeOptional') }}</span>
            </dt>
            <dd>{{ $t(`cookies.categories.${category.id}.description`) }}</dd>
          </div>
        </dl>

        <h2>{{ $t('cookies.page.usedTitle') }}</h2>
        <p>{{ $t('cookies.page.usedText') }}</p>
        <div class="policy__table-wrap">
          <table class="policy__table">
            <caption class="visually-hidden">{{ $t('cookies.page.tableCaption') }}</caption>
            <thead>
              <tr>
                <th scope="col">{{ $t('cookies.page.colName') }}</th>
                <th scope="col">{{ $t('cookies.page.colCategory') }}</th>
                <th scope="col">{{ $t('cookies.page.colProvider') }}</th>
                <th scope="col">{{ $t('cookies.page.colPurpose') }}</th>
                <th scope="col">{{ $t('cookies.page.colExpiry') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cookie in cookieList" :key="cookie.key">
                <td>
                  <code v-if="cookie.name">{{ cookie.name }}</code>
                  <template v-else>{{ $t(`cookies.list.${cookie.key}.name`) }}</template>
                </td>
                <td>{{ $t(`cookies.categories.${cookie.category}.title`) }}</td>
                <td>{{ $t(`cookies.list.${cookie.key}.provider`) }}</td>
                <td>{{ $t(`cookies.list.${cookie.key}.purpose`) }}</td>
                <td>{{ $t(`cookies.list.${cookie.key}.expiry`) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>{{ $t('cookies.page.changeTitle') }}</h2>
        <p>{{ $t('cookies.page.changeText') }}</p>
        <ClientOnly>
          <BaseButton class="policy__btn" @click="openSettings">{{ $t('cookies.page.openSettings') }}</BaseButton>
        </ClientOnly>
        <p>{{ $t('cookies.page.browserText') }}</p>
        <i18n-t keypath="cookies.page.questions" tag="p" scope="global">
          <template #link>
            <NuxtLink :to="localePath('kontakt')">{{ $t('cookies.page.questionsLink') }}</NuxtLink>
          </template>
        </i18n-t>
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

.policy > p {
  color: var(--color-text-muted);
}

.policy__categories {
  display: grid;
  gap: var(--space-3);
  margin: var(--space-4) 0 0;
}

.policy__categories > div {
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface-muted);
}

.policy__categories dt {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-navy-800);
}

.policy__categories dd {
  margin: var(--space-2) 0 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.policy__badge {
  padding: 0.1rem 0.55rem;
  border-radius: 999px;
  background: var(--color-success-bg);
  color: var(--color-success);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
}

.policy__badge--optional {
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
}

.policy__table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.policy__table {
  width: 100%;
  min-width: 36rem;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.policy__table th,
.policy__table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--color-border);
}

.policy__table th {
  background: var(--color-surface-muted);
  font-weight: 600;
  color: var(--color-navy-800);
}

.policy__table tbody tr:last-child td {
  border-bottom: 0;
}

.policy__table code {
  font-size: 0.85em;
  white-space: nowrap;
}

/* Sloupec „Účel“ má nejdelší text – dostane víc místa, platnost se nezalamuje. */
.policy__table td:nth-child(4) {
  min-width: 15rem;
}

.policy__table td:nth-child(5) {
  white-space: nowrap;
}

.policy__btn {
  margin-block: var(--space-2);
}
</style>
