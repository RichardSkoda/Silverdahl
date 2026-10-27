<script setup lang="ts">
// Vstupní stránka pro hledání typu „vstup na český trh“ / „Czech market entry“ / „Markteintritt Tschechien“.
// Texty v překladech marketEntry.*; časté dotazy jsou na samostatné stránce caste-dotazy.vue.
const { t } = useI18n()
const localePath = useLocalePath()
const { records } = useMessageList()

const reasons = computed(() => records('marketEntry.why.items', ['title', 'text'] as const))
const needs = computed(() => records('marketEntry.needs.items', ['title', 'text'] as const))
const steps = computed(() => records('marketEntry.process.items', ['title', 'text'] as const))

usePageSeo({
  title: () => t('marketEntry.seo.title'),
  description: () => t('marketEntry.seo.description'),
  page: 'vstup-na-trh',
})
</script>

<template>
  <div>
    <PageIntro :eyebrow="$t('marketEntry.intro.eyebrow')" :title="$t('marketEntry.intro.title')">
      <p>{{ $t('marketEntry.intro.text') }}</p>
    </PageIntro>

    <section class="section section--surface" aria-labelledby="proc-nadpis">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">{{ $t('marketEntry.why.eyebrow') }}</p>
          <h2 id="proc-nadpis">{{ $t('marketEntry.why.title') }}</h2>
        </div>
        <ul class="tiles">
          <li v-for="(item, i) in reasons" :key="item.title" class="tile">
            <span class="tile__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="tile__title">{{ item.title }}</h3>
            <p class="tile__text">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section" aria-labelledby="potreby-nadpis">
      <div class="container split">
        <div>
          <p class="eyebrow">{{ $t('marketEntry.needs.eyebrow') }}</p>
          <h2 id="potreby-nadpis">{{ $t('marketEntry.needs.title') }}</h2>
          <p class="split__lead">{{ $t('marketEntry.needs.text') }}</p>
        </div>
        <dl class="needs">
          <div v-for="item in needs" :key="item.title" class="needs__item">
            <dt>{{ item.title }}</dt>
            <dd>{{ item.text }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="postup-nadpis">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">{{ $t('marketEntry.process.eyebrow') }}</p>
          <h2 id="postup-nadpis">{{ $t('marketEntry.process.title') }}</h2>
        </div>
        <ol class="process">
          <li v-for="item in steps" :key="item.title" class="process__step">
            <h3 class="process__title">{{ item.title }}</h3>
            <p class="process__text">{{ item.text }}</p>
          </li>
        </ol>
        <p class="process__more">
          <NuxtLink :to="localePath('sluzby')">{{ $t('marketEntry.process.servicesLink') }}</NuxtLink>
        </p>
      </div>
    </section>

    <section class="section section--navy" aria-labelledby="zkusenost-nadpis">
      <div class="container proof">
        <div>
          <p class="eyebrow">{{ $t('marketEntry.proof.eyebrow') }}</p>
          <h2 id="zkusenost-nadpis">{{ $t('marketEntry.proof.title') }}</h2>
        </div>
        <div class="proof__body">
          <p>{{ $t('marketEntry.proof.text') }}</p>
          <BaseButton :to="localePath('case-study')" variant="inverse" class="proof__btn">
            {{ $t('home.case.button') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="dotazy-nadpis">
      <div class="container faq-teaser">
        <div>
          <h2 id="dotazy-nadpis">{{ $t('marketEntry.faqTeaser.title') }}</h2>
          <p>{{ $t('marketEntry.faqTeaser.text') }}</p>
        </div>
        <BaseButton :to="localePath('caste-dotazy')" variant="secondary">{{ $t('marketEntry.faqTeaser.link') }}</BaseButton>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.tiles {
  list-style: none;
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 48rem) {
  .tiles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 72rem) {
  .tiles {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.tile {
  padding: var(--space-6) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
}

.tile__num {
  display: block;
  margin-bottom: var(--space-4);
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-step-1-num);
}

.tile__title {
  font-size: var(--text-lg);
}

.tile__text {
  margin-top: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.split {
  display: grid;
  gap: var(--space-6);
}

@media (min-width: 60rem) {
  .split {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.3fr);
    gap: var(--space-8);
  }
}

.split h2 {
  font-size: var(--text-2xl);
}

.split__lead {
  margin-top: var(--space-4);
  color: var(--color-text-muted);
}

.needs {
  display: grid;
  gap: var(--space-4);
  margin: 0;
}

@media (min-width: 40rem) {
  .needs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.needs__item {
  padding-left: var(--space-4);
  border-left: 3px solid var(--color-accent-soft);
}

.needs__item dt {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-navy-800);
}

.needs__item dd {
  margin: var(--space-1) 0 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.process {
  list-style: none;
  counter-reset: step;
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 60rem) {
  .process {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.process__step {
  counter-increment: step;
  position: relative;
  padding-top: var(--space-7);
}

.process__step::before {
  content: counter(step);
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--color-navy-800);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 600;
}

.process__title {
  font-size: var(--text-lg);
}

.process__text {
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.process__more {
  margin-top: var(--space-6);
  font-weight: 600;
}

.process__more a {
  color: var(--color-accent-strong);
}

.proof {
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 60rem) {
  .proof {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: var(--space-8);
    align-items: center;
  }
}

.proof__body {
  color: var(--color-text-inverse-muted);
}

.proof__btn {
  margin-top: var(--space-5);
}

.faq-teaser {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5) var(--space-7);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-muted);
}

.faq-teaser h2 {
  font-size: var(--text-2xl);
}

.faq-teaser p {
  margin-top: var(--space-2);
  max-width: 40rem;
  color: var(--color-text-muted);
}
</style>
