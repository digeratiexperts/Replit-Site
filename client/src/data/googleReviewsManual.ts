/**
 * @deprecated Prefer `reviewsCatalog` from `@/data/reviewsCatalog`.
 * Thin re-export of the merged catalog so older imports keep working.
 */

export {
  GOOGLE_MAPS_CID_URL,
  reviewsCatalog as googleReviewsManual,
  type CatalogReview as ManualGoogleReview,
} from "./reviewsCatalog";
