import { pricing, formatUserPrice, formatMonthlyMin } from "../../../client/src/data/pricing";
import { serviceCatalog } from "../../../client/src/data/serviceCatalog";
import {
  COMPANY,
  PRIMARY_PHONE,
  formatAddressOneLine,
} from "../../../client/src/data/companyContact";
import { PORTAL_LOGIN, PORTAL_HOME } from "../../../client/src/lib/portalUrls";
import {
  formatKnowledgeForPrompt,
  retrievePublicKnowledge,
  retrievePublicKnowledgeStorageBacked,
} from "../de-intelligence/retrieve";
import type { KnowledgeRetrievalHit } from "../de-intelligence/types";
import type { AdvisorMode, PageContext } from "./types";

export const DE_COMPANY = {
  name: COMPANY.legalName,
  phoneDisplay: PRIMARY_PHONE.display,
  phoneE164: PRIMARY_PHONE.e164,
  email: COMPANY.email,
  address: formatAddressOneLine(),
  area: COMPANY.areaServed,
  bookingUrl: COMPANY.bookingUrl,
  portalLogin: PORTAL_LOGIN,
  portalHome: PORTAL_HOME,
  website: COMPANY.website,
  positioning:
    "Cybersecurity-first managed IT (MSP/MSSP) helping Arizona businesses stabilize operations, reduce risk, and get clear ownership of technology outcomes.",
} as const;

export const COMPLIANCE_DISCLAIMER =
  "Digerati Experts helps with audit readiness, evidence, framework mapping, and risk reporting. DE does not provide legal compliance signoff or certify a customer under HIPAA, SOC 2, PCI, CMMC, or similar frameworks.";

/** Canonical ProActive floors — only source of package pricing for the advisor. */
export function getCanonicalPricingKnowledge(): string {
  const lines = (Object.keys(pricing) as Array<keyof typeof pricing>).map((key) => {
    const tier = pricing[key];
    return `- ${tier.name} (${tier.tier}): ${formatUserPrice(key)}; ${formatMonthlyMin(key)}. ${tier.note} Learn more: ${tier.learnMoreUrl}`;
  });
  return [
    "ProActive Ecosystem packages (canonical floors from pricing.ts):",
    ...lines,
    "Estimate = max(users × rate, monthly minimum × sites). Do not invent other package prices, discounts, SLAs, or tiers.",
    "Do not use storeProducts/serviceCatalog dollar amounts for ProActive floors.",
  ].join("\n");
}

/** Service names/outcomes only — strip catalog dollar amounts to avoid conflicting floors. */
export function getServiceCapabilityKnowledge(): string {
  const blocks = serviceCatalog.map((cat) => {
    const services = cat.services
      .map((s) => {
        const feats = (s.features || []).slice(0, 4).join("; ");
        return `  • ${s.shortName}: ${s.description}${feats ? ` (${feats})` : ""}`;
      })
      .join("\n");
    return `${cat.name}:\n${services}`;
  });
  return [
    "DE capability areas (names/outcomes only — quote ProActive floors from pricing knowledge, not catalog basePrice):",
    ...blocks,
  ].join("\n");
}

export function listKnownServiceIds(): string[] {
  const ids: string[] = [];
  for (const cat of serviceCatalog) {
    for (const s of cat.services) ids.push(s.id);
  }
  return ids;
}

export function listKnownServiceNames(): string[] {
  const names: string[] = [];
  for (const cat of serviceCatalog) {
    for (const s of cat.services) {
      names.push(s.name, s.shortName);
    }
  }
  names.push("IT", "Office", "Business", "Enterprise", "ProActive", "Cyber Risk Assessment", "CSRA", "vCIO");
  return names;
}

export function isKnownServiceMention(text: string): boolean {
  const lower = text.toLowerCase();
  return listKnownServiceNames().some((n) => lower.includes(n.toLowerCase()));
}

function retrievalQuery(mode: AdvisorMode, page?: PageContext, queryHint?: string): string {
  return [
    queryHint || "",
    mode.replace(/_/g, " "),
    page?.pageType || "",
    page?.pageTitle || "",
    page?.serviceContext || "",
    page?.pathname || "",
  ]
    .filter(Boolean)
    .join(" ");
}

