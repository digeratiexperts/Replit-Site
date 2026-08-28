/**
 * Web-native executive briefs. Sourced from existing DE service architecture
 * and published resource/blog positions. No fabricated case results or stats.
 */
export type BriefSlug =
  | "cyber-risk-operating-brief"
  | "ransomware-readiness-brief"
  | "cyber-insurance-brief"
  | "proactive-operating-brief";

export type BriefBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] };

export interface ExecutiveBrief {
  slug: BriefSlug;
  title: string;
  dek: string;
  audience: string;
  readingMinutes: number;
  relatedAssetSlug?: string;
  relatedCampaignSlug?: string;
  seoTitle: string;
  seoDescription: string;
  body: BriefBlock[];
}

export const EXECUTIVE_BRIEFS: ExecutiveBrief[] = [
  {
    slug: "cyber-risk-operating-brief",
    title: "Cyber Risk as an Operating Decision",
    dek: "How Digerati Experts uses a Cyber Risk Assessment to choose ProActive, standalone, or co-managed work — without turning the assessment into a scare tactic.",
    audience: "Owners, operators, and IT leads comparing next steps.",
    readingMinutes: 8,
    relatedAssetSlug: "cyber-risk-assessment-sample",
    relatedCampaignSlug: "cyber-risk-assessment",
    seoTitle: "Cyber Risk Operating Brief",
    seoDescription:
      "An executive brief from Digerati Experts on what a Cyber Risk Assessment is for, what it is not, and how recommendations are chosen.",
    body: [
      {
        kind: "p",
        text: "Most businesses do not discover their cybersecurity gaps during a planning meeting. They discover them during an outage, a phishing incident, a ransomware event, a failed cyber insurance review, or a stressful vendor questionnaire.",
      },
      {
        kind: "p",
        text: "For Digerati Experts, the assessment is not a generic score and it is not a product dump. It is the starting point for understanding how the business actually uses technology: who has access, which devices are unmanaged, where sensitive data lives, how email is protected, whether backups can be restored, and whether anyone is reviewing alerts.",
      },
      { kind: "h2", text: "What the conversation is for" },
      {
        kind: "ul",
        items: [
          "Name the operating model that fits: ProActive Ecosystem, a standalone role, co-managed support, or a scoped project.",
          "Separate “we bought a tool” from “someone owns the outcome.”",
          "Give leadership a 30/60/90 sequence instead of a 40-item shopping list.",
        ],
      },
      { kind: "h2", text: "What it is not" },
      {
        kind: "ul",
        items: [
          "A guarantee that the business is compliant, insured, or certified.",
          "A free substitute for the documented Cybersecurity Risk Assessment when that formal deliverable is scoped.",
          "Permission to invent ratings, client logos, or time-to-respond claims.",
        ],
      },
      { kind: "h2", text: "How DE chooses a path" },
      {
        kind: "p",
        text: "Two businesses with the same number of users can have different risk and support needs. Headcount is an input. Locations, admin hygiene, backup restore proof, and whether internal IT already exists usually decide the recommendation.",
      },
      {
        kind: "p",
        text: "If the client needs one defined function — backup, awareness, threat detection — standalone scope is honest. If they need an operating model, ProActive IT, Office, Business, or Enterprise is the catalog. If they already have a team, Co-Managed IT is the path that does not replace that team.",
      },
      {
        kind: "p",
        text: "The sample CSRA report is a leadership-ready preview of format: executive summary, prioritized findings, and a sequenced roadmap. It is not a report about your environment until we assess yours.",
      },
    ],
  },
  {
    slug: "ransomware-readiness-brief",
    title: "Ransomware Readiness without Theater",
    dek: "A practical brief on recoverability: identity, endpoints, email, backups that restore, and a response path people can follow.",
    audience: "Operators responsible for uptime and recovery.",
    readingMinutes: 7,
    relatedAssetSlug: "backup-bcdr-checklist",
    relatedCampaignSlug: "ransomware-readiness",
    seoTitle: "Ransomware Readiness Brief",
    seoDescription:
      "Digerati Experts brief on ransomware readiness: backups versus recoverability, MFA limits, and how assessment drives the next layer.",
    body: [
      {
        kind: "p",
        text: "Digerati Experts treats ransomware defense as a multilayer system. The useful question is not “do we have antivirus.” It is whether an attacker who has one mailbox or one admin session can encrypt the copies you planned to restore from — and whether anyone knows the order of operations after that.",
      },
      { kind: "h2", text: "Layers that actually connect" },
      {
        kind: "ul",
        items: [
          "Identity: MFA, admin count, and what happens if one account is compromised.",
          "Endpoints: managed versus unknown devices.",
          "Email: phishing is still the common door.",
          "Backup: coverage, offsite or immutable options where warranted, and a restore that has been done.",
          "Response: named contacts and isolation steps before the conference call starts.",
        ],
      },
      { kind: "h2", text: "Backup is not file sync" },
      {
        kind: "p",
        text: "Cloud drive sync can spread encryption. Endpoint backup, server backup, and business continuity are different jobs. ProActive Office includes endpoint backup. Fuller BCDR posture belongs to ProActive Business and Enterprise, or to a documented standalone role.",
      },
      { kind: "h2", text: "What we will not claim" },
      {
        kind: "p",
        text: "This brief does not publish unsourced ransomware percentages. If you need sourced industry context, use Cyber Facts on this site. The work in your environment is still restore proof and ownership.",
      },
    ],
  },
  {
    slug: "cyber-insurance-brief",
    title: "Cyber Insurance as a Control Conversation",
    dek: "What small businesses should prepare before a carrier questionnaire — and the line Digerati Experts will not cross.",
    audience: "Finance, operations, and owners facing a new application or renewal.",
    readingMinutes: 6,
    relatedAssetSlug: "compliance-risk-reports-overview",
    relatedCampaignSlug: "cyber-insurance",
    seoTitle: "Cyber Insurance Readiness Brief",
    seoDescription:
      "How Digerati Experts helps prepare MFA, backup, awareness, and evidence for cyber insurance reviews — without guaranteeing coverage.",
    body: [
      {
        kind: "p",
        text: "Applications increasingly ask how the business operates: multi-factor authentication, endpoint protection, email authentication, backup testing, and awareness training. Those are technical and process facts. They are not slogans.",
      },
      { kind: "h2", text: "What DE can do" },
      {
        kind: "ul",
        items: [
          "Identify missing controls and missing evidence.",
          "Implement or document a compensating process where the business chooses that path.",
          "Produce evidence-supporting compliance and risk reporting as a standalone service or at increasing depth in ProActive Business and Enterprise.",
        ],
      },
      { kind: "h2", text: "What DE cannot do" },
      {
        kind: "ul",
        items: [
          "Guarantee coverage, premium, or claim payment.",
          "Issue a HIPAA, SOC 2, PCI, or CMMC certification for your organization.",
          "Replace qualified legal counsel on policy language.",
        ],
      },
      {
        kind: "p",
        text: "If a formal documented baseline is the right artifact, the Cybersecurity Risk Assessment is the scoped product. If you already know a single gap — email authentication, awareness, a policy pack — standalone or store items can be honest. The assessment exists so those buys are not random.",
      },
    ],
  },
  {
    slug: "proactive-operating-brief",
    title: "The ProActive Operating Model",
    dek: "IT, Office, Business, and Enterprise are four depths of one ecosystem — plus the paths that are intentionally not tiers.",
    audience: "Buyers comparing managed IT packages and adjacent services.",
    readingMinutes: 7,
    relatedAssetSlug: "proactive-ecosystem-overview",
    relatedCampaignSlug: "managed-it",
    seoTitle: "ProActive Operating Model Brief",
    seoDescription:
      "How Digerati Experts structures ProActive IT, Office, Business, and Enterprise versus standalone and co-managed paths.",
    body: [
      {
        kind: "p",
        text: "ProActive Ecosystem is the umbrella operating model. The four package levels are mutually exclusive. We do not stack Office and Business on one client as two “plans.” Depth changes what is included across service desk, identity, email, backup, threat detection, awareness, reporting, and review cadence.",
      },
      { kind: "h2", text: "The four depths" },
      {
        kind: "ul",
        items: [
          "IT — entry managed IT and baseline security when the environment is smaller and less complex.",
          "Office — small-office operating package: managed network, stronger identity, email anti-phishing, endpoint backup, annual review.",
          "Business — the common fit when Office would need heavy modification: security operations, awareness, BCDR posture, reporting support, semi-annual reviews.",
          "Enterprise — greatest operating depth for complex, regulated, or security-sensitive environments, including quarterly executive reviews.",
        ],
      },
      { kind: "h2", text: "Paths that are not tiers" },
      {
        kind: "p",
        text: "Standalone Services cover one defined role after scope is written. Co-Managed IT extends an internal team. Assessments are how we choose among those paths. Confusing them is how expectation problems start.",
      },
      {
        kind: "p",
        text: "Published per-user floors and monthly minimums live on the pricing page. Final numbers still depend on users, endpoints, locations, infrastructure, backup, and compliance — confirmed after assessment.",
      },
      {
        kind: "p",
        text: "Client ownership remains the rule: your technology, your data, your keys. Documentation should be transferable. That is a product principle, not a contractual slogan invented for this brief.",
      },
    ],
  },
];

export const briefBySlug = (slug: string): ExecutiveBrief | undefined =>
  EXECUTIVE_BRIEFS.find((brief) => brief.slug === slug);
