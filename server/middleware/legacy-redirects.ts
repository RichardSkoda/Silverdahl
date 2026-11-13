/**
 * Trvalé přesměrování adres ze současného webu (WordPress), které nový web nemá – zachová jejich pozice ve
 * vyhledávání i odkazy z jiných webů. Adresy /o-nas/, /kontakt/ a /en/ existují i na novém webu (fungují i s lomítkem).
 * Dále původní adresy stránky „Vstup na trh“ z doby, kdy cílila jen na český trh.
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
  '/vstup-na-cesky-trh': '/vstup-na-novy-trh',
  '/en/czech-market-entry': '/en/european-market-entry',
  '/de/markteintritt-tschechien': '/de/markteintritt-europa',
}

export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname.replace(/\/+$/, '')
  const target = legacyRedirects[path]
  if (target) return sendRedirect(event, target, 301)
})
