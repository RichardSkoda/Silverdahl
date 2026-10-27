# Silverdahl – firemní web

Firemní web společnosti **Silverdahl s.r.o.** postavený na Nuxtu 4 (Vue 3, TypeScript), ve třech jazycích –
čeština, angličtina a němčina. Obsah vychází z dokumentu *Podklady pro webové stránky.docx*.

## Technologie

| Oblast | Řešení |
| --- | --- |
| Framework | Nuxt 4.4.5 (Vue 3, TypeScript strict) |
| Styly | čisté CSS s designovými proměnnými (`app/assets/css/main.css`), scoped styly v komponentách |
| Písma | Plus Jakarta Sans (nadpisy) + Inter (text) – lokálně přes `@fontsource-variable` (žádné externí CDN) |
| Jazyky | `@nuxtjs/i18n` (vue-i18n) – čeština (výchozí), angličtina, němčina; přeložené adresy stránek |
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
npm run build      # výstup do .output/ (obsahové stránky ve všech jazycích se předgenerují jako statické HTML)
npm run start      # spustí node .output/server/index.mjs (port nastavíte proměnnou PORT)
npm run typecheck  # kontrola typů (vue-tsc)
```

Konfigurace probíhá přes proměnné prostředí – viz `.env.example` (zkopírujte do `.env`).

| Proměnná | Význam |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | doména webu, výchozí `https://silverdahl.cz` (současný web běží bez `www`). Skládají se z ní kanonické URL, `hreflang`, `og:url`, `og:image`, strukturovaná data, sitemap a robots.txt. Stránky se předgenerují při buildu, proto ji nastavte už při `npm run build`. |
| `NUXT_PUBLIC_INDEXABLE` | `false` na testovacím nasazení – robots.txt zakáže procházení a stránky dostanou `noindex`. Výchozí `true`. |
| `NUXT_SMTP_HOST`, `NUXT_SMTP_PORT`, `NUXT_SMTP_SECURE`, `NUXT_SMTP_USER`, `NUXT_SMTP_PASS` | SMTP server pro odesílání zpráv z formuláře |
| `NUXT_CONTACT_FROM` | odesílatel e-mailu (adresa povolená u SMTP poskytovatele) |
| `NUXT_CONTACT_TO` | adresa, kam mají zprávy z formuláře chodit |

## Struktura

```
app/
  app.vue, error.vue           kořen aplikace, chybová / 404 stránka
  layouts/default.vue          hlavička, <main>, patička, skip-link
  pages/                       / · /sluzby · /vstup-na-cesky-trh · /case-study · /o-nas · /kontakt · /cookies · /ochrana-osobnich-udaju (adresy v dalších jazycích viz níže)
  components/
    SiteHeader, SiteFooter     navigace (aktivní stavy, přístupné mobilní menu, funguje i bez JS)
    LanguageSwitcher           přepínač jazyků CS · EN · DE (vede na stejnou stránku v jiném jazyce)
    SiteLogo                   logo = značka „stříbrné údolí“ + značka „A“ + oficiální logo SILVERDAHL (samostatné grafiky)
    BaseButton, PageIntro, CtaBand
    ServiceIcon                čárové ikony z grafického návrhu (Lucide, ISC)
    ServiceSection             detail služby (/sluzby)
    StatItem                   statistika s časovým zařazením (historické maximum × současnost)
    ContactForm                formulář s validací a pravdivými stavy odeslání
    CookieBanner               lišta a nastavení souhlasu s cookies
    GoogleMap                  mapa Google na /kontakt – načte se až se souhlasem (jinak náhled + odkaz)
  composables/usePageSeo.ts    title, description, Open Graph, kanonická URL, hreflang
  composables/useServices.ts   služby s texty v aktuálním jazyce
  composables/useMessageList.ts  seznamy z překladů (odstavce, odrážky)
  composables/useCookieConsent.ts  stav souhlasu s cookies (uložení, přijmout / odmítnout, otevření nastavení)
  plugins/consent.client.ts    načtení volby + místo pro měřicí a marketingové skripty (spouští se až po souhlasu)
  data/cookies.ts              kategorie cookies a přehled cookies pro stránku /cookies
  data/company.ts              adresa, telefon, e-mail (převzato ze současného webu silverdahl.cz)
  data/services.ts             struktura tří služeb (id, obrázek, ikona) – texty jsou v překladech
  data/navigation.ts           položky menu
  assets/css/main.css          design tokeny a globální styly
i18n/locales/cs.json, en.json, de.json   všechny texty webu v jednotlivých jazycích
shared/locales.ts              jazyky a přeložené adresy stránek (používá nuxt.config i server)
shared/contact.ts              validace formuláře sdílená klientem i serverem (vrací kódy chyb, texty jsou v překladech)
server/api/contact.post.ts     endpoint formuláře
server/utils/contactDelivery.ts  doručení zprávy (SMTP) – místo pro napojení jiné služby
public/                        favicon (svg, ico), apple-touch-icon, site.webmanifest, icons/ (ikony pro manifest)
public/og/silverdahl.jpg       obrázek pro sdílení na sociálních sítích (1200 × 630)
server/routes/robots.txt.ts    robots.txt (odkaz na sitemap; na testovacím nasazení zákaz procházení)
server/routes/sitemap.xml.ts   sitemap všech stránek ve všech jazycích včetně hreflang
public/images/                 mapa Evropy (SVG, Natural Earth) a fotografie karet služeb a hero
public/logo/                   oficiální logo SILVERDAHL převedené do SVG (celé / jen nápis, tmavé / bílé)
```

