<script setup lang="ts">
// Jazyk dokumentu a og:locale podle aktuální jazykové verze.
const { locale, t } = useI18n()

useHead({
  htmlAttrs: { lang: locale },
  meta: [{ property: 'og:locale', content: () => t('meta.ogLocale') }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
