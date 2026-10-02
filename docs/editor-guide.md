# Editor guide

The sample content is fictional. A small note in this guide is enough; do not add sample banners to every page.

## CMS sign-in setup

Create a GitHub OAuth app:

- Homepage URL: `https://<domain>`
- Authorization callback URL: `https://<domain>/api/callback`
- Uncheck **Expire user access tokens**.

Update the callback when a custom domain is added. Enterprise Managed User accounts cannot be collaborators on personal repositories.

## Editing rules

- Every event, series, FAQ, gallery album, and announcement needs explicit `published: true` or `false`.
- Use `host: home` for your own organization and `host: community` for other organizers.
- For a single changed series date, create an event with `series` and `occurrenceDate`.
- Add alt text for every image.
- Do not upload photos without permission.
