import { pricing, formatUserPrice, formatMonthlyMin } from "../../../client/src/data/pricing";
import { serviceCatalog } from "../../../client/src/data/serviceCatalog";
import { PORTAL_LOGIN, PORTAL_HOME } from "../../../client/src/lib/portalUrls";
import type { AdvisorMode, PageContext } from "./types";

export const DE_COMPANY = {
  name: "Digerati Experts",
  phoneDisplay: "480-519-5892",
  phoneE164: "+14805195892",
  email: "info@digeratiexperts.com",
  address: "3165 S Alma School Rd Suite 29, Chandler, AZ 85248",
  area: "Arizona and Greater Phoenix (Chandler, Phoenix, Scottsdale, Tempe, Mesa, Gilbert)",
  bookingUrl: "https://meet.digerati-experts.com/",
  portalLogin: PORTAL_LOGIN,
  portalHome: PORTAL_HOME,
  website: "https://digeratiexperts.com",
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

export function selectKnowledgeSlice(mode: AdvisorMode, page?: PageContext): string {
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

  const wantPricing =
    mode === "pricing" ||
    mode === "msp_discovery" ||
    mode === "assessment" ||
    page?.pageType === "pricing" ||
    page?.pageType === "store";

  const wantServices =
    mode !== "off_topic" &&
    mode !== "security_incident";

  if (wantPricing) parts.push(getCanonicalPricingKnowledge());
  if (wantServices) parts.push(getServiceCapabilityKnowledge());

  if (mode === "security_incident") {
    parts.push(
      "INCIDENT MODE: Prioritize containment-oriented guidance, urge immediate escalation to DE, keep advice conservative, minimize sales language.",
    );
  }
  if (mode === "existing_client") {
    parts.push(
      "EXISTING CLIENT MODE: Prioritize portal/support paths. Do not run heavy prospect qualification.",
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
