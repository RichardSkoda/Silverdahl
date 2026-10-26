interface PageSeoOptions {
  title: string
  description: string
  /** Cesta stránky, např. "/sluzby". Z ní se skládá kanonická URL. */
  path: string
}

/**
 * Jednotná SEO metadata stránky. Kanonická URL a og:url se generují jen tehdy,
 * když je nastavena doména (NUXT_PUBLIC_SITE_URL) – doménu nevymýšlíme.
 */
export function usePageSeo({ title, description, path }: PageSeoOptions) {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  const url = siteUrl ? `${siteUrl}${path === '/' ? '' : path}` : undefined

  useSeoMeta({
    title,
    description,
    ogTitle: `${title} | Silverdahl`,
    ogDescription: description,
    ogUrl: url,
    twitterCard: 'summary',
  })

  useHead({
    link: url ? [{ rel: 'canonical', href: url }] : [],
  })
}
