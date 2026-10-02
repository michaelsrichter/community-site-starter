# DNS cutover

For a `www` launch on Azure Static Web Apps:

1. Add custom domain `www.example.org` in Azure.
2. Create `CNAME www -> <your-static-web-app>.azurestaticapps.net`.
3. Create the TXT validation record Azure shows, usually `_dnsauth.www`.
4. Wait for validation and managed HTTPS.
5. Set `SITE_URL=https://www.example.org` and `ALLOW_INDEXING=true`.
6. Forward the apex domain to `www` if your DNS host supports it.

## Namecheap example

- Type: `CNAME Record`; Host: `www`; Value: Azure host.
- Type: `TXT Record`; Host: `_dnsauth.www`; Value: Azure validation token.

## Rollback

Set `SITE_URL` back to the previous host, disable indexing, and point DNS back to the previous site if needed.
