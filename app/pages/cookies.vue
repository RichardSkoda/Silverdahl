<script setup lang="ts">
import { consentCategories, cookieList } from '~/data/cookies'

usePageSeo({
  title: 'Zásady cookies',
  description: 'Jaké cookies web Silverdahl používá, k čemu slouží a jak můžete svůj souhlas kdykoli změnit.',
  path: '/cookies',
})

const { openSettings } = useCookieConsent()
const categoryTitle = (id: string) => consentCategories.find((c) => c.id === id)?.title ?? id

// TODO: Doplnit odkaz na zásady ochrany osobních údajů a kontakt na správce (název, sídlo, IČO, e-mail),
// až budou k dispozici. Podklady je zatím neobsahují.
</script>

<template>
  <div>
    <PageIntro eyebrow="Právní informace" title="Zásady používání cookies">
      <p>Na této stránce najdete, jaké cookies web používá, k čemu slouží a jak můžete svůj souhlas změnit.</p>
    </PageIntro>

    <section class="section">
      <div class="container container--narrow prose policy">
        <h2>Co jsou cookies</h2>
        <p>
          Cookies jsou malé textové soubory, které web ukládá do vašeho prohlížeče. Umožňují například zapamatovat si
          vaše nastavení nebo zjistit, jak návštěvníci web používají.
        </p>

        <h2>Kategorie cookies</h2>
        <dl class="policy__categories">
          <div v-for="category in consentCategories" :key="category.id">
            <dt>
              {{ category.title }}
              <span v-if="category.required" class="policy__badge">vždy aktivní</span>
              <span v-else class="policy__badge policy__badge--optional">jen se souhlasem</span>
            </dt>
            <dd>{{ category.description }}</dd>
          </div>
        </dl>

        <h2>Jaké cookies používáme</h2>
        <p>
          Web sám používá pouze nezbytnou cookie, která si pamatuje vaši volbu. Na stránce Kontakt můžete se souhlasem
          zobrazit mapu Google – teprve pak Google ukládá své cookies. Analytické ani marketingové nástroje zatím
          nevyužíváme; pokud je v budoucnu zapojíme, uvedeme je v této tabulce a spustí se jen s vaším souhlasem.
        </p>
        <div class="policy__table-wrap">
          <table class="policy__table">
            <caption class="visually-hidden">Přehled používaných cookies</caption>
            <thead>
              <tr>
                <th scope="col">Název</th>
                <th scope="col">Kategorie</th>
                <th scope="col">Poskytovatel</th>
                <th scope="col">Účel</th>
                <th scope="col">Platnost</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cookie in cookieList" :key="cookie.name">
                <td><code>{{ cookie.name }}</code></td>
                <td>{{ categoryTitle(cookie.category) }}</td>
                <td>{{ cookie.provider }}</td>
                <td>{{ cookie.purpose }}</td>
                <td>{{ cookie.expiry }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Jak souhlas změnit nebo odvolat</h2>
        <p>
          Svou volbu můžete kdykoli změnit nebo souhlas odvolat – stejně snadno, jako jste ho udělili. Stačí otevřít
          nastavení cookies (odkaz je také v patičce každé stránky).
        </p>
        <ClientOnly>
          <BaseButton class="policy__btn" @click="openSettings">Otevřít nastavení cookies</BaseButton>
        </ClientOnly>
        <p>
          Cookies můžete také smazat nebo zablokovat v nastavení svého prohlížeče. Zablokování nezbytných cookies může
          omezit fungování webu – lišta se souhlasem se pak bude zobrazovat při každé návštěvě.
        </p>
        <p>
          S dotazy se na nás obraťte prostřednictvím <NuxtLink to="/kontakt">kontaktního formuláře</NuxtLink>.
        </p>
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
