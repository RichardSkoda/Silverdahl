<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { strings } = useMessageList()

const { organizationId, absolute } = useSiteOrigin()

interface Manager {
  name: string
  initials: string
  photo: string
  role: string
  focus: string
  bio: string[]
}

// Texty profilů jsou v překladech about.team.<key>.
// TODO (Tomáš Kouřil): Podle podkladů bude finální profil doplněn o konkrétní délku praxe,
// významné projekty, profesní zkušenosti a hlavní obchodní úspěchy. Nedoplňovat bez dodání podkladů.
// TODO (oba profily): Fotografie jsou zatím ilustrační portréty z podkladů (nepředstavují skutečné osoby).
// Před spuštěním webu je nahradit skutečnými profesionálními fotkami ve stejném poměru stran 4 : 3
// (ideálně alespoň 960 × 720 px) – stačí přepsat soubory public/images/management-*.webp.
const people = [
  { key: 'kouril', name: 'Tomáš Kouřil', initials: 'TK', photo: '/images/management-kouril.webp' },
  { key: 'tauchman', name: 'Michal Tauchman', initials: 'MT', photo: '/images/management-tauchman.webp' },
] as const

const managers = computed<Manager[]>(() =>
  people.map((p) => ({
    name: p.name,
    initials: p.initials,
    photo: p.photo,
    role: t(`about.team.${p.key}.role`),
    focus: t(`about.team.${p.key}.focus`),
    bio: strings(`about.team.${p.key}.bio`),
  })),
)

usePageSeo({
  title: () => t('about.seo.title'),
  description: () => t('about.seo.description'),
  page: 'o-nas',
  schemaType: 'AboutPage',
  // Strukturovaná data: vedení společnosti.
  schema: () =>
    managers.value.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role,
      image: absolute(m.photo),
      worksFor: { '@id': organizationId },
    })),
})
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
              <img
                :src="person.photo"
                :alt="person.name"
                class="person__photo"
                width="456"
                height="342"
                loading="lazy"
                decoding="async"
              />
              <header class="person__head">
                <h3 :id="`${person.initials}-jmeno`" class="person__name">{{ person.name }}</h3>
                <p class="person__role">{{ person.role }}</p>
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
  padding: var(--space-3) var(--space-3) var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
}

.person__photo {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: calc(var(--radius-lg) - 4px);
  background: var(--color-surface-muted);
}

.person__head {
  margin-top: var(--space-5);
}

.person__head,
.person__focus,
.person__bio {
  padding-inline: var(--space-3);
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
