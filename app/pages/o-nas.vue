<script setup lang="ts">
usePageSeo({
  title: 'O nás',
  description:
    'Silverdahl s.r.o. – česká společnost s dlouholetými zkušenostmi s podporou mezinárodního obchodu, řízením provozních procesů a koordinací dodavatelů.',
  path: '/o-nas',
})

interface Manager {
  name: string
  initials: string
  role: string
  focus: string
  bio: string[]
}

// TODO (Tomáš Kouřil): Podle podkladů bude finální profil doplněn o konkrétní délku praxe,
// významné projekty, profesní zkušenosti a hlavní obchodní úspěchy. Nedoplňovat bez dodání podkladů.
// TODO (oba profily): Doplnit skutečné profesionální fotografie, až budou dodány. Ilustrační portréty
// v podkladech nepředstavují skutečné osoby, proto se nepoužívají – zatím se zobrazují iniciály.
const managers: Manager[] = [
  {
    name: 'Tomáš Kouřil',
    initials: 'TK',
    role: 'Jednatel společnosti',
    focus: 'Strategie, obchodní rozvoj, mezinárodní partnerství a vedení společnosti.',
    bio: [
      'Tomáš stojí v čele společnosti Silverdahl od jejího založení v roce 1994 a podílí se na jejím strategickém směřování, rozvoji obchodních vztahů a řízení dlouhodobé spolupráce se zahraničními partnery.',
      'Jeho role zahrnuje především obchodní jednání, rozvoj partnerské sítě, nastavování podmínek spolupráce a dohled nad ekonomickým, personálním a provozním fungováním společnosti.',
      'Díky zkušenostem s mezinárodním obchodním prostředím a outsourcingem služeb přispívá k vytváření dlouhodobých a stabilních obchodních vztahů.',
    ],
  },
  {
    name: 'Michal Tauchman',
    initials: 'MT',
    role: 'Projektový manažer',
    focus: 'Řízení projektů, koordinace dodavatelů, provozní reporting a optimalizace procesů.',
    bio: [
      'Michal má dlouholeté zkušenosti s projektovým řízením, koordinací obchodních partnerů a provozní podporou mezinárodních obchodních aktivit.',
      'Ve společnosti Silverdahl působí od roku 2008. Během své profesní dráhy se podílel na řízení obchodních a marketingových projektů, koordinaci externích dodavatelů a zajišťování provozních procesů pro zahraniční obchodní partnery.',
      'Jeho specializací je organizace a řízení projektů, koordinace spolupráce mezi zahraniční centrálou a lokálními dodavateli a oblast provozního controllingu. Zaměřuje se na tvorbu a správu rozpočtů, pravidelný reporting, vyhodnocování obchodních výsledků a kontrolu ekonomické efektivity jednotlivých aktivit.',
      'Vystudoval bakalářský program Marketingová komunikace a následně magisterský program Ekonomika a management, který absolvoval s vyznamenáním. Ve své profesní praxi propojuje ekonomické a manažerské znalosti s marketingovou odborností.',
    ],
  },
]
</script>

<template>
  <div>
    <PageIntro eyebrow="O nás" title="Zkušenosti, lokální znalost a osobní odpovědnost">
      <p>
        Silverdahl s.r.o. je česká společnost s dlouholetými zkušenostmi s podporou mezinárodního obchodu, řízením
        provozních procesů a koordinací specializovaných dodavatelů na evropských trzích.
      </p>
    </PageIntro>

    <section class="section section--surface" aria-labelledby="zkusenosti-nadpis">
      <div class="container split">
        <h2 id="zkusenosti-nadpis">Zkušenosti s mezinárodním obchodem</h2>
        <div class="prose split__body">
          <p>
            Naše zkušenosti vycházejí především z více než třicetileté spolupráce se švýcarskou společností
            <NuxtLink to="/case-study">Courlux International SA</NuxtLink>, pro kterou zajišťujeme komplexní provozní
            podporu v České republice, na Slovensku, v Polsku a Maďarsku.
          </p>
          <p>
            Za tu dobu jsme získali rozsáhlé zkušenosti s vyhledáváním obchodních partnerů, vyjednáváním podmínek
            spolupráce, řízením projektů, kontrolou nákladů i reportingem výsledků zahraniční centrále.
          </p>
          <p class="statement">
            Naším cílem je tyto zkušenosti nabídnout dalším společnostem, které chtějí rozvíjet své podnikání na
            evropských trzích bez nutnosti budovat vlastní rozsáhlé lokální týmy.
          </p>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="jak-nadpis">
      <div class="container split">
        <h2 id="jak-nadpis">Jak pracujeme</h2>
        <div class="prose split__body">
          <p>
            Věříme, že základem úspěšné mezinárodní spolupráce jsou spolehliví obchodní partneři, kvalitní komunikace a
            jasně definovaná odpovědnost.
          </p>
          <p>
            Převzetím koordinace svěřených procesů zajišťujeme jejich každodenní fungování, kontrolujeme výsledky a
            poskytujeme klientovi pravidelný přehled o realizovaných aktivitách.
          </p>
          <p class="statement">
            Naší největší výhodou je propojení znalosti lokálního prostředí s dlouholetou zkušeností s požadavky
            zahraničních obchodních společností.
          </p>
        </div>
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="management-nadpis">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Lidé</p>
          <h2 id="management-nadpis">Náš management</h2>
        </div>

        <ul class="team">
          <li v-for="person in managers" :key="person.name">
            <article class="person" :aria-labelledby="`${person.initials}-jmeno`">
              <header class="person__head">
                <span class="person__monogram" aria-hidden="true">{{ person.initials }}</span>
                <div>
                  <h3 :id="`${person.initials}-jmeno`" class="person__name">{{ person.name }}</h3>
                  <p class="person__role">{{ person.role }}</p>
                </div>
              </header>
              <p class="person__focus">{{ person.focus }}</p>
              <div class="person__bio">
                <p v-for="(paragraph, i) in person.bio" :key="i">{{ paragraph }}</p>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <section class="section section--navy" aria-label="Citát">
      <figure class="container container--narrow quote">
        <blockquote>
          <p>
            „Za Silverdahlem nestojí anonymní servisní organizace, ale zkušení lidé, kteří rozumějí mezinárodnímu
            obchodu, dokážou samostatně řídit provoz a osobně odpovídají za svěřené projekty.“
          </p>
        </blockquote>
      </figure>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.split {
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 60rem) {
  .split {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
    gap: var(--space-8);
  }
}

.split h2 {
  font-size: var(--text-2xl);
}

.split__body {
  color: var(--color-text-muted);
}

.split__body .statement {
  margin-top: var(--space-6);
}

.team {
  list-style: none;
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 56rem) {
  .team {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.person {
  height: 100%;
  padding: var(--space-6) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
}

.person__head {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.person__monogram {
  display: grid;
  place-items: center;
  flex: none;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: var(--color-navy-800);
  color: #fff;
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.person__name {
  font-size: var(--text-2xl);
}

.person__role {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent-strong);
}

.person__focus {
  margin-top: var(--space-5);
  padding-bottom: var(--space-5);
  border-bottom: 1px solid var(--color-border);
  font-weight: 600;
  color: var(--color-navy-800);
}

.person__bio {
  margin-top: var(--space-5);
  color: var(--color-text-muted);
}

.quote {
  margin-block: 0;
}

.quote blockquote {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 500;
  line-height: var(--leading-snug);
  color: #fff;
}
</style>
