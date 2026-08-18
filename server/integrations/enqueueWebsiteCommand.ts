import type { DeSyncEventType } from "./deSyncContract";
import { enqueueOutbox } from "./deSyncStore";

export type WebsiteLeadLike = {
  id?: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
  canonicalAccountId?: string | null;
};

function eventTypeForSource(source?: string): DeSyncEventType {
  const raw = (source || "").toLowerCase();
  if (raw.includes("assessment")) return "assessment.submitted";
  if (raw.includes("quote")) return "quote.requested";
  if (raw.includes("referral")) return "referral.submitted";
  if (raw.includes("consult") || raw.includes("book")) return "consultation.booked";
  if (raw.includes("order") || raw.includes("store")) return "store.order_created";
  return "lead.created";
}

export async function enqueueWebsiteCommand(payload: WebsiteLeadLike, eventType?: DeSyncEventType) {
  const type = eventType || eventTypeForSource(payload.source);
  return enqueueOutbox({
    eventType: type,
    source: "website",
    destination: "hub",
    entityType: type.split(".")[0],
    entityId: payload.id,
    canonicalAccountId: payload.canonicalAccountId ?? null,
    payload: {
      name: payload.name || "",
      email: payload.email || "",
      company: payload.company || "",
      phone: payload.phone || "",
      message: payload.message || "",
      source: payload.source || "website",
    },
  });
}
