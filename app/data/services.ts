// Struktura tří služeb. Texty (podtitul, popisy, odrážky…) jsou v překladech i18n/locales/*.json
// pod klíčem services.list.<key>; lokalizovaný seznam vrací composable useServices().
// Názvy služeb se nepřekládají – ve všech jazycích zůstávají anglické.

export type ServiceKey = 'marketEntry' | 'partnerSourcing' | 'localOperations'

export interface ServiceDef {
  /** Kotva na stránce Služby (stejná ve všech jazycích). */
  id: string
  key: ServiceKey
  number: string
  name: string
  /** Ilustrační fotografie karty – zatím výřez z grafického návrhu, nahradit originálem. */
  image: string
  icon: 'growth' | 'people' | 'gear'
  /** Služba má výčet oblastí (Partner Sourcing). */
  hasAreas?: boolean
}

export const serviceDefs: ServiceDef[] = [
  {
    id: 'market-entry-support',
    key: 'marketEntry',
    number: '01',
    name: 'Market Entry Support',
    image: '/images/sluzba-vstup-na-trh.webp',
    icon: 'growth',
  },
  {
    id: 'partner-sourcing-management',
    key: 'partnerSourcing',
    number: '02',
    name: 'Partner Sourcing & Management',
    image: '/images/sluzba-partneri.webp',
    icon: 'people',
    hasAreas: true,
  },
  {
    id: 'local-operations-management',
    key: 'localOperations',
    number: '03',
    name: 'Local Operations Management',
    image: '/images/sluzba-provoz.webp',
    icon: 'gear',
  },
]
