import { defaultLocale, languageTags, locales, ogLocales, pagePath, type PageName } from '#shared/locales'

type SchemaNode = Record<string, unknown>

interface PageSeoOptions {
  /** Texty jako getter (např. () => t('…')), aby se při přepnutí jazyka aktualizovaly. */
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  /** Stránka – z ní se skládá kanonická URL a odkazy na jazykové verze (hreflang). */
  page: PageName
  /** Typ stránky pro strukturovaná data schema.org. */
  schemaType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
  /** Další uzly strukturovaných dat (např. služby, osoby). */
  schema?: MaybeRefOrGetter<SchemaNode[]>
}

// Popisek stránky v drobečkové navigaci (strukturovaná data).
const breadcrumbKeys: Record<PageName, string> = {
  index: 'nav.home',
  sluzby: 'nav.services',
  'case-study': 'nav.caseStudy',
  'o-nas': 'nav.about',
  kontakt: 'nav.contact',
  cookies: 'footer.cookiePolicy',
}

/** Doména webu a pomocné funkce pro absolutní adresy a @id ve strukturovaných datech. */
export function useSiteOrigin() {
  const origin = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  const absolute = (path: string) => `${origin}${path}`
  return {
    origin,
    absolute,
    organizationId: `${origin}/#organization`,
    websiteId: `${origin}/#website`,
  }
}

/**
 * Jednotná SEO metadata stránky: title, description, Open Graph / Twitter (včetně obrázku pro sdílení),
 * kanonická URL, hreflang odkazy na jazykové verze, pokyny pro roboty a strukturovaná data (JSON-LD).
 * Absolutní adresy se skládají z NUXT_PUBLIC_SITE_URL (výchozí https://silverdahl.cz).
 */
export function usePageSeo({ title, description, page, schemaType = 'WebPage', schema }: PageSeoOptions) {
  const { indexable } = useRuntimeConfig().public
  const { origin, absolute, organizationId, websiteId } = useSiteOrigin()
  const { locale, t } = useI18n()

  const url = computed(() => (origin ? absolute(pagePath(page, locale.value)) : undefined))
  const ogImage = origin ? absolute('/og/silverdahl.jpg') : undefined

  useSeoMeta({
    title,
    description,
    ogTitle: () => `${toValue(title)} | Silverdahl`,
    ogDescription: description,
    ogUrl: url,
    ogImage,
    ogImageWidth: ogImage ? 1200 : undefined,
    ogImageHeight: ogImage ? 630 : undefined,
    ogImageType: ogImage ? 'image/jpeg' : undefined,
    ogImageAlt: () => (ogImage ? t('seo.ogImageAlt') : undefined),
    ogLocaleAlternate: () => locales.filter((l) => l !== locale.value).map((l) => ogLocales[l]),
    twitterCard: ogImage ? 'summary_large_image' : 'summary',
    // max-image-preview:large – Google smí ve výsledcích a v Discoveru ukázat velký náhled.
    robots: String(indexable) === 'false' ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
  })

  useHead({
    link: () =>
      origin
        ? [
            { rel: 'canonical', href: url.value },
            ...locales.map((l) => ({ rel: 'alternate', hreflang: l, href: absolute(pagePath(page, l)) })),
            { rel: 'alternate', hreflang: 'x-default', href: absolute(pagePath(page, defaultLocale)) },
          ]
        : [],
  })

  // Strukturovaná data stránky. Organizace a web (WebSite) jsou společné – viz app.vue.
  const structuredData = computed(() => {
    if (!origin || !url.value) return null
    const pageId = `${url.value}#webpage`
    const breadcrumbId = `${url.value}#breadcrumb`
    const graph: SchemaNode[] = [
      {
        '@type': schemaType,
        '@id': pageId,
        url: url.value,
        name: toValue(title),
        description: toValue(description),
        inLanguage: languageTags[locale.value],
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        primaryImageOfPage: ogImage ? { '@type': 'ImageObject', url: ogImage } : undefined,
        breadcrumb: page === 'index' ? undefined : { '@id': breadcrumbId },
      },
    ]
    if (page !== 'index') {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('nav.home'), item: absolute(pagePath('index', locale.value)) },
          { '@type': 'ListItem', position: 2, name: t(breadcrumbKeys[page]), item: url.value },
        ],
      })
    }
    graph.push(...(toValue(schema) ?? []))
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  })

  useHead({
    script: () =>
      structuredData.value ? [{ key: 'ld-page', type: 'application/ld+json', innerHTML: structuredData.value }] : [],
  })
}
