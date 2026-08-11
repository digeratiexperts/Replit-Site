import { useLocation } from "wouter";
import { ZohoASAPWidget } from "@/components/ZohoASAPWidget";

/**
 * Sitewide marketing chrome (not Client Portal).
 *
 * Restored upgraded multi-tab support modal (Chat · Ticket · Resources):
 * - Desk tab = DE Desk advisor (`/api/public/advisor/chat`)
 * - Ticket tab = Zoho Desk ticket create
 * - Resources = Zoho Assist, Remote Support, KB, Client Portal
 *
 * Store / homepage deeplinks use `openMspAdvisor()` → opens this modal on Chat.
 * Do not remount a second FAB (`VirtualMspAdvisor`) — it replaced this modal.
 */
export function MarketingChrome() {
  const [location] = useLocation();

  if (location.startsWith("/portal")) {
    return null;
  }

  return <ZohoASAPWidget isEnabled />;
}
