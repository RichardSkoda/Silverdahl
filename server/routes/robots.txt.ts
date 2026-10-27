/**
 * GET /robots.txt – povolí procházení celého webu a odkáže na sitemap.
 * Na testovacím nasazení (NUXT_PUBLIC_INDEXABLE=false) procházení zakáže.
 */
export default defineEventHandler((event) => {
  const { siteUrl, indexable } = useRuntimeConfig(event).public
  const origin = siteUrl.replace(/\/$/, '') || getRequestURL(event).origin

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  if (String(indexable) === 'false') return 'User-agent: *\nDisallow: /\n'

  return ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${origin}/sitemap.xml`, ''].join('\n')
})
