<script setup lang="ts">
const { t } = useI18n()
const { strings, records } = useMessageList()

usePageSeo({
  title: () => t('caseStudy.seo.title'),
  description: () => t('caseStudy.seo.description'),
  page: 'case-study',
})

// Údaje přesně podle podkladů. „period“ odlišuje historické maximum od současného provozu.
const stats = computed(() => records('caseStudy.stats.items', ['value', 'label', 'period'] as const))
const partners = computed(() => strings('caseStudy.model.partners'))
</script>

<template>
  <div>
    <PageIntro :eyebrow="$t('caseStudy.intro.eyebrow')" title="Courlux International SA">
      <p class="cs-subtitle">{{ $t('caseStudy.intro.subtitle') }}</p>
      <p>{{ $t('caseStudy.intro.text') }}</p>
    </PageIntro>

    <section class="section section--surface" aria-labelledby="ukol-nadpis">
      <div class="container container--narrow">
        <h2 id="ukol-nadpis" class="visually-hidden">{{ $t('caseStudy.task.heading') }}</h2>
        <p class="statement">{{ $t('caseStudy.task.statement') }}</p>
      </div>
    </section>

    <section class="section" aria-labelledby="pribeh-nadpis">
      <div class="container story">
        <div class="prose">
          <p class="eyebrow">{{ $t('caseStudy.story.eyebrow') }}</p>
          <h2 id="pribeh-nadpis">{{ $t('caseStudy.story.title') }}</h2>
          <p>{{ $t('caseStudy.story.p1') }}</p>
          <p>{{ $t('caseStudy.story.p2') }}</p>
          <aside class="highlight" :aria-label="$t('caseStudy.story.highlightLabel')">
            <p class="highlight__tag">{{ $t('caseStudy.story.highlightTag') }}</p>
            <p>{{ $t('caseStudy.story.highlight') }}</p>
          </aside>
          <p>{{ $t('caseStudy.story.p3') }}</p>
        </div>
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="dnes-nadpis">
      <div class="container today">
        <div class="prose">
          <p class="eyebrow">{{ $t('caseStudy.today.eyebrow') }}</p>
          <h2 id="dnes-nadpis">{{ $t('caseStudy.today.title') }}</h2>
          <p>{{ $t('caseStudy.today.p1') }}</p>
          <p>{{ $t('caseStudy.today.p2') }}</p>
          <p>{{ $t('caseStudy.today.p3') }}</p>
          <p>{{ $t('caseStudy.today.p4') }}</p>
        </div>

        <figure class="model">
          <div class="model__box">
            <p class="model__name">Courlux International SA</p>
            <p class="model__desc">{{ $t('caseStudy.model.hqDesc') }}</p>
          </div>
          <span class="model__arrow" aria-hidden="true">⇅</span>
          <div class="model__box model__box--main">
            <p class="model__name">Silverdahl</p>
            <p class="model__role">Local Operations Management</p>
            <p class="model__desc">{{ $t('caseStudy.model.silverdahlDesc') }}</p>
          </div>
          <span class="model__arrow" aria-hidden="true">⇅</span>
          <ul class="model__partners">
            <li v-for="partner in partners" :key="partner">{{ partner }}</li>
          </ul>
          <figcaption>{{ $t('caseStudy.model.caption') }}</figcaption>
        </figure>
      </div>
    </section>

    <section class="section" aria-labelledby="cisla-nadpis">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">{{ $t('caseStudy.stats.eyebrow') }}</p>
          <h2 id="cisla-nadpis">{{ $t('caseStudy.stats.title') }}</h2>
        </div>
        <dl class="stats">
          <StatItem v-for="stat in stats" :key="stat.label" v-bind="stat" />
        </dl>
      </div>
    </section>

    <section class="section section--navy" aria-labelledby="prinos-nadpis">
      <div class="container container--narrow">
        <h2 id="prinos-nadpis">{{ $t('caseStudy.benefit.title') }}</h2>
        <div class="prose benefit">
          <p>{{ $t('caseStudy.benefit.p1') }}</p>
          <p>{{ $t('caseStudy.benefit.p2') }}</p>
        </div>
        <p class="benefit__statement">{{ $t('caseStudy.benefit.statement') }}</p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.cs-subtitle {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-navy-700);
  font-weight: 500;
  line-height: var(--leading-snug);
}

.story .prose,
.today .prose {
  color: var(--color-text-muted);
}

.story .prose h2,
.today .prose h2 {
  margin-bottom: var(--space-5);
}

.highlight {
  margin-block: var(--space-6);
  padding: var(--space-5);
  border-left: 3px solid var(--color-accent);
  background: var(--color-accent-soft);
  border-radius: 0 var(--radius) var(--radius) 0;
  color: var(--color-navy-900);
  font-weight: 500;
}

.highlight__tag {
  margin-bottom: var(--space-2);
  font-size: var(--text-xs);
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-strong);
}

.highlight__tag + p {
  margin-top: 0;
}

.today {
  display: grid;
  gap: var(--space-7);
}

@media (min-width: 64rem) {
  .today {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
  }
}

/* Schéma modelu spolupráce */
.model {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  text-align: center;
}

.model__box {
  width: 100%;
  padding: var(--space-4);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius);
  background: var(--color-surface);
}

.model__box--main {
  background: var(--color-navy-800);
  border-color: var(--color-navy-800);
  color: var(--color-text-inverse-muted);
}

.model__box--main .model__name {
  color: #fff;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.model__name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-navy-800);
}

.model__role {
  margin-top: var(--space-1) !important;
  font-weight: 600;
  color: var(--color-accent-on-dark);
}

.model__desc {
  margin-top: var(--space-1) !important;
  font-size: var(--text-sm);
}

.model__box:not(.model__box--main) .model__desc {
  color: var(--color-text-muted);
}

.model__arrow {
  font-size: 1.25rem;
  line-height: 1;
  color: var(--color-navy-600);
}

.model__partners {
  list-style: none;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}

.model__partners li {
  padding: var(--space-3);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius);
  background: var(--color-surface);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-navy-800);
}

.model figcaption {
  margin-top: var(--space-3);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* Statistiky */
.stats {
  display: grid;
  gap: var(--space-6) var(--space-5);
  margin: 0;
}

@media (min-width: 36rem) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .stats {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

.benefit {
  margin-top: var(--space-5);
  color: var(--color-text-inverse-muted);
}

.benefit__statement {
  margin-top: var(--space-6);
  padding-left: var(--space-5);
  border-left: 3px solid var(--color-accent);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  line-height: var(--leading-snug);
  color: #fff;
}
</style>
