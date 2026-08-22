import { DE_COMPANY } from "./knowledge";
import type { AdvisorAction, AdvisorActionType } from "./types";
import { PRIMARY_PHONE } from "@shared/companyContact";

const ALLOWED_TYPES: AdvisorActionType[] = [
  "schedule_consultation",
  "request_assessment",
  "contact_sales",
  "create_lead",
  "open_portal",
  "existing_client_support",
  "request_callback",
  "navigate",
  "leave_message",
];

/** Public site paths the model may suggest navigating to. */
const ALLOWED_PATHS = new Set([
  "/",
  "/solutions",
  "/solutions/cybersecurity",
  "/solutions/managed-it-support",
  "/solutions/co-managed-it",
  "/solutions/backup-disaster-recovery",
  "/solutions/proactive-it-ecosystem",
  "/solutions/proactive-office-ecosystem",
  "/solutions/proactive-business-ecosystem",
  "/solutions/proactive-enterprise-ecosystem",
  "/pricing",
  "/proactive-ecosystem-pricing",
  "/store",
  "/about/compliance",
  "/about/compliance-certifications",
  "/industries/healthcare",
  "/contact",
  "/book",
  "/support/knowledge-base",
]);

const DEFAULT_LABELS: Record<AdvisorActionType, string> = {
  schedule_consultation: "Schedule a consultation",
  request_assessment: "Request a Cyber Risk Assessment",
  contact_sales: "Contact sales",
  create_lead: "Share my details",
  open_portal: "Open Client Portal",
  existing_client_support: "Client Portal / support",
  request_callback: "Request a callback",
  navigate: "Learn more",
  leave_message: "Leave a message",
};

export function isAllowedActionType(type: string): type is AdvisorActionType {
  return (ALLOWED_TYPES as string[]).includes(type);
}

export function sanitizePath(path: string | undefined): string | undefined {
  if (!path || typeof path !== "string") return undefined;
  const cleaned = path.split("?")[0].split("#")[0].trim();
  if (!cleaned.startsWith("/") || cleaned.startsWith("//")) return undefined;
  if (cleaned.includes("://")) return undefined;
  if (ALLOWED_PATHS.has(cleaned)) return cleaned;
  // allow prefix matches for known solution/industry trees
  if (
    cleaned.startsWith("/solutions/") ||
    cleaned.startsWith("/industries/") ||
    cleaned.startsWith("/resources/")
  ) {
    if (!/[<>"']/.test(cleaned) && cleaned.length < 120) return cleaned;
  }
  return undefined;
}

export function sanitizeActions(
  proposed: Array<{ type: AdvisorActionType; label?: string; path?: string }> | undefined,
  opts?: { mode?: string },
): AdvisorAction[] {
  if (!proposed?.length) {
    return defaultActionsForMode(opts?.mode);
  }

  const out: AdvisorAction[] = [];
  const seen = new Set<string>();

  for (const p of proposed) {
    if (!p || !isAllowedActionType(p.type)) continue;
    const key = `${p.type}:${p.path || ""}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const action = materializeAction(p.type, p.label, p.path);
    if (action) out.push(action);
    if (out.length >= 3) break;
  }

  return out.length ? out : defaultActionsForMode(opts?.mode);
}

export function materializeAction(
  type: AdvisorActionType,
  label?: string,
  path?: string,
): AdvisorAction | null {
  const lbl = (label || DEFAULT_LABELS[type]).slice(0, 80);

  switch (type) {
    case "schedule_consultation":
      return { type, label: lbl, href: DE_COMPANY.bookingUrl };
    case "request_assessment":
      return { type, label: lbl };
    case "contact_sales":
      return { type, label: lbl, href: `tel:${DE_COMPANY.phoneE164}` };
    case "create_lead":
      return { type, label: lbl };
    case "open_portal":
    case "existing_client_support":
      return { type, label: lbl, href: DE_COMPANY.portalLogin };
    case "request_callback":
      return { type, label: lbl };
    case "leave_message":
      return { type, label: lbl };
    case "navigate": {
      const safe = sanitizePath(path);
      if (!safe) return null;
      return { type, label: lbl, path: safe, href: safe };
    }
    default:
      return null;
  }
}

export function defaultActionsForMode(mode?: string): AdvisorAction[] {
  if (mode === "security_incident") {
    return [
      materializeAction("request_callback", "Emergency callback")!,
      materializeAction("contact_sales", `Call ${PRIMARY_PHONE.display}`)!,
    ];
  }
  if (mode === "existing_client") {
    return [
      materializeAction("open_portal", "Open Client Portal")!,
      materializeAction("leave_message", "Leave a support message")!,
    ];
  }
  if (mode === "off_topic") {
    return [materializeAction("request_assessment", "Cyber Risk Assessment")!];
  }
  if (mode === "pricing" || mode === "assessment") {
    return [
      materializeAction("request_assessment")!,
      materializeAction("schedule_consultation")!,
    ];
  }
  if (mode === "it_support" || mode === "cloud_m365") {
    return [materializeAction("leave_message", "Open a support request")!];
  }
  return [
    materializeAction("leave_message", "Open a support request")!,
    materializeAction("request_assessment")!,
  ];
}

export function assertNoInternalLeak(text: string): boolean {
  const banned =
    /\b(sk_live_|sk_test_|whsec_|client_secret|OPENAI_API_KEY|AI_INTEGRATIONS|JWT_SECRET|margin|COGS|internal\s*cost|system\s*prompt)\b/i;
  return !banned.test(text);
}
