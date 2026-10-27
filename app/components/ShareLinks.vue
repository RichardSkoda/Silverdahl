<script setup lang="ts">
import type { SocialIconName } from '~/components/SocialIcon.vue'

// Sdílení aktuální stránky. Obyčejné odkazy na sdílecí adresy sítí – nic se nenačítá předem,
// takže nejsou potřeba cookies ani souhlas. Náhled (obrázek, titulek) si sítě berou z Open Graph (usePageSeo).
withDefaults(defineProps<{ inverse?: boolean }>(), { inverse: false })

const route = useRoute()
const { absolute } = useSiteOrigin()
const { t } = useI18n()

const links = computed<{ name: SocialIconName; label: string; href: string }[]>(() => {
  const url = encodeURIComponent(absolute(route.path))
  return [
    { name: 'linkedin', label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { name: 'facebook', label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { name: 'teams', label: 'Microsoft Teams', href: `https://teams.microsoft.com/share?href=${url}` },
    {
      name: 'email',
      label: t('share.email'),
      href: `mailto:?subject=${encodeURIComponent(t('share.mailSubject'))}&body=${url}`,
    },
  ]
})
</script>

<template>
  <div class="share" :class="{ 'share--inverse': inverse }">
    <span class="share__label">{{ $t('share.label') }}</span>
    <ul class="share__list">
      <li v-for="link in links" :key="link.name">
        <a
          :href="link.href"
          class="share__link"
          :target="link.name === 'email' ? undefined : '_blank'"
          :rel="link.name === 'email' ? undefined : 'noopener noreferrer'"
          :title="$t('share.on', { network: link.label })"
        >
          <SocialIcon :name="link.name" />
          <span class="visually-hidden">
            {{ $t('share.on', { network: link.label }) }}<template v-if="link.name !== 'email'"> {{ $t('common.newWindow') }}</template>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.share {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.share__list {
  list-style: none;
  display: flex;
  gap: var(--space-2);
}

.share__link {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-navy-800);
  transition: color var(--transition), border-color var(--transition), background-color var(--transition);
}

.share__link svg {
  width: 1rem;
  height: 1rem;
}

.share__link:hover {
  border-color: var(--color-accent-strong);
  color: var(--color-accent-strong);
}

.share--inverse {
  color: var(--color-text-inverse-muted);
}

.share--inverse .share__link {
  border-color: rgb(255 255 255 / 0.22);
  color: var(--color-text-inverse);
}

.share--inverse .share__link:hover {
  border-color: #fff;
  background: rgb(255 255 255 / 0.08);
  color: #fff;
}
</style>
