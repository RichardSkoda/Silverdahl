// Kontaktní údaje převzaté ze současného webu https://silverdahl.cz/kontakt/ (podklady je neobsahují).
// TODO: Doplnit PSČ, IČO, DIČ a zápis v obchodním rejstříku, až budou ověřeny.

export const company = {
  name: 'Silverdahl s.r.o.',
  address: {
    street: 'Oderská 333/5',
    city: 'Praha 9 – Čakovice',
    // Název země je v překladech (contact.details.country).
  },
  phone: { label: '+420 283 933 949', href: 'tel:+420283933949' },
  email: 'marketing@silverdahl.cz',
  /** Dotaz pro Google Mapy (vložená mapa i odkaz „Otevřít v Google Mapách“). */
  mapQuery: 'Oderská 333/5, Praha 9 - Čakovice',
}
