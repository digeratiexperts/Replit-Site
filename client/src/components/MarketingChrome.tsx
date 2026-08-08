import { useLocation } from "wouter";
import { ZohoASAPWidget } from "@/components/ZohoASAPWidget";

/**
 * Sitewide marketing chrome that should appear on every public page
 * (not the Client Portal). Homepage previously owned chat alone.
 */
export function MarketingChrome() {
  const [location] = useLocation();

  if (location.startsWith("/portal")) {
    return null;
  }

  return (
    <ZohoASAPWidget
      isEnabled={true}
      accountId={import.meta.env.VITE_ZOHO_ACCOUNT_ID}
      portalId={import.meta.env.VITE_ZOHO_PORTAL_ID}
    />
  );
}