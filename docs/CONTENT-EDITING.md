# Content Editing Guide

Everything on this website is plain HTML/CSS — no database, no CMS, no
build step. This guide shows exactly where and how to change each type of
content. After editing, re-read the page in a browser (hard refresh:
`Ctrl/Cmd + Shift + R`) and, if the site is live, push to `main`.

---

## 0. The Golden Rule: Bilingual Pairs

Almost every visible text exists as **two side-by-side spans**:

```html
<span class="lang-ar">النص العربي</span><span class="lang-en">English text</span>
```

The stylesheet shows exactly one of them based on the active language.
When editing, **always update both spans** so no section is left
untranslated. The same rule applies to attributes via:

```html
data-ar="…" data-en="…" data-attrs="placeholder"
```

(`data-attrs` lists which attributes to swap — used for `placeholder`,
`aria-label`, `alt`, and the `content` of the meta description.)

## 1. Brand Assets

All images are in `assets/images/`. To replace one, keep the same
filename, or change the `src` in the HTML. After changing the logo,
regenerate the favicons and `og-image.jpg` (any image tool that exports
32/48/180/192/512 px squares and a 1200×630 JPEG).

| Asset | Where used | Replace when |
|---|---|---|
| `logo-forest.png` | Site header (light bg) | New official logo |
| `logo-sand.png` | Footer (dark bg) | New official logo |
| `hero-burger.jpg` | Homepage hero background | Official hero photo |
| `brand-packaging.jpg` | Brand intro section | Official packaging photo |
| `og-image.jpg` | Social previews | After logo/hero change |
| `favicon-*.png`, `apple-touch-icon.png`, `icon-*.png` | Browser icons | After logo change |

## 2. Product Names, Descriptions & Images (Menu)

Menu items live in **`menu.html`** as plain HTML cards (also reused on
the homepage, `index.html`, in the "Signature Picks" section).

Each item is one block:

```html
<article class="card reveal">
  <figure class="card-media">
    <img src="assets/images/uno-burger-placeholder.svg"
         alt="صورة توضيحية لبرجر يونو | Illustration of the Uno Burger"
         width="800" height="600" loading="lazy">
  </figure>
  <div class="card-body">
    <h3><span class="lang-ar">برجر يونو</span><span class="lang-en">Uno Burger</span></h3>
    <p>
      <span class="lang-ar">الوصف العربي…</span>
      <span class="lang-en">English description…</span>
    </p>
    <!-- <p class="price" dir="ltr">3.50 JD</p> -->
  </div>
</article>
```

To **add a product**: copy an entire `<article>` block, paste it inside
the correct category grid (`data-menu-category="burgers"` or `"fries"`),
then edit the image, names, and descriptions.

To **replace a placeholder image** with a real photo: save the photo
(e.g. `uno-burger.jpg`, ideally ~800×600 or larger, 4:3) into
`assets/images/`, and change the `src`. Keep `width`/`height` attributes
matching the real aspect ratio.

To **add a new category**: duplicate the whole category `<div id="…"
data-menu-category="…">` block in `menu.html`, then add a matching tab
`<a class="tab" data-menu-filter="…">` in the tabs row. Without
JavaScript the tabs simply scroll to the sections; with JavaScript they
filter.

## 3. Prices

**No official prices were supplied, so none are published.** The menu
page states prices are available in-store. When the owner approves
official prices, uncomment/add inside each card:

```html
<p class="price" dir="ltr">3.50 JD</p>
```

`dir="ltr"` keeps the amount rendering correctly inside Arabic (RTL)
layout. Prices are presentation-only — the site has no ordering or
payment functionality.

## 4. Menu Categories & Labels

Category headings and the tab labels are ordinary bilingual spans in
`menu.html` (`<h2>`, `.tab`). Edit them like any other text.

## 5. Offers — Replace the Samples (REQUIRED BEFORE LAUNCH)

`offers.html` currently shows **three clearly-labeled SAMPLE offers**
with a prominent notice box. They are design placeholders, **not real
promotions**.

Before going live:

1. Edit each card: real title, real description, and — only if officially
   supplied — validity dates and conditions:

   ```html
   <p><span class="lang-ar">صالح حتى 31 ديسمبر 2026 · شروط معتمدة من الإدارة</span>
      <span class="lang-en">Valid until Dec 31, 2026 · Terms approved by management</span></p>
   ```

