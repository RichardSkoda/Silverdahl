// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  typescript: { strict: true },

  css: [
    '@fontsource-variable/plus-jakarta-sans/index.css',
    '@fontsource-variable/inter/index.css',
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'cs', class: 'no-js' },
      titleTemplate: '%s | Silverdahl',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#14284b' },
        { property: 'og:site_name', content: 'Silverdahl s.r.o.' },
        { property: 'og:locale', content: 'cs_CZ' },
        { property: 'og:type', content: 'website' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
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
      // NUXT_PUBLIC_SITE_URL – produkční doména bez lomítka na konci, např. https://www.example.cz
      // TODO: doplnit ověřenou doménu; dokud je prázdná, kanonické URL ani og:url se negenerují.
      siteUrl: '',
    },
  },

  // Obsahové stránky jsou statické – předgenerují se při buildu.
  // /kontakt zůstává SSR, protože zobrazuje výsledek odeslání formuláře bez JavaScriptu (?stav=…).
  // Stránky nenačítají žádná asynchronní data, _payload.json tedy není potřeba.
  // Vypnutí zároveň obchází chybu Nuxt 4.4.5 + unstorage 1.17 („Invalid key: /“) při prerenderu domovské stránky.
  experimental: {
    payloadExtraction: false,
  },

  routeRules: {
    '/': { prerender: true },
    '/sluzby': { prerender: true },
    '/case-study': { prerender: true },
    '/o-nas': { prerender: true },
  },
})
