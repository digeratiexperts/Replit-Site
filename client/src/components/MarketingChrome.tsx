import { useLocation } from "wouter";
import { ZohoASAPWidget } from "@/components/ZohoASAPWidget";
import { DE_DESK_REFERENCE_STYLE } from "@/components/deDeskReferenceStyle";

/**
 * Sitewide marketing chrome (not Client Portal).
 *
 * The bottom-bar Ask DE control is the single entry chooser. Once a visitor
 * chooses what they need, this existing Desk opens directly on that function.
 * Existing chat, ticket, and Client Tools behavior remains intact.
 */
export function MarketingChrome() {
  const [location] = useLocation();

  if (location.startsWith("/portal")) {
    return null;
  }

  return <ZohoASAPWidget isEnabled customCSS={DE_DESK_REFERENCE_STYLE} />;
}
