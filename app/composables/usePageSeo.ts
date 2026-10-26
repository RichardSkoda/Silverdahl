import { locales, pagePath, type PageName } from '#shared/locales'

interface PageSeoOptions {
  /** Texty jako getter (např. () => t('…')), aby se při přepnutí jazyka aktualizovaly. */
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  /** Stránka – z ní se skládá kanonická URL a odkazy na jazykové verze (hreflang). */
  page: PageName
}

/**
 * Jednotná SEO metadata stránky. Kanonická URL, og:url a hreflang odkazy na jazykové verze se generují
 * jen tehdy, když je nastavena doména (NUXT_PUBLIC_SITE_URL) – doménu nevymýšlíme a hreflang musí být absolutní.
 */
export function usePageSeo({ title, description, page }: PageSeoOptions) {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  const { locale } = useI18n()
  const absolute = (path: string) => `${siteUrl}${path === '/' ? '' : path}` || '/'
  const url = computed(() => (siteUrl ? absolute(pagePath(page, locale.value)) : undefined))

  useSeoMeta({
    title,
    description,
    ogTitle: () => `${toValue(title)} | Silverdahl`,
    ogDescription: description,
    ogUrl: url,
    twitterCard: 'summary',
  })

  useHead({
    link: () =>
      siteUrl
        ? [
            { rel: 'canonical', href: url.value },
            ...locales.map((l) => ({ rel: 'alternate', hreflang: l, href: absolute(pagePath(page, l)) })),
            { rel: 'alternate', hreflang: 'x-default', href: absolute(pagePath(page, 'cs')) },
          ]
        : [],
  })
}
