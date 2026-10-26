<script setup lang="ts">
// Vložená mapa Google. Google při jejím načtení ukládá cookies a dostává IP adresu návštěvníka,
// proto se načte až se souhlasem s kategorií „Externí obsah“ (v liště cookies nebo tlačítkem níže).
// Do té doby se zobrazuje náhled s odkazem do Google Map, který souhlas nevyžaduje.
const props = defineProps<{ query: string; label: string }>()

const { hasConsent, allow } = useCookieConsent()

// Stránka je předgenerovaná a server souhlas nezná – mapu proto zobrazujeme až po připojení v prohlížeči,
// aby se serverové HTML (náhled) shodovalo s prvním vykreslením v prohlížeči.
const mounted = ref(false)
onMounted(() => (mounted.value = true))

const showMap = computed(() => mounted.value && hasConsent('external'))

const query = computed(() => encodeURIComponent(props.query))
const embedSrc = computed(() => `https://maps.google.com/maps?q=${query.value}&hl=cs&z=16&output=embed`)
const mapsLink = computed(() => `https://www.google.com/maps/search/?api=1&query=${query.value}`)

const frameRef = ref<HTMLIFrameElement | null>(null)

async function showNow() {
  allow('external')
  // Tlačítko zmizí – fokus přesuneme na mapu, aby se uživatel klávesnice neztratil.
  await nextTick()
  frameRef.value?.focus()
}
</script>

<template>
  <div class="map">
    <iframe
      v-if="showMap"
      ref="frameRef"
      :src="embedSrc"
      :title="`Mapa – ${label}`"
      class="map__frame"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    />
    <div v-else class="map__placeholder">
      <div class="map__card">
        <svg class="map__pin" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" fill="currentColor" />
          <circle cx="12" cy="10" r="2.6" fill="#fff" />
        </svg>
        <p class="map__title">{{ label }}</p>
        <p class="map__text">
          Mapa se načítá ze služby Google Maps, která ukládá cookies a získá vaši IP adresu. Proto ji zobrazíme až s
          vaším souhlasem.
        </p>
        <div class="map__actions">
          <BaseButton class="js-only" @click="showNow">Zobrazit mapu</BaseButton>
          <a :href="mapsLink" class="map__link" target="_blank" rel="noopener">
            Otevřít v Google Mapách<span class="visually-hidden"> (otevře se v novém okně)</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p class="map__note js-only">Souhlas můžete kdykoli odvolat v nastavení cookies v patičce webu.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map {
  --map-height: clamp(20rem, 16rem + 12vw, 28rem);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-muted);
  box-shadow: var(--shadow-sm);
}

.map__frame {
  display: block;
  width: 100%;
  height: var(--map-height);
  border: 0;
}

/* Náhled: stylizovaná „mapa“ z přechodů – čistě dekorativní, nic se nenačítá z cizích serverů. */
.map__placeholder {
  display: grid;
  place-items: center;
  /* Minimální výška – na úzkých displejích se náhled natáhne podle obsahu karty. */
  min-height: var(--map-height);
  padding: var(--space-5) var(--space-4);
  background:
    radial-gradient(ellipse 18% 22% at 78% 30%, #dbeedd 98%, transparent 100%),
    radial-gradient(ellipse 14% 10% at 18% 78%, #d4e5f6 98%, transparent 100%),
    linear-gradient(118deg, transparent 49%, #fff 49% 51.5%, transparent 51.5%),
    linear-gradient(28deg, transparent 63%, #fff 63% 64.6%, transparent 64.6%),
    repeating-linear-gradient(28deg, transparent 0 54px, rgb(255 255 255 / 0.85) 54px 57px),
    repeating-linear-gradient(118deg, transparent 0 78px, rgb(255 255 255 / 0.85) 78px 81px),
    #e7edf4;
}

.map__card {
  max-width: 26rem;
  padding: var(--space-5) var(--space-6);
  text-align: center;
  background: rgb(255 255 255 / 0.96);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.map__pin {
  width: 2.25rem;
  height: 2.25rem;
  margin: 0 auto var(--space-3);
  color: var(--color-navy-800);
}

.map__title {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-navy-800);
}

.map__text {
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  line-height: 1.55;
  color: var(--color-text-muted);
}

.map__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-3) var(--space-5);
  margin-top: var(--space-5);
}

.map__link {
  display: inline-flex;
  gap: 0.35rem;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent-strong);
}

.map__note {
  margin-top: var(--space-4);
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
}
</style>
