<script setup lang="ts">
// Závěrečná výzva ke kontaktu – výchozí texty z části „Kontakt“ v podkladech (cta.* v překladech).
defineProps<{ title?: string; text?: string }>()
const localePath = useLocalePath()
</script>

<template>
  <section class="cta section--navy" aria-labelledby="cta-nadpis">
    <div class="container cta__inner">
      <div>
        <h2 id="cta-nadpis" class="cta__title">{{ title ?? $t('cta.title') }}</h2>
        <p class="cta__text">{{ text ?? $t('cta.text') }}</p>
      </div>
      <BaseButton :to="localePath('kontakt')" variant="inverse">{{ $t('cta.button') }}</BaseButton>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-block: var(--space-8);
  background-image:
    linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}

.cta__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}

.cta__title {
  font-size: var(--text-2xl);
  max-width: 32rem;
}

.cta__text {
  margin-top: var(--space-3);
  color: var(--color-text-inverse-muted);
  max-width: 36rem;
}
</style>
