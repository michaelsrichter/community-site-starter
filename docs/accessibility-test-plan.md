# Accessibility test plan

- Run `npx playwright test` for axe scans and 320 px no-scroll checks.
- Keyboard check: skip link, menu, filters, calendar menu, share dialog, and theme controls.
- Content check: one `h1`, useful link names, alt text, visible focus states, no color-only meaning.
- Manual check: screen reader smoke test on home, events, one event detail, and the CMS login page.
