import type { OptionalCategoryId } from '~/data/cookies'

/**
 * Nástroje, které smějí běžet jen se souhlasem návštěvníka. Měřicí a marketingové kódy zapojujte
 * výhradně sem – nikdy přímo do nuxt.config ani do šablon, jinak by se načetly bez souhlasu.
 *
 * Příklad (Google Analytics 4, ID v NUXT_PUBLIC_GA_ID):
 *   analytics: [
 *     () => {
 *       const id = useRuntimeConfig().public.gaId
 *       loadScript(`https://www.googletagmanager.com/gtag/js?id=${id}`)
 *       // … inicializace gtag('config', id)
 *     },
 *   ],
 */
const loaders: Record<OptionalCategoryId, Array<() => void>> = {
  analytics: [],
  marketing: [],
  // Externí obsah (mapa Google) se nenačítá skriptem – komponenta GoogleMap sama sleduje souhlas.
  external: [],
}

// Pomocná funkce pro loaders výše.
function loadScript(src: string) {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  document.head.append(script)
}

export default defineNuxtPlugin(() => {
  const { consent, load } = useCookieConsent()
  load()

  const started = new Set<OptionalCategoryId>()

  watch(
    consent,
    (value) => {
      for (const category of Object.keys(loaders) as OptionalCategoryId[]) {
        const granted = value?.[category] === true
        if (granted && !started.has(category) && loaders[category].length > 0) {
          started.add(category)
          loaders[category].forEach((run) => run())
        } else if (!granted && started.has(category)) {
          // Už spuštěné skripty nejde spolehlivě vypnout – po odvolání souhlasu stránku načteme znovu bez nich.
          window.location.reload()
          return
        }
      }
    },
    { immediate: true },
  )
})
