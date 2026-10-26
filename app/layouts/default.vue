<template>
  <div class="layout">
    <a class="skip-link" href="#obsah">Přeskočit na obsah</a>
    <!-- Lišta je hned za skip-linkem, aby byla na začátku pořadí tabulátoru. -->
    <ClientOnly>
      <CookieBanner />
    </ClientOnly>
    <SiteHeader />
    <main id="obsah" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

main:focus {
  outline: none;
}
</style>
