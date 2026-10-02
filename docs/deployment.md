# Deployment

## Azure resources

Run from PowerShell after logging in with `az` and `gh`:

```powershell
./infra/deploy.ps1 -Name riverbend -Repo owner/repo -CustomDomain www.example.org
```

The script derives:

- Resource group: `rg-<name>-web`
- Static Web App: `swa-<name>-web`
- Monitoring resources: `log-swa-<name>-web`, `appi-swa-<name>-web`

It stores the deployment token as a GitHub secret and sets `SITE_URL`, `ALLOW_INDEXING`, `ALLOWED_HOSTS`, and optional OAuth settings.

## Build variables

- `SITE_URL`: canonical origin, default `https://example.org`.
- `ALLOW_INDEXING`: `true` only for the live domain.
- `PUBLIC_GA4_ID`, `PUBLIC_CLARITY_ID`: optional analytics.
- `PUBLIC_TELEMETRY_ENDPOINT`: `/api/telemetry` or `off`.
