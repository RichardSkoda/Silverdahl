<script setup lang="ts">
import { mainNavigation } from '~/data/navigation'
import { serviceDefs } from '~/data/services'
import { company } from '~/data/company'

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
        <!-- Firemní údaje: IČO, DIČ a zápis v rejstříku jsou zatím zástupné – viz data/company.ts. -->
        <address class="footer__company">
          <strong>{{ company.name }}</strong><br />
          {{ company.address.street }}, {{ company.address.postalCode }} {{ company.address.city }}<br />
          {{ $t('footer.ico') }} {{ company.legal.ico }} · {{ $t('footer.dic') }} {{ company.legal.dic }}<br />
          {{ $t('footer.register', { file: company.legal.registerFile }) }}
        </address>
        <ul class="footer__social">
          <li>
            <a :href="company.social.linkedin" target="_blank" rel="noopener noreferrer" :title="$t('footer.followOn', { network: 'LinkedIn' })">
              <SocialIcon name="linkedin" />
              <span class="visually-hidden">{{ $t('footer.followOn', { network: 'LinkedIn' }) }} {{ $t('common.newWindow') }}</span>
            </a>
          </li>
          <li>
            <a :href="company.social.facebook" target="_blank" rel="noopener noreferrer" :title="$t('footer.followOn', { network: 'Facebook' })">
              <SocialIcon name="facebook" />
              <span class="visually-hidden">{{ $t('footer.followOn', { network: 'Facebook' }) }} {{ $t('common.newWindow') }}</span>
            </a>
          </li>
        </ul>
      </div>

      <nav :aria-label="$t('nav.footerLabel')">
        <h2 class="footer__title">{{ $t('footer.pages') }}</h2>
        <ul class="footer__list">
          <li v-for="item in mainNavigation" :key="item.page">
            <NuxtLink :to="localePath(item.page)">{{ $t(item.labelKey) }}</NuxtLink>
          </li>
          <li><NuxtLink :to="localePath('vstup-na-trh')">{{ $t('nav.marketEntry') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('caste-dotazy')">{{ $t('nav.faq') }}</NuxtLink></li>
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
      <ShareLinks inverse />
      <ul class="footer__legal">
        <li><NuxtLink :to="localePath('ochrana-osobnich-udaju')">{{ $t('footer.privacy') }}</NuxtLink></li>
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

.footer__company {
  margin-top: var(--space-5);
  font-style: normal;
  line-height: 1.7;
}

.footer__company strong {
  color: var(--color-text-inverse);
  font-weight: 600;
}

.footer__social {
  list-style: none;
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.footer__social a {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.08);
  transition: background-color var(--transition);
}

.footer__social a:hover {
  background: rgb(255 255 255 / 0.16);
}

.footer__social svg {
  width: 1.125rem;
  height: 1.125rem;
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
