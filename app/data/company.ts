// Kontaktní údaje převzaté ze současného webu https://silverdahl.cz/kontakt/ (podklady je neobsahují).
// TODO: IČO, DIČ, zápis v obchodním rejstříku a odkazy na sociální sítě jsou ZATÍM SMYŠLENÉ (zástupné hodnoty).
// Před spuštěním webu je nahradit skutečnými údaji – zobrazují se v patičce, v zásadách ochrany osobních
// údajů i ve strukturovaných datech pro vyhledávače.

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
  /** Firemní údaje – zástupné hodnoty, viz TODO výše. Zápis v rejstříku je v překladech (footer.register). */
  legal: {
    ico: '12345678',
    dic: 'CZ12345678',
    registerFile: 'C 12345',
  },
  /** Firemní profily na sociálních sítích – zástupné adresy, viz TODO výše. */
  social: {
    linkedin: 'https://www.linkedin.com/company/silverdahl',
    facebook: 'https://www.facebook.com/silverdahl',
  },
}
