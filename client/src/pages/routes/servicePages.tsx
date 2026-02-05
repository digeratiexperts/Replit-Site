export const servicePageData = {
  'ProActive-Ecosystem-Packages': {
    title: "ProActive Ecosystem Packages",
    subtitle: "Complete IT ownership for small offices—security built in",
    description: "The Office Package is your complete IT solution for small offices (5-25 users) with no internal IT team. We own your day-to-day IT outcomes: helpdesk support, continuous maintenance, security baseline, backup, and vendor coordination. You get enterprise-level protection without the enterprise cost—all for one predictable monthly price.",
    features: [
      { title: "Managed Helpdesk & Support", description: "DE ticketing + remote/onsite support with response SLAs and vendor coordination" },
      { title: "Core Security Baseline", description: "Endpoint EDR, email security, MFA enforcement, and basic cloud security" },
      { title: "Identity & Access Management", description: "DE IAM with SSO, MFA, and automated provisioning/deprovisioning for users and apps" },
      { title: "Continuous Maintenance", description: "Proactive patching, hardening, updates, and least-privilege enforcement" },
      { title: "Cloud Backup & Recovery", description: "DE cloud backups with secure storage, verified recovery testing, and restore readiness" },
      { title: "Documentation & Visibility", description: "DE inventory, network and SaaS app maps, and 'known good config' snapshots" }
    ],
    benefits: [
      "Predictable monthly costs with no surprises",
      "Zero internal IT staff required",
      "24/7 security baseline built into every plan",
      "Vendor coordination handled—no more vendor juggling",
      "Compliance optional: add modules only when needed",
      "Monthly service summaries and quarterly business reviews available"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    recommendedTier: "office" as const,
    salesPitchData: {
      corePitch: [
        "One predictable monthly price—no surprise IT bills",
        "Enterprise-grade security baseline included in every plan",
        "We own the outcomes: you focus on your business, not IT",
        "Zero internal IT staff required—we're your IT department",
        "Vendor coordination included—no more juggling ISPs and software vendors"
      ],
      discoveryQuestions: [
        "How much did you spend on IT last year, including emergencies and one-off fixes?",
        "Who handles your IT today? How long does it take to get issues resolved?",
        "What happens when your current IT person is unavailable?",
        "How confident are you in your backup and security posture right now?",
        "Are you paying for software licenses you're not using?"
      ],
      objections: [
        {
          objection: "We already have an IT guy",
          response: "Great—but can they monitor 24/7, handle security incidents, and manage vendors? We augment or replace with proven processes and a full team behind every ticket."
        },
        {
          objection: "It's too expensive",
          response: "Compare it to one ransomware incident or a week of downtime. Our clients save 20-40% vs. break-fix by eliminating emergency calls and preventing problems."
        },
        {
          objection: "We're too small to need managed IT",
          response: "Small businesses are the #1 target for cyberattacks because hackers know you're less protected. Our Office package is built exactly for 5-25 user organizations."
        }
      ],
      valueProof: [
        "15-minute first-response SLA—faster than any break-fix provider",
        "Monthly service summaries show exactly what we did and what we prevented",
        "Compliance modules available when you're ready—no pressure, no upsell",
        "Stack-native support: we built these tools, we know them inside out",
        "Quarterly business reviews keep you informed and aligned"
      ]
    }
  },
  'managed-it-support': {
    title: "Managed IT Support",
    subtitle: "Fast, proactive help anchored to the DE stack",
    description: "Managed IT Support is not generic helpdesk—it's support built on our proven DE stack. We handle remote troubleshooting, endpoint remediation, user onboarding, SaaS provisioning, and device basics. Support for everything you've deployed with DE; out-of-scope items are escalated or handled via education.",
    features: [
      { title: "Service Desk Coverage", description: "Fast response to user issues with clear resolution pathways and SLAs" },
      { title: "Remote Troubleshooting", description: "Secure remote access for quick diagnosis and remediation of endpoint issues" },
      { title: "User Lifecycle Support", description: "Onboarding/offboarding with IAM, device setup, and app provisioning" },
      { title: "Password & Login Management", description: "Self-service resets via SSO, MFA issues resolved by our team" },
      { title: "Basic Onsite Support", description: "Walk-in visits, printer/cabling/hardware basics per plan agreement" },
      { title: "Repeat Issue Reduction", description: "Tracking and follow-up to reduce repeat incidents over time" }
    ],
    benefits: [
      "First-response SLA: 15-minute response guarantee",
      "Reduced repeat incident rate",
      "Users guided toward solutions, not band-aids",
      "Vendor issues resolved—we handle ISPs, SaaS vendors, hardware vendors",
      "Stack-native support: we built these tools",
      "Help + education: users learn safer behaviors"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    recommendedTier: "office" as const,
    salesPitchData: {
      corePitch: [
        "15-minute first-response SLA—not 'we'll get back to you'",
        "Stack-native support: we built these tools, we know them cold",
        "We fix the root cause, not just the symptom",
        "Vendor coordination included—we handle your ISP, Microsoft, everyone",
        "Help + education: users learn safer behaviors, reducing repeat tickets"
      ],
      discoveryQuestions: [
        "How long does it typically take to get IT help when something breaks?",
        "What's the most frustrating IT issue your team deals with repeatedly?",
        "Who handles your password resets and user onboarding today?",
        "When was the last time a vendor issue took days to resolve?",
        "How do you handle IT support after hours or on weekends?"
      ],
      objections: [
        {
          objection: "We can just call our current IT when we need them",
          response: "Break-fix means waiting until something breaks. We prevent problems and respond in minutes, not hours or days."
        },
        {
          objection: "Our team can figure most things out themselves",
          response: "How much productivity is lost when employees troubleshoot their own IT? Our goal is zero disruption—let your team focus on their actual jobs."
        },
        {
          objection: "We don't have that many IT issues",
          response: "That's great—but when you do, how fast is resolution? And are you preventing issues, or just lucky? We track and reduce incident rates over time."
        }
      ],
      valueProof: [
        "Repeat incident rate drops month over month with our tracking",
        "Users get educated, not just patched—building a smarter workforce",
        "Vendor escalation handled by us: ISPs, SaaS vendors, hardware—all of it",
        "Remote remediation resolves 90%+ of issues without waiting for onsite",
        "Clear SLAs with accountability, not vague promises"
      ]
    }
  },
  'managed-workplace': {
    title: "Managed Workplace",
    subtitle: "End-to-end employee digital experience management",
    description: "Managed Workplace is your digital employee lifecycle engine. We manage identity, apps, devices, email, voice, and workflow automation—everything employees need to work productively and securely. New hires productive in one day, not a week. Your environment stays standardized, secure, and compliant.",
    features: [
      { title: "Identity Lifecycle Management", description: "DE cloud directory with SSO, MFA, conditional access, and automated provisioning to all SaaS" },
      { title: "Business App Management", description: "SaaS licensing management, app onboarding, role mapping, shadow IT discovery, and access reviews" },
      { title: "Email & Collaboration", description: "M365 or Google Workspace admin, Teams/Drive structure, message hygiene, and retention policies" },
      { title: "Voice & Unified Communications", description: "Teams Voice, Zoom UCaaS, or VoIP integration; conference room provisioning and device enrollment" },
      { title: "Device & Mobile Management", description: "Windows/macOS baseline policies via DE IAM; MDM for iOS/Android available" },
      { title: "HR-to-IAM Workflows", description: "Onboarding automation: HR system → identity → device → SaaS app provisioning" }
    ],
    benefits: [
      "New hires productive in one day with full app access",
      "Consistent access control across all employee tools",
      "Seamless hybrid and remote work enablement",
      "Reduced license waste and SaaS sprawl",
      "Zero-Trust identity posture at every login",
      "Automated offboarding: revoked access in minutes, not hours"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    recommendedTier: "office" as const
  },
  'cloud-backup': {
    title: "Cloud Backup",
    subtitle: "Baseline data protection with verified recovery",
    description: "Cloud Backup is your minimum continuity layer. Automated encryption-at-rest and in-transit protection for endpoints, servers, and cloud data (M365/Google). We verify monthly that restores actually work—because a backup that doesn't restore is worthless.",
    features: [
      { title: "Automated Encrypted Backups", description: "DE continuous backup of endpoints, servers, and M365/Google data with AES-256 encryption" },
      { title: "Backup Health Monitoring", description: "Automated monitoring with alerts when backup jobs fail or fall behind" },
      { title: "Verified Restore Testing", description: "Monthly restore verification to confirm backups are recoverable and complete" },
      { title: "DE Cloud Storage", description: "Cost-effective, secure cloud storage with enterprise-grade durability guarantee" },
      { title: "Exception Reporting", description: "Clear visibility on backup health and any issues requiring attention" },
      { title: "Ransomware Defense", description: "Immutable backup copies protect against ransomware encryption" }
    ],
    benefits: [
      "Protection against ransomware and data loss",
      "Accidental deletion recovery in minutes",
      "Hardware failure doesn't mean business loss",
      "Monthly proof that restores work",
      "Compliance-grade encryption audit trail",
      "Peace of mind: tested backups, not just 'set and forget'"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    stat: { value: "54%", label: "used backups to restore encrypted data (lowest in 6 years)", source: "Sophos 2025" },
    recommendedTier: "office" as const,
    salesPitchData: {
      corePitch: [
        "Backups that are tested monthly—because untested backups are worthless",
        "Immutable copies protect against ransomware encryption",
        "Restore in minutes, not days—verified recovery capability",
        "AES-256 encryption at rest and in transit—compliance-ready",
        "Exception reporting: you'll know immediately if something fails"
      ],
      discoveryQuestions: [
        "When was the last time you actually tested restoring from your backups?",
        "How long would it take to recover if ransomware encrypted everything today?",
        "Are your M365/Google Workspace emails and files backed up? Are you sure?",
        "What's your current backup retention policy? Could you restore a file from 30 days ago?",
        "Who gets notified when a backup fails?"
      ],
      objections: [
        {
          objection: "We already have backups",
          response: "Great—when did you last test a restore? We verify monthly that your data is actually recoverable. 46% of ransomware victims couldn't restore from backups."
        },
        {
          objection: "Microsoft/Google backs up our cloud data",
          response: "No, they don't. Microsoft's SLA covers their infrastructure, not your data. If an employee deletes files or ransomware encrypts them, that's on you without third-party backup."
        },
        {
          objection: "We've never had a data loss incident",
          response: "Yet. 88% of SMB breaches involve ransomware. The question isn't if, it's when—and whether you can recover."
        }
      ],
      valueProof: [
        "Monthly verified restore testing—proof your backups actually work",
        "Ransomware-proof immutable copies that can't be encrypted or deleted",
        "Covers endpoints, servers, M365, and Google Workspace",
        "Compliance-grade encryption audit trail for regulators and insurers",
        "Clear exception reporting so nothing fails silently"
      ]
    }
  },
  'security-awareness': {
    title: "Security Awareness Training",
    subtitle: "Turn staff into a security layer, not a liability",
    description: "Security Awareness is human-risk hardening. Your employees are your first line of defense—or your biggest vulnerability. We train, test, and coach your team so people stop being the weakest link. Phishing simulations, targeted campaigns, and ongoing coaching reduce incidents and change culture.",
    features: [
      { title: "Video Training Campaigns", description: "Engaging micro-learning lessons on phishing, malware, data handling, and real threats your org faces" },
      { title: "Phishing Simulations", description: "Regular simulated phishing attacks with automatic remedial training for repeat offenders" },
      { title: "Risk Scoring & Metrics", description: "Department-level risk scoring, participation rates, and phish-failure trend analysis" },
      { title: "Executive Reporting", description: "Board-ready reporting on security culture maturity and employee readiness" },
      { title: "Compliance Integration", description: "Training logs stored for audits; maps to HIPAA, GDPR, FTC control requirements (with Compliance modules)" },
      { title: "Behavioral Coaching", description: "Targeted follow-ups for high-risk users and departments" }
    ],
    benefits: [
      "Reduced phishing and social engineering incidents",
      "Measurable shift in employee security behavior",
      "Stronger security culture across the organization",
      "Compliance evidence for audits and insurance",
      "Reduced support tickets from malware/ransomware",
      "Lower breach risk from insider mistakes"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    stat: { value: "60%", label: "of breaches involve the human element", source: "Verizon DBIR 2025" },
    recommendedTier: "business" as const,
    salesPitchData: {
      corePitch: [
        "60% of breaches involve the human element—we fix that",
        "Measurable behavior change, not just checkbox training",
        "Phishing simulations that actually catch and coach repeat offenders",
        "Compliance evidence built-in for audits and insurance"
      ],
      discoveryQuestions: [
        "When was your last phishing simulation? What was the click rate?",
        "How do you identify and coach high-risk users?",
        "Does your cyber insurance require security awareness training?",
        "What happened the last time an employee clicked something they shouldn't?"
      ],
      objections: [
        {
          objection: "Our employees are trained",
          response: "When? How do you measure effectiveness? We provide ongoing training with measurable behavior change, not annual checkbox exercises."
        },
        {
          objection: "We don't have time for training",
          response: "Micro-learning takes 3-5 minutes per week. That's less time than recovering from a single phishing incident."
        }
      ],
      valueProof: [
        "Department-level risk scoring shows exactly who needs help",
        "Phish-failure rates typically drop 50%+ in 90 days",
        "Training logs ready for auditors and insurance carriers",
        "Targeted coaching for repeat offenders, not just more videos"
      ]
    }
  },
  'co-managed-it': {
    title: "Co-Managed IT",
    subtitle: "Augment your internal IT team with DE expertise and stack",
    description: "Already have internal IT? Co-Managed IT partners with your team to fill skill gaps, provide 24/7 coverage, and add specialized muscle. You keep control; we provide stack, automation, security maturity, and Tier 2/3 escalation. Avoid burnout and tap into deep expertise.",
    features: [
      { title: "Shared Tooling Platform", description: "Access to DE security and management platform with full visibility into your environment" },
      { title: "Responsibility Matrix", description: "Clear SOW defining who owns onboarding, patching, vendor comms, and incidents" },
      { title: "Tier 2/3 Escalation", description: "Expert escalation for complex issues, security incidents, and strategic decisions" },
      { title: "24/7 Monitoring & Response", description: "After-hours and weekend coverage so your team doesn't burn out" },
      { title: "Quarterly Posture Meetings", description: "Regular check-ins with your IT lead on stack optimization and roadmap" },
      { title: "Specialized Expertise", description: "Security, compliance, infrastructure, and cloud experts available on demand" }
    ],
    benefits: [
      "Fill critical skill gaps without hiring full-time",
      "Extended coverage beyond your current staff hours",
      "Reduced IT team burnout and turnover",
      "Cost-effective expertise scaling",
      "Strategic IT planning and technology roadmap alignment",
      "Your IT team + DE stack = higher maturity without hiring"
    ],
    gradientColors: "from-violet-700 via-purple-700 to-fuchsia-700",
    recommendedTier: "business" as const
  },
  'threat-detection': {
    title: "Threat Detection & Response",
    subtitle: "24/7 security monitoring and real incident response",
    description: "Threat Detection & Response is detection + triage + containment + guided recovery. We monitor endpoints, cloud apps, email, and network events 24/7 for threats. When we see something, we investigate, contain (isolate endpoints, reset credentials), and walk you through recovery. Not just alerts—real response.",
    features: [
      { title: "24/7 Telemetry Monitoring", description: "Real-time monitoring of endpoints, cloud apps, email, and gateway security events" },
      { title: "Advanced Endpoint Detection", description: "DE EDR detects suspicious behavior, lateral movement, and advanced techniques" },
      { title: "Automated Containment", description: "Safe automated actions like endpoint isolation, credential reset, and session termination" },
      { title: "Incident Runbooks", description: "Documented response playbooks maintained in DE documentation platform, customized to your environment" },
      { title: "Monthly Threat Reports", description: "Trend analysis, incident summaries, and 'mean time to contain' metrics" },
      { title: "DE SIEM Integration", description: "Deeper log correlation and retention for complex organizations" }
    ],
    benefits: [
      "Real-time threat detection 24/7/365",
      "Minutes-to-respond incident response",
      "Automated containment stops spread in seconds",
      "Forensic investigation and root cause analysis",
      "Compliance-ready incident documentation",
      "24/7 detection + real response, not 'good luck with alerts'"
    ],
    gradientColors: "from-violet-700 via-purple-700 to-fuchsia-700",
    stat: { value: "88%", label: "of SMB breaches involve ransomware", source: "Verizon DBIR 2025" },
    recommendedTier: "business" as const,
    salesPitchData: {
      corePitch: [
        "24/7 monitoring with real human response—not just alerts",
        "Automated containment: endpoints isolated in seconds, not hours",
        "We detect, investigate, and contain—you focus on business",
        "88% of SMB breaches involve ransomware—we stop it before it spreads",
        "Forensic investigation and root cause analysis included"
      ],
      discoveryQuestions: [
        "If a threat hit your network at 2am on Saturday, who would respond?",
        "How long would it take to detect and contain an active breach?",
        "Do you have incident response runbooks customized to your environment?",
        "What's your current mean time to detect and contain threats?",
        "Who investigates and determines root cause after an incident?"
      ],
      objections: [
        {
          objection: "We have antivirus/EDR already",
          response: "EDR generates alerts—who's triaging and responding 24/7? We provide the human expertise to investigate, contain, and guide recovery."
        },
        {
          objection: "We've never had a breach",
          response: "That you know of. Average dwell time is 200+ days before detection. We find threats hiding in your environment that others miss."
        },
        {
          objection: "Our IT team handles security",
          response: "Can they monitor 24/7? Respond at 2am? Perform forensic analysis? We augment your team with dedicated security expertise."
        }
      ],
      valueProof: [
        "Minutes-to-contain response time with automated isolation",
        "24/7/365 monitoring by trained security analysts",
        "Incident runbooks customized to your environment",
        "Monthly threat reports with trends and mean-time-to-contain metrics",
        "Compliance-ready incident documentation for auditors"
      ]
    }
  },
  'security-operations': {
    title: "Security Operations (SOC-as-a-Service)",
    subtitle: "Full SOC without hiring a SOC team",
    description: "Security Operations is Threat Detection & Response plus threat hunting, policy tuning, and continuous optimization. We run the security room. Includes detection, triage, response, plus proactive hunting, policy refinement, log correlation, and longer retention. Enterprise-grade security maturity.",
    features: [
      { title: "Threat Hunting Cycles", description: "Proactive investigation for advanced threats, unusual patterns, and insider risk" },
      { title: "Policy Tuning & Optimization", description: "Continuous refinement of EDR, email, cloud, and access control policies based on threats and trends" },
      { title: "Log Correlation & Analytics", description: "DE SIEM with deeper telemetry retention for pattern detection and forensics" },
      { title: "Security Change Management", description: "Documented policy changes with rationale and testing before deployment" },
      { title: "SOC Monthly Report", description: "Hunt findings, policy changes, incident trends, and audit-support packets" },
      { title: "Escalation & IR Coordination", description: "Full incident response coordination and external comms when needed" }
    ],
    benefits: [
      "Proactive threat discovery before breaches happen",
      "Continuously improving security posture",
      "Reduced vulnerability dwell time",
      "Stronger incident response and containment",
      "Compliance evidence and audit readiness",
      "Full SOC maturity without hiring SOC analysts"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    recommendedTier: "business" as const,
    salesPitchData: {
      corePitch: [
        "Full SOC capability without hiring a SOC team",
        "Proactive threat hunting finds attacks before they detonate",
        "Continuous policy tuning based on real threat intelligence",
        "Longer log retention for forensics and compliance",
        "Enterprise-grade security maturity at SMB pricing"
      ],
      discoveryQuestions: [
        "Do you have anyone actively hunting for threats in your environment?",
        "When was the last time your security policies were tuned or optimized?",
        "How long do you retain security logs? Can you investigate a 6-month-old incident?",
        "Who coordinates external communications during a major security incident?",
        "How do you know your security controls are actually working?"
      ],
      objections: [
        {
          objection: "Threat detection is enough for us",
          response: "Detection is reactive. SOC adds proactive hunting, policy optimization, and continuous improvement. We find what attackers are trying to hide."
        },
        {
          objection: "We can't afford a SOC",
          response: "A full-time SOC analyst costs $150K+. We provide an entire SOC team for a fraction of that—with 24/7 coverage."
        },
        {
          objection: "We don't have compliance requirements",
          response: "SOC isn't just for compliance—it's for security maturity. But when insurance or regulations do require it, you'll be ready."
        }
      ],
      valueProof: [
        "Proactive hunt cycles find threats that automated tools miss",
        "Policy tuning reduces false positives and improves detection",
        "Extended log retention for deep forensics and regulatory needs",
        "Monthly SOC reports with hunt findings and policy changes",
        "Full incident coordination including external communications"
      ]
    }
  },
  'backup-disaster-recovery': {
    title: "Backup & Disaster Recovery (BCDR)",
    subtitle: "Tested recovery with guaranteed targets—business won't stay down",
    description: "BCDR is guaranteed continuity, not just 'we have backups.' Agreed RPO/RTO targets, image-based backups, scheduled restore tests, and DR runbooks. Your business comes back up on a timeline you define—not when backups finally work.",
    stat: { value: "$1.53M", label: "average ransomware recovery cost (excluding ransom)", source: "Sophos 2025" },
    features: [
      { title: "Guaranteed RTO/RTO Targets", description: "Committed recovery time and data-loss objectives with SLA backing" },
      { title: "Image-Based Backups", description: "DE Server/VM backup features for full-system restore, not file-by-file recovery" },
      { title: "Scheduled Restore Tests", description: "Regular failover drills to confirm your systems can actually be restored" },
      { title: "DR Runbooks & Tabletop Exercises", description: "Documented recovery procedures with periodic team exercises" },
      { title: "Priority Restore Paths", description: "Defined restore sequencing so critical systems come back first" },
      { title: "Optional Warm Standby", description: "Cloud failover or secondary site options for maximum availability" }
    ],
    benefits: [
      "Restore your entire business, not just files",
      "Predictable recovery with guaranteed targets",
      "Tested and verified recovery procedures",
      "Reduced downtime and business impact",
      "Compliance-ready DR documentation",
      "Peace of mind: proven recovery capabilities"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    recommendedTier: "enterprise" as const
  },
  'vcio-strategy': {
    title: "vCIO & Strategy",
    subtitle: "Executive IT guidance aligned to business and compliance",
    description: "vCIO & Strategy is where we become your IT leadership function. Quarterly Technology Business Reviews, risk registers, budget forecasting, vendor rationalization, and roadmap planning. We align technology to your business goals and compliance requirements.",
    features: [
      { title: "Quarterly Technology Business Reviews", description: "Executive-level reviews of IT performance, spend, and strategic priorities" },
      { title: "Risk Register & Prioritization", description: "Documented risks with prioritized mitigation roadmap" },
      { title: "Budget Forecasting & Roadmap", description: "Multi-year technology budget and capital planning with business alignment" },
      { title: "Vendor Rationalization", description: "Eliminate shadow IT, optimize vendor stack, reduce tool sprawl" },
      { title: "Compliance Planning", description: "Roadmap for compliance modules and audit readiness aligned to your framework" },
      { title: "Tech Points & Prevention Incentives", description: "Track and reward prevention behaviors that reduce risk and cost" }
    ],
    benefits: [
      "Executive visibility into IT strategy and risk",
      "Reduced technology spend through consolidation",
      "Business-aligned IT roadmap",
      "Proactive compliance planning",
      "Reduced surprise costs and projects",
      "IT becomes a strategic business partner, not a cost center"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    recommendedTier: "enterprise" as const,
    salesPitchData: {
      corePitch: [
        "IT leadership without the executive salary",
        "Technology aligned to business goals, not just keeping lights on",
        "Quarterly Business Reviews keep you informed and strategic",
        "Risk registers and budget forecasting—no more surprise IT costs",
        "Vendor rationalization eliminates waste and shadow IT"
      ],
      discoveryQuestions: [
        "Who's responsible for IT strategy and long-term planning today?",
        "How do you decide which technology investments to make?",
        "What percentage of your IT budget goes to unplanned projects or emergencies?",
        "How often do you review your technology roadmap with business goals in mind?",
        "Do you have visibility into all the software and vendors your company uses?"
      ],
      objections: [
        {
          objection: "We don't need a CIO—we're too small",
          response: "You don't need a full-time CIO. You need strategic IT guidance a few hours per month. That's exactly what vCIO provides at a fraction of the cost."
        },
        {
          objection: "Our IT guy handles strategy",
          response: "Is your IT person thinking 3 years ahead, or just keeping things running? vCIO brings executive perspective and business alignment your tech team doesn't have time for."
        },
        {
          objection: "We can't afford strategic IT planning",
          response: "You can't afford not to. Companies without IT strategy spend 20-30% more on technology due to poor decisions and reactive spending."
        }
      ],
      valueProof: [
        "Quarterly Technology Business Reviews with executive-level insights",
        "Multi-year budget forecasting eliminates surprise IT costs",
        "Risk registers prioritize what actually matters to your business",
        "Vendor consolidation typically saves 15-25% on software spend",
        "Tech Points system rewards prevention behaviors that reduce costs"
      ]
    }
  },
  'data-encryption': {
    title: "Data Encryption & Control",
    subtitle: "Stop data leakage and risky browsing at the source",
    description: "Data Encryption & Control uses browser-layer security to protect data even if endpoints are compromised. DLP policies, anti-phishing, DNS filtering, and secure browsing controls at the gateway. Data governance happens inside the browser—the last place hackers look.",
    features: [
      { title: "Browser-Layer DLP", description: "Stop mass downloads, clipboard theft, and data exfiltration at the browser boundary" },
      { title: "Anti-Phishing & Anti-Malware", description: "In-browser threat detection and blocking before users click malicious links" },
      { title: "DNS Filtering & Blacklist/Whitelist", description: "Block malicious domains at the DNS level; whitelist approved resources only" },
      { title: "Secure Autofill & Password Protection", description: "Prevent credential theft through password masking and secure form handling" },
      { title: "Data Activity Insights", description: "Monitoring and analytics of web and data activity for insider risk detection" },
      { title: "Policy Enforcement & Compliance", description: "Enforce data handling policies with audit logs for compliance frameworks" }
    ],
    benefits: [
      "Stop data leakage from careless employees",
      "Protection even if endpoint malware compromises the device",
      "Reduced risk of credential theft and phishing success",
      "Compliance-ready audit trails for data handling",
      "Default for healthcare, finance, and legal verticals",
      "Works alongside endpoint security, not instead of it"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    recommendedTier: "business" as const,
    salesPitchData: {
      corePitch: [
        "Browser-layer security—the last place hackers look",
        "DLP that stops data leakage even if endpoints are compromised",
        "DNS filtering blocks threats before they reach your network",
        "Compliance-ready audit trails for data handling",
        "Essential for healthcare, finance, and legal verticals"
      ],
      discoveryQuestions: [
        "How do you prevent employees from accidentally exfiltrating sensitive data?",
        "What controls do you have over copy/paste and downloads of confidential information?",
        "How would you know if an employee was sending data to a personal email?",
        "Are you confident your DNS filtering blocks malicious domains in real-time?",
        "What happens if someone's laptop is stolen with client data on it?"
      ],
      objections: [
        {
          objection: "We already have endpoint security",
          response: "Endpoint security protects the device. Browser security protects the data inside the browser—where 90% of work happens today. They work together, not instead of each other."
        },
        {
          objection: "Our employees wouldn't leak data",
          response: "Most data leakage is accidental—wrong email recipient, cloud upload to personal account, copy/paste to wrong window. We prevent mistakes, not just malice."
        },
        {
          objection: "We don't have compliance requirements",
          response: "Yet. Cyber insurance, client contracts, and regulations are tightening. Building data controls now prevents scrambling later."
        }
      ],
      valueProof: [
        "Real-time visibility into data activity and web usage",
        "Mass download and clipboard theft prevention",
        "DNS-level blocking of malicious domains before connection",
        "Audit trails meet HIPAA, GDPR, and FTC Safeguards requirements",
        "Works alongside endpoint security for defense-in-depth"
      ]
    }
  },
  'compliance-reports': {
    title: "Compliance & Risk Reports",
    subtitle: "Audit-grade reporting and proof mapped to your framework",
    description: "Compliance & Risk Reports is where DE becomes audit-ready. We map our stack to your framework (HIPAA, GDPR, FTC Safeguards, CIS, Cyber-Insurance), retain evidence (training logs, access reviews, baselines, incident trails), and produce board-ready compliance posture reports.",
    features: [
      { title: "Framework Mapping", description: "Control mapping of DE stack to HIPAA, GDPR, FTC, CIS, and insurance control sets" },
      { title: "Evidence Retention", description: "Automated collection and storage of training logs, access reviews, configuration baselines, and incident trails" },
      { title: "Risk Scoring & Gap Tracking", description: "Continuous risk assessment with gap identification and remediation tracking" },
      { title: "Monthly Compliance Report", description: "Executive posture report showing compliance progress and remaining gaps" },
      { title: "Audit Packet on Demand", description: "Fast-turnaround compliance evidence packets for auditors and insurance carriers" },
      { title: "Board-Level Reporting", description: "Owner/board communication on compliance readiness and risk trends" }
    ],
    benefits: [
      "Pass audits with comprehensive documented evidence",
      "Faster audit cycles with pre-compiled packets",
      "Reduced audit costs and surprise findings",
      "Insurance premium justification and optimization",
      "Regulatory confidence: proactive, not reactive",
      "Clear roadmap to full compliance certification"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    recommendedTier: "enterprise" as const,
    salesPitchData: {
      corePitch: [
        "Audit-ready evidence on demand—not weeks of scrambling",
        "Framework mapping to HIPAA, GDPR, FTC, CIS, and cyber insurance",
        "Continuous risk scoring shows exactly where you stand",
        "Board-level reporting for owners and executives",
        "Fast-turnaround compliance packets for auditors and insurers"
      ],
      discoveryQuestions: [
        "How long does it take you to compile evidence for an audit?",
        "Do you have documented proof of all your security controls?",
        "What frameworks are you required to comply with? HIPAA? FTC Safeguards?",
        "How do you demonstrate compliance to cyber insurance carriers?",
        "Can you show an auditor your training logs, access reviews, and incident trails right now?"
      ],
      objections: [
        {
          objection: "We passed our last audit",
          response: "Great—but how much time and stress did it take? We make audits routine with pre-compiled evidence packets and continuous compliance monitoring."
        },
        {
          objection: "We don't have compliance requirements",
          response: "If you have cyber insurance, client contracts, or operate in healthcare/finance, you likely have requirements you don't know about. We'll help you find out."
        },
        {
          objection: "Compliance is too expensive",
          response: "Non-compliance is more expensive. Fines, insurance denials, and lost contracts cost far more than proactive compliance. We make it affordable."
        }
      ],
      valueProof: [
        "Evidence retention automated—training logs, access reviews, baselines",
        "Gap tracking shows exactly what's needed for full compliance",
        "Monthly posture reports for executive visibility",
        "Audit packets generated in hours, not weeks",
        "Framework mapping covers HIPAA, GDPR, FTC, CIS, and insurance requirements"
      ]
    }
  },
  'unified-security': {
    title: "Unified Security Posture",
    subtitle: "Comprehensive managed security—not a pile of tools",
    description: "Unified Security Posture is DE's highest security promise: identity, endpoint, cloud, email, network, and incident response fully integrated and continuously governed. Single pane of glass. One cohesive security strategy, not a collection of disconnected tools.",
    features: [
      { title: "IAM Spine + Zero Trust", description: "DE Prime identity with Zero Trust enforcement across all access" },
      { title: "Integrated Endpoint-Cloud-Email Security", description: "DE unified threat detection across all surfaces aligned to policy" },
      { title: "Security Awareness Tied to Risk", description: "Training + phishing simulations linked to actual threat trends and risk scores" },
      { title: "Backup/BCDR Linked to IR", description: "Recovery procedures integrated with incident response playbooks" },
      { title: "Drift Detection & Correction", description: "Continuous monitoring for configuration drift with automated correction" },
      { title: "Central Unified Reporting", description: "Single dashboard showing control health, human risk, incidents, and recovery readiness" }
    ],
    benefits: [
      "Single-pane security visibility across entire environment",
      "Faster incident detection and response",
      "Reduced 'blind spots' between tools",
      "Coordinated security strategy, not siloed tactics",
      "Measurable risk reduction over time",
      "Compliance readiness score when modules active"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600",
    recommendedTier: "enterprise" as const,
    salesPitchData: {
      corePitch: [
        "Single pane of glass—not a pile of disconnected security tools",
        "Identity, endpoint, cloud, email, and network security fully integrated",
        "Zero Trust enforcement across every access point",
        "Coordinated incident response with backup/recovery integration",
        "Measurable risk reduction with unified reporting"
      ],
      discoveryQuestions: [
        "How many different security tools and dashboards do you manage today?",
        "If an incident occurs, can you see the full picture across all systems?",
        "How do you ensure security policies are consistent across endpoints, cloud, and email?",
        "Is your incident response coordinated with your backup and recovery procedures?",
        "Can you measure your overall security posture improvement over time?"
      ],
      objections: [
        {
          objection: "We already have security tools",
          response: "Tools aren't strategy. We integrate your security layers into one cohesive system with unified visibility, consistent policies, and coordinated response."
        },
        {
          objection: "This seems like overkill for our size",
          response: "Attackers don't care about your size—they care about your vulnerabilities. Unified security is how enterprises stay protected; we make it accessible for SMBs."
        },
        {
          objection: "We can't rip and replace everything",
          response: "You don't have to. We integrate and orchestrate your existing tools while filling gaps. The goal is unified visibility and response, not wholesale replacement."
        }
      ],
      valueProof: [
        "Single dashboard showing control health, human risk, and incidents",
        "Drift detection catches and corrects configuration changes automatically",
        "Incident response playbooks integrated with backup/recovery procedures",
        "Compliance readiness score when compliance modules are active",
        "Coordinated security strategy replaces siloed tactical tools"
      ]
    }
  }
};

export const industryPageData = {
  'accounting-finance': {
    title: "IT Solutions for Accounting & Finance",
    subtitle: "PCI DSS compliance support and financial data protection",
    description: "Accounting and finance firms handle sensitive financial data and need secure, compliant IT systems that protect client information while meeting industry regulations.",
    features: [
      { title: "PCI DSS Compliance", description: "Meet payment card industry security standards" },
      { title: "Data Encryption", description: "Protect sensitive financial information" },
      { title: "Secure File Sharing", description: "Encrypted document sharing with clients" }
    ],
    benefits: [
      "Client data protection",
      "Audit-ready documentation",
      "Secure remote access",
      "Backup and recovery",
      "Cybersecurity insurance support"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  },
  'real-estate': {
    title: "IT Solutions for Real Estate",
    subtitle: "Transaction security solutions for real estate professionals",
    description: "Real estate professionals need secure systems to protect sensitive transaction data and client information from wire fraud and cyber threats.",
    features: [
      { title: "Wire Fraud Prevention", description: "Secure communication channels for financial transactions" },
      { title: "Document Security", description: "Encrypted storage and sharing of contracts and documents" },
      { title: "Mobile Security", description: "Secure access from any device, anywhere" }
    ],
    benefits: [
      "Protection from wire fraud",
      "Secure client communications",
      "Mobile device management",
      "RESPA compliance support",
      "Transaction monitoring"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  },
  'nonprofits': {
    title: "IT Solutions for Nonprofits",
    subtitle: "Cost-effective IT management for mission-driven organizations",
    description: "Nonprofit organizations need reliable, cost-effective IT solutions that maximize their limited budgets while protecting donor data and maintaining operational efficiency.",
    features: [
      { title: "Nonprofit Pricing", description: "Special pricing for 501(c)(3) organizations" },
      { title: "Donor Data Protection", description: "Secure donor information and payment processing" },
      { title: "Grant Compliance", description: "IT support for grant requirements and reporting" }
    ],
    benefits: [
      "Affordable managed IT",
      "Microsoft nonprofit grants",
      "Volunteer remote access",
      "Fundraising platform support",
      "Budget-friendly solutions"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  },
  'professional-services': {
    title: "IT Solutions for Professional Services",
    subtitle: "Secure client data and streamline operations",
    description: "Professional services firms—consultants, architects, engineers, and advisors—handle sensitive client data and intellectual property. Our tailored IT solutions protect confidential information while enabling seamless collaboration and mobile productivity.",
    features: [
      { title: "Client Data Protection", description: "Encrypt and secure sensitive client files and communications" },
      { title: "Secure Collaboration", description: "Enable team collaboration without compromising security" },
      { title: "Mobile Productivity", description: "Work securely from anywhere with managed devices" }
    ],
    benefits: [
      "Client confidentiality assured",
      "Secure remote access for field work",
      "Professional email and communication",
      "Document version control",
      "Compliance support for industry regulations"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  }
};

export const resourcePageData = {
  'blog': {
    title: "Blog & News",
    subtitle: "Latest security insights and IT best practices",
    description: "Stay informed with our latest articles on cybersecurity threats, IT best practices, and technology trends affecting Arizona businesses.",
    features: [
      { title: "Security Alerts", description: "Latest threat intelligence and security advisories" },
      { title: "Best Practices", description: "Expert guidance on IT and security management" },
      { title: "Industry News", description: "Technology trends and regulatory updates" }
    ],
    benefits: [
      "Weekly security updates",
      "Expert analysis",
      "Actionable insights",
      "Compliance updates",
      "Technology trends"
    ],
    gradientColors: "from-violet-700 via-purple-700 to-fuchsia-700"
  },
  'videos': {
    title: "Videos & Webinars",
    subtitle: "Educational content library",
    description: "Access our library of educational videos and webinars covering cybersecurity, compliance, and IT management topics.",
    features: [
      { title: "On-Demand Webinars", description: "Watch recorded webinars at your convenience" },
      { title: "How-To Videos", description: "Step-by-step guides for common IT tasks" },
      { title: "Expert Interviews", description: "Insights from cybersecurity and IT experts" }
    ],
    benefits: [
      "Free educational content",
      "CPE credits available",
      "Downloadable resources",
      "Expert presenters",
      "Quarterly live webinars"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  },
  'security-checklist': {
    title: "Security Checklist",
    subtitle: "Complete security assessment tool",
    description: "Use our comprehensive security checklist to assess your current cybersecurity posture and identify gaps in your protection.",
    features: [
      { title: "Comprehensive Assessment", description: "100+ security controls across all domains" },
      { title: "Risk Scoring", description: "Automated risk scoring based on your responses" },
      { title: "Recommendations", description: "Personalized recommendations for improvement" }
    ],
    benefits: [
      "Free security assessment",
      "Instant results",
      "Actionable recommendations",
      "Benchmark against peers",
      "Detailed report"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  },
  'datasheets': {
    title: "Datasheets & Documentation",
    subtitle: "Technical specifications and service details",
    description: "Access detailed datasheets and documentation for all our services, including technical specifications, pricing, and SLA details.",
    features: [
      { title: "Service Datasheets", description: "Detailed specifications for all services" },
      { title: "Technical Documentation", description: "Architecture and integration guides" },
      { title: "Compliance Docs", description: "SOC 2, HIPAA, and other compliance documentation" }
    ],
    benefits: [
      "Vendor evaluation resources",
      "RFP response materials",
      "Technical specifications",
      "Compliance evidence",
      "Integration guides"
    ],
    gradientColors: "from-violet-700 via-purple-700 to-fuchsia-700"
  }
};

export const supportPageData = {
  'remote-support': {
    title: "Remote Support",
    subtitle: "Get instant remote assistance from our technicians",
    description: "Need immediate help? Our remote support tools allow our technicians to securely access your computer and resolve issues quickly.",
    features: [
      { title: "Instant Access", description: "Connect with a technician in minutes" },
      { title: "Secure Connection", description: "Encrypted, audited remote sessions" },
      { title: "Screen Sharing", description: "Share your screen for faster troubleshooting" }
    ],
    benefits: [
      "No software installation required",
      "Works on any device",
      "Session recordings available",
      "Multi-monitor support",
      "File transfer capability"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  },
  'pay-invoice': {
    title: "Pay Invoice",
    subtitle: "Secure online payment portal",
    description: "Pay your invoices securely online with our encrypted payment portal. We accept all major credit cards and ACH transfers.",
    features: [
      { title: "Secure Payment Processing", description: "PCI-compliant payment processing" },
      { title: "Payment History", description: "View and download past invoices and receipts" },
      { title: "Auto-Pay Options", description: "Set up automatic monthly payments" }
    ],
    benefits: [
      "Credit card or ACH",
      "Instant payment confirmation",
      "Automatic receipts",
      "Payment history",
      "Secure portal access"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  },
  'knowledge-base': {
    title: "Knowledge Base",
    subtitle: "Self-service help articles and guides",
    description: "Find answers to common questions and access helpful guides in our comprehensive knowledge base.",
    features: [
      { title: "Searchable Articles", description: "Quickly find answers to your questions" },
      { title: "Step-by-Step Guides", description: "Detailed instructions with screenshots" },
      { title: "Video Tutorials", description: "Watch video walkthroughs of common tasks" }
    ],
    benefits: [
      "24/7 self-service",
      "Searchable content",
      "Regular updates",
      "Video tutorials",
      "Printable guides"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  },
  'system-status': {
    title: "System Status",
    subtitle: "Real-time service status and incident updates",
    description: "Check the current status of all our services and view any ongoing incidents or scheduled maintenance.",
    features: [
      { title: "Real-Time Status", description: "Live status of all services" },
      { title: "Incident History", description: "View past incidents and resolutions" },
      { title: "Status Notifications", description: "Subscribe to status updates via email or SMS" }
    ],
    benefits: [
      "Real-time monitoring",
      "Incident notifications",
      "Maintenance schedules",
      "Uptime reports",
      "SLA tracking"
    ],
    gradientColors: "from-violet-600 via-purple-600 to-fuchsia-600"
  }
};
