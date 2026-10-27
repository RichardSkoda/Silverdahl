import type { RouterConfig } from '@nuxt/schema'

// Posun stránky po navigaci. Oproti výchozímu chování Nuxtu skočí nahoru i po kliknutí na odkaz
// na právě otevřenou stránku (např. v patičce) – jinak by zůstala posunutá dole a odkaz by vypadal nefunkčně.
// Plynulost posunu řídí CSS (scroll-behavior v main.css, vypnuto při prefers-reduced-motion).
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    // Kotvy (#sluzba) odsadit o výšku lepivé hlavičky – stejně jako scroll-padding-top v main.css.
    const target = () =>
      to.hash ? { el: to.hash, top: parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0 } : { top: 0 }

    if (to.path === from.path) return target()
    // Na jiné stránce počkat, až se vykreslí nový obsah.
    return new Promise((resolve) => {
      useNuxtApp().hooks.hookOnce('page:finish', () => resolve(target()))
    })
  },
}
