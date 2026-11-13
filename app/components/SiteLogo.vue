<script setup lang="ts">
// Logo webu = značka „stříbrné údolí“ + oficiální logo SILVERDAHL s podtitulem „Marketing and Customer Service“.
// Obě části jsou samostatné grafiky (záměrně nesloučené):
// - značka „stříbrné údolí“ (Silverdahl ≈ švédsky „stříbrné údolí“): dva vrcholy (2. a 4. čára v barvě příčky „A“)
//   a pod údolím „Ag“ – chemická značka stříbra ve stylu nápisu SILVERDAHL: „A“ jako v logu (tenké levé
//   rameno, silnější pravé, nízká příčka), „g“ z tenkého geometrického písma Josefin Sans 300 (převedené na křivky),
// - oficiální logo ze současného webu (https://silverdahl.cz/wp-content/uploads/2025/10/LOGO-SILVERDAHL.png),
//   převedené do SVG obkreslením. Pokud klient dodá originální vektorové logo, nahraďte soubory v public/logo/.
// Značka „A“ se v logu nepoužívá (na přání klienta); zůstává v public/logo/znacka-a*.svg a ve favicon.svg.
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
      <!-- „Ag“ ve stylu nápisu SILVERDAHL: A v barvě příčky, g bílé -->
      <path d="M11.36 25.46H14.71V26.12H11.36ZM12.78 18.9L16.45 27.1H14.85L12.38 21.58L9.91 27.1H9.11Z" class="logo__accent" />
      <path d="M20.02 29.90L20.02 29.90Q19.57 29.90 19.16 29.80Q18.76 29.70 18.37 29.45Q17.97 29.21 17.55 28.82L17.55 28.82L17.93 28.38Q18.51 28.94 19.02 29.13Q19.52 29.33 19.99 29.33L19.99 29.33Q20.82 29.33 21.31 29.07Q21.79 28.80 22.01 28.36Q22.23 27.92 22.24 27.38L22.24 27.38L22.25 26.15Q21.97 26.63 21.44 26.97L21.44 26.97Q20.74 27.42 19.86 27.42L19.86 27.42Q19.11 27.42 18.49 27.05Q17.88 26.68 17.51 26.05Q17.15 25.42 17.15 24.64L17.15 24.64Q17.15 23.82 17.53 23.19Q17.90 22.57 18.56 22.21Q19.21 21.85 19.99 21.85L19.99 21.85Q20.72 21.85 21.39 22.23L21.39 22.23Q21.97 22.57 22.27 23.11L22.27 23.11L22.32 22.01L22.89 22.01L22.89 27.39Q22.89 28.04 22.60 28.62Q22.31 29.20 21.68 29.55Q21.05 29.90 20.02 29.90ZM17.78 24.63L17.78 24.63Q17.78 25.25 18.08 25.76Q18.38 26.27 18.89 26.57Q19.40 26.88 20.02 26.88L20.02 26.88Q20.61 26.88 21.10 26.61Q21.59 26.35 21.90 25.90Q22.21 25.46 22.25 24.94L22.25 24.94L22.25 24.16Q22.15 23.64 21.83 23.25Q21.51 22.85 21.04 22.62Q20.57 22.39 20.02 22.39L20.02 22.39Q19.40 22.39 18.89 22.68Q18.38 22.96 18.08 23.46Q17.78 23.97 17.78 24.63Z" class="logo__fg" />
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
/* --logo-h je výška celého oficiálního loga včetně podtitulu – značka má stejnou výšku. */
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

/* Barvy značky: podklad, hlavní (bílá) a akcent (světle modrá). V patičce obráceně. */
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

/* Na úzkém displeji se logo musí vejít vedle tlačítka menu. */
@media (max-width: 30rem) {
  .logo {
    --logo-h: 2.35rem;
    gap: 0.45rem;
  }
}
</style>
