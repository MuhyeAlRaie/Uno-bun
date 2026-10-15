# Custom Domain Setup — `uno-bun.vortishop.com`

This guide explains how to connect **`uno-bun.vortishop.com`** to the
GitHub Pages deployment. **None of these steps have been performed yet**;
DNS values below follow GitHub's documented process and must be created
by the domain/DNS owner.

> `vortishop.com` appears to be a managed/parent domain, so the DNS
> record for the `uno-bun` subdomain must be created by whoever controls
> that domain's DNS panel (or by the vortishop.com administrators).

---

## 0. Prerequisites

- The site is deployed on GitHub Pages (see `DEPLOYMENT.md`) and loads
  at `https://<your-username>.github.io/uno-bun-website/`.
- Access to the DNS settings for `vortishop.com` (or the person/team who
  manages it).

## 1. The CNAME file (already included)

The project root contains a `CNAME` file with the single line:

```
uno-bun.vortishop.com
```

GitHub Pages reads this file to bind the deployed site to that hostname.
**Do not rename it** and keep it at the repository root. It must contain
only the hostname — no `https://`, no path.

## 2. GitHub Pages settings

1. Repository → **Settings → Pages**.
2. Under *Custom domain*, enter `uno-bun.vortishop.com` → **Save**.
   (If you deployed via the Actions workflow, do this after the first
   successful deployment.)
3. GitHub performs a DNS check; it succeeds once step 3 is done.
4. Wait until the check passes, then enable **Enforce HTTPS** (can take
   a few minutes up to 24 h for the certificate to be issued).
   - If "Enforce HTTPS" is unavailable yet, wait and reload the page.

## 3. DNS configuration (performed at the DNS provider)

`uno-bun.vortishop.com` is a **subdomain**, so it needs a single
**CNAME record** (not A records — those are for apex domains like
`vortishop.com` itself):

| Type  | Host / Name | Value / Target            | TTL   |
|-------|-------------|---------------------------|-------|
| CNAME | `uno-bun`   | `<your-username>.github.io.` | default / 3600 |

- Replace `<your-username>` with the GitHub account/org that owns the
  site repository. The trailing dot is optional depending on the DNS
  panel.
- If the DNS panel does not allow a CNAME on a subdomain (rare), use
  ALIAS/ANAME if available, pointing to the same target.
- **DNS propagation** can take from a few minutes to 48 hours
  (typically ≈ 1 hour). Check with:
  `dig uno-bun.vortishop.com CNAME +short` or
  <https://dnschecker.org>.

⚠️ **Exact values can change.** Before creating records, verify against
GitHub's current documentation:
<https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site>
— the *Managing a custom domain for your GitHub Pages site* page lists
the up-to-date record requirements.

## 4. Domain verification (recommended)

GitHub may show a *"domain verification"* notice for custom domains
(especially on organization accounts). To verify ownership:

1. GitHub → **Settings → Pages** (account-level, not repo-level) →
   **Add a domain** → enter `uno-bun.vortishop.com`.
2. GitHub displays a TXT record to create:
   - **Type:** TXT · **Host:** `_github-pages-challenge-<your-username>.uno-bun`
     (value/name pattern shown in your settings screen) · **Value:** the
     provided token.
3. Create that TXT record at the DNS provider, then click **Verify**.
4. Repository → Settings → Pages → re-select the custom domain.

The exact host/value strings are generated **per account** — copy them
from your own GitHub settings screen; do not invent values.

## 5. HTTPS

1. After the domain check passes in *Settings → Pages*, tick
   **Enforce HTTPS**.
2. GitHub provisions a Let's Encrypt certificate automatically.
3. Verify: open `https://uno-bun.vortishop.com` — the browser must show
   a valid padlock, and `http://` should redirect to `https://`.

## 6. Post-configuration tests

- [ ] `https://uno-bun.vortishop.com/` loads the homepage.
- [ ] All pages + assets load (no mixed-content or 404 console errors).
- [ ] `https://uno-bun.vortishop.com/anything-random` shows the custom 404 page.
- [ ] `https://uno-bun.vortishop.com/robots.txt` and `/sitemap.xml` respond.
- [ ] Language switch + RTL layouts still behave (domain shouldn't affect them).
- [ ] `http://` requests redirect to HTTPS.
- [ ] Old `*.github.io` URL still works or redirects as desired.

## 7. If `vortishop.com` DNS is managed elsewhere

Contact the vortishop.com administrators with this request:

> "Please add a CNAME record: host `uno-bun`, target
> `<your-username>.github.io`. Also add the TXT verification record we
> provide from GitHub (we will send it)."

Re-run the checks in §6 after they confirm.
