<script setup lang="ts">
// Časté dotazy. Texty v překladech faq.*; otázky a odpovědi jdou i do strukturovaných dat (FAQPage).
const { t } = useI18n()
const localePath = useLocalePath()
const { records } = useMessageList()

const faq = computed(() => records('faq.items', ['q', 'a'] as const))

usePageSeo({
  title: () => t('faq.seo.title'),
  description: () => t('faq.seo.description'),
  page: 'caste-dotazy',
  schemaType: 'FAQPage',
  pageProps: () => ({
    mainEntity: faq.value.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }),
})
</script>

<template>
  <div>
    <PageIntro :eyebrow="$t('faq.eyebrow')" :title="$t('faq.title')">
      <p>{{ $t('faq.intro') }}</p>
    </PageIntro>

    <section class="section" :aria-label="$t('faq.eyebrow')">
      <div class="container container--narrow">
        <div class="faq">
          <details v-for="item in faq" :key="item.q" class="faq__item">
            <summary class="faq__q">{{ item.q }}</summary>
            <p class="faq__a">{{ item.a }}</p>
          </details>
        </div>
        <p class="faq__more">
          <NuxtLink :to="localePath('vstup-na-trh')">{{ $t('nav.marketEntry') }} →</NuxtLink>
        </p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.faq {
  display: grid;
  gap: var(--space-3);
}

.faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-bg);
}

.faq__q {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-navy-800);
  cursor: pointer;
  list-style: none;
}

.faq__q::-webkit-details-marker {
  display: none;
}

.faq__q::after {
  content: '+';
  flex: none;
  font-size: 1.25rem;
  line-height: 1.2;
  color: var(--color-accent-strong);
}

.faq__item[open] .faq__q::after {
  content: '−';
}

.faq__a {
  padding: 0 var(--space-5) var(--space-5);
  color: var(--color-text-muted);
}

.faq__more {
  margin-top: var(--space-6);
  font-weight: 600;
}

.faq__more a {
  color: var(--color-accent-strong);
}
</style>
