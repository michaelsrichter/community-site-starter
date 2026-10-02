# Decision log

1. Use a static Astro site so a small volunteer group can host cheaply and keep pages fast.
2. Keep editable content in typed collections under `src/content` so the CMS and tests share one schema.
3. Use `host: home` for the organization's own events and `host: community` for other organizers.
4. Generate recurring event dates from series files and use event files for one-date changes.
5. Keep community listings clearly labeled and sorted after home events.
6. Use consent-gated analytics and a first-party telemetry endpoint.
7. Build a strict CSP during postbuild and fail on inline style attributes.
8. Ship only open-licensed sample photos and require future sites to verify photo permission.
9. Parameterize Azure resource names from a short base name.
10. Read geocoding center and radius from settings, with CLI overrides for unusual regions.
11. Provide `scripts/rebrand.mjs` for first-pass names, domain, email, package, manifest, and infra defaults.
