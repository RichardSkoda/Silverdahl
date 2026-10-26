<script setup lang="ts">
usePageSeo({
  title: 'Case study: Courlux International SA',
  description:
    'Více než 30 let komplexní provozní podpory na čtyřech evropských trzích – Česká republika, Slovensko, Polsko a Maďarsko.',
  path: '/case-study',
})

// Údaje přesně podle podkladů. „period“ odlišuje historické maximum od současného provozu.
const stats = [
  { value: '30+', label: 'let dlouhodobého partnerství', period: 'Dlouhodobě' },
  { value: '4', label: 'trhy – Česká republika, Slovensko, Polsko a Maďarsko', period: 'Dlouhodobě' },
  { value: 'až 4', label: 'call centra na jednom trhu v období největšího rozsahu spolupráce', period: 'Historické maximum' },
  { value: '30 000+', label: 'nových zákazníků měsíčně v historicky nejintenzivnějších kampaních', period: 'Historické maximum' },
  { value: 'Tisíce', label: 'zákaznických kontaktů měsíčně v rámci současného provozu', period: 'Současný provoz' },
]

const partners = ['Zákaznická centra', 'Marketingoví partneři', 'Logistika a doprava', 'Odborné a další služby']
</script>

<template>
  <div>
    <PageIntro eyebrow="Case study / Reference" title="Courlux International SA">
      <p class="cs-subtitle">Více než 30 let komplexní provozní podpory na čtyřech evropských trzích</p>
      <p>
        Švýcarská obchodní společnost Courlux International SA využívá Silverdahl jako svého dlouhodobého partnera pro
        zajištění obchodních a provozních aktivit v České republice, na Slovensku, v Polsku a Maďarsku.
      </p>
    </PageIntro>

    <section class="section section--surface" aria-labelledby="ukol-nadpis">
      <div class="container container--narrow">
        <h2 id="ukol-nadpis" class="visually-hidden">Náš úkol</h2>
        <p class="statement">
          Naším úkolem je vyhledávat vhodné lokální dodavatele, nastavovat spolupráci a následně řídit svěřené procesy
          tak, aby jejich každodenní koordinace nemusela zatěžovat švýcarskou centrálu.
        </p>
      </div>
    </section>

    <section class="section" aria-labelledby="pribeh-nadpis">
      <div class="container story">
        <div class="prose">
          <p class="eyebrow">Historie spolupráce</p>
          <h2 id="pribeh-nadpis">Od prvních obchodních partnerů ke komplexnímu řízení provozu</h2>
          <p>
            Spolupráce začala zajištěním zákaznického servisu, lokalizací marketingových materiálů a vyhledáváním
            partnerů pro získávání nových zákazníků. Zpočátku se jednalo především o vydavatele novin a časopisů,
            prostřednictvím kterých Courlux realizoval své marketingové kampaně.
          </p>
          <p>
            S vývojem trhu jsme postupně vyhledali a zajistili spolupráci s externími call centry. Pro jednotlivé země
            jsme organizovali výběr dodavatelů, porovnávali nabídky, vyjednávali obchodní podmínky a následně převzali
            koordinaci jejich činnosti a vyhodnocování výsledků.
          </p>
          <aside class="highlight" aria-label="Období největšího rozsahu spolupráce">
            <p class="highlight__tag">Historické maximum</p>
            <p>
              V období nejintenzivnějších kampaní jsme koordinovali až čtyři call centra na jednom trhu, přičemž
              celkový nábor přesahoval 30 000 nových zákazníků měsíčně.
            </p>
          </aside>
          <p>
            Postupně jsme obdobným způsobem zajistili také další specializované partnery, například v oblasti IT
            podpory, celní deklarace, poštovních a logistických služeb či právního poradenství.
          </p>
        </div>
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="dnes-nadpis">
      <div class="container today">
        <div class="prose">
          <p class="eyebrow">Současnost</p>
          <h2 id="dnes-nadpis">Jak spolupráce funguje dnes</h2>
          <p>
            Silverdahl dnes samostatně koordinuje většinu lokálních obchodních a provozních procesů Courluxu na všech
            čtyřech trzích.
          </p>
          <p>
            Řídíme spolupráci s externími dodavateli, průběžně kontrolujeme jejich kvalitu a náklady, řešíme provozní
            komplikace a reagujeme na změny obchodních požadavků i legislativního prostředí. Příkladem je úspěšná
            implementace procesů souvisejících s GDPR.
          </p>
          <p>
            Součástí naší odpovědnosti je také příprava obchodních rozpočtů a jejich pravidelné vyhodnocování. Švýcarské
            centrále poskytujeme denní, týdenní a měsíční reporting, včetně porovnání skutečných výsledků s plánem.
          </p>
          <p>
            V rámci schválených rozpočtů a svěřených kompetencí řešíme operativní záležitosti samostatně. Centrála si
            ponechává strategická a finanční rozhodnutí, zajištění zásob a distribuci zboží ze Švýcarska.
          </p>
        </div>

        <figure class="model">
          <div class="model__box">
            <p class="model__name">Courlux International SA</p>
            <p class="model__desc">Švýcarská centrála – obchodní strategie a rozhodování</p>
          </div>
          <span class="model__arrow" aria-hidden="true">⇅</span>
          <div class="model__box model__box--main">
            <p class="model__name">Silverdahl</p>
            <p class="model__role">Local Operations Management</p>
            <p class="model__desc">Koordinace projektů · Řízení partnerů · Kontrola · Reporting</p>
          </div>
          <span class="model__arrow" aria-hidden="true">⇅</span>
          <ul class="model__partners">
            <li v-for="partner in partners" :key="partner">{{ partner }}</li>
          </ul>
          <figcaption>Zjednodušené znázornění modelu řízení a koordinace externích poskytovatelů.</figcaption>
        </figure>
      </div>
    </section>

    <section class="section" aria-labelledby="cisla-nadpis">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Fakta</p>
          <h2 id="cisla-nadpis">Spolupráce v číslech</h2>
        </div>
        <dl class="stats">
          <StatItem v-for="stat in stats" :key="stat.label" v-bind="stat" />
        </dl>
      </div>
    </section>

    <section class="section section--navy" aria-labelledby="prinos-nadpis">
      <div class="container container--narrow">
        <h2 id="prinos-nadpis">Co Courlux díky spolupráci získává?</h2>
        <div class="prose benefit">
          <p>
            Courlux má pro čtyři evropské trhy jednoho odpovědného provozního partnera, který zajišťuje fungování sítě
            specializovaných dodavatelů a každodenní koordinaci jejich služeb.
          </p>
          <p>
            Díky tomuto modelu nemusí budovat vlastní rozsáhlé lokální týmy ani řídit jednotlivé poskytovatele přímo ze
            Švýcarska. Získává přitom průběžnou kontrolu nad náklady, kvalitou a obchodními výsledky prostřednictvím
            pravidelného reportingu.
          </p>
        </div>
        <p class="benefit__statement">
          Spolupráce s Courluxem dokládá naši schopnost nejen vyhledat a zajistit vhodné obchodní partnery, ale také
          dlouhodobě převzít řízení svěřených procesů a přizpůsobovat je měnícím se potřebám klienta.
        </p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.cs-subtitle {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-navy-700);
  font-weight: 500;
  line-height: var(--leading-snug);
}

