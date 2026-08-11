import { TierDetailTemplate, type TierPageConfig } from "@/components/TierDetailTemplate";
import { pricing, formatPrice, formatUserPrice } from "@/data/pricing";

const config: TierPageConfig = {
  id: "it",
  shortName: "IT",
  fullName: "ProActive IT Ecosystem",
  canonicalPath: "/solutions/proactive-it-ecosystem",
  seoTitle: "ProActive IT Ecosystem | Digerati Experts",
  seoDescription:
    `Entry managed IT package from Digerati Experts. Starts at ${formatUserPrice("it")} with a ${formatPrice(pricing.it.monthlyMin)}/mo minimum. Foundational identity, endpoint, network, and help-desk coverage. Backup is not included by default.`,
  heroBadge: "Entry managed IT",
  tagline: "Foundational managed IT — keep the lights on, the doors locked, and the help desk reachable.",
  positioning:
    "ProActive IT Ecosystem is the floor we will operate against, not a security-led plan. It is built for Arizona SMBs that need dependable identity, endpoint, network, and help-desk coverage with predictable per-user pricing — without yet committing to the full security-first stack we deliver in Business and Enterprise. Most clients use IT as a stepping stone: stabilize the environment, document everything, then graduate into security-first packages once the foundation is clean.",
  whoFor: [
    "Small teams (typically 5–25 users) replacing a break-fix or in-house IT person",
    "Companies that have not yet been through a Cyber Risk Assessment and want a clean baseline first",
    "Organizations without regulated data (no HIPAA, CMMC, PCI scope) that still want professional IT operations",
    "Buyers who want a transparent per-user price before stepping into the full security stack",
  ],
  outcomes: [
    "A documented, professionally managed Microsoft 365 and endpoint environment",
    "A single accountable help desk with response-time commitments — no more guessing who to call",
    "Clear visibility into user lifecycle, licensing, and device health",
    "A clean foundation to step up into ProActive Business when security maturity is required",
  ],
  included: [
    "Microsoft 365 / Entra ID tenant management",
    "Multi-Factor Authentication (MFA) enforcement",
    "Endpoint management & patching (Intune / RMM)",
    "Standard antivirus / next-gen endpoint protection",
    "Network monitoring & basic firewall management",
    "DNS filtering / web security",
    "User onboarding & offboarding",
    "Unlimited remote help desk during business hours",
    "Asset & license inventory",
    "Vendor management for core IT systems",
    "Monthly health & ticket reporting",
  ],
  notIncluded: [
    "Endpoint Backup, BCDR, and User Cloud Storage Backup (add-on or step up to Business)",
    "24/7 Security Operations Center (SOC) and Managed Detection & Response (MDR)",
    "Security Awareness Training program",
    "Compliance and risk reporting (HIPAA, CMMC, PCI, SOC 2 mapping)",
    "Semi-annual technology + security reviews (vCIO / QBR cadence)",
  ],
  addOnsOrUpgrades: [
    {
      label: "Microsoft 365 Backup",
      desc: "Independent backup of Exchange, SharePoint, OneDrive, and Teams data — recommended for any business that lives in M365.",
    },
    {
      label: "Endpoint Backup",
      desc: "Image-level backup for laptops and workstations to protect against ransomware, theft, and hardware failure.",
    },
    {
      label: "Step up to ProActive Business",
      desc: "Adds the full security stack — SOC, MDR, Security Awareness Training, BCDR, compliance/risk reporting, and semi-annual reviews.",
    },
  ],
  reviewCadence:
    "ProActive IT clients receive a monthly operational report and an annual technology check-in. Strategic vCIO planning, QBRs, and security posture reviews are part of ProActive Business and Enterprise.",
  pricingNote:
    `ProActive IT Ecosystem starts at ${formatUserPrice("it")} with a ${formatPrice(pricing.it.monthlyMin)}/mo minimum. Final pricing is confirmed after a short assessment of your environment, user count, and add-on selections.`,
  ctaPrimary: { label: "View Pricing & Matrix", href: "/proactive-ecosystem-pricing" },
};

export default function ProActiveITEcosystemPage() {
  return <TierDetailTemplate config={config} />;
}
