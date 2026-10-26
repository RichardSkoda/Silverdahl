<script setup lang="ts">
// Přepínač jazykových verzí. Odkaz vede na stejnou stránku v jiném jazyce (přeložené cesty z i18n).
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const items = computed(() =>
  locales.value.map((l) => (typeof l === 'string' ? { code: l, name: l, language: l } : { language: l.code, ...l })),
)
</script>

<template>
  <div class="lang" role="group" :aria-label="t('nav.languageLabel')">
    <NuxtLink
      v-for="item in items"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      class="lang__link"
      :class="{ 'is-active': item.code === locale }"
      :lang="item.language"
      :hreflang="item.language"
      :aria-current="item.code === locale ? 'true' : undefined"
    >
      <span aria-hidden="true">{{ item.code.toUpperCase() }}</span>
      <span class="visually-hidden">{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  padding: 0.2rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
}

.lang__link {
  display: inline-grid;
  place-items: center;
  min-width: 2.4rem;
  min-height: 2.25rem;
  padding: 0 0.55rem;
  border-radius: 999px;
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: color var(--transition), background-color var(--transition);
}

.lang__link:hover {
  color: var(--color-navy-800);
  background: var(--color-navy-50);
}

.lang__link.is-active {
  background: var(--color-navy-800);
  color: #fff;
}
</style>
