# Rollback

1. Revert the deployment commit or rerun the previous workflow.
2. If DNS changed, restore the previous CNAME/TXT records.
3. Set `ALLOW_INDEXING=false` for non-production hosts.
4. Keep a short incident note with what changed, how it was detected, and what fixed it.
