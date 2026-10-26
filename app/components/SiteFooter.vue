<script setup lang="ts">
import { mainNavigation } from '~/data/navigation'
import { serviceDefs } from '~/data/services'

const year = new Date().getFullYear()
const localePath = useLocalePath()
const { openSettings } = useCookieConsent()
</script>

<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__about">
        <SiteLogo inverse />
        <p>{{ $t('footer.about') }}</p>
        <!--
          TODO: Doplnit ověřené kontaktní a firemní údaje (sídlo, IČO, DIČ, zápis v obchodním rejstříku,
          telefon, e-mail, případně profily na sociálních sítích). Podklady je zatím neobsahují.
        -->
      </div>

      <nav :aria-label="$t('nav.footerLabel')">
        <h2 class="footer__title">{{ $t('footer.pages') }}</h2>
        <ul class="footer__list">
          <li v-for="item in mainNavigation" :key="item.page">
            <NuxtLink :to="localePath(item.page)">{{ $t(item.labelKey) }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="footer__title">{{ $t('footer.services') }}</h2>
        <ul class="footer__list">
          <li v-for="service in serviceDefs" :key="service.id">
            <NuxtLink :to="localePath({ name: 'sluzby', hash: `#${service.id}` })">{{ service.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>© {{ year }} Silverdahl s.r.o.</p>
      <ul class="footer__legal">
        <li><NuxtLink :to="localePath('cookies')">{{ $t('footer.cookiePolicy') }}</NuxtLink></li>
        <!-- Tlačítko funguje jen s JavaScriptem, bez něj se lišta ani nezobrazuje. -->
        <ClientOnly>
          <li>
            <button type="button" class="footer__link-btn" @click="openSettings">{{ $t('footer.cookieSettings') }}</button>
          </li>
        </ClientOnly>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-navy-900);
  color: var(--color-text-inverse-muted);
  padding-top: var(--space-8);
  font-size: var(--text-sm);
}

.footer__grid {
  display: grid;
  gap: var(--space-7);
  grid-template-columns: 1fr;
}

@media (min-width: 48rem) {
  .footer__grid {
    grid-template-columns: 1.6fr 1fr 1.2fr;
  }
}

.footer__about p {
  margin-top: var(--space-5);
  max-width: 26rem;
}

.footer__title {
  margin-bottom: var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent-on-dark);
}

.footer__list {
  list-style: none;
  display: grid;
  gap: var(--space-2);
}

.footer a {
  color: var(--color-text-inverse);
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
  color: #fff;
}

.footer :focus-visible {
  outline-color: #9cc0ff;
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3) var(--space-6);
  margin-top: var(--space-7);
  padding-block: var(--space-5);
  border-top: 1px solid rgb(255 255 255 / 0.12);
}

.footer__legal {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
}

.footer__link-btn {
  padding: 0;
  border: 0;
  background: none;
  color: var(--color-text-inverse);
  font: inherit;
  cursor: pointer;
}

.footer__link-btn:hover {
  color: #fff;
  text-decoration: underline;
}
</style>
