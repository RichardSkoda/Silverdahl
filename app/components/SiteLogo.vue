<script setup lang="ts">
// Logo webu = značka „stříbrné údolí“ + značka „A“ + oficiální logo SILVERDAHL s podtitulem
// „Marketing and Customer Service“. Všechny části jsou samostatné grafiky (záměrně nesloučené):
// - značka „stříbrné údolí“ (Silverdahl ≈ švédsky „stříbrné údolí“): dva vrcholy (2. a 4. čára v barvě příčky „A“)
//   a pod údolím „Ag“ – chemická značka stříbra (písmo Plus Jakarta Sans 700 převedené na křivky),
// - značka „A“ je vykreslená zde (stejná je ve favicon.svg),
// - oficiální logo ze současného webu (https://silverdahl.cz/wp-content/uploads/2025/10/LOGO-SILVERDAHL.png),
//   převedené do SVG obkreslením. Pokud klient dodá originální vektorové logo, nahraďte soubory v public/logo/.
const props = withDefaults(defineProps<{ inverse?: boolean }>(), { inverse: false })

const logoSrc = computed(() => `/logo/logo-silverdahl${props.inverse ? '-bila' : ''}.svg`)
</script>

<template>
  <span class="logo" :class="{ 'logo--inverse': inverse }">
    <svg class="logo__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="6" class="logo__bg" />
      <!-- Kopce: lomená čára rozdělená na úseky přesně v ostrých spojích (1. a 3. bílá, 2. a 4. barevná),
           krajní úseky končí svislým řezem kousek před okrajem. -->
      <path d="M2 22.34L10.53 11.19L10.47 7.81L2 18.89ZM16 17.85L21.47 11.19L21.53 7.81L16 14.55Z" class="logo__fg" />
      <path d="M10.53 11.19L16 17.85L16 14.55L10.47 7.81ZM21.47 11.19L30 22.34L30 18.89L21.53 7.81Z" class="logo__accent" />
      <!-- „Ag“: A v barvě příčky, g bílé -->
      <path d="M10.83 27.07L9.28 27.07L11.99 19.20L13.85 19.20L16.57 27.07L15.01 27.07L14.45 25.38L11.40 25.38L10.83 27.07ZM12.92 20.80L11.81 24.12L14.03 24.12L12.92 20.80Z" class="logo__accent" />
      <path d="M19.91 29.40Q19.27 29.40 18.72 29.19Q18.17 28.98 17.77 28.60Q17.37 28.23 17.19 27.72L18.48 27.23Q18.61 27.63 18.99 27.88Q19.36 28.13 19.91 28.13Q20.33 28.13 20.66 27.97Q20.98 27.81 21.16 27.51Q21.34 27.21 21.34 26.79L21.34 26.17Q21.11 26.42 20.81 26.58Q20.31 26.84 19.68 26.84Q18.88 26.84 18.24 26.47Q17.61 26.10 17.25 25.46Q16.89 24.81 16.89 24.01Q16.89 23.20 17.25 22.56Q17.61 21.93 18.23 21.56Q18.85 21.20 19.65 21.20Q20.29 21.20 20.79 21.46Q21.14 21.66 21.41 21.99L21.41 21.32L22.72 21.32L22.72 26.79Q22.72 27.54 22.36 28.13Q21.99 28.72 21.36 29.06Q20.74 29.40 19.91 29.40ZM19.85 25.56Q20.29 25.56 20.62 25.37Q20.96 25.17 21.15 24.82Q21.34 24.47 21.34 24.02Q21.34 23.58 21.14 23.22Q20.95 22.87 20.61 22.67Q20.28 22.47 19.85 22.47Q19.41 22.47 19.07 22.67Q18.72 22.87 18.52 23.22Q18.33 23.58 18.33 24.02Q18.33 24.46 18.52 24.81Q18.72 25.16 19.06 25.36Q19.40 25.56 19.85 25.56Z" class="logo__fg" />
    </svg>
    <svg class="logo__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="6" class="logo__bg" />
      <!--
        „A“ podle písmene A v oficiálním logu: levé rameno tenké, pravé 2× silnější, ostrá špička.
        Tenká příčka vychází z pravého ramene a levého se nedotýká. Je vykreslená první, aby ji pravé rameno překrylo.
      -->
      <path d="M12.14 21.72H20.36V23.28H12.14Z" class="logo__accent" />
      <path d="M16 6.5L24.5 25.5H21.1L15.15 12.2L9.2 25.5H7.5Z" class="logo__fg" />
    </svg>
    <!-- Logo v patičce (inverse) je mimo první obrazovku – načte se až při posunu. -->
    <img
      :src="logoSrc"
      :alt="$t('logo.alt')"
      class="logo__official"
      width="836"
      height="223"
      decoding="async"
      :loading="inverse ? 'lazy' : undefined"
    />
  </span>
</template>

<style scoped>
/* --logo-h je výška celého oficiálního loga včetně podtitulu – obě značky mají stejnou výšku. */
.logo {
  --logo-h: 3.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.logo__mark {
  width: var(--logo-h);
  height: var(--logo-h);
  flex: none;
}

/* Barvy značek: podklad, hlavní (bílá) a akcent (světle modrá jako příčka „A“). V patičce obráceně. */
.logo__bg { fill: var(--color-navy-800); }
.logo__fg { fill: #f4f6fa; }
.logo__accent { fill: var(--color-accent-on-dark); }

.logo--inverse .logo__bg { fill: #fff; }
.logo--inverse .logo__fg { fill: var(--color-navy-800); }
.logo--inverse .logo__accent { fill: var(--color-accent); }

.logo__official {
  width: auto;
  height: var(--logo-h);
}

/* Na úzkém displeji se tři části loga musí vejít vedle tlačítka menu. */
@media (max-width: 30rem) {
  .logo {
    --logo-h: 2.35rem;
    gap: 0.45rem;
  }
}
</style>
