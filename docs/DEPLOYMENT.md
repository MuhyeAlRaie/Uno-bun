# Deployment Guide — GitHub Pages

This website is **pure static files**: no build step, no npm install, no
compiler. The repository *is* the website. Nothing in this guide has been
executed yet — these are instructions for the site owner.

> Intended final URL: `https://uno-bun.vortishop.com`
> (custom domain must be configured separately — see `CUSTOM-DOMAIN.md`).

---

## Option A — Deploy with the included GitHub Actions workflow (recommended)

The project ships with `.github/workflows/pages.yml`, which uploads the
site **as-is** (no build) using GitHub's official Pages actions.

1. **Create the repository**
   - Sign in at <https://github.com> → **New repository**.
   - Name it e.g. `uno-bun-website`. Public is required for free Pages
     accounts (private works only on paid plans).
   - Do **not** initialize with a README (you already have one).

2. **Upload the website files**
   - Option 1 (web UI): **uploading an existing folder** — drag the
     *contents* of `UNO-BUN-Website/` (all files **including** hidden
     ones like `.nojekyll`, `.gitignore`, `CNAME` and the `.github`
     folder) into the repo upload page. The GitHub web uploader
     **includes hidden files** — verify `.nojekyll` and
     `.github/workflows/pages.yml` appear in the file list.
   - Option 2 (git CLI, recommended):
     ```bash
     cd UNO-BUN-Website
     git init -b main
     git add -A
     git commit -m "UNO BUN static website"
     git remote add origin https://github.com/<YOUR-USERNAME>/uno-bun-website.git
     git push -u origin main
     ```
   - Verify in the browser that `CNAME`, `.nojekyll` and
     `.github/workflows/pages.yml` are present in the repository root —
     all three are required.

3. **Enable GitHub Pages from the workflow**
   - Repo → **Settings → Pages**.
   - Under *Build and deployment → Source*, choose **GitHub Actions**.
   - (One-time: if the *Pages → Build and deployment* screen shows a
     "workflow has failed" style banner the first run, simply re-run the
     workflow from the **Actions** tab after setting the source.)

4. **Deploy**
   - Every push to `main` runs the workflow automatically
     (or use **Actions → Deploy static site to GitHub Pages → Run workflow**).
   - When it finishes, the site is live at
     `https://<YOUR-USERNAME>.github.io/uno-bun-website/`.

5. **Verify the deployment**
   - Open the URL above — homepage, menu, offers, franchise, contact
     pages all load; switch language; resize to mobile width.
   - Check the *Actions* tab is green.

## Option B — Deploy from a branch (no Actions)

1. Repo → **Settings → Pages → Source: Deploy from a branch**.
2. Branch: `main`, folder: `/ (root)` → **Save**.
3. The site publishes in 1–2 minutes at the same URL.

Both options are equivalent for this site; Option A keeps deployments in
an explicit, auditable workflow.

## Path behavior on GitHub Pages

- **Project site** (`username.github.io/uno-bun-website/`): all internal
  links in this project are **relative** (`menu.html`,
  `assets/css/style.css`), so they work at any base path, including
  `/uno-bun-website/`.
- **Custom domain** (`uno-bun.vortishop.com`): the site is served from
  the domain root — relative paths keep working, and the `CNAME` file
  activates the domain mapping.
- **`404.html`** uses **root-relative** paths (`/assets/...`) on purpose:
  GitHub Pages serves it for *any* missing URL, and relative paths would
  break for nested misses (e.g. `/foo/bar`). If you preview locally, do
  it via a server rooted at the project folder.

## Updating the live site

1. Edit files locally (see `CONTENT-EDITING.md`).
2. `git add -A && git commit -m "Update menu" && git push`.
3. The workflow redeploys automatically (cache may take ~1 min to clear).

## Checklist After First Deployment

- [ ] All 5 pages + custom 404 load (try a fake URL).
- [ ] Language switch works and persists after reload.
- [ ] Mobile navigation opens/closes.
- [ ] No mixed-content warnings (all assets are same-origin; fonts are HTTPS).
- [ ] `https://<url>/robots.txt` and `/sitemap.xml` respond.
- [ ] Browser console shows no errors.