2. **Delete the sample notice** (the `<div class="notice">` block with
   the "Sample content" text).
3. **Remove every badge**: `<span class="badge">…نموذج/Sample…</span>`.
4. Replace `offer-placeholder.svg` (and other images) with real photos.

If a real offer image is not ready, keep the placeholder SVG — but never
remove the badge/notice while the content is still sample.

## 6. Contact Details

Placeholders exist in **four places** (marked with `TODO(owner)`
comments):

1. `contact.html` — the info cards (phone, email, address, hours) and
   the Google Maps link.
2. **Footer of every page** (6 files: `index.html`, `menu.html`,
   `offers.html`, `franchise.html`, `contact.html`, `404.html`).
3. Homepage contact section (`index.html`).
4. `assets/js/forms.js` → `CONFIG.inquiryEmail` — **must** be set for the
   forms to work (currently `info@example.com`, which intentionally
   triggers the "not configured" notice).

Phone — replace the text and wrap it in a real link:

```html
<a href="tel:+9627XXXXXXXX" dir="ltr">+962 7X XX XX XX</a>
```

Address — currently **pre-filled from the supplied brand packaging
artwork** ("New Zarqa — Al Flater St"). **Verify it is the official,
complete address before publishing**, then update the Google Maps query
in `contact.html`:

```html
<a href="https://www.google.com/maps/search/?api=1&query=YOUR+FULL+ADDRESS" ...>
```

This is the free, key-less Google Maps **URL scheme** — no API, no
geolocation, no embedded map. Opening hours: replace the
"to be announced" spans with the official hours.

## 7. Social Media Links

Only Instagram is pre-filled (`@unobun.jo` — shown on the brand
packaging; **verify**). Links exist in `contact.html` (social row) and
in every footer. Add Facebook/TikTok etc. by copying the pattern:

```html
<li><a href="https://www.facebook.com/YOURPAGE" target="_blank" rel="noopener">Facebook</a></li>
```

`target="_blank" rel="noopener"` is required for external links.

## 8. Franchise Information

`franchise.html` is fully hand-editable HTML:

- **Positioning/intro** — the `feature-copy` block.
- **"Why franchise" cards** — the four `.highlight` articles.
- **Process steps** — the `<ol class="steps">` list (edit or add
  `<li class="step">` items; keep numbers meaningful).
- **FAQ** — each Q&A is a native `<details>` block; add/remove freely.
- **Form fields** — see §9.

Policy reminder: the page intentionally **never states investment costs,
fees, guaranteed returns, expansion targets or legal terms**. Add such
content only after official approval, and never as "guaranteed" claims.

## 9. Forms (Contact + Franchise)

Both forms are static. Where to customize:

- **Fields** — edit the `<form data-form="…">` blocks in
  `contact.html` / `franchise.html`. Keep `name` attributes unique; if
  you add a field, also add a matching label dict entry in
  `assets/js/forms.js` → `FIELD_LABELS` (used to compose the email body).
- **Recipient** — `assets/js/forms.js` → `CONFIG.inquiryEmail`.
  While it ends in `example.com`, submissions show the honest
  "not activated" notice. Set the real address to enable the
  `mailto:` behavior.
- **Validation** — automatic for `required` + `type="email"` +
  `data-validate="phone"`.
- **Do not** add text claiming automatic submission/storage — the site
  must stay honest about its static nature.

## 10. SEO Metadata

Each page `<head>` contains: unique `<title>` (bilingual via `data-ar` /
`data-en`), `meta description` (bilingual), canonical URL, Open Graph
tags (Arabic, the default crawl language), favicon links. When editing a
page's content, update its title/description too. `sitemap.xml` holds
the five public URLs with `lastmod` dates — update `lastmod` when you
make significant changes.

## 11. Translations Quality Pass

- Keep Arabic copy natural (Levantine-friendly MSA) and mirror it in
  English — neither language should read like a literal translation.
- Never letter-space Arabic (the stylesheet already resets it).
- Keep Latin fragments (phone, email, prices, URLs, "UNO BUN") inside
  `dir="ltr"` elements.
- Run `docs/TESTING-CHECKLIST.md` §language after any translation edit.
