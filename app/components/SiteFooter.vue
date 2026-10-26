<script setup lang="ts">
import { mainNavigation } from '~/data/navigation'
import { services } from '~/data/services'

const year = new Date().getFullYear()
const { openSettings } = useCookieConsent()
</script>

<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__about">
        <SiteLogo inverse />
        <p>
          Pomáháme zahraničním společnostem vstupovat na nové trhy, vyhledávat spolehlivé partnery a řídit lokální
          provozní procesy.
        </p>
        <!--
          TODO: Doplnit ověřené kontaktní a firemní údaje (sídlo, IČO, DIČ, zápis v obchodním rejstříku,
          telefon, e-mail, případně profily na sociálních sítích). Podklady je zatím neobsahují.
        -->
      </div>

      <nav aria-label="Navigace v patičce">
        <h2 class="footer__title">Stránky</h2>
        <ul class="footer__list">
          <li v-for="item in mainNavigation" :key="item.to">
            <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="footer__title">Služby</h2>
        <ul class="footer__list">
          <li v-for="service in services" :key="service.id">
            <NuxtLink :to="`/sluzby#${service.id}`">{{ service.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>© {{ year }} Silverdahl s.r.o.</p>
      <ul class="footer__legal">
        <li><NuxtLink to="/cookies">Zásady cookies</NuxtLink></li>
        <!-- Tlačítko funguje jen s JavaScriptem, bez něj se lišta ani nezobrazuje. -->
        <ClientOnly>
          <li>
            <button type="button" class="footer__link-btn" @click="openSettings">Nastavení cookies</button>
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
