<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useHead({ title: notFound.value ? 'Stránka nenalezena' : 'Chyba' })
</script>

<template>
  <NuxtLayout>
    <section class="section">
      <div class="container container--narrow">
        <p class="eyebrow">{{ error.statusCode }}</p>
        <h1>{{ notFound ? 'Stránka nenalezena' : 'Něco se pokazilo' }}</h1>
        <p class="lead error__text">
          {{ notFound ? 'Požadovaná stránka neexistuje nebo byla přesunuta.' : 'Omlouváme se, došlo k neočekávané chybě.' }}
        </p>
        <!-- Obyčejný odkaz: funguje i bez JS a zároveň vynuluje chybový stav aplikace. -->
        <a href="/" class="error__btn">Zpět na domovskou stránku</a>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.error__text {
  margin-top: var(--space-4);
}

.error__btn {
  display: inline-block;
  margin-top: var(--space-6);
  font-weight: 600;
}
</style>
