# Architecture

```mermaid
flowchart LR
  Editors[Editors] --> CMS[Decap CMS /admin]
  CMS --> PR[GitHub pull request]
  Content[src/content collections] --> Astro[Astro build]
  Astro --> Static[Static HTML/CSS/JS]
  Static --> SWA[Azure Static Web Apps]
  SWA --> API[Managed Functions /api]
  API --> OAuth[GitHub OAuth]
  API --> Telemetry[Azure Monitor]
```

## Decisions

- Static-first pages keep hosting simple and fast.
- Content collections use Zod so editors get early validation.
- The event model separates home events from community listings with `host: home | community`.
- Recurring series generate future occurrences; one-off entries override specific dates.
- The build computes CSP hashes and rejects inline `style=""` attributes.
- The map uses Leaflet and OpenStreetMap; geocoding is Census-first with Nominatim fallback at one request per second.