> **Fotografie jsou dočasné.** Snímky v `public/images/*.webp` jsou výřezy z grafického návrhu domovské stránky
> v podkladech (nízké rozlišení). Před spuštěním je nahraďte originály ve vyšším rozlišení se stejným názvem souboru
> (poměr stran cca 4 : 3 pro karty služeb, úzký svislý snímek pro budovu v hero).
> Mapa `mapa-evropy.svg` je vygenerovaná z veřejných dat Natural Earth (world-atlas) – zvýrazněné jsou CZ, SK, PL, HU.
> Ilustrace `ilustrace-*.svg` (přehled na /sluzby) jsou vektorově překreslené podle návrhu; ikona podání ruky v
> `ilustrace-partneri.svg` pochází z Font Awesome Free (licence CC BY 4.0 – uvedení autora je v souboru ponecháno).


## Jazykové verze

Web používá modul **@nuxtjs/i18n**. Čeština je výchozí a nemá v adrese předponu, ostatní jazyky mají `/en` a `/de`.
Adresy stránek jsou přeložené (nastavení v `shared/locales.ts`):

| Stránka | Čeština | Angličtina | Němčina |
| --- | --- | --- | --- |
| Úvod | `/` | `/en` | `/de` |
| Služby | `/sluzby` | `/en/services` | `/de/leistungen` |
| Case study | `/case-study` | `/en/case-study` | `/de/fallstudie` |
| O nás | `/o-nas` | `/en/about-us` | `/de/ueber-uns` |
| Kontakt | `/kontakt` | `/en/contact` | `/de/kontakt` |
| Cookies | `/cookies` | `/en/cookies` | `/de/cookies` |

- **Texty** jsou v `i18n/locales/{cs,en,de}.json` – všechny tři soubory mají stejnou strukturu klíčů.
  Při úpravě textu změňte hodnotu ve všech jazycích. Znak `@` je ve vue-i18n vyhrazený, v textu se píše `{'@'}`;
  `{nazev}` jsou proměnné (např. `{max}`, `{link}`) a musí v překladu zůstat.
- **Překlady** angličtiny a němčiny jsou strojově připravené (Claude) z českých podkladů. Před spuštěním je vhodné
  nechat je zkontrolovat rodilým mluvčím nebo překladatelem, hlavně právní texty na stránce cookies.
- **Přepínač jazyků** je v hlavičce (na mobilu v menu). Jazyk se nevolí automaticky podle prohlížeče – modul by
  jinak ukládal vlastní cookie a vyhledávače by nedostaly stabilní adresy.
- **SEO:** atribut `lang`, `og:locale` (+ `og:locale:alternate`), kanonické URL a `hreflang` odkazy na všechny
  jazykové verze (`x-default` = čeština) – v hlavičce stránek i v `sitemap.xml`. Podrobnosti v sekci SEO.
- **Kontaktní formulář** posílá i jazyk webu: e-mail pro firmu je česky a uvádí „Jazyk webu: EN/DE/CS“, odeslání
  bez JavaScriptu se vrátí na kontakt ve stejném jazyce.
- **Nový jazyk:** přidat ho do `locales` v `shared/locales.ts` (včetně přeložených cest), do `i18n.locales`
  v `nuxt.config.ts` a vytvořit `i18n/locales/<kód>.json` se stejnými klíči jako `cs.json`.

## SEO

| Oblast | Řešení |
| --- | --- |
| Titulky a popisy | vlastní pro každou stránku a jazyk (`*.seo` v `i18n/locales/*.json`), délka do ~60 / ~160 znaků, s hledanými výrazy (vstup na trh, Česko / Tschechien, dodavatelé, řízení provozu) |
| Kanonické URL, hreflang | `usePageSeo()` – absolutní adresy z `NUXT_PUBLIC_SITE_URL`, všechny jazykové verze + `x-default` |
| Sdílení | Open Graph + Twitter karta s obrázkem `public/og/silverdahl.jpg` (1200 × 630) |
| Strukturovaná data (JSON-LD) | `Organization` (adresa, kontakt, rok založení, obsluhované země) a `WebSite` na všech stránkách (`app.vue`); `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage` + `BreadcrumbList`; na Službách `Service`, na O nás `Person` |
| Indexace | `robots.txt` a `sitemap.xml` generuje server (`server/routes/`), meta `robots` s `max-image-preview:large` |
| Přesměrování | trvalá (301) ze starých adres WordPressu: `/reference/` → `/case-study`, `/en/o-nas/` → `/en/about-us`, `/en/reference/` → `/en/case-study`, `/en/kontakt/` → `/en/contact`, `/wp-sitemap.xml` → `/sitemap.xml` (`server/middleware/legacy-redirects.ts`) |
| Rychlost | předkomprimované statické soubory (brotli + gzip), cache 30 dní pro obrázky a loga, optimalizovaná SVG (SVGO), líné načítání obrázků mimo obrazovku |
| Ikony | `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png`, `site.webmanifest` |

