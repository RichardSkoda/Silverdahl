/**
 * Trvalé přesměrování adres ze současného webu (WordPress), které nový web nemá – zachová jejich pozice ve
 * vyhledávání i odkazy z jiných webů. Adresy /o-nas/, /kontakt/ a /en/ existují i na novém webu (fungují i s lomítkem).
 *
 * Záměrně middleware, ne routeRules: na Vercelu z každé dvojice „/adresa“ a „/adresa/“ v routeRules vznikne
 * funkce se stejným názvem a build spadne (EEXIST).
 */
const legacyRedirects: Record<string, string> = {
  '/reference': '/case-study',
  '/en/o-nas': '/en/about-us',
  '/en/reference': '/en/case-study',
  '/en/kontakt': '/en/contact',
  '/wp-sitemap.xml': '/sitemap.xml',
}

export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname.replace(/\/+$/, '')
  const target = legacyRedirects[path]
  if (target) return sendRedirect(event, target, 301)
})
