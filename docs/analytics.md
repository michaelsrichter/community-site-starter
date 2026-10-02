# Analytics event table

Analytics are consent-gated. Keep IDs blank to disable third-party analytics.

| Event | Meaning | Key props |
| --- | --- | --- |
| `page_view` | Page opened | `page`, `pageType` |
| `select_event` | Event card/detail click | `location` |
| `add_to_calendar` | Calendar link used | `method`, `location` |
| `share` | Share control used | `method`, `location` |
| `get_directions` | Directions opened | `method`, `location` |
| `outbound_click` | External organizer/social link | `target`, `location` |
| `web_vital` | Web Vitals metric | `metric`, `rating` |
