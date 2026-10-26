<script setup lang="ts">
import type { Service } from '~/data/services'

const props = defineProps<{ service: Service }>()
const headingId = computed(() => `${props.service.id}-nadpis`)
</script>

<template>
  <section :id="service.id" class="service" :aria-labelledby="headingId">
    <div class="container service__grid">
      <header class="service__head">
        <p class="service__number" aria-hidden="true">{{ service.number }}</p>
        <h2 :id="headingId" class="service__name">
          <span class="visually-hidden">{{ Number(service.number) }}. </span>{{ service.name }}
        </h2>
        <p class="service__subtitle">{{ service.subtitle }}</p>
      </header>

      <div class="service__body">
        <div class="prose">
          <p v-for="(paragraph, i) in service.intro" :key="i">{{ paragraph }}</p>
        </div>

        <h3 class="service__label">Co pro vás zajistíme:</h3>
        <ul class="service__items">
          <li v-for="item in service.items" :key="item.title">
            <strong>{{ item.title }}</strong>
            <span> – {{ item.text }}</span>
          </li>
        </ul>

        <div v-if="service.areas" class="service__areas">
          <h3 class="service__label service__label--flush">{{ service.areas.title }}</h3>
          <p>{{ service.areas.text }}</p>
          <p class="service__note">{{ service.areas.note }}</p>
        </div>

        <aside class="service__benefit" :aria-label="`Co tím získáte – ${service.name}`">
          <h3 class="service__benefit-title">Co tím získáte?</h3>
          <p v-for="(paragraph, i) in service.benefit" :key="i">{{ paragraph }}</p>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service {
  padding-block: var(--space-section);
  border-top: 1px solid var(--color-border);
}

.service:nth-of-type(even) {
  background: var(--color-surface);
}

.service__grid {
  display: grid;
  gap: var(--space-6);
}

@media (min-width: 60rem) {
  .service__grid {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.4fr);
    gap: var(--space-8);
  }

  .service__head {
    position: sticky;
    top: calc(var(--header-height) + var(--space-6));
    align-self: start;
  }
}

.service__number {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.service__name {
  font-size: var(--text-3xl);
}

.service__subtitle {
  margin-top: var(--space-3);
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}

.service__label {
  margin: var(--space-7) 0 var(--space-5);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent-strong);
}

.service__label--flush {
  margin-top: 0;
  margin-bottom: var(--space-3);
}

.service__items {
  list-style: none;
  display: grid;
  gap: 0;
  border-top: 1px solid var(--color-border);
}

.service__items li {
  padding: var(--space-4) 0 var(--space-4) 1.75rem;
  border-bottom: 1px solid var(--color-border);
  position: relative;
}

.service__items li::before {
  content: '';
  position: absolute;
  left: 0.15rem;
  top: calc(var(--space-4) + 0.5em);
  width: 0.7rem;
  height: 0.38rem;
  border-left: 2px solid var(--color-accent-strong);
  border-bottom: 2px solid var(--color-accent-strong);
  transform: rotate(-45deg);
}

.service__items strong {
  color: var(--color-navy-800);
}

.service__areas {
  margin-top: var(--space-7);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
}

.service__note {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.service__benefit {
  margin-top: var(--space-7);
  padding: var(--space-5) var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--color-navy-800);
  color: var(--color-text-inverse);
}

.service__benefit-title {
  margin-bottom: var(--space-3);
  font-size: var(--text-xl);
  color: #fff;
}

@media (max-width: 30rem) {
  .service__benefit {
    padding: var(--space-5);
  }
}
</style>
