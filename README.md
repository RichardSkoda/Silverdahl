# Silverdahl – firemní web

Firemní web společnosti **Silverdahl s.r.o.** postavený na Nuxtu 4 (Vue 3, TypeScript).
Obsah vychází výhradně z dokumentu *Podklady pro webové stránky.docx*.

## Technologie

| Oblast | Řešení |
| --- | --- |
| Framework | Nuxt 4.4.5 (Vue 3, TypeScript strict) |
| Styly | čisté CSS s designovými proměnnými (`app/assets/css/main.css`), scoped styly v komponentách |
| Písma | Plus Jakarta Sans (nadpisy) + Inter (text) – lokálně přes `@fontsource-variable` (žádné externí CDN) |
| Formulář | vlastní Nitro endpoint `/api/contact`, doručení přes SMTP (`nodemailer`) |
| Hosting | libovolný Node.js server (výstup `.output/`) – bez vazby na konkrétního poskytovatele |

Žádná databáze, CMS, autentizace ani UI framework – obsah je statický.

> **Verze Node.js:** projekt je ověřen na Node **20.19.0**. Nuxt 4.4.5 je poslední verze, která Node 20 podporuje
> (novější Nuxt 4.5+ vyžaduje Node 22/24). Node 20 už nemá podporu, proto doporučujeme přejít na **Node 24 LTS**
> a poté aktualizovat Nuxt (`npm install nuxt@latest`).

## Instalace a spuštění

```bash
npm install --legacy-peer-deps   # npm 10.8 jinak padá na chybě „Cannot read properties of null (reading 'edgesOut')“
npm run dev                      # vývojový server na http://localhost:3000
```

### Produkční build

```bash
npm run build      # výstup do .output/ (4 obsahové stránky se předgenerují jako statické HTML)
npm run start      # spustí node .output/server/index.mjs (port nastavíte proměnnou PORT)
npm run typecheck  # kontrola typů (vue-tsc)
```

Konfigurace probíhá přes proměnné prostředí – viz `.env.example` (zkopírujte do `.env`).

| Proměnná | Význam |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | produkční doména, např. `https://www.example.cz`. Bez ní se negenerují kanonické URL ani `og:url`. |
| `NUXT_SMTP_HOST`, `NUXT_SMTP_PORT`, `NUXT_SMTP_SECURE`, `NUXT_SMTP_USER`, `NUXT_SMTP_PASS` | SMTP server pro odesílání zpráv z formuláře |
| `NUXT_CONTACT_FROM` | odesílatel e-mailu (adresa povolená u SMTP poskytovatele) |
| `NUXT_CONTACT_TO` | adresa, kam mají zprávy z formuláře chodit |

## Struktura

```
app/
  app.vue, error.vue           kořen aplikace, chybová / 404 stránka
  layouts/default.vue          hlavička, <main>, patička, skip-link
  pages/                       / · /sluzby · /case-study · /o-nas · /kontakt · /cookies
  components/
    SiteHeader, SiteFooter     navigace (aktivní stavy, přístupné mobilní menu, funguje i bez JS)
    SiteLogo                   textový wordmark (není oficiální logo)
    BaseButton, PageIntro, CtaBand
    ServiceIcon                čárové ikony z grafického návrhu (Lucide, ISC)
    ServiceSection             detail služby (/sluzby)
    StatItem                   statistika s časovým zařazením (historické maximum × současnost)
    ContactForm                formulář s validací a pravdivými stavy odeslání
    CookieBanner               lišta a nastavení souhlasu s cookies
    GoogleMap                  mapa Google na /kontakt – načte se až se souhlasem (jinak náhled + odkaz)
  composables/usePageSeo.ts    title, description, Open Graph, kanonická URL
  composables/useCookieConsent.ts  stav souhlasu s cookies (uložení, přijmout / odmítnout, otevření nastavení)
  plugins/consent.client.ts    načtení volby + místo pro měřicí a marketingové skripty (spouští se až po souhlasu)
  data/cookies.ts              kategorie cookies a přehled cookies pro stránku /cookies
  data/company.ts              adresa, telefon, e-mail (převzato ze současného webu silverdahl.cz)
  data/services.ts             texty tří služeb
  data/navigation.ts           položky menu
  assets/css/main.css          design tokeny a globální styly
shared/contact.ts              validace formuláře sdílená klientem i serverem
server/api/contact.post.ts     endpoint formuláře
server/utils/contactDelivery.ts  doručení zprávy (SMTP) – místo pro napojení jiné služby
public/                        favicon.svg, robots.txt
public/images/                 mapa Evropy (SVG, Natural Earth) a fotografie karet služeb a hero
```

> **Fotografie jsou dočasné.** Snímky v `public/images/*.webp` jsou výřezy z grafického návrhu domovské stránky
> v podkladech (nízké rozlišení). Před spuštěním je nahraďte originály ve vyšším rozlišení se stejným názvem souboru
> (poměr stran cca 4 : 3 pro karty služeb, úzký svislý snímek pro budovu v hero).
> Mapa `mapa-evropy.svg` je vygenerovaná z veřejných dat Natural Earth (world-atlas) – zvýrazněné jsou CZ, SK, PL, HU.
> Ilustrace `ilustrace-*.svg` (přehled na /sluzby) jsou vektorově překreslené podle návrhu; ikona podání ruky v
> `ilustrace-partneri.svg` pochází z Font Awesome Free (licence CC BY 4.0 – uvedení autora je v souboru ponecháno).