Po spuštění webu doporučujeme: ověřit web v **Google Search Console** (+ odeslat `https://silverdahl.cz/sitemap.xml`),
otestovat strukturovaná data v **Rich Results Test** a sdílení v **LinkedIn Post Inspector**.

> Stránka `/kontakt` se vykresluje na serveru za běhu – její kompresi (gzip/brotli) zajistí hosting nebo proxy
> (nginx, Cloudflare). Statické stránky jsou předkomprimované už při buildu.
>
> `bundle.dropMessageCompiler` v i18n nezapínat – rozbije stránky s proměnnými v překladech (viz komentář v `nuxt.config.ts`).

## Logo

Logo se skládá ze **tří samostatných grafik** vedle sebe (záměrně nejsou sloučené do jednoho souboru):

1. **Značka „stříbrné údolí“** – *Silverdahl* je nejspíš švédské složené jméno *silver* (stříbro) + *dahl*
   (starý pravopis *dal*, údolí). Značka ukazuje dva vrcholy (2. a 4. čára v barvě příčky „A“) a pod údolím „Ag“ – chemickou značku stříbra.
   Samostatně je v `public/logo/znacka-stribrne-udoli.svg` (a `-bila.svg` na tmavé pozadí).
2. **Značka „A“** – tmavě modrý čtverec s písmenem A, vykreslená přímo v `SiteLogo.vue`. Stejná je ve `favicon.svg`.
3. **Oficiální logo SILVERDAHL s podtitulem „Marketing and Customer Service“** ze současného webu
   (`LOGO-SILVERDAHL.png`, 836 × 223 px) převedené do SVG obkreslením (shoda s originálem cca 95 %).
   Web používá celé logo (`logo-silverdahl.svg`, v patičce `logo-silverdahl-bila.svg`); v `public/logo/` je navíc
   samotný nápis bez podtitulu (`logo-silverdahl-napis*.svg`) pro místa, kde by byl podtitul příliš malý.

Pokud klient dodá originální vektorové logo (SVG/AI/PDF), nahraďte jím soubory v `public/logo/` – bude přesnější
než obkreslená verze.

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

- [ ] **Firemní údaje – ZÁSTUPNÉ HODNOTY** – IČO, DIČ a spisová značka v `app/data/company.ts` jsou smyšlené
      (zobrazují se v patičce, v zásadách ochrany osobních údajů a ve strukturovaných datech). Ověřit i e-mail, telefon a adresu.
- [ ] **Sociální sítě – ZÁSTUPNÉ ODKAZY** – `company.social` (LinkedIn, Facebook) v `app/data/company.ts`; po založení
      profilů přepsat skutečnými adresami (patička + `sameAs` ve strukturovaných datech). Sdílecí tlačítka fungují už teď.
- [ ] **Doména** – výchozí je `https://silverdahl.cz`; při jiné doméně nastavit `NUXT_PUBLIC_SITE_URL` už pro build.
      Na testovacím nasazení nastavit `NUXT_PUBLIC_INDEXABLE=false`.
- [ ] **Search Console** – po spuštění ověřit doménu a odeslat sitemap.
- [ ] **Doručování formuláře** – nastavit SMTP proměnné a otestovat odeslání skutečné zprávy.
- [ ] **Zásady ochrany osobních údajů** – vzorový text (`/ochrana-osobnich-udaju`, překlady `privacy.*`) nechat zkontrolovat
      právníkem; doplnit poskytovatele hostingu a e-mailu, ověřit lhůty uchování a datum účinnosti.
- [ ] **Profil Tomáše Kouřila** – podle podkladů bude doplněna konkrétní délka praxe, významné projekty,
      profesní zkušenosti a hlavní obchodní úspěchy (TODO v `app/pages/o-nas.vue`).
- [ ] **Fotografie managementu** – zatím ilustrační portréty z podkladů (nejsou to skutečné osoby, malé rozlišení).
      Nahradit skutečnými fotkami 4 : 3, ideálně ≥ 960 × 720 px: `public/images/management-kouril.webp` a `-tauchman.webp`.
- [ ] **Logo** – oficiální logo je obkreslené z PNG ze současného webu; při dodání originálního vektorového loga nahradit soubory v `public/logo/` a znovu vygenerovat `public/logo/logo-silverdahl.png` a `public/og/silverdahl.jpg`.
- [ ] Aktualizace na Node 24 LTS a nejnovější Nuxt (viz výše).
