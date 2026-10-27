<script setup lang="ts">
import { languageTags, locales, ogLocales } from '#shared/locales'
import { company } from '~/data/company'

// Jazyk dokumentu a og:locale podle aktuální jazykové verze.
const { locale, t } = useI18n()
const { origin, absolute, organizationId, websiteId } = useSiteOrigin()

// Společná strukturovaná data (schema.org): organizace a web. Stránky na ně odkazují přes @id (usePageSeo).
const structuredData = computed(() =>
  origin
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': organizationId,
            name: company.name,
            alternateName: 'Silverdahl',
            url: absolute('/'),
            logo: { '@type': 'ImageObject', url: absolute('/logo/logo-silverdahl.png'), width: 1280, height: 400 },
            image: absolute('/og/silverdahl.jpg'),
            description: t('footer.about'),
            foundingDate: '1994',
            email: company.email,
            telephone: company.phone.href.replace('tel:', ''),
            address: {
              '@type': 'PostalAddress',
              streetAddress: company.address.street,
              addressLocality: company.address.city,
              addressCountry: 'CZ',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              email: company.email,
              telephone: company.phone.href.replace('tel:', ''),
              availableLanguage: ['Czech', 'English', 'German'],
            },
            areaServed: ['Czech Republic', 'Slovakia', 'Poland', 'Hungary'].map((name) => ({ '@type': 'Country', name })),
            knowsLanguage: locales.map((l) => languageTags[l]),
          },
          {
            '@type': 'WebSite',
            '@id': websiteId,
            url: absolute('/'),
            name: 'Silverdahl',
            inLanguage: locales.map((l) => languageTags[l]),
            publisher: { '@id': organizationId },
          },
        ],
      })
    : null,
)

useHead({
  htmlAttrs: { lang: locale },
  meta: [{ property: 'og:locale', content: () => ogLocales[locale.value as keyof typeof ogLocales] }],
  script: () =>
    structuredData.value ? [{ key: 'ld-site', type: 'application/ld+json', innerHTML: structuredData.value }] : [],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
