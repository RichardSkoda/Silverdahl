import { defaultLocale, locales, localizedPaths, pagePath, type PageName } from '#shared/locales'

/**
 * GET /sitemap.xml – všechny stránky ve všech jazycích včetně odkazů na jazykové verze (hreflang),
 * aby vyhledávače spojily českou, anglickou a německou verzi téže stránky.
 */
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const origin = siteUrl.replace(/\/$/, '') || getRequestURL(event).origin
  const absolute = (path: string) => `${origin}${path === '/' ? '/' : path}`

  const urls = (Object.keys(localizedPaths) as PageName[]).flatMap((page) => {
    const alternates = [
      ...locales.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute(pagePath(page, l))}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(pagePath(page, defaultLocale))}"/>`,
    ].join('\n')
    return locales.map((locale) => `  <url>\n    <loc>${absolute(pagePath(page, locale))}</loc>\n${alternates}\n  </url>`)
  })

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
})
