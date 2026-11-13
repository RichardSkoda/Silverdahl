// Kontaktní údaje převzaté ze současného webu https://silverdahl.cz/kontakt/, firemní údaje dodal klient.
// Zobrazují se v patičce, v zásadách ochrany osobních údajů i ve strukturovaných datech pro vyhledávače.

export const company = {
  name: 'Silverdahl s.r.o.',
  address: {
    street: 'Oderská 333/5',
    postalCode: '196 00',
    city: 'Praha 9 – Čakovice',
    // Název země je v překladech (contact.details.country).
  },
  phone: { label: '+420 283 933 949', href: 'tel:+420283933949' },
  email: 'marketing@silverdahl.cz',
  /** Dotaz pro Google Mapy (vložená mapa i odkaz „Otevřít v Google Mapách“). */
  mapQuery: 'Oderská 333/5, Praha 9 - Čakovice',
  /** Firemní údaje. Text zápisu v rejstříku je v překladech (footer.register). */
  legal: {
    ico: '62417916',
    dic: 'CZ62417916',
    registerFile: 'C 32369',
  },
  /**
   * Firemní profily na sociálních sítích. Zatím žádné nejsou – odkazy v patičce a `sameAs` ve strukturovaných
   * datech se zobrazí, až sem doplníte skutečnou adresu (např. linkedin: 'https://www.linkedin.com/company/…').
   * Neexistující profil nevyplňujte: odkaz by vedl na chybovou stránku a vyhledávače by ho přiřadily k firmě.
   */
  social: {} as Partial<Record<'linkedin' | 'facebook', string>>,
}
