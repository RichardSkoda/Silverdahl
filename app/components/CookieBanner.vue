<script setup lang="ts">
import { consentCategories } from '~/data/cookies'
import { allChoices, type ConsentChoices } from '~/composables/useCookieConsent'

// Lišta se souhlasem s cookies. Přijetí i odmítnutí je stejně snadné (jedno kliknutí, stejně výrazná tlačítka),
// volitelné kategorie jsou ve výchozím stavu vypnuté. Bez JavaScriptu se nezobrazuje – nic se pak ani nenačítá.
const { isReady, hasDecided, settingsOpen, currentChoices, save, acceptAll, rejectAll } = useCookieConsent()

const detail = ref(false)
const choices = reactive<ConsentChoices>(allChoices(false))
const headingRef = ref<HTMLElement | null>(null)
let returnFocusTo: HTMLElement | null = null

const visible = computed(() => isReady.value && (!hasDecided.value || settingsOpen.value))

function syncChoices() {
  Object.assign(choices, currentChoices())
}

async function focusHeading() {
  await nextTick()
  headingRef.value?.focus()
}

function openDetail() {
  syncChoices()
  detail.value = true
  focusHeading()
}

// Otevření z patičky („Nastavení cookies“): rovnou podrobné nastavení a fokus do lišty.
watch(settingsOpen, (open) => {
  if (!open) return
  returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
  openDetail()
})

function finish(action: () => void) {
  action()
  detail.value = false
  returnFocusTo?.focus()
  returnFocusTo = null
}

function onEscape() {
  // Zavřít bez volby lze jen znovu otevřené nastavení – první volbu musí návštěvník udělat.
  if (hasDecided.value && settingsOpen.value) finish(() => (settingsOpen.value = false))
}
</script>

<template>
  <Transition name="cookie">
    <section
      v-if="visible"
      class="cookie"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-nadpis"
      aria-describedby="cookie-popis"
      @keydown.esc="onEscape"
    >
      <h2 id="cookie-nadpis" ref="headingRef" tabindex="-1" class="cookie__title">
        {{ detail ? 'Nastavení cookies' : 'Cookies na tomto webu' }}
      </h2>

      <p v-if="detail" id="cookie-popis" class="cookie__text">
        Vyberte, které kategorie cookies smíme používat. Nezbytné cookies jsou aktivní vždy.
      </p>
      <p v-else id="cookie-popis" class="cookie__text">
        Nezbytné cookies zajišťují fungování webu. Analytické a marketingové cookies ani obsah jiných služeb (např.
        mapu Google) bez vašeho souhlasu nepoužijeme. Volbu můžete kdykoli změnit v patičce webu.
        <NuxtLink to="/cookies">Zásady cookies</NuxtLink>
      </p>

      <form v-if="detail" class="cookie__form" @submit.prevent="finish(() => save({ ...choices }))">
        <fieldset class="cookie__categories">
          <legend class="visually-hidden">Kategorie cookies</legend>
          <div v-for="category in consentCategories" :key="category.id" class="cookie__category">
            <div class="cookie__category-head">
              <template v-if="category.required">
                <span class="cookie__category-title">{{ category.title }}</span>
                <span class="cookie__always">Vždy aktivní</span>
              </template>
              <template v-else>
                <label :for="`cookie-${category.id}`" class="cookie__category-title">{{ category.title }}</label>
                <input
                  :id="`cookie-${category.id}`"
                  v-model="choices[category.id as keyof ConsentChoices]"
                  type="checkbox"
                  role="switch"
                  class="cookie__switch"
                  :aria-describedby="`cookie-${category.id}-popis`"
                />
              </template>
            </div>
            <p :id="`cookie-${category.id}-popis`" class="cookie__category-text">{{ category.description }}</p>
          </div>
        </fieldset>

        <div class="cookie__actions">
          <BaseButton type="submit">Uložit výběr</BaseButton>
          <BaseButton @click="finish(acceptAll)">Přijmout vše</BaseButton>
        </div>
      </form>

      <div v-else class="cookie__actions">
        <BaseButton @click="finish(acceptAll)">Přijmout vše</BaseButton>
        <BaseButton @click="finish(rejectAll)">Odmítnout vše</BaseButton>
        <BaseButton variant="secondary" @click="openDetail">Nastavení</BaseButton>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.cookie {
  position: fixed;
  left: var(--space-4);
  right: var(--space-4);
  bottom: var(--space-4);
  z-index: 60;
  max-width: 34rem;
  max-height: calc(100dvh - 2 * var(--space-4));
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 60px -24px rgb(20 40 75 / 0.45), 0 2px 6px rgb(20 40 75 / 0.06);
}

@media (min-width: 40rem) {
  .cookie {
    left: var(--space-5);
    bottom: var(--space-5);
    padding: var(--space-6);
  }
}

.cookie__title {
  font-size: var(--text-lg);
}

.cookie__title:focus {
  outline: none;
}

.cookie__text {
  margin-top: var(--space-3);
  font-size: var(--text-sm);
  line-height: 1.55;
  color: var(--color-text-muted);
}

.cookie__text a {
  font-weight: 600;
  white-space: nowrap;
}

.cookie__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.cookie__actions > * {
  flex: 1 1 auto;
}

.cookie__categories {
  margin: var(--space-5) 0 0;
  padding: 0;
  border: 0;
  display: grid;
  gap: var(--space-3);
}

.cookie__category {
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface-muted);
}

.cookie__category-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.cookie__category-title {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-navy-800);
}

label.cookie__category-title {
  cursor: pointer;
}

.cookie__always {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-success);
}

.cookie__category-text {
  margin-top: var(--space-2);
  font-size: var(--text-xs);
  line-height: 1.55;
  color: var(--color-text-muted);
}

/* Přepínač */
.cookie__switch {
  appearance: none;
  position: relative;
  flex: none;
  width: 2.75rem;
  height: 1.5rem;
  margin: 0;
  border-radius: 999px;
  background: var(--color-border-strong);
  cursor: pointer;
  transition: background-color var(--transition);
}

.cookie__switch::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(1.5rem - 6px);
  height: calc(1.5rem - 6px);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(20 40 75 / 0.3);
  transition: transform var(--transition);
}

.cookie__switch:checked {
  background: var(--color-accent);
}

.cookie__switch:checked::before {
  transform: translateX(1.25rem);
}

.cookie__switch:focus-visible {
  outline-offset: 2px;
  border-radius: 999px;
}

/* Animace */
.cookie-enter-active,
.cookie-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.cookie-enter-from,
.cookie-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