.story .prose,
.today .prose {
  color: var(--color-text-muted);
}

.story .prose h2,
.today .prose h2 {
  margin-bottom: var(--space-5);
}

.highlight {
  margin-block: var(--space-6);
  padding: var(--space-5);
  border-left: 3px solid var(--color-accent);
  background: var(--color-accent-soft);
  border-radius: 0 var(--radius) var(--radius) 0;
  color: var(--color-navy-900);
  font-weight: 500;
}

.highlight__tag {
  margin-bottom: var(--space-2);
  font-size: var(--text-xs);
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-strong);
}

.highlight__tag + p {
  margin-top: 0;
}

.today {
  display: grid;
  gap: var(--space-7);
}

@media (min-width: 64rem) {
  .today {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
  }
}

/* Schéma modelu spolupráce */
.model {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  text-align: center;
}

.model__box {
  width: 100%;
  padding: var(--space-4);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius);
  background: var(--color-surface);
}

.model__box--main {
  background: var(--color-navy-800);
  border-color: var(--color-navy-800);
  color: var(--color-text-inverse-muted);
}

.model__box--main .model__name {
  color: #fff;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.model__name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-navy-800);
}

.model__role {
  margin-top: var(--space-1) !important;
  font-weight: 600;
  color: var(--color-accent-on-dark);
}

.model__desc {
  margin-top: var(--space-1) !important;
  font-size: var(--text-sm);
}

.model__box:not(.model__box--main) .model__desc {
  color: var(--color-text-muted);
}

.model__arrow {
  font-size: 1.25rem;
  line-height: 1;
  color: var(--color-navy-600);
}

.model__partners {
  list-style: none;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}

.model__partners li {
  padding: var(--space-3);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius);
  background: var(--color-surface);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-navy-800);
}

.model figcaption {
  margin-top: var(--space-3);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* Statistiky */
.stats {
  display: grid;
  gap: var(--space-6) var(--space-5);
  margin: 0;
}

@media (min-width: 36rem) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .stats {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

.benefit {
  margin-top: var(--space-5);
  color: var(--color-text-inverse-muted);
}

.benefit__statement {
  margin-top: var(--space-6);
  padding-left: var(--space-5);
  border-left: 3px solid var(--color-accent);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  line-height: var(--leading-snug);
  color: #fff;
}
</style>
