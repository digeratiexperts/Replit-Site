# Google Business reviews (live)

The homepage Client Proof section and `GET /api/google-reviews` load **verbatim**
reviews from Google Places when credentials are present. They never invent
quotes, star scores, or review counts.

## What DE needs to supply

| Variable | Where | Purpose |
|----------|--------|---------|
| `GOOGLE_PLACES_API_KEY` | `/home/digeratiexperts.com/shared/.env` (prod) or local `.env` | Google Cloud API key with **Places API** enabled |
| `GOOGLE_PLACE_ID` | same | Place ID for the Digerati Experts Google Business Profile |

Aliases also accepted: `GOOGLE_MAPS_API_KEY` / `GBP_API_KEY` / `PLACES_API_KEY`
and `GBP_PLACE_ID` / `PLACES_PLACE_ID`.

## How to find the Place ID

### Service-area businesses (Digerati Experts)

Digerati Experts is a **verified service-area** Google Business Profile (no public storefront pin). The Place ID Finder and Places Text Search often return **zero results** even when GBP is live — that does **not** mean the listing is missing.

**Do not** use:

- GBP Manager **store code** (e.g. `10476793252274999960`) — that is not a Places `place_id`
- Phone-only Text Search matches in the `325` area code — can hit unrelated Texas businesses
- Hex feature IDs from Google Search `stick=` params (e.g. `0x…:0x…`) as `GOOGLE_PLACE_ID`

**Reliable ways to get the `ChIJ…` Place ID:**

1. In [Business Profile Manager](https://business.google.com/), open **Digerati Experts** → **See your profile**.
2. Prefer the resulting **`https://maps.google.com/...`** (or Maps) URL, not only `google.com/search?...&stick=...`.
3. From that Maps URL, copy either:
   - a `query_place_id=ChIJ…` / `place_id=ChIJ…` query param, or
   - the `!1s0x…:0x…` token **and** ask engineering to resolve it — still prefer an explicit `ChIJ…` when available.
4. Or open **Ask for reviews** / share review link — many review URLs include `placeid=ChIJ…`.
5. Paste the Maps or review URL to engineering, or set `GOOGLE_PLACE_ID=ChIJ…` in shared `.env` yourself.

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

- `status: "unconfigured"` → missing key and/or Place ID (UI shows connect shell).
- `status: "ok"` → live reviews render in Client Proof.
- `status: "empty"` → credentials work but Google returned no review text.
- `status: "error"` → check Places API enablement, key restrictions, billing.

## UI behavior

Until configured, the Client Proof card shows:

> Reviews loading from Google Business Profile — Connect Place ID

No fabricated 5-star quotes are shown in that state.
