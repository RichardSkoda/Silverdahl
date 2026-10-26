<script setup lang="ts">
import { services } from '~/data/services'
import type { IconName } from '~/components/ServiceIcon.vue'

usePageSeo({
  title: 'Váš partner pro evropské trhy',
  description:
    'Silverdahl pomáhá zahraničním společnostem vstupovat na nové trhy, vyhledávat spolehlivé partnery a řídit lokální provozní procesy.',
  path: '/',
})

// Přednosti z grafického návrhu domovské stránky v podkladech.
const strengths: { title: string; text: string; icon: IconName }[] = [
  { title: 'Znalost lokálního prostředí', text: 'Dlouholeté zkušenosti s evropskými trhy.', icon: 'globe' },
  { title: 'Ověření obchodní partneři', text: 'Síť spolehlivých dodavatelů z různých oborů.', icon: 'people' },
  { title: 'Komplexní odpovědnost', text: 'Od přípravy vstupu na trh po každodenní provoz.', icon: 'gear' },
  { title: 'Pravidelný reporting', text: 'Přehled o výsledcích a kontrole nákladů.', icon: 'bars' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero" aria-labelledby="hero-nadpis">
      <div class="hero__art" aria-hidden="true">
        <img src="/images/mapa-evropy.svg" alt="" class="hero__map" width="800" height="560" />
        <img src="/images/hero-budova.webp" alt="" class="hero__building" width="260" height="744" />
      </div>
      <div class="container hero__content">
        <p class="eyebrow hero__eyebrow">Váš partner pro evropské trhy</p>
        <h1 id="hero-nadpis" class="hero__title">
          Od strategie <span class="hero__line">k&nbsp;úspěšnému provozu</span>
        </h1>
        <p class="hero__lead">
          Pomáháme zahraničním společnostem vstupovat na nové trhy, vyhledávat spolehlivé partnery a řídit lokální
          provozní procesy.
        </p>
        <BaseButton to="/sluzby" class="hero__cta">
          Zjistěte, jak můžeme pomoci
          <svg class="hero__cta-arrow" viewBox="0 0 28 12" aria-hidden="true" focusable="false">
            <path d="M0 6h26M21 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.4" />
          </svg>
        </BaseButton>
      </div>
    </section>

    <!-- Tři kroky spolupráce -->
    <section class="steps" aria-labelledby="sluzby-nadpis">
      <div class="container">
        <h2 id="sluzby-nadpis" class="visually-hidden">Naše služby – tři kroky spolupráce</h2>
        <ol class="steps__list">
          <li v-for="(service, i) in services" :key="service.id" class="step" :class="`step--${i + 1}`">
            <div class="step__media">
              <img :src="service.image" alt="" class="step__photo" width="456" height="336" loading="lazy" />
              <span class="step__icon" aria-hidden="true">
                <ServiceIcon :name="service.icon" />
              </span>
              <span class="step__num" aria-hidden="true">{{ service.number }}</span>
            </div>
            <h3 class="step__title">{{ service.name }}</h3>
            <p class="step__tagline">{{ service.tagline }}</p>
            <p class="step__text">{{ service.summary }}</p>
            <NuxtLink :to="`/sluzby#${service.id}`" class="step__link">
              Více o službě<span class="visually-hidden"> {{ service.name }}</span>
              <span aria-hidden="true">→</span>
            </NuxtLink>
            <svg v-if="i < services.length - 1" class="step__arrow" viewBox="0 0 48 16" aria-hidden="true" focusable="false">
              <path d="M1 8h44M38 1l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </li>
        </ol>
      </div>
    </section>

    <!-- Přednosti -->
    <section class="strengths" aria-labelledby="prednosti-nadpis">
      <h2 id="prednosti-nadpis" class="visually-hidden">Proč Silverdahl</h2>
      <ul class="container strengths__list">
        <li v-for="item in strengths" :key="item.title" class="strength">
          <ServiceIcon :name="item.icon" class="strength__icon" />
          <div>
            <h3 class="strength__title">{{ item.title }}</h3>
            <p class="strength__text">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Hlavní sdělení -->
    <section class="section section--muted" aria-labelledby="sdeleni-nadpis">
      <div class="container message">
        <p class="eyebrow">Silverdahl</p>
        <h2 id="sdeleni-nadpis" class="message__title">Your Local Operations Partner in Central Europe</h2>
        <p class="message__question">
          Chcete začít podnikat v České republice nebo rozšířit své aktivity na další evropské trhy?
        </p>
        <p class="message__strong">
          Nemusíte zde budovat vlastní tým ani sami vyhledávat a řídit řadu lokálních dodavatelů.
        </p>
        <p class="message__text">
          Pomůžeme vám najít vhodné partnery, nastavit potřebné procesy a zajistíme jejich koordinaci, kontrolu a
          pravidelný reporting.
        </p>
      </div>
    </section>

    <!-- Odpovědnost za provoz -->
    <section class="section section--navy" aria-labelledby="odpovednost-nadpis">
      <div class="container responsibility">
        <div>
          <p class="eyebrow">Jak spolupracujeme</p>
          <h2 id="odpovednost-nadpis">Naše spolupráce nekončí výběrem vhodných dodavatelů</h2>
        </div>
        <p class="responsibility__body">
          Přebíráme odpovědnost za koordinaci svěřených procesů, průběžně kontrolujeme jejich fungování a výsledky a
          poskytujeme pravidelný reporting vedení společnosti. Klient se tak může soustředit na rozvoj svého podnikání,
          zatímco každodenní provozní agendu zajišťuje Silverdahl.
        </p>
      </div>
    </section>

    <!-- Case study teaser -->
    <section class="section" aria-labelledby="reference-nadpis">
      <div class="container">
        <div class="case">
          <div class="case__content">
            <p class="eyebrow">Case study / Reference</p>
            <h2 id="reference-nadpis" class="case__title">Courlux International SA</h2>
            <p class="case__subtitle">Dlouhodobé řízení a koordinace obchodních procesů na trzích střední Evropy</p>
            <p class="case__text">
              Švýcarská obchodní společnost Courlux International SA využívá Silverdahl jako svého dlouhodobého
              partnera pro zajištění obchodních a provozních aktivit v České republice, na Slovensku, v Polsku a
              Maďarsku.
            </p>
            <BaseButton to="/case-study" variant="secondary" class="case__btn">Přečíst case study</BaseButton>
          </div>
          <dl class="case__stats">
            <StatItem value="30+" label="let dlouhodobého partnerství" />
            <StatItem value="4" label="trhy – Česká republika, Slovensko, Polsko a Maďarsko" />
            <StatItem value="CH → CEE" label="švýcarská centrála a střední Evropa" />
          </dl>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
/* ---------- Hero ---------- */
.hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #eef3f9 0%, #f6f9fc 60%, #fbfcfe 100%);
}

.hero__content {
  position: relative;
  min-width: 0;
  padding-block: clamp(3rem, 2rem + 4vw, 6rem) clamp(3rem, 2rem + 4vw, 5.5rem);
}

.hero__eyebrow {
  margin-bottom: var(--space-5);
}

.hero__title {
  max-width: 12em;
  font-size: clamp(2.125rem, 1.2rem + 4.2vw, 4.5rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.hero__line {
  display: block;
}

.hero__lead {
  max-width: 34rem;
  margin-top: var(--space-5);
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}

.hero__cta {
  margin-top: var(--space-6);
  min-height: 3.25rem;
  padding-inline: 1.6rem;
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: 0 10px 24px -14px rgb(20 40 75 / 0.6);
}

.hero__cta-arrow {
  width: 1.6rem;
  height: auto;
  transition: transform var(--transition);
}

.hero__cta:hover .hero__cta-arrow {
  transform: translateX(3px);
}

/* Mapa Evropy + fotografie budovy, rozplynuté do pozadí */
.hero__art {
  position: relative;
  height: 17rem;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 25%, #000 55%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0%, #000 25%, #000 55%, transparent 100%);
}

.hero__map {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 55% 55%;
  opacity: 0.9;
}

.hero__building {
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
  height: 100%;
  object-fit: cover;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 55%);
  mask-image: linear-gradient(90deg, transparent 0%, #000 55%);
}

@media (max-width: 59.99rem) {
  .hero {
    display: flex;
    flex-direction: column-reverse;
  }

  .hero__content {
    padding-bottom: var(--space-4);
  }

  .hero__building {
    display: none;
  }
}

@media (min-width: 60rem) {
  .hero__art {
    position: absolute;
    inset: 0 0 0 auto;
    width: 62%;
    height: auto;
    margin: 0;
    -webkit-mask-image:
      linear-gradient(90deg, transparent 0%, #000 22%),
      linear-gradient(180deg, #000 80%, transparent 100%);
    -webkit-mask-composite: source-in;
    mask-image:
      linear-gradient(90deg, transparent 0%, #000 22%),
      linear-gradient(180deg, #000 80%, transparent 100%);
    mask-composite: intersect;
  }

  .hero__map {
    position: absolute;
    inset: 0;
    width: calc(100% - 7rem);
    object-position: 45% 58%;
  }

  .hero__content {
    min-height: 34rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}

/* ---------- Tři kroky ---------- */
.steps {
  padding-block: clamp(3rem, 2rem + 3vw, 4.5rem) clamp(3rem, 2rem + 3vw, 4.5rem);
  background: linear-gradient(180deg, #fbfcfe 0%, #f5f8fc 100%);
}

.steps .container,
.strengths__list {
  max-width: calc(80rem + 2 * var(--gutter));
}

.steps__list {
  list-style: none;
  display: grid;
  gap: var(--space-8);
}

@media (min-width: 64rem) {
  .steps__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(2.5rem, 0.5rem + 3vw, 4rem);
  }
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 28rem;
}

.step--1 { --step-bg: var(--color-step-1); --step-ink: var(--color-step-1-ink); --step-num: var(--color-step-1-num); }
.step--2 { --step-bg: var(--color-step-2); --step-ink: var(--color-step-2-ink); --step-num: var(--color-step-2-num); }
.step--3 { --step-bg: var(--color-step-3); --step-ink: var(--color-step-3-ink); --step-num: var(--color-step-3-num); }

.step__media {
  position: relative;
  height: 11rem;
  margin-bottom: var(--space-5);
}

.step__photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 1.75rem;
  left: 3.25rem;
  width: calc(100% - 3.25rem);
  height: calc(100% - 1.75rem);
  object-fit: cover;
  border-radius: 999px;
  box-shadow: 0 14px 30px -20px rgb(20 40 75 / 0.55);
}

.step__icon {
  position: absolute;
  top: calc((100% - 1.75rem) / 2);
  left: 0;
  display: grid;
  place-items: center;
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  background: var(--step-bg);
  color: var(--step-ink);
  border: 4px solid #fff;
  box-shadow: 0 8px 20px -12px rgb(20 40 75 / 0.45);
  transform: translateY(-50%);
}

.step__icon svg {
  width: 2.75rem;
  height: 2.75rem;
}

.step__num {
  position: absolute;
  left: 0.15rem;
  bottom: -0.5rem;
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--step-num);
}

.step__title {
  font-size: clamp(1.25rem, 1rem + 0.5vw, 1.45rem);
  letter-spacing: -0.01em;
}

.step__tagline {
  margin-top: var(--space-2);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-navy-800);
}

.step__text {
  margin-top: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  flex: 1;
}

.step__link {
  display: inline-flex;
  gap: 0.4rem;
  align-self: flex-start;
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent-strong);
  text-decoration: none;
}

.step__link:hover {
  text-decoration: underline;
}

.step__arrow {
  display: none;
}

@media (min-width: 64rem) {
  .step__arrow {
    display: block;
    position: absolute;
    top: calc((11rem - 1.75rem) / 2);
    right: calc(-1 * clamp(2.5rem, 0.5rem + 3vw, 4rem) / 2);
    width: 2.5rem;
    color: var(--color-border-strong);
    transform: translate(50%, -50%);
  }
}

/* ---------- Přednosti ---------- */
.strengths {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.strengths__list {
  list-style: none;
  display: grid;
  padding-block: var(--space-6);
}

.strength {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding-block: var(--space-4);
}

.strength + .strength {
  border-top: 1px solid var(--color-border);
}

@media (min-width: 40rem) {
  .strengths__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: var(--space-6);
  }

  .strength + .strength {
    border-top: 0;
  }
}

@media (min-width: 64rem) {
  .strengths__list {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 0;
  }

  .strength {
    padding: var(--space-3) var(--space-5);
  }

  .strength:first-child {
    padding-left: 0;
  }

  .strength + .strength {
    border-left: 1px solid var(--color-border);
  }
}

.strength__icon {
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  color: var(--color-navy-800);
  stroke-width: 1.25;
}

.strength__title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-navy-800);
}

.strength__text {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-text-subtle);
}

/* ---------- Hlavní sdělení ---------- */
.message {
  max-width: calc(52rem + 2 * var(--gutter));
  text-align: center;
}

.message__title {
  font-size: var(--text-3xl);
}

.message__question {
  margin-top: var(--space-5);
  font-size: var(--text-lg);
  color: var(--color-text);
}

.message__strong {
  margin-top: var(--space-4);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  line-height: var(--leading-snug);
  color: var(--color-navy-800);
}

.message__text {
  max-width: 40rem;
  margin: var(--space-4) auto 0;
  color: var(--color-text-muted);
}

/* ---------- Odpovědnost ---------- */
.responsibility {
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 60rem) {
  .responsibility {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: end;
  }
}

.responsibility__body {
  font-size: var(--text-lg);
  color: var(--color-text-inverse-muted);
}

/* ---------- Case study ---------- */
.case {
  display: grid;
  gap: var(--space-7);
  padding: clamp(1.5rem, 1rem + 2.5vw, 3.5rem);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow);
}

@media (min-width: 60rem) {
  .case {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: center;
  }
}

.case__title {
  font-size: var(--text-3xl);
}

.case__subtitle {
  margin-block: var(--space-3) var(--space-5);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-navy-700);
}

.case__text {
  color: var(--color-text-muted);
}

.case__btn {
  margin-top: var(--space-6);
}

.case__stats {
  display: grid;
  gap: var(--space-5);
  margin: 0;
}

@media (min-width: 36rem) and (max-width: 59.99rem) {
  .case__stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
