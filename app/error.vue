<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
const { t, locale } = useI18n()
const localePath = useLocalePath()

// Chybová stránka se vykresluje místo app.vue – jazyk dokumentu je potřeba nastavit i zde.
useHead({
  title: () => (notFound.value ? t('error.notFoundTitle') : t('error.errorHeadTitle')),
  htmlAttrs: { lang: locale },
})
</script>

<template>
  <NuxtLayout>
    <section class="section">
      <div class="container container--narrow">
        <p class="eyebrow">{{ error.statusCode }}</p>
        <h1>{{ notFound ? $t('error.notFoundTitle') : $t('error.errorTitle') }}</h1>
        <p class="lead error__text">
          {{ notFound ? $t('error.notFoundText') : $t('error.errorText') }}
        </p>
        <!-- Obyčejný odkaz: funguje i bez JS a zároveň vynuluje chybový stav aplikace. -->
        <a :href="localePath('index')" class="error__btn">{{ $t('error.back') }}</a>
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
