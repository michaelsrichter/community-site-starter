# Rebrand guide

1. Run `node scripts/rebrand.mjs` with your name, short name, slug, domain, email, and region.
2. Replace sample content in Decap CMS or in `src/content/`: settings, pages, events, series, venues, organizers, people, FAQs, announcements, and gallery.
3. Replace the logo in `src/components/Logo.astro` and `public/favicon.svg`; regenerate PNG icons with `sharp`.
4. Choose brand colors in `src/styles/global.css` tokens.
5. Upload only photos you own or have permission to publish. Keep credits and license URLs.
6. Run `npm run geocode -- --force --dry`; then run without `--dry` after venue addresses are final.
7. Build redirects from your old site audit and put them in `src/data/legacy-redirects.json`.
8. Add analytics IDs only after your privacy policy and consent text are ready.
9. Create a GitHub OAuth app for Decap CMS. Uncheck **Expire user access tokens**. Set callback to `https://<domain>/api/callback`; update it again after adding a custom domain. Enterprise Managed User accounts cannot be collaborators on personal repos.
10. Deploy Azure resources with `infra/deploy.ps1`, configure DNS, set `SITE_URL`, and run the launch checklist.

## Launch checklist

- [ ] Content reviewed by a human editor.
- [ ] All images have permission, credits, and alt text.
- [ ] `npm run check`, `npm test`, build, link check, API tests, and Playwright pass.
- [ ] OAuth sign-in works on the live domain.
- [ ] Custom domain and HTTPS certificate are active.
- [ ] Old important URLs redirect.
- [ ] Analytics IDs, privacy policy, and consent mode match your choices.
