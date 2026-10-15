# Testing Checklist — UNO BUN Website

Manual QA checklist. Run it **locally** (via a local server, e.g.
`python3 -m http.server 8080`) **and** after deployment. Checked items
were verified by the build process or are marked for the owner.

Legend: ✅ verified during build · 🔲 verify manually (owner)

## 1. Pages & Navigation

- [x] ✅ All six pages exist and are non-empty: `index.html`, `menu.html`,
      `offers.html`, `franchise.html`, `contact.html`, `404.html`.
- [x] ✅ Automated link check: every internal `href`/`src` in every page
      resolves to an existing local file (build-time validation).
- [ ] 🔲 Click through **every** nav link and footer link on every page.
- [ ] 🔲 Homepage buttons: menu, contact, offers, franchise CTAs.
- [ ] 🔲 Logo click returns to the homepage.
- [ ] 🔲 Active-page highlight is correct on each page (pill background).
- [ ] 🔲 Fake URL (e.g. `/nothing.html`) shows the custom 404 page with
      working links (hosted environment / local server — the 404 page
      intentionally uses root-absolute paths).

## 2. Languages (AR / EN)

- [ ] 🔲 Default load shows **Arabic** with `dir="rtl"`.
- [ ] 🔲 Toggle button switches every visible text to English and
      `dir="ltr"`.
- [ ] 🔲 Headings, buttons, menu items, offers, form labels,
      placeholders, page `<title>` and meta description all swap.
- [ ] 🔲 Choice **persists** after reload (localStorage) and clears to
      Arabic if site data is cleared.
- [ ] 🔲 Phone numbers, emails, prices, URLs and `@handles` read
      correctly in both directions (isolated LTR runs, no reversed
      punctuation).
- [ ] 🔲 No horizontal scrollbar in either language, at any width.
- [ ] 🔲 With JavaScript **disabled**: the Arabic version renders
      completely; menu shows all sections; FAQ toggles (native
      `<details>`); nothing is missing.

## 3. RTL / LTR Layout

- [ ] 🔲 Arabic: nav, hero, cards, footer, forms all mirror correctly
      (badges/flags sit on the right, icons on the correct side).
- [ ] 🔲 English: everything mirrors back to LTR.
- [ ] 🔲 Step numbers and icon alignment look correct in both.
- [ ] 🔲 Long Arabic words don't overflow cards (`overflow-wrap` is set).

## 4. Responsive & Mobile

- [ ] 🔲 Test at ≥360 px, 768 px, 1024 px, 1440 px widths.
- [ ] 🔲 Hamburger appears ≤920 px; opens/closes; links close it;
      `Esc` closes it; page scroll locks while open.
- [ ] 🔲 Hero, grids and forms collapse to a single column on mobile.
- [ ] 🔲 No double-tap zoom issues on form controls (16px+ effective
      sizes).
- [ ] 🔲 No horizontal overflow at any tested width (both languages).

## 5. Images & Assets

- [ ] 🔲 All local images load (no broken-image icons).
- [ ] 🔲 Logos render transparently on light header / dark footer.
- [ ] 🔲 Favicons appear in the browser tab / bookmarks.
- [ ] 🔲 Product SVG placeholders look correct (official photos will
      replace them later — documented).

## 6. Forms (contact + franchise)

- [ ] 🔲 Empty required submit → inline bilingual error messages,
      focus moves to the first invalid field, red borders appear.
- [ ] 🔲 Invalid email/phone → pattern errors shown.
- [ ] 🔲 With the placeholder email (`info@example.com`) still
      configured: valid submit shows the **"not activated yet"** notice —
      and **no** success/submitted message (by design).
- [ ] 🔲 After setting a real email in `assets/js/forms.js`: submit opens
      the visitor's email app with a prefilled bilingual message, and
      the site shows **"Opening your email application…"** — never
      "submitted successfully".
- [ ] 🔲 Tab key reaches every field in order; labels are announced
      (screen reader spot-check).

## 7. Guarantees (static / no ordering)

- [x] ✅ Automated scan: no "cart", "checkout", "add to cart", payment,
      Supabase, database, fetch() or order-submission code exists
      anywhere in HTML/JS.
- [x] ✅ No external services are required for any core functionality;
      the only external requests are Google Fonts (with system-font
      fallback).
- [x] ✅ No admin dashboard, no login controls, no geolocation, no
      API-key maps (only a free Google Maps search **link**).
- [ ] 🔲 Re-run the scan after your own edits (search the codebase for
      `cart`, `checkout`, `supabase`, `fetch(`).

## 8. GitHub Pages

- [ ] 🔲 `CNAME`, `.nojekyll`, `.github/workflows/pages.yml` are present
      in the repository root.
- [ ] 🔲 Workflow runs green on push to `main` (no build errors).
- [ ] 🔲 Site works at the Pages URL **and** (after DNS) at
      `https://uno-bun.vortishop.com` — see `CUSTOM-DOMAIN.md`.
- [ ] 🔲 `robots.txt` and `sitemap.xml` served on the live domain.

## 9. Console & Performance

- [ ] 🔲 Browser console shows no errors on any page (both languages).
- [ ] 🔲 Images below the fold lazy-load (`loading="lazy"` present).
- [ ] 🔲 Hero image loads with high priority (`fetchpriority="high"`).
- [ ] 🔲 Fonts fall back gracefully when offline (Tahoma/system).

## 10. Accessibility

- [ ] 🔲 Full keyboard pass: skip-link → nav → toggle → CTAs → forms;
      visible focus rings everywhere.
- [ ] 🔲 Mobile nav returns focus to the toggle on close.
- [ ] 🔲 With OS "reduce motion" enabled: no reveal/scroll animations.
- [ ] 🔲 Screen-reader spot check: landmarks, one `h1` per page, form
      errors announced (`aria-live`), status notices (`role="status"`).
- [ ] 🔲 Zoom to 200% — no loss of content or functionality.

---

### Build-time verification summary (already executed)

| Check | Result |
|---|---|
| HTML parses on all 6 pages | Pass |
| All internal links/images resolve | Pass |
| `node --check` on all 4 JS files | Pass |
| No ordering/cart/backend patterns in code | Pass |
| Required files present & non-empty (except `.nojekyll` marker — GitHub ignores its content by design) | Pass |
| ZIP archive integrity | Pass |
| Live browser/visual/device testing | **Not performed in build environment** — perform 🔲 items above |
