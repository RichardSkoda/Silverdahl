// Texty služeb převzaté z dokumentu „Podklady pro webové stránky.docx“.

export interface ServiceItem {
  title: string
  text: string
}

export interface Service {
  id: string
  number: string
  name: string
  subtitle: string
  /** Kratší podtitul pro kartu na domovské stránce (z grafického návrhu v podkladech). */
  tagline: string
  /** Krátký popis pro přehled na domovské stránce (z grafického návrhu v podkladech). */
  summary: string
  /** Ilustrační fotografie karty – zatím výřez z grafického návrhu, nahradit originálem. */
  image: string
  icon: 'growth' | 'people' | 'gear'
  intro: string[]
  items: ServiceItem[]
  areas?: {
    title: string
    text: string
    note: string
  }
  benefit: string[]
  /** Zkrácené „Co tím získáte?“ pro přehled na stránce Služby (z grafického návrhu v podkladech). */
  benefitShort: string
  /** Zkrácený výčet oblastí pro přehled (jen Partner Sourcing). */
  areasShort?: string
}

export const services: Service[] = [
  {
    id: 'market-entry-support',
    number: '01',
    name: 'Market Entry Support',
    subtitle: 'Podpora vstupu na nové trhy',
    tagline: 'Podpora vstupu na nové trhy',
    image: '/images/sluzba-vstup-na-trh.webp',
    icon: 'growth',
    benefitShort: 'Rychlejší vstup na trh, nižší organizační náročnost a méně potřeby budovat vlastní lokální tým.',
    summary:
      'Pomůžeme vám připravit a realizovat vstup na český a další evropské trhy. Navrhneme efektivní provozní řešení bez nutnosti budovat vlastní lokální tým.',
    intro: [
      'Vstup na nový trh přináší řadu organizačních, administrativních a obchodních výzev. Zorientovat se v místním prostředí, vyhledat vhodné dodavatele a správně nastavit provozní procesy může vyžadovat značné časové i personální kapacity.',
      'Silverdahl pomáhá zahraničním společnostem připravit a realizovat vstup na český a další evropské trhy. Naším cílem je navrhnout efektivní způsob lokálního fungování bez nutnosti budovat vlastní provozní tým.',
    ],
    items: [
      { title: 'Analýza potřeb projektu', text: 'seznámení s obchodním modelem klienta, jeho cíli a požadavky na lokální provoz.' },
      { title: 'Návrh provozního řešení', text: 'identifikace potřebných procesů, dodavatelských služeb a odpovědností.' },
      { title: 'Příprava vstupu na trh', text: 'vytvoření harmonogramu, koordinace přípravných aktivit a potřebných partnerů.' },
      { title: 'Organizace lokálního zázemí', text: 'zajištění externích odborníků a služeb potřebných k zahájení činnosti.' },
      { title: 'Koordinace implementace', text: 'řízení jednotlivých kroků, kontrola termínů a řešení provozních komplikací.' },
      {
        title: 'Podpora rozšiřování stávajících aktivit',
        text: 'pomoc společnostem, které již na trhu působí a chtějí rozvíjet nebo optimalizovat své procesy.',
      },
    ],
    benefit: [
      'Lokálního partnera se znalostí obchodního prostředí, který vám pomůže rychleji nastavit potřebné procesy, snížit organizační náročnost expanze a omezit potřebu vytváření vlastních administrativních a provozních kapacit.',
    ],
  },
  {
    id: 'partner-sourcing-management',
    number: '02',
    name: 'Partner Sourcing & Management',
    subtitle: 'Vyhledávání a zajištění specializovaných obchodních partnerů',
    tagline: 'Vyhledávání a zajištění obchodních partnerů',
    image: '/images/sluzba-partneri.webp',
    icon: 'people',
    benefitShort: 'Jedno kontaktní místo pro výběr a vytvoření funkční sítě lokálních dodavatelů.',
    areasShort: 'call centra, marketing, logistika, IT, účetní a daňové služby, právo, celní služby, překlady, HR a další',
    summary:
      'Vyhledáme, prověříme a zajistíme spolehlivé dodavatele služeb. Porovnáme nabídky, pomůžeme vyjednat nejlepší podmínky a zorganizujeme zahájení spolupráce.',
    intro: [
      'Spolehliví obchodní partneři jsou základem úspěšného fungování každého projektu. Jejich vyhledání, porovnání nabídek a nastavení obchodních podmínek však může být pro zahraniční společnost časově náročné, zejména pokud nezná místní prostředí.',
      'Silverdahl na základě konkrétních požadavků klienta vyhledává a oslovuje vhodné poskytovatele služeb, organizuje výběrová řízení a koordinuje zahájení spolupráce.',
      'Neomezujeme se pouze na oblasti, ve kterých již máme zkušenosti. Podle povahy projektu dokážeme zmapovat možnosti trhu a vyhledat vhodné specializované poskytovatele i z dalších oborů.',
    ],
    items: [
      { title: 'Definice požadavků', text: 'příprava zadání a požadovaných parametrů služby.' },
      { title: 'Vyhledávání dodavatelů', text: 'identifikace potenciálních partnerů na lokálním trhu.' },
      { title: 'Poptávková a výběrová řízení', text: 'oslovení poskytovatelů, sběr a vyhodnocování nabídek.' },
      { title: 'Porovnání obchodních podmínek', text: 'posouzení cen, rozsahu služeb, kapacit a dalších relevantních parametrů.' },
      {
        title: 'Koordinace obchodních jednání',
        text: 'komunikace s potenciálními partnery a podpora při nastavování podmínek spolupráce.',
      },
      { title: 'Implementace spolupráce', text: 'organizace zahájení služeb, nastavení komunikace a předání provozních požadavků.' },
    ],
    areas: {
      title: 'V jakých oblastech můžeme partnery zajistit?',
      text: 'Například zákaznická a kontaktní centra, marketingové a reklamní služby, tisk a distribuce, logistika, doprava, skladování, fulfillment, IT, účetní a daňové služby, právní poradenství, celní služby, překlady, lokalizace či personální služby.',
      note: 'Výběr oblastí není uzavřený a vždy se přizpůsobuje individuálním potřebám klienta.',
    },
    benefit: [
      'Jednoho partnera, který za vás zorganizuje vyhledání a výběr vhodných poskytovatelů, porovná dostupné možnosti a pomůže vytvořit funkční síť lokálních dodavatelů.',
    ],
  },
  {
    id: 'local-operations-management',
    number: '03',
    name: 'Local Operations Management',
    subtitle: 'Externí řízení a koordinace provozních procesů',
    tagline: 'Externí řízení a koordinace provozu',
    image: '/images/sluzba-provoz.webp',
    icon: 'gear',
    benefitShort: 'Externí provozní management, pravidelný reporting a více času pro vaše obchodní priority.',
    summary:
      'Převezmeme koordinaci svěřených procesů, komunikaci s dodavateli a kontrolu jejich činnosti. Poskytujeme pravidelný reporting a pomáháme optimalizovat náklady i kvalitu služeb.',
    intro: [
      'Naše spolupráce nekončí výběrem vhodných obchodních partnerů.',
      'Silverdahl může převzít dlouhodobou odpovědnost za koordinaci svěřených provozních procesů, komunikaci s dodavateli a průběžnou kontrolu jejich činnosti.',
      'Působíme jako lokální provozní partner a centrální kontaktní místo mezi zahraničním vedením společnosti a jednotlivými poskytovateli služeb.',
    ],
    items: [
      {
        title: 'Projektový a provozní management',
        text: 'organizace a řízení každodenních činností v rámci svěřených projektů.',
      },
      { title: 'Koordinace obchodních partnerů', text: 'pravidelná komunikace, zadávání úkolů a kontrola jejich plnění.' },
      {
        title: 'Kontrola smluvních podmínek',
        text: 'sledování dodržování sjednaného rozsahu služeb, termínů a požadované kvality.',
      },
      { title: 'Řešení provozních situací', text: 'operativní řešení komplikací a koordinace nápravných opatření.' },
      { title: 'Kontrola nákladů', text: 'vyhodnocování nákladovosti služeb a kontrola podkladů dodavatelských faktur.' },
      {
        title: 'Reporting a vyhodnocování KPI',
        text: 'pravidelný přehled o průběhu projektů, výkonnosti dodavatelů a dosahovaných výsledcích.',
      },
      {
        title: 'Optimalizace procesů',
        text: 'identifikace příležitostí ke zvýšení efektivity, zlepšení kvality nebo snížení nákladů.',
      },
      {
        title: 'Komunikace s centrálou',
        text: 'pravidelné předávání informací, doporučení a podkladů pro rozhodování managementu.',
      },
    ],
    benefit: [
      'Externí provozní management, který se stará o každodenní fungování svěřených procesů, koordinuje jednotlivé dodavatele a poskytuje vám pravidelný přehled o výsledcích.',
      'Namísto komunikace s mnoha poskytovateli máte jedno odpovědné kontaktní místo. Vaše vedení tak může věnovat více času obchodním a strategickým prioritám.',
    ],
  },
]