function buildKnowledgeSlice(
  mode: AdvisorMode,
  page: PageContext | undefined,
  governedHits: KnowledgeRetrievalHit[],
): string {
  const parts: string[] = [
    `Company: ${DE_COMPANY.name}`,
    `Positioning: ${DE_COMPANY.positioning}`,
    `Phone: ${DE_COMPANY.phoneDisplay}`,
    `Email: ${DE_COMPANY.email}`,
    `Location: ${DE_COMPANY.address} — serving ${DE_COMPANY.area}`,
    `Booking: ${DE_COMPANY.bookingUrl}`,
    `Client Portal login: ${DE_COMPANY.portalLogin}`,
    COMPLIANCE_DISCLAIMER,
  ];

  if (page) {
    parts.push(
      `Visitor page: pathname=${page.pathname}; type=${page.pageType}; title=${page.pageTitle || ""}; serviceContext=${page.serviceContext || ""}`,
    );
  }

  parts.push(
    "GOVERNED DE INTELLIGENCE (ranked by relevance, scope, and authority):\n" +
      formatKnowledgeForPrompt(governedHits),
  );

  const wantPricing =
    mode === "pricing" ||
    mode === "msp_discovery" ||
    mode === "assessment" ||
    page?.pageType === "pricing" ||
    page?.pageType === "store";

  const wantServices = mode !== "off_topic" && mode !== "security_incident";

  if (wantPricing) parts.push(getCanonicalPricingKnowledge());
  if (wantServices) parts.push(getServiceCapabilityKnowledge());

  if (mode === "security_incident") {
    parts.push(
      "INCIDENT MODE: Prioritize containment-oriented guidance, urge immediate escalation to DE, keep advice conservative, minimize sales language.",
    );
  }
  if (mode === "existing_client") {
    parts.push(
      "EXISTING CLIENT MODE: Prioritize portal/support paths. Do not run heavy prospect qualification. Never invent client-specific configuration, licensing, entitlement, topology, or contract terms that were not retrieved from authenticated client context.",
    );
  }
  if (mode === "it_support") {
    parts.push(
      "IT SUPPORT MODE: Discover the symptom (email, device, network, sign-in). Give safe, reversible orientation when grounded in the supplied knowledge, then point them to Get Support in this DE Desk window when account access or hands-on work is required. Do not pitch a Cyber Risk Assessment unless they asked about buying or assessments.",
    );
  }
  if (mode === "compliance" || page?.pageType === "compliance") {
    parts.push(
      "Compliance focus: assessments, framework mapping, evidence, audit readiness. Repeat the compliance disclaimer.",
    );
  }
  if (page?.pageType === "cybersecurity" || mode === "cybersecurity") {
    parts.push(
      "Cybersecurity focus: identity, email security, endpoint/EDR, awareness, monitoring, backup/recovery as a managed stack — not one setting.",
    );
  }

  return parts.join("\n\n");
}

/**
 * Synchronous bootstrap path retained for deterministic tests and callers that
 * do not have an async lifecycle. It remains public-scope fail-closed.
 */
export function selectKnowledgeSlice(
  mode: AdvisorMode,
  page?: PageContext,
  queryHint?: string,
): string {
  const query = retrievalQuery(mode, page, queryHint);
  const governedHits = retrievePublicKnowledge({
    query,
    mode,
    pageType: page?.pageType,
    limit: 6,
  });
  return buildKnowledgeSlice(mode, page, governedHits);
}

/**
 * Production DE Desk path. PostgreSQL scope filtering and FTS happen before
 * generation, then bootstrap + durable candidates share the governed reranker.
 */
export async function selectKnowledgeSliceStorageBacked(
  mode: AdvisorMode,
  page?: PageContext,
  queryHint?: string,
): Promise<string> {
  const query = retrievalQuery(mode, page, queryHint);
  const governedHits = await retrievePublicKnowledgeStorageBacked({
    query,
    mode,
    pageType: page?.pageType,
    limit: 6,
  });
  return buildKnowledgeSlice(mode, page, governedHits);
}

export function inferPageType(pathname: string): PageContext["pageType"] {
  const p = pathname.toLowerCase();
  if (p === "/" || p === "") return "home";
  if (p.includes("cyber") || p.includes("security") || p.includes("ransomware") || p.includes("edr")) {
    return "cybersecurity";
  }
  if (p.includes("pricing") || p.includes("ecosystem") || p.includes("proactive")) return "pricing";
  if (p.includes("/store")) return "store";
  if (p.includes("compliance") || p.includes("hipaa") || p.includes("cmmc") || p.includes("soc")) {
    return "compliance";
  }
  if (p.includes("/industries/") || p.includes("healthcare") || p.includes("nonprofit")) {
    return "industry";
  }
  if (p.includes("/support") || p.includes("/portal")) return "support";
  if (p.includes("/solutions/") || p.includes("/services/")) return "service";
  return "other";
}
