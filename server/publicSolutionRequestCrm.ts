import { curatedSolutionFamilies } from "../client/src/data/curatedSolutions";
import { zohoClient } from "./zoho/zohoClient";
import { zohoCRMService } from "./zoho/zohoCRM";
import type { PublicSolutionRequest } from "./publicSolutionRequestStore";

function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "", last: "Unknown" };
  if (parts.length === 1) return { first: "", last: parts[0] };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export function buildPublicSolutionRequestDescription(record: PublicSolutionRequest): string {
  const family = record.familyId
    ? curatedSolutionFamilies.find((entry) => entry.id === record.familyId)
    : null;
  const offer = family?.offers.find((item) => item.id === record.offerId);
  return [
    `Solution Request ${record.correlationId}`,
    `Intent: ${record.intent}`,
    family ? `Family: ${family.label}` : "",
    offer ? `Offer: ${offer.name}` : "",
    `Delivery: ${record.deliveryModel === "co_managed" ? "Co-managed" : "Standalone"}`,
    record.organizationName ? `Organization: ${record.organizationName}` : "",
    record.notes ? `Notes: ${record.notes.slice(0, 500)}` : "",
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 3000);
}

/**
 * Best-effort CRM handoff. Public fields only. Never throws to the HTTP path.
 * Does not claim connector health. Returns recorded only when a remote id exists.
 */
export async function syncPublicSolutionRequestToCrm(
  record: PublicSolutionRequest,
): Promise<"pending" | "recorded"> {
  if (!zohoClient.isConfigured()) {
    console.info("[solution-request] CRM sync skipped — Zoho is not configured");
    return "pending";
  }

  try {
    const { first, last } = splitName(record.contactName);
    const description = buildPublicSolutionRequestDescription(record);
    const created = await zohoCRMService.createLead({
      First_Name: first || undefined,
      Last_Name: last,
      Email: record.contactEmail,
      Phone: record.contactPhone || undefined,
      Company: record.organizationName || "Solution request prospect",
      Lead_Source: "Website Solution Request",
      Description: description,
      Lead_Status: "Not Contacted",
    });
    if (created?.id) return "recorded";
    return "pending";
  } catch (error: any) {
    console.warn("[solution-request] CRM sync pending:", error?.message || error);
    return "pending";
  }
}
