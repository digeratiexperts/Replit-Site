/** Internal MSP org label when an admin files a ticket without a client account. */
export const INTERNAL_COMPANY_NAME = "Digerati Experts";

export const NO_CLIENT_TICKET_ERROR =
  "No client account associated with this user. Please contact support.";

export type TicketOrgClient = {
  id?: string | null;
  type?: string | null;
  companyName?: string | null;
} | null | undefined;

/**
 * Safe company label. Never throws when `client` is missing — that was the
 * Create Ticket crash (`user.client.companyName` with no client row).
 */
export function ticketCompanyName(client?: TicketOrgClient, fallback = ""): string {
  const name = client?.companyName;
  if (typeof name === "string" && name.trim()) return name.trim();
  return fallback;
}

export function isInternalPortalOrg(client?: TicketOrgClient, clientId?: string | null): boolean {
  const id = String(client?.id || clientId || "");
  if (id === "msp-digerati" || id.startsWith("msp-")) return true;
  if (client?.type === "msp") return true;
  const name = (client?.companyName || "").trim().toLowerCase();
  return name.includes("digerati experts");
}
