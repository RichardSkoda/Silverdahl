// https://nuxt.com/docs/api/configuration/nuxt-config
import { defaultLocale, locales, localizedPaths, pagePath, type PageName } from './shared/locales'

// Přeložené cesty pro i18n (čeština je výchozí a používá názvy souborů v app/pages).
const i18nPages = Object.fromEntries(
  Object.entries(localizedPaths).map(([page, paths]) => [page, { ...paths }]),
)

// Statické stránky ve všech jazycích. Kontakt zůstává SSR (výsledek odeslání formuláře bez JS přes ?stav=…).
const prerendered = (Object.keys(localizedPaths) as PageName[])
  .filter((page) => page !== 'kontakt')
  .flatMap((page) => locales.map((locale) => pagePath(page, locale)))

// Trvalé přesměrování adres ze současného webu (WordPress), které nový web nemá – zachová jejich pozice ve
// vyhledávání i odkazy z jiných webů. Adresy /o-nas/, /kontakt/ a /en/ existují i na novém webu (fungují i s lomítkem).
const legacyRedirects: Record<string, string> = {
  '/reference': '/case-study',
  '/en/o-nas': '/en/about-us',
  '/en/reference': '/en/case-study',
  '/en/kontakt': '/en/contact',
  '/wp-sitemap.xml': '/sitemap.xml',
}

// Statické soubory bez otisku v názvu (obrázky, loga, ikony) – cache na 30 dní.
const staticCache = { headers: { 'cache-control': 'public, max-age=2592000' } }

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  typescript: { strict: true },

  modules: ['@nuxtjs/i18n'],

  // Jazykové verze: čeština (výchozí, bez předpony), angličtina /en, němčina /de.
  // Texty jsou v i18n/locales/*.json, načítají se jen pro aktuální jazyk.
  i18n: {
    locales: [
      { code: 'cs', language: 'cs-CZ', name: 'Čeština', file: 'cs.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
    ],
    defaultLocale,
    strategy: 'prefix_except_default',
    customRoutes: 'config',
    pages: i18nPages,
    // Bez automatického přesměrování podle jazyka prohlížeče – modul by jinak ukládal vlastní cookie
    // a návštěvník vždy dostane přesně tu verzi, na kterou odkaz vede (důležité i pro vyhledávače).
    detectBrowserLanguage: false,
    // Pozor: bundle.dropMessageCompiler nezapínat – překlady se načítají za běhu (/_i18n/…) a texty s proměnnými
    // ({company}, {link}…) by se v prohlížeči nezkompilovaly (chyba vue-i18n 24 → chybová stránka).
  },

  css: [
    '@fontsource-variable/plus-jakarta-sans/index.css',
    '@fontsource-variable/inter/index.css',
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      // Atribut lang a og:locale nastavuje app.vue podle aktuálního jazyka.
      htmlAttrs: { class: 'no-js' },
      titleTemplate: '%s | Silverdahl',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#14284b' },
        { property: 'og:site_name', content: 'Silverdahl s.r.o.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      // Odstraní třídu .no-js ještě před vykreslením – mobilní menu se bez JS zobrazí rozbalené.
      script: [{ innerHTML: "document.documentElement.classList.remove('no-js')", tagPosition: 'head' }],
    },
  },

  runtimeConfig: {
    // Doručování kontaktního formuláře přes SMTP (libovolný poskytovatel / hosting).
    // Dokud nejsou proměnné nastaveny, endpoint vrací 503 a formulář pravdivě oznámí,
    // že zpráva odeslána nebyla. Viz .env.example a README.
    smtpHost: '', // NUXT_SMTP_HOST
    smtpPort: 465, // NUXT_SMTP_PORT
    smtpSecure: true, // NUXT_SMTP_SECURE
    smtpUser: '', // NUXT_SMTP_USER
    smtpPass: '', // NUXT_SMTP_PASS
    contactFrom: '', // NUXT_CONTACT_FROM – odesílatel, např. "Web Silverdahl <web@domena>"
    contactTo: '', // NUXT_CONTACT_TO – kam mají zprávy z formuláře chodit
    public: {
      // NUXT_PUBLIC_SITE_URL – produkční doména bez lomítka na konci. Výchozí je současná doména klienta
      // (silverdahl.cz běží bez www, verze s www i http se na ni přesměrovávají). Z ní se skládají kanonické URL,
      // hreflang, og:url, og:image, strukturovaná data a sitemap. Stránky se předgenerují při buildu,
      // změnu domény je proto potřeba nastavit už při `npm run build`.
      siteUrl: 'https://silverdahl.cz',
      // NUXT_PUBLIC_INDEXABLE=false na testovacím nasazení – robots.txt zakáže procházení a stránky dostanou noindex.
      indexable: true,
    },
  },

  // Obsahové stránky jsou statické – předgenerují se při buildu (ve všech jazycích).
  // Kontakt zůstává SSR, protože zobrazuje výsledek odeslání formuláře bez JavaScriptu (?stav=…).
  // Stránky nenačítají žádná asynchronní data, _payload.json tedy není potřeba.
  // Vypnutí zároveň obchází chybu Nuxt 4.4.5 + unstorage 1.17 („Invalid key: /“) při prerenderu domovské stránky.
  experimental: {
    payloadExtraction: false,
  },

  // Statické soubory (včetně předgenerovaných stránek) se při buildu předkomprimují (gzip + brotli).
  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
  },

  routeRules: {
    ...Object.fromEntries(prerendered.map((path) => [path, { prerender: true }])),
    ...Object.fromEntries(
      Object.entries(legacyRedirects).flatMap(([from, to]) => [
        [from, { redirect: { to, statusCode: 301 } }],
        [`${from}/`, { redirect: { to, statusCode: 301 } }],
      ]),
    ),
    '/images/**': staticCache,
    '/logo/**': staticCache,
    '/og/**': staticCache,
    '/icons/**': staticCache,
    '/favicon.svg': staticCache,
    '/favicon.ico': staticCache,
    '/apple-touch-icon.png': staticCache,
  },
})
