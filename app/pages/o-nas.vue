<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { strings } = useMessageList()

usePageSeo({
  title: () => t('about.seo.title'),
  description: () => t('about.seo.description'),
  page: 'o-nas',
})

interface Manager {
  name: string
  initials: string
  role: string
  focus: string
  bio: string[]
}

// Texty profilů jsou v překladech about.team.<key>.
// TODO (Tomáš Kouřil): Podle podkladů bude finální profil doplněn o konkrétní délku praxe,
// významné projekty, profesní zkušenosti a hlavní obchodní úspěchy. Nedoplňovat bez dodání podkladů.
// TODO (oba profily): Doplnit skutečné profesionální fotografie, až budou dodány. Ilustrační portréty
// v podkladech nepředstavují skutečné osoby, proto se nepoužívají – zatím se zobrazují iniciály.
const people = [
  { key: 'kouril', name: 'Tomáš Kouřil', initials: 'TK' },
  { key: 'tauchman', name: 'Michal Tauchman', initials: 'MT' },
] as const

const managers = computed<Manager[]>(() =>
  people.map((p) => ({
    name: p.name,
    initials: p.initials,
    role: t(`about.team.${p.key}.role`),
    focus: t(`about.team.${p.key}.focus`),
    bio: strings(`about.team.${p.key}.bio`),
  })),
)
</script>

<template>
  <div>
    <PageIntro :eyebrow="$t('about.intro.eyebrow')" :title="$t('about.intro.title')">
      <p>{{ $t('about.intro.text') }}</p>
    </PageIntro>

    <section class="section section--surface" aria-labelledby="zkusenosti-nadpis">
      <div class="container split">
        <h2 id="zkusenosti-nadpis">{{ $t('about.experience.title') }}</h2>
        <div class="prose split__body">
          <i18n-t keypath="about.experience.p1" tag="p" scope="global">
            <template #company>
              <NuxtLink :to="localePath('case-study')">Courlux International SA</NuxtLink>
            </template>
          </i18n-t>
          <p>{{ $t('about.experience.p2') }}</p>
          <p class="statement">{{ $t('about.experience.statement') }}</p>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="jak-nadpis">
      <div class="container split">
        <h2 id="jak-nadpis">{{ $t('about.approach.title') }}</h2>
        <div class="prose split__body">
          <p>{{ $t('about.approach.p1') }}</p>
          <p>{{ $t('about.approach.p2') }}</p>
          <p class="statement">{{ $t('about.approach.statement') }}</p>
        </div>
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="management-nadpis">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">{{ $t('about.team.eyebrow') }}</p>
          <h2 id="management-nadpis">{{ $t('about.team.title') }}</h2>
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

    <section class="section section--navy" :aria-label="$t('about.quote.label')">
      <figure class="container container--narrow quote">
        <blockquote>
          <p>{{ $t('about.quote.text') }}</p>
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
