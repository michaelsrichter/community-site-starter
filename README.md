# Community site starter

A reusable Astro starter for volunteer dance and community organizations. The sample site is fictional: **Riverbend Swing Dance Club** in **Riverbend Valley**. Replace the sample content, logo, colors, photos, OAuth app, analytics IDs, and deployment settings before launch.

Derived from the Swing Dance Long Island website: https://github.com/michaelsrichter/sdli-website

Designed to work well with the Community Site Kit Copilot plugin (skills + agents).

## Features

- Astro static site with strict TypeScript and Zod content collections.
- Decap CMS at `/admin/` with GitHub OAuth bridge in Azure Static Web Apps managed Functions.
- Home events first, community events second, list/calendar/map views, RSS and `.ics` feeds.
- Homepage slideshow, focus-point images, light/dark theme, no-JS event list, 320 px checks.
- Consent-gated GA4, Microsoft Clarity, and first-party OpenTelemetry endpoint.
- Legacy redirect stubs, CSP hashes, link checking, unit/API/e2e/axe tests.
- Bicep and PowerShell deployment helpers for Azure Static Web Apps.

## Quick start

```powershell
npm ci
npm run dev
```

For local CMS editing:

```powershell
npm run cms:local
npm run dev
```

## Rebrand in an hour

```powershell
node scripts/rebrand.mjs --name "Your Dance Club" --short "Your Club" --slug your-club --domain https://www.example.org --email info@example.org --region "Your Region"
```

Then follow [REBRAND.md](REBRAND.md).

## Tests

```powershell
npm run check
npm test
$env:BUILD_NOW='2026-10-01T22:00:00-04:00'; npm run build
npm run test:links
npm test --prefix api
npx playwright test
```

## Deploy

See [docs/deployment.md](docs/deployment.md) and [docs/dns-cutover.md](docs/dns-cutover.md). The default `SITE_URL` is `https://example.org`; set the real custom domain in GitHub Actions variables before launch.

## Starter screenshots

After validation, sample screenshots are stored in `docs/images/starter/`:

- `home-desktop-light.png`
- `home-mobile-dark.png`
- `events-desktop-light.png`
- `events-mobile-dark.png`
