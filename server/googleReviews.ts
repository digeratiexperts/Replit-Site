/**
 * Google Business / Places reviews for the public site.
 *
 * Requires both:
 *   GOOGLE_PLACES_API_KEY (or GOOGLE_MAPS_API_KEY / GBP_API_KEY)
 *   GOOGLE_PLACE_ID (or GBP_PLACE_ID / PLACES_PLACE_ID) — must be a Places ChIJ… that Place Details accepts
 *
 * Optional: GOOGLE_MAPS_CID (decimal CID from Maps 0x…:0x… / ?cid=) for ops/maps links.
 * CID alone cannot load reviews via the official Places API.
 *
 * Never invent reviews. When credentials are missing, return status "unconfigured".
 */

export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
  publishTime?: string;
  profilePhotoUrl?: string;
};

export type GoogleReviewsPayload = {
  status: "ok" | "unconfigured" | "error" | "empty";
  configured: boolean;
  missing: string[];
  message: string;
  placeIdMasked: string | null;
  placeName: string | null;
  rating: number | null;
  userRatingsTotal: number | null;
  reviews: GoogleReview[];
  mapsUri: string | null;
  fetchedAt: string | null;
};

type CacheEntry = {
  expiresAt: number;
  payload: GoogleReviewsPayload;
};

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
let cache: CacheEntry | null = null;

function env(...keys: string[]): string {
  for (const key of keys) {
    const value = (process.env[key] || "").trim();
    if (value) return value;
  }
  return "";
}

export function getGoogleReviewsConfig() {
  const apiKey = env(
    "GOOGLE_PLACES_API_KEY",
    "GOOGLE_MAPS_API_KEY",
    "GBP_API_KEY",
    "PLACES_API_KEY",
  );
  const placeId = env("GOOGLE_PLACE_ID", "GBP_PLACE_ID", "PLACES_PLACE_ID");
  const mapsCid = env("GOOGLE_MAPS_CID", "GBP_MAPS_CID");
  const missing: string[] = [];
  if (!apiKey) missing.push("GOOGLE_PLACES_API_KEY");
  // Official Place Details requires a Places place_id (ChIJ…). CID alone is not enough.
  if (!placeId) missing.push("GOOGLE_PLACE_ID");
  return {
    apiKey,
    placeId,
    mapsCid,
    missing,
    configured: missing.length === 0,
  };
}

function maskPlaceId(placeId: string): string {
  if (placeId.length <= 10) return "***";
  return `${placeId.slice(0, 6)}…${placeId.slice(-4)}`;
}

function unconfiguredPayload(
  missing: string[],
  mapsCid?: string,
): GoogleReviewsPayload {
  const hasCid = Boolean(mapsCid && mapsCid.trim());
  const message = hasCid
    ? "GOOGLE_MAPS_CID is set, but live reviews still need a Places API place_id (ChIJ…) that Place Details accepts. Service-area Maps feature IDs / CIDs alone cannot fetch reviews. Open GBP → See your profile / Ask for reviews and paste a URL that contains placeid=ChIJ… or query_place_id=ChIJ…. See docs/GOOGLE-REVIEWS.md."
    : "Connect Google Business Place ID and Places API key to load live reviews. See docs/GOOGLE-REVIEWS.md.";
  return {
    status: "unconfigured",
    configured: false,
    missing,
    message,
    placeIdMasked: null,
    placeName: null,
    rating: null,
    userRatingsTotal: null,
    reviews: [],
    mapsUri: hasCid ? `https://maps.google.com/?cid=${mapsCid!.trim()}` : null,
    fetchedAt: null,
  };
}

function normalizeLegacyReviews(raw: any[]): GoogleReview[] {
  return (raw || [])
    .filter((r) => r && typeof r.text === "string" && r.text.trim())
    .map((r) => ({
      authorName: String(r.author_name || "Google reviewer").trim(),
      rating: Number(r.rating) || 0,
      text: String(r.text).trim(),
      relativeTime: r.relative_time_description
        ? String(r.relative_time_description)
        : undefined,
      publishTime: r.time ? new Date(Number(r.time) * 1000).toISOString() : undefined,
      profilePhotoUrl: r.profile_photo_url
        ? String(r.profile_photo_url)
        : undefined,
    }));
}

async function fetchLegacyPlaceDetails(
  apiKey: string,
  placeId: string,
): Promise<GoogleReviewsPayload> {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json",
  );
  url.searchParams.set("place_id", placeId);
  url.searchParams.set(
    "fields",
    "name,rating,user_ratings_total,reviews,url",
  );
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Places API HTTP ${res.status}`);
  }
  const data = (await res.json()) as {
    status: string;
    error_message?: string;
    result?: {
      name?: string;
      rating?: number;
      user_ratings_total?: number;
      reviews?: any[];
      url?: string;
    };
  };

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(data.error_message || `Places status ${data.status}`);
  }

  const result = data.result || {};
  const reviews = normalizeLegacyReviews(result.reviews || []);

  return {
    status: reviews.length ? "ok" : "empty",
    configured: true,
    missing: [],
    message: reviews.length
      ? "Live Google Business reviews."
      : "Place is connected but Google returned no public review text yet.",
    placeIdMasked: maskPlaceId(placeId),
    placeName: result.name || null,
    rating: typeof result.rating === "number" ? result.rating : null,
    userRatingsTotal:
      typeof result.user_ratings_total === "number"
        ? result.user_ratings_total
        : null,
    reviews,
    mapsUri: result.url || null,
    fetchedAt: new Date().toISOString(),
  };
}

export async function getGoogleReviews(options?: {
  bypassCache?: boolean;
}): Promise<GoogleReviewsPayload> {
  const { apiKey, placeId, mapsCid, missing, configured } =
    getGoogleReviewsConfig();
  if (!configured) return unconfiguredPayload(missing, mapsCid);

  if (!options?.bypassCache && cache && cache.expiresAt > Date.now()) {
    return cache.payload;
  }

  try {
    const payload = await fetchLegacyPlaceDetails(apiKey, placeId);
    cache = { expiresAt: Date.now() + CACHE_TTL_MS, payload };
    return payload;
  } catch (err: any) {
    let message = err?.message || "Failed to fetch Google reviews";
    const lower = message.toLowerCase();
    if (
      lower.includes("no longer valid") ||
      lower.includes("not_found") ||
      lower.includes("places status not_found")
    ) {
      message =
        "Places API rejected GOOGLE_PLACE_ID (NOT_FOUND / no longer valid). " +
        "Maps preview ChIJ / CID values for this service-area listing are not accepted by Place Details. " +
        "Re-copy placeid=ChIJ… from GBP → See your profile or Ask for reviews. " +
        (mapsCid ? `Recorded GOOGLE_MAPS_CID=${mapsCid}. ` : "") +
        "See docs/GOOGLE-REVIEWS.md.";
    }
    console.error("[googleReviews]", message);
    return {
      status: "error",
      configured: true,
      missing: [],
      message,
      placeIdMasked: maskPlaceId(placeId),
      placeName: null,
      rating: null,
      userRatingsTotal: null,
      reviews: [],
      mapsUri: mapsCid
        ? `https://maps.google.com/?cid=${mapsCid}`
        : null,
      fetchedAt: new Date().toISOString(),
    };
  }
}
