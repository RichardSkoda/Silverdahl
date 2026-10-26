<script setup lang="ts">
const { t } = useI18n()
const services = useServices()

// Ilustrace karet v přehledu podle grafického návrhu: glóbus s trasou, síť partnerů, řízení provozu.
const illustrations = [
  '/images/ilustrace-vstup-na-trh.svg',
  '/images/ilustrace-partneri.svg',
  '/images/ilustrace-provoz.svg',
]

usePageSeo({
  title: () => t('services.seo.title'),
  description: () => t('services.seo.description'),
  page: 'sluzby',
})
</script>

<template>
  <div>
    <PageIntro :eyebrow="$t('services.intro.eyebrow')" :title="$t('services.intro.title')">
      <p>{{ $t('services.intro.p1') }}</p>
      <p>{{ $t('services.intro.p2') }}</p>
    </PageIntro>

    <!-- Přehled tří služeb podle grafického návrhu v podkladech -->
    <section class="overview" aria-labelledby="prehled-nadpis">
      <div class="container overview__inner">
        <h2 id="prehled-nadpis" class="overview__title">{{ $t('services.overview.title') }}</h2>
        <p class="overview__text">{{ $t('services.overview.text') }}</p>
        <ol class="overview__list">
          <li v-for="(service, i) in services" :key="service.id" class="ocard">
            <div class="ocard__head">
              <span class="ocard__num" aria-hidden="true">{{ i + 1 }}</span>
              <div>
                <h3 class="ocard__title">
                  <a :href="`#${service.id}`">{{ service.name }}</a>
                </h3>
                <p class="ocard__sub">{{ service.subtitle }}</p>
              </div>
            </div>
            <img :src="illustrations[i]" alt="" class="ocard__art" width="240" height="180" loading="lazy" />
            <ul class="check-list ocard__items">
              <li v-for="item in service.items" :key="item.title">{{ item.title }}</li>
            </ul>
            <p v-if="service.areasShort" class="ocard__areas">
              <ServiceIcon name="people" class="ocard__areas-icon" />
              <span>{{ $t('services.overview.areas', { areas: service.areasShort }) }}</span>
            </p>
            <div class="ocard__benefit">
              <svg class="ocard__gem" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 3h12l4 6-10 12L2 9z M2 9h20 M12 21 8 9l4-6 4 6z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" />
              </svg>
              <div>
                <p class="ocard__benefit-title">{{ $t('common.benefitTitle') }}</p>
                <p>{{ service.benefitShort }}</p>
              </div>
            </div>
            <svg v-if="i < services.length - 1" class="ocard__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M3 12h17M14 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </li>
        </ol>
      </div>
    </section>

    <ServiceSection v-for="service in services" :key="service.id" :service="service" />

    <section class="section section--muted" aria-labelledby="spoluprace-nadpis">
      <div class="container container--narrow">
        <h2 id="spoluprace-nadpis">{{ $t('services.needs.title') }}</h2>
        <div class="prose needs">
          <p>{{ $t('services.needs.p1') }}</p>
          <p>{{ $t('services.needs.p2') }}</p>
        </div>
        <p class="statement needs__statement">{{ $t('services.needs.statement') }}</p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.overview {
  padding-block: var(--space-section);
  background: linear-gradient(180deg, #f6f9fd 0%, #ffffff 100%);
  border-bottom: 1px solid var(--color-border);
}

.overview__inner {
  max-width: calc(80rem + 2 * var(--gutter));
}

.overview__title {
  font-size: var(--text-3xl);
  text-align: center;
}

.overview__text {
  margin-top: var(--space-3);
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  text-align: center;
}

.overview__list {
  list-style: none;
  display: grid;
  gap: var(--space-6);
  margin-top: var(--space-7);
}

@media (min-width: 64rem) {
  .overview__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-7);
  }
}

.ocard {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.ocard__head {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

@media (min-width: 64rem) {
  .ocard__head {
    min-height: 7.75rem;
  }
}

.ocard__num {
  display: grid;
  place-items: center;
  flex: none;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: var(--color-accent-soft);
  color: var(--color-accent-strong);
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
}

.ocard__title {
  font-size: var(--text-lg);
}

.ocard__title a {
  color: inherit;
  text-decoration: none;
}

.ocard__title a:hover {
  text-decoration: underline;
}

.ocard__sub {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  line-height: 1.4;
  color: var(--color-text-muted);
}

.ocard__art {
  width: 100%;
  max-width: 15rem;
  height: auto;
  margin: var(--space-2) auto var(--space-5);
}

.ocard__items {
  gap: var(--space-2);
  padding-inline: var(--space-2);
  font-size: var(--text-sm);
}

.ocard__areas {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-5);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--color-text-muted);
}

.ocard__areas-icon {
  flex: none;
  width: 1.75rem;
  height: 1.75rem;
  color: var(--color-navy-700);
}

.ocard__benefit {
  display: flex;
  gap: var(--space-4);
  margin-top: auto;
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius);
  background: var(--color-accent-soft);
  font-size: var(--text-sm);
  line-height: 1.5;
}

.ocard__items + .ocard__benefit,
.ocard__areas + .ocard__benefit {
  margin-top: var(--space-5);
}

/* Karty stejně vysoké – box s přínosem drží dole */
.ocard__items {
  flex: 1;
  align-content: start;
}

.ocard__benefit p + p {
  margin-top: 0;
}

.ocard__gem {
  flex: none;
  width: 2.25rem;
  height: 2.25rem;
  color: var(--color-accent-strong);
}

.ocard__benefit-title {
  margin-bottom: var(--space-1);
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-accent-strong);
}

.ocard__arrow {
  display: none;
}

@media (min-width: 64rem) {
  .ocard__arrow {
    display: block;
    position: absolute;
    top: 40%;
    right: calc(-1 * var(--space-7) / 2);
    width: 1.75rem;
    color: var(--color-accent);
    transform: translateX(50%);
  }
}


.needs {
  margin-top: var(--space-5);
  color: var(--color-text-muted);
}

.needs__statement {
  margin-top: var(--space-6);
}
</style>
