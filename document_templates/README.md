# Replit upload package (templates + manifest)

## What’s inside
- `templates/docx/` – DOCX templates to populate and convert to PDF at runtime.
- `templates/pdf/` – Current PDF exports (note: several still contain placeholder tokens).
- `original/` – Your original filenames preserved.

## Placeholder cleanup (recommended before client-facing preview)
Your templates currently mix placeholder styles:
- `«Field Name»` (Word-style merge tokens)
- `[FILL - ...]` / `[FILL]`

Standardize to a single token format (recommended: `{{snake_case}}`) before wiring automated PDF generation.

## Next step in app
Use `manifest.json` as the source of truth for document ordering, dependencies, and selection keys.