## Cookies a souhlas

- Web zatím **nepoužívá žádné analytické ani marketingové nástroje** – vlastní cookie je jen nezbytná `silverdahl_consent`
  (uložená volba návštěvníka, platnost 6 měsíců, `SameSite=Lax`, v produkci `Secure`).
- **Mapa Google na /kontakt** patří do kategorie *Externí obsah*: bez souhlasu se nenačte (žádný požadavek na Google),
  zobrazí se náhled s tlačítkem „Zobrazit mapu“ (uloží souhlas jen s touto kategorií) a odkazem do Google Map.
  Po odvolání souhlasu se mapa hned skryje.
- Lišta nabízí **Přijmout vše / Odmítnout vše / Nastavení** se stejně výraznými tlačítky, volitelné kategorie jsou ve
  výchozím stavu vypnuté. Volbu lze kdykoli změnit odkazem „Nastavení cookies“ v patičce nebo na stránce `/cookies`.
- Stránky jsou předgenerované, proto se lišta vykresluje až v prohlížeči (`<ClientOnly>`). Bez JavaScriptu se
  nezobrazí – nenačítá se pak ale ani žádný skript, který by souhlas vyžadoval.

**Zapojení měřicího nástroje (např. Google Analytics):**
1. Kód vložte do pole `loaders` v `app/plugins/consent.client.ts` do správné kategorie (`analytics` / `marketing`).
   Nikdy ne přímo do `nuxt.config.ts` ani do šablon – spustil by se bez souhlasu.
2. Jeho cookies doplňte do `cookieList` v `app/data/cookies.ts` (zobrazí se v tabulce na `/cookies`) a upravte text
   „Jaké cookies používáme“ v `app/pages/cookies.vue`.
3. Zvyšte `CONSENT_VERSION` v `app/data/cookies.ts` – všichni návštěvníci budou o souhlas požádáni znovu.

Po odvolání souhlasu se stránka jednou znovu načte, aby už spuštěné skripty přestaly běžet.

## Kontaktní formulář

- Pole: jméno, firma (nepovinné), e-mail, předmět/služba, zpráva. Validace na klientu i serveru, skryté antispam pole.
- **Dokud není nastaveno SMTP**, endpoint vrací `503` a formulář uživateli nikdy neoznámí odeslání.
  V produkci je navíc tlačítko „Odeslat“ zablokované a nad formulářem je upozornění, že odesílání není aktivní.
  Při `npm run dev` se zobrazí poznámka pro vývojáře a odeslání lze zkoušet (validace, chybové stavy).
- Formulář funguje i bez JavaScriptu (klasický POST → přesměrování na `/kontakt?stav=…`).
- Jiný způsob doručení (CRM, helpdesk, webhook) stačí implementovat ve `server/utils/contactDelivery.ts`.

## Ověření (provedeno při vytvoření projektu)

- `npm run typecheck` – bez chyb.
- `npm run build` – úspěšný; předgenerováno `/`, `/sluzby`, `/case-study`, `/o-nas`.
- Produkční server: všech 5 rout vrací 200, neexistující URL 404, každá stránka má vlastní `<title>`.
- `/api/contact`: neplatná data → 422 s chybami, platná data bez SMTP → 503 „nenapojeno“, antispam → 400,
  POST bez JS → 303 přesměrování.
- Headless Edge (Playwright) na šířkách 320, 390, 768 a 1366 px: žádné horizontální přetečení, žádné chyby v konzoli;
  mobilní menu ovladatelné klávesnicí (Enter/Escape, návrat fokusu), aktivní položka má `aria-current="page"`;
  bez JavaScriptu je navigace rozbalená.
- Lint (ESLint) není v projektu nakonfigurován.

## Čeká na doplnění před zveřejněním

- [ ] **Kontaktní údaje** – e-mail, telefon, adresa sídla, IČO/DIČ, zápis v OR (patička + `/kontakt`, viz TODO v kódu).
- [ ] **Doména** – nastavit `NUXT_PUBLIC_SITE_URL` (kanonické URL, `og:url`); případně doplnit `sitemap.xml`.
- [ ] **Doručování formuláře** – nastavit SMTP proměnné a otestovat odeslání skutečné zprávy.
- [ ] **Zásady ochrany osobních údajů** – text a odkaz u formuláře (TODO v `ContactForm.vue`).
- [ ] **Profil Tomáše Kouřila** – podle podkladů bude doplněna konkrétní délka praxe, významné projekty,
      profesní zkušenosti a hlavní obchodní úspěchy (TODO v `app/pages/o-nas.vue`).
- [ ] **Fotografie managementu** – portréty v podkladech jsou ilustrační návrh, proto nejsou použity;
      zatím se zobrazují iniciály. Po dodání skutečných fotografií doplnit do `o-nas.vue`.
- [ ] **Logo** – na webu je jednoduchý textový wordmark; nahradit oficiálním logem, pokud existuje.
- [ ] Volitelně Open Graph obrázek (`og:image`) a anglická jazyková verze.
- [ ] Aktualizace na Node 24 LTS a nejnovější Nuxt (viz výše).
