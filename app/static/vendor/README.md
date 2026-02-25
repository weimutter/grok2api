# Vendor assets

This directory contains third-party static assets vendored into the repository to avoid runtime CDN dependencies.

Files here are referenced by `app/static/**/pages/*.html`.

Current assets:
- `tailwindcss-cdn.js` (vendored from `https://cdn.tailwindcss.com`)
- Geist font CSS was previously loaded from CDN, but is intentionally removed; we fall back to system fonts via `common.css`.
- `jszip-3.10.1.min.js` (was loaded from cdnjs)
- `livekit-client-2.7.3.umd.min.js` (was loaded from jsdelivr)

When updating versions, update both the file name and all HTML references.
