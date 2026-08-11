import { useLocation } from "wouter";
import { VirtualMspAdvisor } from "@/components/VirtualMspAdvisor";

/**
 * Sitewide marketing chrome (not Client Portal).
 *
 * Virtual MSP Advisor is the primary public launcher.
 *
 * Zoho ASAP + ticket widget (`ZohoASAPWidget`) remains in the repo as a
 * secondary "Open support ticket" path, but is NOT remounted sitewide here:
 * - ASAP embed credentials (accountId/portalId) are not configured
 * - Its FAB shares the same corner as Advisor and would fight for focus
 * - Its ticket POST targets `/api/portal/zoho/ticket` (portal-oriented)
 *
 * Prefer BOTH when ASAP credentials exist and a left/secondary launcher is
 * wired without overlapping Advisor. Until then: Advisor-only.
 */
export function MarketingChrome() {
  const [location] = useLocation();

  if (location.startsWith("/portal")) {
    return null;
  }

  return <VirtualMspAdvisor />;
}
