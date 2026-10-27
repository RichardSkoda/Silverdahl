<script setup lang="ts">
import type { PageName } from '#shared/locales'
import { pageLabelKeys } from '~/data/navigation'

// Viditelná drobečková navigace podstránek (Domů › stránka). Stejnou strukturu dostávají vyhledávače
// ve strukturovaných datech (usePageSeo).
const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const localePath = useLocalePath()

const page = computed(() => {
  const name = getRouteBaseName(route) as PageName | undefined
  return name && name !== 'index' && name in pageLabelKeys ? name : null
})
</script>

<template>
  <nav v-if="page" class="crumbs" :aria-label="$t('nav.breadcrumbLabel')">
    <ol>
      <li>
        <NuxtLink :to="localePath('index')">{{ $t('nav.home') }}</NuxtLink>
      </li>
      <li>
        <span aria-current="page">{{ $t(pageLabelKeys[page]) }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
}

.crumbs li + li::before {
  content: '›';
  margin-right: var(--space-2);
  color: var(--color-border-strong);
}

.crumbs a {
  color: var(--color-text-muted);
  text-decoration: none;
}

.crumbs a:hover {
  color: var(--color-accent-strong);
  text-decoration: underline;
}
</style>
