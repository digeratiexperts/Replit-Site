import { TierDetailTemplate, type TierPageConfig } from "@/components/TierDetailTemplate";

const config: TierPageConfig = {
  id: "office",
  shortName: "Office",
  fullName: "ProActive Office Ecosystem",
  canonicalPath: "/solutions/proactive-office-ecosystem",
  seoTitle: "ProActive Office Ecosystem | Digerati Experts",
  seoDescription:
    "Small office operating package from Digerati Experts. Starts at $165/user/mo with a $2,400/mo minimum. Everything in ProActive IT plus managed network & connectivity, limited managed workplace, endpoint backup, and an annual combined technology + cyber review.",
  heroBadge: "Small office operating package",
  tagline: "The small office operating package — managed IT, network, and endpoint backup under one accountable partner.",
  positioning:
    "ProActive Office Ecosystem is the step between entry managed IT and our security-first Business package. It takes everything in ProActive IT and adds managed network & connectivity, a limited Managed Workplace layer, endpoint backup, and an annual combined technology + cyber review — so a small office runs on documented, professionally operated infrastructure with a clear upgrade path. Security operations (SOC, MDR, training) remain available as add-ons or by stepping up to ProActive Business.",
  whoFor: [
    "Small offices (typically 5–30 users) that need dependable IT plus a professionally managed network",
    "Teams that want endpoint backup included rather than bolted on later",
    "Organizations preparing for a security-first posture but not yet ready for the full Business stack",
    "Buyers who want transparent per-user pricing with a predictable site minimum",
  ],
  outcomes: [
    "One accountable partner for help desk, endpoints, and the office network",
    "Laptops and workstations protected by managed endpoint backup",
    "An annual combined technology + cyber review with leadership",
    "A documented environment that steps cleanly up into ProActive Business",
  ],
  included: [
    "Everything in ProActive IT Ecosystem",
    "Managed Network & Connectivity",
    "Limited Managed Workplace (user provisioning, workspace setup, M365 / Google Workspace / Zoho support)",
    "Endpoint Backup",
    "Stronger identity protection (MFA / SSO / Password Manager)",
    "Advanced email anti-phishing protection",
    "Annual combined technology + cyber review",
  ],
  notIncluded: [
    "Security Awareness Training (available as an add-on, included in Business)",
    "Threat Detection / SOC-as-a-Service (available as an add-on, included in Business)",
    "Backup & Disaster Recovery (BCDR) and User Cloud Storage Backup (add-on or step up to Business)",
    "Compliance & risk reporting (add-on / custom, included in Business)",
    "Semi-annual technology + security reviews (Business) or quarterly executive reviews (Enterprise)",
  ],
  addOnsOrUpgrades: [
    {
      label: "Security Awareness Training",
      desc: "Ongoing end-user training and phishing simulation to harden your human firewall before stepping up to Business.",
    },
    {
      label: "Threat Detection / SOC",
      desc: "Add 24/7 monitored detection and response ahead of a full ProActive Business engagement.",
    },
    {
      label: "Step up to ProActive Business",
      desc: "Adds the full security stack — SOC, MDR, Security Awareness Training, BCDR, compliance/risk reporting, and semi-annual reviews.",
    },
  ],
  reviewCadence:
    "ProActive Office clients receive a monthly operational report and an annual combined technology + cyber review. Semi-annual reviews are part of ProActive Business; quarterly executive reviews are part of Enterprise.",
  pricingNote:
    "ProActive Office Ecosystem starts at $165/user/mo with a $2,400/mo minimum. Final pricing is confirmed after a short assessment of your environment, user count, and add-on selections.",
  ctaPrimary: { label: "View Pricing & Matrix", href: "/proactive-ecosystem-pricing" },
};

export default function ProActiveOfficeEcosystemPage() {
  return <TierDetailTemplate config={config} />;
}
