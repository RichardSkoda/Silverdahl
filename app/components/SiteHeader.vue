<script setup lang="ts">
import { mainNavigation } from '~/data/navigation'

const route = useRoute()
const localePath = useLocalePath()
const isOpen = ref(false)
const toggleRef = ref<HTMLButtonElement | null>(null)

function close(returnFocus = false) {
  if (!isOpen.value) return
  isOpen.value = false
  if (returnFocus) toggleRef.value?.focus()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close(true)
}

watch(() => route.fullPath, () => close())

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink :to="localePath('index')" class="header__brand" :aria-label="$t('nav.homeLink')">
        <SiteLogo />
      </NuxtLink>

      <button
        ref="toggleRef"
        type="button"
        class="header__toggle"
        :aria-expanded="isOpen"
        aria-controls="hlavni-navigace"
        @click="isOpen = !isOpen"
      >
        <span class="header__toggle-icon" :class="{ 'is-open': isOpen }" aria-hidden="true">
          <span /><span /><span />
        </span>
        <span>{{ isOpen ? $t('nav.close') : $t('nav.menu') }}</span>
        <span class="visually-hidden"> {{ $t('nav.menuSuffix') }}</span>
      </button>

      <nav id="hlavni-navigace" class="nav" :class="{ 'is-open': isOpen }" :aria-label="$t('nav.mainLabel')">
        <ul class="nav__list">
          <li v-for="item in mainNavigation" :key="item.page">
            <NuxtLink
              :to="localePath(item.page)"
              class="nav__link"
              :class="{ 'nav__link--cta': item.page === 'kontakt' }"
              exact-active-class="is-active"
            >
              {{ $t(item.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
        <LanguageSwitcher class="nav__lang" />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgb(255 255 255 / 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: var(--header-height);
}

.header__brand {
  text-decoration: none;
  flex: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.nav__list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.nav__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius);
  color: var(--color-text);
  font-size: var(--text-sm);
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition: color var(--transition), background-color var(--transition);
}

.nav__link:hover {
  color: var(--color-navy-800);
  background: var(--color-navy-50);
}

.nav__link.is-active {
  color: var(--color-navy-800);
  font-weight: 650;
}

.nav__link.is-active::after {
  content: '';
  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  bottom: 0.35rem;
  height: 2px;
  background: var(--color-accent);
}

.nav__link--cta {
  margin-left: var(--space-3);
  background: var(--color-navy-800);
  color: #fff;
}

.nav__link--cta:hover,
.nav__link--cta.is-active {
  background: var(--color-navy-900);
  color: #fff;
}

.nav__link--cta.is-active::after {
  display: none;
}

.header__toggle {
  display: none;
  align-items: center;
  gap: 0.6rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-navy-800);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
}

.header__toggle-icon {
  display: grid;
  gap: 4px;
  width: 18px;
}

.header__toggle-icon span {
  display: block;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  transition: transform var(--transition), opacity var(--transition);
}

.header__toggle-icon.is-open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.header__toggle-icon.is-open span:nth-child(2) { opacity: 0; }
.header__toggle-icon.is-open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* Mobilní menu: logo, položky menu (v němčině nejdelší) a přepínač jazyků se do jedné řady vejdou až od 70rem. */
@media (max-width: 70rem) {
  .header__inner {
    flex-wrap: wrap;
  }

  .header__toggle {
    display: inline-flex;
  }

  .nav {
    display: none;
    flex-basis: 100%;
    flex-direction: column;
    align-items: stretch;
    padding-bottom: var(--space-4);
  }

  .nav.is-open {
    display: flex;
  }

  .nav__lang {
    align-self: center;
  }

  .nav__list {
    flex-direction: column;
    align-items: stretch;
  }

  .nav__link {
    width: 100%;
    font-size: var(--text-base);
  }

  .nav__link.is-active::after {
    left: 0;
    right: auto;
    top: 0.6rem;
    bottom: 0.6rem;
    width: 3px;
    height: auto;
  }

  .nav__link--cta {
    margin: var(--space-3) 0 0;
    justify-content: center;
  }
}

/* Varianta bez JavaScriptu (.no-js) je v assets/css/main.css. */
</style>
