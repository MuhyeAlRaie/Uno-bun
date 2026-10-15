# UNO BUN — Official Website (Static)

**Premium Rustic-Modern · Burgers and Fries · عربي / English**

This is the complete static website for **UNO BUN — Burgers and Fries**.
It is a brand presentation and restaurant information website: it showcases
the brand, the menu, offers, restaurant information and franchise
opportunities. It intentionally contains **no online ordering, no cart, no
checkout, no accounts, no backend and no database** — just fast, secure,
easy-to-host HTML/CSS/JS that can be published on GitHub Pages as-is.

---

## 1. Project Overview

| Item | Value |
|---|---|
| Brand | UNO BUN — Burgers and Fries |
| Style | Premium Rustic-Modern (per *Brand Guidelines 2026*) |
| Languages | Arabic (default, RTL) + English (LTR) |
| Pages | `index.html`, `menu.html`, `offers.html`, `franchise.html`, `contact.html`, `404.html` |
| Intended domain | `https://uno-bun.vortishop.com` (DNS not configured yet — see `docs/CUSTOM-DOMAIN.md`) |
| Hosting target | GitHub Pages (no build step) |
| Online ordering | **None — by design.** The site never takes orders, payments or customer data. |

## 2. Brand & Design Direction

The visual system follows the supplied **UNO BUN Brand Guidelines 2026**:

- **Colors** — deep forest green `#0D2B23` (primary), sand gold `#D9B98C`
  (accent), warm cream `#FAF6EE` (background), charcoal-green ink `#20302A`
  (text). All tokens live at the top of `assets/css/style.css`.
- **Logo** — the official stacked "UNO BUN / BURGERS AND FRIES" wordmark.
  The project ships four derived files (`logo-forest`, `logo-sand`,
  `logo-dark`, favicons) processed from the official supplied logo images.
- **Typography** — *Cairo* (body + Arabic headings) and *Oswald* (English
  display headings), loaded once from Google Fonts with system-font
  fallbacks (Tahoma/Segoe UI) that keep the site fully readable offline.
- **Graphic language** — thin sand frame lines, uppercase tracked kickers,
  subtle diagonal grain on dark bands, generous spacing, rounded cards.
- **Photography** — the two supplied brand photos are used for the hero
  and the brand-intro section. Product images are clearly-labeled local
  SVG placeholders until official product shots are supplied.

## 3. Technology Stack

- **HTML5** — semantic, accessible markup. Arabic content is the default
  DOM state; English text lives side-by-side in every element.
- **CSS3** — one shared stylesheet, CSS logical properties for RTL/LTR,
  custom-property design tokens, no preprocessor.
- **Vanilla JavaScript (ES5-safe)** — 4 small files, progressive
  enhancement only. The site remains fully usable with JavaScript disabled
  (Arabic default renders; menu sections are all visible; FAQ still works
  via native `<details>`).
- **No** React/Next/Vue/Angular/Svelte/TypeScript, **no** npm/build tools,
  **no** databases/APIs/backend, **no** paid third-party services.

## 4. Project Structure

```
UNO-BUN-Website/
├── index.html            Homepage
├── menu.html             Menu (burgers + fries categories)
├── offers.html           Offers (sample placeholders — replace before launch)
├── franchise.html        Franchise info + inquiry form
├── contact.html          Contact info + message form
├── 404.html              Custom not-found page (GitHub Pages compatible)
├── robots.txt            Search-engine crawler rules
├── sitemap.xml           Sitemap for the intended domain
├── CNAME                 Custom-domain marker: uno-bun.vortishop.com
├── .nojekyll             Tells GitHub Pages to serve files as-is
├── .gitignore
├── LICENSE.txt           Brand assets © UNO BUN; code MIT
├── README.md             ← you are here
├── assets/
│   ├── css/style.css     Whole design system (tokens → components → RTL)
│   ├── js/
│   │   ├── i18n.js       Language switcher (AR default, EN, localStorage)
│   │   ├── common.js     Mobile nav, sticky header, scroll reveal, year
│   │   ├── menu.js       Menu category filter (progressive enhancement)
│   │   └── forms.js      Form validation + honest mailto: fallback
│   └── images/           Logos, photos, favicons, product SVG placeholders
├── docs/
│   ├── DEPLOYMENT.md        GitHub Pages step by step
│   ├── CONTENT-EDITING.md   How to change any content (menu, offers…)
│   ├── CUSTOM-DOMAIN.md     uno-bun.vortishop.com + DNS + HTTPS
│   └── TESTING-CHECKLIST.md Manual QA checklist
└── .github/workflows/pages.yml   GitHub Actions deploy (no build)
```

