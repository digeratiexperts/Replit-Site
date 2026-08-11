# Google Business reviews (live + interim)

The homepage Client Proof section and `GET /api/google-reviews` load **verbatim**
reviews from Google Places when credentials are present. They never invent
quotes, star scores, or review counts.

## Service-area reality check (Digerati Experts)

Digerati Experts is a **verified service-area** Google Business Profile (no public
storefront pin). For this listing:

| Approach | Result |
|----------|--------|
| Place ID Finder / Places Text Search / Autocomplete | **Fails** — often zero results or wrong “Digerati*” storefronts |
| Maps feature ID / CID alone | Confirms the listing in Maps; **cannot** fetch reviews via Places API |
| Maps-derived `ChIJ…` tried previously | Place Details **`NOT_FOUND`** / no longer valid |
| Maps UI | “Posting is currently turned off” / contributions not permitted for this place type |

**Practical paths that work today:**

1. **Manual paste (interim)** — copy real reviews from GBP **Read reviews** into
   `client/src/data/googleReviewsManual.ts` (empty by default; do not invent quotes).
2. **GBP Business Profile API** — OAuth + account/location resource (separate from Places Place Details).
3. **Storefront address on GBP** — if/when Google exposes a Places-valid `placeid=ChIJ…`,
   set `GOOGLE_PLACE_ID` and use the live Places path below.

Do **not** set an invalid `GOOGLE_PLACE_ID` just to silence `unconfigured`.

## What DE needs to supply (live Places path)

| Variable | Where | Purpose |
|----------|--------|---------|
| `GOOGLE_PLACES_API_KEY` | `/home/digeratiexperts.com/shared/.env` (prod) or local `.env` | Google Cloud API key with **Places API** enabled |
| `GOOGLE_PLACE_ID` | same | Place ID for the Digerati Experts Google Business Profile (**only** a Place Details–valid `ChIJ…`) |
| `GOOGLE_MAPS_CID` | same | Optional decimal CID from Maps (`?cid=` / `0x…:0x…`). **Not** a substitute for `GOOGLE_PLACE_ID` |

Aliases also accepted: `GOOGLE_MAPS_API_KEY` / `GBP_API_KEY` / `PLACES_API_KEY`
and `GBP_PLACE_ID` / `PLACES_PLACE_ID`.

## Interim: manual reviews scaffold

File: [`client/src/data/googleReviewsManual.ts`](../client/src/data/googleReviewsManual.ts)

- Default: **empty array** (no fabricated testimonials on the site).
- Client Proof shows **Read us on Google** →
  `https://maps.google.com/?cid=1710856351091471339` and an honest note that the
  Google reviews API is unavailable for this service-area listing.
- When DE pastes 2–3 real reviews (name, rating, text, optional relative time),
  they render under “Copied from Google Business Profile — verbatim”.
- Live API reviews (`status: "ok"`) always take priority over the manual file.

**How to paste:**

1. Open GBP → **Read reviews** (or open the Maps CID URL above).
2. Copy author name, star rating, and review body exactly.
3. Add objects to `googleReviewsManual` in that file; commit/deploy.
4. Never invent or paraphrase into fake quotes.

## How to find the Place ID (when available)

### Service-area businesses (Digerati Experts)

Place ID Finder **fails** for this listing type. That does **not** mean the GBP is missing.

**Do not** use:

- GBP Manager **store code** (e.g. `10476793252274999960`) — that is not a Places `place_id`
- Phone-only Find Place matches in the `325` area code — can hit unrelated Texas businesses
- Hex feature IDs from Google Search `stick=` params (e.g. `0x…:0x…`) as `GOOGLE_PLACE_ID`
- Maps CID / feature IDs as `GOOGLE_PLACE_ID`

**If Google later exposes a valid `ChIJ…`:**

1. In [Business Profile Manager](https://business.google.com/), open **Digerati Experts** → **See your profile**.
2. Prefer the resulting **`https://maps.google.com/...`** (or Maps) URL, not only `google.com/search?...&stick=...`.
3. From that Maps URL, copy either:
   - a `query_place_id=ChIJ…` / `place_id=ChIJ…` / `placeid=ChIJ…` query param, or
   - open **Ask for reviews** — many review URLs include `placeid=ChIJ…`.
4. Paste the URL to engineering, or set `GOOGLE_PLACE_ID=ChIJ…` in shared `.env` yourself.
5. Confirm Place Details accepts it before relying on the live API (`curl` verify below).

### Investigation note (2026-08-11) — DE Maps URL / CID

DE supplied:

`https://www.google.com/maps/place/Digerati+Experts/data=!4m2!3m1!1s0x0:0x17be2ec96c8733eb?...`

| Token | Value | Result |
|-------|--------|--------|
| Feature / data id | `0x0:0x17be2ec96c8733eb` (also known as `0x6fc32c129c8ec5bb:0x17be2ec96c8733eb`) | Confirms listing name **Digerati Experts** + phone **(325) 480-9870** in Maps preview |
| Decimal CID | `1710856351091471339` → `https://maps.google.com/?cid=1710856351091471339` | Stored as optional `GOOGLE_MAPS_CID` for maps links only; used as Client Proof CTA |
| Maps-derived ChIJ | `ChIJu8WOnBIsw28R6zOHbMkuvhc` | **Rejected** by Place Details (`NOT_FOUND` / no longer valid) — **do not set** as `GOOGLE_PLACE_ID` |
| Places Find Place (`+13254809870`) | — | `ZERO_RESULTS` |
| Places Text Search / Autocomplete for this listing | — | Does not return DE’s service-area GBP |

There is **no supported CID→reviews** path on the official Places API. Scraping Maps HTML for reviews is not implemented.

### Storefront listings (general)

1. Open [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
   or search the business in Google Maps.
2. Confirm the listing name + phone match.
3. Copy the Place ID (starts with `ChIJ…`).
4. Add it to shared `.env` as `GOOGLE_PLACE_ID=…`.

## How to create the API key

1. Google Cloud Console → enable **Places API** (legacy Place Details is fine).
2. Create an API key; restrict by **IP** and API (Places only).
   - Production VPS egress / server IP for key restriction: `192.227.158.46`
   - Do **not** use HTTP referrer restrictions for this server-side key — Place Details runs from Node on the VPS, not the browser. Referrer-only keys typically return `REQUEST_DENIED`.
3. Set `GOOGLE_PLACES_API_KEY=…` in shared `.env` (never commit the key; never put it in the client bundle).
4. Restart the site service (`systemctl restart digeratiexperts-site` or a full deploy) so Node picks up env via `EnvironmentFile=/home/digeratiexperts.com/shared/.env`.

## Verify

```bash
curl -fsS https://digeratiexperts.com/api/google-reviews | jq .
```

- `status: "unconfigured"` → missing key and/or Place ID (UI uses CID Maps CTA + manual scaffold).
- `status: "ok"` → live reviews render in Client Proof (overrides manual file).
- `status: "empty"` → credentials work but Google returned no review text.
- `status: "error"` → check Places API enablement, key restrictions, billing, or invalid Place ID.

## UI behavior

Until live API reviews exist:

1. **Read us on Google** links to `https://maps.google.com/?cid=1710856351091471339`.
2. Honest copy: Google reviews API unavailable for service-area listings — paste approved reviews in `googleReviewsManual.ts`.
3. If the manual array has entries, those verbatim reviews render.
4. No fabricated 5-star quotes are shown when the array is empty.
