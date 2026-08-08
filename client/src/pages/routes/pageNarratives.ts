/** Deeper sales narrative layered onto GenericServicePage shells. */

export interface PageNarrative {
  whoFor?: string;
  painPoints?: string[];
  process?: { title: string; description: string }[];
  arizonaNote?: string;
  proof?: { quote: string; attribution: string };
  faqs?: { q: string; a: string }[];
  ctaHeadline?: string;
  ctaBody?: string;
}

export const pageNarratives: Record<string, PageNarrative> = {
  "managed-it-support": {
    whoFor:
      "Arizona offices (roughly 5–40 people) without a full-time IT team — or with one overloaded admin who still ends up owning every printer, password, and vendor call.",
    painPoints: [
      "Tickets sit for hours while someone googles the fix between real work",
      "Break/fix vendors reset the same password instead of fixing the root cause",
      "Nobody owns patching, backups, or MFA — until something fails on a Friday",
      "New hires wait days for email, apps, and a laptop that actually works",
    ],
    process: [
      {
        title: "Assessment",
        description:
          "We map users, devices, Microsoft 365/Google, backup health, and the gaps that create repeat tickets.",
      },
      {
        title: "Stabilize",
        description:
          "MFA, patching, monitoring, and backup verification go on a known-good baseline — not a hope-and-pray stack.",
      },
      {
        title: "Operate",
        description:
          "Helpdesk with a 15-minute first-response target, vendor coordination, and monthly visibility into what we fixed and prevented.",
      },
      {
        title: "Improve",
        description:
          "Quarterly reviews turn ticket noise into roadmap decisions so IT stops being a surprise cost center.",
      },
    ],
    arizonaNote:
      "Digerati Experts operates from the East Valley (Chandler). You get a local operator who shows up when onsite matters — not a national ticket queue with an Arizona area code.",
    proof: {
      quote:
        "We stopped playing helpdesk roulette. Same team, same stack, tickets that actually close.",
      attribution: "Arizona professional-services firm (typical outcome)",
    },
    faqs: [
      {
        q: "Is this just a helpdesk?",
        a: "No. Helpdesk is the front door. The value is the DE stack underneath — monitoring, identity, patching, backup checks, and vendors we already know how to escalate.",
      },
      {
        q: "What if we already have Microsoft 365?",
        a: "Good. We harden and operate it — MFA, conditional access patterns, lifecycle for joiners/leavers, and support that understands your tenant.",
      },
      {
        q: "Do you come onsite?",
        a: "Yes when the job needs hands. Remote-first for speed; East Valley onsite when hardware, cabling, or a messy local problem needs a person in the room.",
      },
      {
        q: "How fast do you respond?",
        a: "Business-hours first response target is 15 minutes for managed clients. After-hours coverage scales with your plan and risk profile.",
      },
    ],
    ctaHeadline: "Get a clear picture of your IT — then decide",
    ctaBody:
      "Schedule a free cyber risk assessment. We’ll show what’s brittle, what’s covered, and what a sane managed-IT month looks like for your office.",
  },

  "threat-detection": {
    whoFor:
      "Owners and ops leads who know email + antivirus is not a security program — especially firms holding client data, PHI, or wire instructions.",
    painPoints: [
      "Alerts fire into a mailbox nobody watches after 5pm",
      "Ransomware or BEC would be noticed by a client before your team",
      "Insurance and customers ask about 24/7 monitoring — you don’t have a real answer",
      "Containment means hoping someone knows which laptop to unplug",
    ],
    process: [
      {
        title: "Instrument",
        description: "EDR, email, identity, and cloud signals feed a monitored detection layer — not a dashboard you babysit.",
      },
      {
        title: "Detect & triage",
        description: "24/7 eyes on telemetry with human triage so noise doesn’t bury the real incident.",
      },
      {
        title: "Contain",
        description: "Isolate endpoints, kill sessions, reset credentials — guided actions with your people in the loop.",
      },
      {
        title: "Recover & report",
        description: "Root-cause notes, insurance-friendly documentation, and hardening so the same door doesn’t reopen.",
      },
    ],
    arizonaNote:
      "When something looks wrong at 2am, you need response — not a portal ticket. We run detection for Arizona SMBs who can’t staff a SOC and can’t afford to pretend they have one.",
    proof: {
      quote: "88% of SMB breaches involve ransomware — waiting for ‘next business day’ is not a response plan.",
      attribution: "Verizon DBIR 2025 (industry context)",
    },
    faqs: [
      {
        q: "Is this the same as antivirus?",
        a: "No. Antivirus is one control. Threat detection watches behavior across endpoints, identity, and email — and someone acts when it matters.",
      },
      {
        q: "Will you flood us with alerts?",
        a: "We triage. You get actionable incidents and monthly trend reporting — not a firehose into your inbox.",
      },
      {
        q: "What happens during an incident?",
        a: "We investigate, contain where safe, coordinate with your leadership, and document what happened. You are never left with ‘here’s a PDF, good luck.’",
      },
      {
        q: "Do we need this if we already have Managed IT?",
        a: "Managed IT keeps the lights on. Detection & response assumes attackers are already trying. Most growing firms eventually need both.",
      },
    ],
    ctaHeadline: "See what 24/7 detection would catch in your environment",
    ctaBody:
      "Book a cyber risk assessment. We’ll review your current stack and tell you honestly whether you have monitoring — or just tools.",
  },

  "security-operations": {
    whoFor:
      "Firms that outgrew ‘we bought EDR’ and need continuous hunting, policy tuning, and board-ready security operations without hiring a SOC team.",
    painPoints: [
      "Tools are installed but nobody tunes policies after month one",
      "Leadership wants a security story for customers and cyber insurance",
      "Incidents get closed; lessons never become better controls",
      "Log retention and hunting are ‘we’ll get to it’ forever",
    ],
    process: [
      { title: "Baseline", description: "Inventory controls, close obvious gaps, align monitoring to your real risk." },
      { title: "Operate", description: "Detection, triage, response, plus scheduled hunting and policy refinement." },
      { title: "Report", description: "Monthly SOC-style reporting: what we saw, what we changed, what still needs budget." },
      { title: "Mature", description: "Quarterly posture reviews so security keeps pace with headcount and SaaS sprawl." },
    ],
    arizonaNote:
      "Built for Arizona professional services, healthcare, and growing offices that need SOC outcomes — not a Fortune-500 headcount plan.",
    faqs: [
      {
        q: "How is this different from Threat Detection?",
        a: "Threat Detection is detect + respond. Security Operations adds hunting, continuous tuning, deeper correlation, and maturity reporting.",
      },
      {
        q: "Can this help with cyber insurance?",
        a: "Yes — documented monitoring, response, and control evidence is what underwriters actually ask for.",
      },
    ],
    ctaHeadline: "Get SOC outcomes without building a SOC",
    ctaBody: "Schedule an assessment. We’ll map what you have today against a real operating model.",
  },

  "cloud-backup": {
    whoFor: "Any Arizona office that can’t afford to learn — during an outage — that backups never restored.",
    painPoints: [
      "Backups ‘run’ but nobody has restored a file in a year",
      "OneDrive sync is mistaken for a backup strategy",
      "Ransomware would encrypt production and the only copy",
      "Insurance questionnaires ask about tested restores — blank stares follow",
    ],
    process: [
      { title: "Scope", description: "Endpoints, servers, and Microsoft 365/Google — what must come back, and how fast." },
      { title: "Protect", description: "Encrypted backups with monitoring when jobs fail or fall behind." },
      { title: "Verify", description: "Scheduled restore tests so recovery is proven, not assumed." },
      { title: "Report", description: "Clear health visibility for owners and auditors." },
    ],
    arizonaNote:
      "We treat backup as a continuity control for East Valley businesses — not a checkbox on a vendor invoice.",
    faqs: [
      {
        q: "Isn’t Microsoft 365 already backed up?",
        a: "Retention and recycle bins help. They are not a full third-party backup with independent restore testing. Most firms need both.",
      },
      {
        q: "How often do you test restores?",
        a: "On a defined cadence with evidence — because an untested backup is a story you tell yourself.",
      },
    ],
    ctaHeadline: "Prove your backups can restore — before you need them",
    ctaBody: "We’ll review backup coverage and restore readiness as part of your free assessment.",
  },

  "security-awareness": {
    whoFor: "Owners who know the next breach starts with a convincing email — and training once a year doesn’t change behavior.",
    painPoints: [
      "Phishing simulations feel like gotchas, not coaching",
      "High-risk users never get follow-up",
      "Insurance and HIPAA ask for training evidence you can’t produce",
      "Staff think security is ‘IT’s problem’",
    ],
    process: [
      { title: "Baseline", description: "Short training + initial phish simulation to see real risk by role." },
      { title: "Coach", description: "Remedial micro-learning for clickers — not public shaming." },
      { title: "Measure", description: "Department risk trends leadership can actually use." },
      { title: "Evidence", description: "Logs ready for audits, BAAs, and cyber-insurance renewals." },
    ],
    arizonaNote:
      "Training that matches how Arizona offices actually work — busy staff, shared inboxes, and real wire-fraud pressure in professional services.",
    faqs: [
      {
        q: "Will employees hate this?",
        a: "Done right, it’s short, relevant, and tied to real threats — not hour-long annual videos nobody remembers.",
      },
    ],
    ctaHeadline: "Turn your team into a control — not a liability",
    ctaBody: "Ask us to include human-risk scoring in your assessment.",
  },

  "vcio-strategy": {
    whoFor:
      "Owners who need IT leadership without hiring a full-time CIO — budget, risk, vendors, and a roadmap that matches the business.",
    painPoints: [
      "Technology spend is reactive and surprise-driven",
      "No one owns a 12–24 month plan tied to growth or compliance",
      "Too many overlapping tools, none fully used",
      "Board/partners ask ‘are we secure?’ and the answer is vibes",
    ],
    process: [
      { title: "Listen", description: "Business goals, risk tolerance, and compliance obligations first." },
      { title: "Assess", description: "Stack, spend, gaps, and quick wins vs structural fixes." },
      { title: "Roadmap", description: "Prioritized plan with budget ranges — what this quarter vs next year." },
      { title: "Govern", description: "Quarterly Technology Business Reviews so the plan stays honest." },
    ],
    arizonaNote:
      "Local vCIO cadence for Chandler and Greater Phoenix firms — strategy sessions that respect owner time.",
    faqs: [
      {
        q: "Is vCIO only for big companies?",
        a: "No. Small firms need the function more — they just can’t afford a full-time executive. That’s the gap we fill.",
      },
    ],
    ctaHeadline: "Get an IT roadmap your ownership team can trust",
    ctaBody: "Start with an assessment; we’ll turn findings into a prioritized plan.",
  },

  "compliance-reports": {
    whoFor:
      "Healthcare, finance, and professional firms facing HIPAA, FTC Safeguards, cyber insurance, or customer security questionnaires.",
    painPoints: [
      "Evidence lives in five folders and someone’s head",
      "Audits become scavenger hunts",
      "Controls exist but aren’t mapped to the framework",
      "Insurance renewals ask for proof you can’t assemble quickly",
    ],
    process: [
      { title: "Map", description: "Align DE controls to your framework (HIPAA, CIS, insurance, etc.)." },
      { title: "Collect", description: "Retain training, access reviews, baselines, and incident trails." },
      { title: "Report", description: "Monthly posture reporting leadership can skim." },
      { title: "Packet", description: "On-demand audit/insurance packets without the fire drill." },
    ],
    arizonaNote:
      "Built for Arizona practices that need audit-ready evidence without a full-time compliance officer.",
    faqs: [
      {
        q: "Do you ‘make us HIPAA certified’?",
        a: "No vendor certifies you HIPAA. We implement technical/administrative controls, BAAs where appropriate, and evidence so you can demonstrate compliance.",
      },
    ],
    ctaHeadline: "Stop scrambling when auditors or insurers ask",
    ctaBody: "We’ll show what evidence you already have — and what’s missing — in your assessment.",
  },

  "unified-security": {
    whoFor:
      "Firms tired of a pile of security tools that don’t talk to each other — and want one operating model.",
    painPoints: [
      "Five portals, zero coherent posture",
      "Identity, endpoint, and email policies conflict",
      "Incidents bounce between vendors",
      "No single answer to ‘are we actually protected?’",
    ],
    process: [
      { title: "Unify identity", description: "SSO/MFA as the spine — access follows policy, not tribal knowledge." },
      { title: "Align detections", description: "Endpoint, email, and cloud signals under one response process." },
      { title: "Tie recovery", description: "Backup/BCDR linked to incident playbooks." },
      { title: "Govern", description: "One reporting rhythm for risk, incidents, and readiness." },
    ],
    arizonaNote:
      "One Arizona operator accountable for the whole story — not a reseller stitching logos on a slide.",
    ctaHeadline: "Replace tool sprawl with a security program",
    ctaBody: "Book an assessment and we’ll diagram what you have vs a unified posture.",
  },

  "data-encryption": {
    whoFor: "Teams handling sensitive client or patient data where browser and web apps are the real work surface.",
    painPoints: [
      "Data leaves via downloads, USB, or the wrong SaaS app",
      "Endpoint malware bypasses file-share thinking",
      "Phishing still wins inside the browser",
    ],
    process: [
      { title: "Policy", description: "Define what can leave, who can access, and what’s blocked." },
      { title: "Enforce", description: "Browser-layer DLP, DNS filtering, and anti-phishing controls." },
      { title: "Monitor", description: "Activity insights for insider risk and audit trails." },
    ],
    arizonaNote: "Especially relevant for Arizona healthcare, legal, and finance workflows that live in the browser all day.",
    ctaHeadline: "Control data where your team actually works",
    ctaBody: "Ask about browser-layer controls during your assessment.",
  },

  "ProActive-Ecosystem-Packages": {
    whoFor:
      "Small Arizona offices (about 5–25 users) that want one accountable partner for IT + security — not a patchwork of vendors.",
    painPoints: [
      "Too many vendors, nobody owns the outcome",
      "Security was bolted on after the last scare",
      "Costs feel unpredictable; value feels vague",
    ],
    process: [
      { title: "Fit", description: "Confirm Office/Business/Enterprise package against headcount and risk." },
      { title: "Onboard", description: "Baseline identity, endpoints, backup, and support paths." },
      { title: "Run", description: "Predictable monthly operations with clear SLAs." },
      { title: "Review", description: "Monthly summaries and optional QBRs so spend stays tied to outcomes." },
    ],
    arizonaNote:
      "ProActive is how we package complete ownership for East Valley offices that need enterprise habits without enterprise headcount.",
    faqs: [
      {
        q: "Is ProActive the same as Managed IT?",
        a: "Managed IT is a capability. ProActive packages IT + security baseline + backup + coordination into one ecosystem with clear tiers.",
      },
    ],
    ctaHeadline: "See which ProActive tier fits your office",
    ctaBody: "Assessment first — then a package recommendation you can take to ownership.",
  },

  "professional-services": {
    whoFor:
      "Consultants, architects, engineers, and advisors in Greater Phoenix who sell trust — and can’t afford a messy IT story in front of clients.",
    painPoints: [
      "Client files live in too many places with unclear access",
      "Partners work from home on unmanaged devices",
      "A single phish could expose multiple client engagements",
    ],
    process: [
      { title: "Protect client data", description: "Identity, encryption, and access that match engagement boundaries." },
      { title: "Enable the field", description: "Secure remote work without slowing delivery." },
      { title: "Prove readiness", description: "Evidence for client security questionnaires and insurance." },
    ],
    arizonaNote:
      "We work with Arizona professional firms that need to look as sharp operationally as they do on proposals.",
    ctaHeadline: "Protect the trust your clients already place in you",
    ctaBody: "Schedule an assessment focused on client-data exposure and remote work risk.",
  },

  "accounting-finance": {
    whoFor: "CPA and finance shops handling tax, payroll, and payment data under rising cyber-insurance pressure.",
    painPoints: [
      "Tax season multiplies phishing and wire-fraud attempts",
      "Client PII/PCI exposure without clear controls",
      "Staff share credentials ‘just to get the return out’",
    ],
    arizonaNote: "Built for Arizona accounting firms that can’t pause compliance for busy season.",
    process: [
      { title: "Harden identity & email", description: "MFA, mailbox security, and least privilege for client work." },
      { title: "Protect files & payments", description: "Encryption, secure sharing, and safer payment workflows." },
      { title: "Evidence", description: "Documentation that supports audits and insurance." },
    ],
    ctaHeadline: "Secure client financial data without slowing the firm",
    ctaBody: "Book a risk assessment before the next filing season spike.",
  },

  "real-estate": {
    whoFor: "Arizona brokerages and transaction teams targeted by wire fraud and spoofed closing instructions.",
    painPoints: [
      "Wire instructions change over email — and criminals know it",
      "Agents live on mobile with uneven device security",
      "Transaction docs scatter across personal and work accounts",
    ],
    arizonaNote:
      "Wire fraud is an Arizona real-estate reality. We focus on verification habits, email security, and device hygiene that survive a busy closing week.",
    process: [
      { title: "Lock identity & email", description: "MFA and anti-phish controls on the accounts criminals target first." },
      { title: "Transaction hygiene", description: "Secure channels and verification workflows for money movement." },
      { title: "Mobile & docs", description: "Manage the devices and files agents actually use in the field." },
    ],
    ctaHeadline: "Reduce wire-fraud exposure before the next closing",
    ctaBody: "We’ll assess email, identity, and transaction workflows in a focused session.",
  },

  "nonprofits": {
    whoFor: "501(c)(3) organizations that need reliable IT and donor protection without enterprise pricing theater.",
    painPoints: [
      "Budgets are tight; volunteer IT creates silent risk",
      "Donor and payment data need real protection",
      "Grant and board reporting expect basic cyber hygiene",
    ],
    arizonaNote: "We help Arizona nonprofits get secure-enough operations without burning mission dollars.",
    process: [
      { title: "Right-size", description: "Prioritize identity, backup, and email security first." },
      { title: "Protect donors", description: "Harden payment and CRM access paths." },
      { title: "Sustain", description: "Predictable support so staff aren’t the helpdesk." },
    ],
    ctaHeadline: "Protect the mission and the donor data behind it",
    ctaBody: "Ask about nonprofit-friendly packaging during your assessment.",
  },
};