> Note: `logo-placeholder.svg` / `hero-placeholder.svg` from the original
> spec were **not** included because the real official logo and hero photo
> were supplied — unused placeholder files were deliberately avoided.
> `offers.js` was also omitted: offers are plain static HTML, so a
> JavaScript file would be redundant. Add one later if offers become
> data-driven.

## 5. Preview The Website Locally

The site is plain static files — choose any option:

- **Just open it:** double-click `index.html`. Everything works offline
  except Google Fonts (system fallback fonts are used automatically).
- **Local server (recommended, mirrors real hosting):**
  - Python: `python3 -m http.server 8080` → open `http://localhost:8080`
  - VS Code: install the *Live Server* extension → "Go Live".
  - Node: `npx serve .`

Test the 404 page through a **local server at the project root**
(`http://localhost:8080/does-not-exist`), not by opening the file
directly — it intentionally uses root-relative paths so it works on any
missing URL when hosted.

## 6. Publish On GitHub Pages

Full step-by-step guide: **`docs/DEPLOYMENT.md`**. Short version:

1. Create a GitHub repository and upload this project's **contents**.
2. In *Settings → Pages*, set **Source: GitHub Actions**.
3. Push to `main` — the included workflow (`.github/workflows/pages.yml`)
   deploys the site with **no build step**.
4. Add the custom domain (`docs/CUSTOM-DOMAIN.md`) and enable HTTPS.

## 7. Configure The Custom Domain

See **`docs/CUSTOM-DOMAIN.md`** for the complete walkthrough (GitHub
Pages settings, the CNAME record for `uno-bun.vortishop.com`, DNS
verification, and HTTPS enforcement). **Nothing has been configured
yet** — the included `CNAME` file simply declares the intended domain.

## 8. Change The Logo & Images

All images live in `assets/images/`. Replace a file **keeping the same
file name** and no HTML changes are needed:

| File | Used for | Notes |
|---|---|---|
| `logo-forest.png` | Header logo (light backgrounds) | transparent PNG |
| `logo-sand.png` | Footer logo (dark background) | transparent PNG |
| `logo-dark.png` | Spare variant | transparent PNG |
| `hero-burger.jpg` | Homepage hero background | supplied brand photo |
| `brand-packaging.jpg` | Brand intro section | supplied brand photo |
| `og-image.jpg` | Social sharing preview (1200×630) | regenerate after logo change |
| `favicon-32/48.png`, `apple-touch-icon.png`, `icon-192/512.png` | Browser/app icons | square, brand green |
| `*-placeholder.svg` | Product/offer placeholders | **replace with real photos** |

To swap in a real product photo, keep the name (e.g.
`uno-burger-placeholder.svg` → save your photo as
`uno-burger.jpg`) and update the `src` in `menu.html` / `index.html`
(see `docs/CONTENT-EDITING.md`). Keep `width`/`height` attributes on
every `<img>` to avoid layout shifts.

## 9. Edit Menu Items

Menu items live directly in **`menu.html`** (crawlable, works without
JS). Each product is one `<article class="card">` block containing the
image, the Arabic name + description (`lang-ar` spans) and the English
ones (`lang-en` spans). Copy an existing block, paste it into the right
category grid, and edit the two languages.

**Prices:** no official prices were supplied, so none are published
(the page says prices are available in-store). When you have approved
prices, add inside each card:

```html
<p class="price" dir="ltr">3.50 JD</p>
```

Full walkthrough: `docs/CONTENT-EDITING.md`.

## 10. Edit Offers

The three offer cards in **`offers.html`** are **clearly-labeled SAMPLE
placeholders** — a visible notice says so, and every card carries a
"Sample / نموذج" badge. **Replace them with real, approved promotions
before launch** (title, description, validity dates, conditions), delete
the sample notice, and remove the badges. There is no coupon, payment or
ordering functionality anywhere on the site.

