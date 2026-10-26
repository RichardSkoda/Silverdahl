<script setup lang="ts">
// Úvodní blok podstránek (nadpis H1 + perex).
defineProps<{ eyebrow: string; title: string }>()
</script>

<template>
  <section class="intro">
    <div class="container">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 class="intro__title">{{ title }}</h1>
      <div class="intro__body">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  position: relative;
  padding-block: clamp(3rem, 2rem + 4vw, 5.5rem) clamp(2.5rem, 2rem + 3vw, 4.5rem);
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
}

/* Decentní geometrický prvek – soustředné kruhy v pravé části. */
.intro::after {
  content: '';
  position: absolute;
  right: -8rem;
  top: 50%;
  width: 26rem;
  height: 26rem;
  transform: translateY(-50%);
  border-radius: 50%;
  background: repeating-radial-gradient(circle, transparent 0 22px, var(--color-border) 22px 23px);
  opacity: 0.55;
  pointer-events: none;
}

.intro .container {
  position: relative;
  z-index: 1;
}

.intro__title {
  max-width: 22ch;
}

.intro__body {
  margin-top: var(--space-5);
  max-width: 42rem;
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}

@media (max-width: 40rem) {
  .intro::after {
    display: none;
  }
}
</style>
