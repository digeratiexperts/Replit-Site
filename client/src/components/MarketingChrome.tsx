import { useLocation } from "wouter";
import { VirtualMspAdvisor } from "@/components/VirtualMspAdvisor";

/**
 * Sitewide marketing chrome that should appear on every public page
 * (not the Client Portal). Homepage previously owned chat alone.
 *
 * ZohoASAPWidget remains in the repo as a ticket-form fallback component
 * but the public launcher is now the Virtual MSP Advisor.
 */
export function MarketingChrome() {
  const [location] = useLocation();

  if (location.startsWith("/portal")) {
    return null;
  }

  return <VirtualMspAdvisor />;
}