## 11. Update Contact Information

Placeholder contact details appear in: `contact.html` (info cards +
footer), the footer of every page, and `assets/js/forms.js`
(`CONFIG.inquiryEmail`, used by both forms). Current placeholders:

- Phone: `+962 X XXX XXXX` → replace + wrap in `tel:` link
- Email: `info@example.com` → replace + set in `forms.js`
- Address: `New Zarqa — Al Flater St` → **pre-filled from the supplied
  brand packaging artwork; verify before publishing**
- Opening hours: "to be announced" → replace with official hours
- Instagram: `@unobun.jo` → **shown on the brand packaging; verify**

Search for `TODO(owner)` comments — every placeholder is marked.

## 12. Customize The Franchise Page

`franchise.html` ships with: brand positioning, four "why franchise"
cards, a five-step process outline, an FAQ (native `<details>`, no JS
needed) and the inquiry form. All of it is plain HTML — edit the
bilingual spans directly. **No investment costs, fees, returns or legal
terms are claimed anywhere**; if you need such content, add only
officially-approved figures.

## 13. Limitations Of The Static Forms (Important)

This website has **no server, so no form data is ever stored or sent by
the website itself.** The behavior is honest by design:

1. **Validation** runs in the browser (required fields, email/phone
   patterns, inline error messages, `aria-invalid`).
2. **Until the owner sets a real email** in `assets/js/forms.js`
   (`CONFIG.inquiryEmail`, currently the placeholder `info@example.com`),
   submitting shows a bilingual notice: *receiving is not activated yet* —
   it never pretends anything was sent.
3. **Once a real email is configured**, submitting opens the visitor's
   **own email application** with a prefilled message (`mailto:`).
   The visitor reviews and sends it themselves. The site shows
   "Opening your email application…" — never "submitted successfully".
4. If you later want stored submissions, connect a third-party form
   service (e.g. Formspree/Netlify Forms) — out of scope for this static
   deliverable.

## 14. Accessibility & Browser Support

- Semantic landmarks (`header/nav/main/footer`), one `h1` per page,
  logical heading order, `aria-current` nav states.
- Skip-to-content link, visible `:focus-visible` rings, full keyboard
  operation (mobile nav closes on `Esc` and returns focus).
- Forms use real `<label>`s, `aria-describedby` error wiring and
  `role="status"` notices.
- `prefers-reduced-motion` disables all animation/scroll effects.
- Color contrast: sand on forest ≈ 8:1, ink on cream ≈ 11:1 (WCAG AA+).
- Images have bilingual `alt` text; decorative ones are `aria-hidden`.
- Arabic script is never letter-spaced; phone/email/URLs are isolated
  `dir="ltr"` so they render correctly inside RTL text.
- **Browsers:** latest Chrome, Edge, Firefox and Safari (desktop +
  Android/iOS). Layout uses widely-supported CSS (`clamp`, logical
  properties, `aspect-ratio`, CSS grid); JS is ES5-style with feature
  detection.

## 15. Language Switching — How It Works

- Arabic is the default (`<html lang="ar" dir="rtl">`).
- Every text element holds both languages: `<span class="lang-ar">…</span><span class="lang-en">…</span>`.
- `assets/js/i18n.js` toggles `lang`/`dir` on `<html>`, swaps `title`,
  `meta description`, `placeholder`, `alt` and `aria-label` values
  (declared via `data-ar` / `data-en` / `data-attrs`), and remembers the
  choice in `localStorage`.
- The header button shows the *other* language name (pure CSS — works
  even before JS runs).

## 16. Outstandings Before Launch (Checklist For The Owner)

- [ ] Replace `info@example.com` + `+962 X XXX XXXX` with official details (also in `forms.js`)
- [ ] Verify address "New Zarqa — Al Flater St" and Instagram `@unobun.jo`
- [ ] Add official opening hours
- [ ] Replace the 3 sample offers with real promotions (remove notice + badges)
- [ ] Replace product SVG placeholders with official product photos
- [ ] Add approved prices (pattern in §9) — none are published until then
- [ ] Configure DNS + HTTPS for `uno-bun.vortishop.com` (`docs/CUSTOM-DOMAIN.md`)
- [ ] Run `docs/TESTING-CHECKLIST.md` after any change
