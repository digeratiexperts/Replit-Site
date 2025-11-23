export const servicePageData = {
  'office-package': {
    title: "Office Package",
    subtitle: "Complete IT ownership for small offices—security built in",
    description: "The Office Package is your complete IT solution for small offices (5-25 users) with no internal IT team. We own your day-to-day IT outcomes: helpdesk support, continuous maintenance, security baseline, backup, and vendor coordination. You get enterprise-level protection without the enterprise cost—all for one predictable monthly price.",
    features: [
      { title: "Managed Helpdesk & Support", description: "Zoho ticketing + remote/onsite support with response SLAs and vendor coordination" },
      { title: "Core Security Baseline", description: "Endpoint EDR (Coro), email security (Mimecast), MFA enforcement, and basic cloud security" },
      { title: "Identity & Access Management", description: "JumpCloud IAM, SSO, MFA, and automated provisioning/deprovisioning for users and apps" },
      { title: "Continuous Maintenance", description: "Proactive patching, hardening, updates, and least-privilege enforcement" },
      { title: "Cloud Backup & Recovery", description: "MSP360 backups with Wasabi storage, verified recovery testing, and restore readiness" },
      { title: "Documentation & Visibility", description: "Hudu inventory, network and SaaS app maps, and 'known good config' snapshots" }
    ],
    benefits: [
      "Predictable monthly costs with no surprises",
      "Zero internal IT staff required",
      "24/7 security baseline built into every plan",
      "Vendor coordination handled—no more vendor juggling",
      "Compliance optional: add modules only when needed",
      "Monthly service summaries and quarterly business reviews available"
    ],
    gradientColors: "from-blue-600 via-purple-600 to-indigo-600"
  },
  'managed-it-support': {
    title: "Managed IT Support",
    subtitle: "Fast, proactive help anchored to the DE stack",
    description: "Managed IT Support is not generic helpdesk—it's support built on our proven stack (JumpCloud, Coro, MSP360). We handle remote troubleshooting, endpoint remediation, user onboarding, SaaS provisioning, and device basics. Support for everything you've sold with DE; out-of-scope items are escalated or handled via education.",
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
    gradientColors: "from-indigo-600 via-blue-600 to-cyan-600"
  },
  'managed-workplace': {
    title: "Managed Workplace",
    subtitle: "End-to-end employee digital experience management",
    description: "Managed Workplace is your digital employee lifecycle engine. We manage identity, apps, devices, email, voice, and workflow automation—everything employees need to work productively and securely. New hires productive in one day, not a week. Your environment stays standardized, secure, and compliant.",
    features: [
      { title: "Identity Lifecycle Management", description: "JumpCloud cloud directory with SSO, MFA, conditional access, and automated provisioning to all SaaS" },
      { title: "Business App Management", description: "SaaS licensing (Pax8), app onboarding, role mapping, shadow IT discovery, and access reviews" },
      { title: "Email & Collaboration", description: "M365 or Google Workspace admin, Teams/Drive structure, message hygiene, and retention policies" },
      { title: "Voice & Unified Communications", description: "Teams Voice, Zoom UCaaS, or VoIP integration; conference room provisioning and device enrollment" },
      { title: "Device & Mobile Management", description: "Windows/macOS baseline policies via JumpCloud; MDM for iOS/Android (Jamf integration available)" },
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
    gradientColors: "from-emerald-600 via-teal-600 to-cyan-600"
  },
  'cloud-backup': {
    title: "Cloud Backup",
    subtitle: "Baseline data protection with verified recovery",
    description: "Cloud Backup is your minimum continuity layer. Automated encryption-at-rest and in-transit protection for endpoints, servers, and cloud data (M365/Google). We verify monthly that restores actually work—because a backup that doesn't restore is worthless.",
    features: [
      { title: "Automated Encrypted Backups", description: "MSP360 continuous backup of endpoints, servers, and M365/Google data with AES-256 encryption" },
      { title: "Backup Health Monitoring", description: "Automated monitoring with alerts when backup jobs fail or fall behind" },
      { title: "Verified Restore Testing", description: "Monthly restore verification to confirm backups are recoverable and complete" },
      { title: "Wasabi Cloud Storage", description: "Cost-effective, secure cloud storage with 11 nines durability guarantee" },
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
    gradientColors: "from-blue-600 via-cyan-600 to-teal-600"
  },
  'security-awareness': {
    title: "Security Awareness Training",
    subtitle: "Turn staff into a security layer, not a liability",
    description: "Security Awareness is human-risk hardening. Your employees are your first line of defense—or your biggest vulnerability. We train, test, and coach your team so people stop being the weakest link. Phishing simulations, targeted campaigns, and ongoing coaching reduce incidents and change culture.",
    features: [
      { title: "Video Training Campaigns", description: "Ninjio-based lessons on phishing, malware, data handling, and real threats your org faces" },
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
    gradientColors: "from-amber-600 via-orange-600 to-red-600"
  },
  'co-managed-it': {
    title: "Co-Managed IT",
    subtitle: "Augment your internal IT team with DE expertise and stack",
    description: "Already have internal IT? Co-Managed IT partners with your team to fill skill gaps, provide 24/7 coverage, and add specialized muscle. You keep control; we provide stack, automation, security maturity, and Tier 2/3 escalation. Avoid burnout and tap into deep expertise.",
    features: [
      { title: "Shared Tooling Platform", description: "Access to JumpCloud, Coro, MSP360, and full visibility into your environment" },
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
    gradientColors: "from-purple-700 via-violet-700 to-indigo-700"
  },
  'threat-detection': {
    title: "Threat Detection & Response",
    subtitle: "24/7 security monitoring and real incident response",
    description: "Threat Detection & Response is detection + triage + containment + guided recovery. We monitor endpoints, cloud apps, email, and network events 24/7 for threats. When we see something, we investigate, contain (isolate endpoints, reset credentials), and walk you through recovery. Not just alerts—real response.",
    features: [
      { title: "24/7 Telemetry Monitoring", description: "Real-time monitoring of endpoints, cloud apps, email, and gateway security events" },
      { title: "Advanced Endpoint Detection", description: "Coro.net EDR detects suspicious behavior, lateral movement, and advanced techniques" },
      { title: "Automated Containment", description: "Safe automated actions like endpoint isolation, credential reset, and session termination" },
      { title: "Incident Runbooks", description: "Documented response playbooks maintained in Hudu, customized to your environment" },
      { title: "Monthly Threat Reports", description: "Trend analysis, incident summaries, and 'mean time to contain' metrics" },
      { title: "Wazuh SIEM Integration", description: "Deeper log correlation and retention for complex organizations" }
    ],
    benefits: [
      "Real-time threat detection 24/7/365",
      "Minutes-to-respond incident response",
      "Automated containment stops spread in seconds",
      "Forensic investigation and root cause analysis",
      "Compliance-ready incident documentation",
      "24/7 detection + real response, not 'good luck with alerts'"
    ],
    gradientColors: "from-red-700 via-rose-700 to-pink-700"
  },
  'security-operations': {
    title: "Security Operations (SOC-as-a-Service)",
    subtitle: "Full SOC without hiring a SOC team",
    description: "Security Operations is Threat Detection & Response plus threat hunting, policy tuning, and continuous optimization. We run the security room. Includes detection, triage, response, plus proactive hunting, policy refinement, log correlation, and longer retention. Enterprise-grade security maturity.",
    features: [
      { title: "Threat Hunting Cycles", description: "Proactive investigation for advanced threats, unusual patterns, and insider risk" },
      { title: "Policy Tuning & Optimization", description: "Continuous refinement of EDR, email, cloud, and access control policies based on threats and trends" },
      { title: "Log Correlation & Analytics", description: "Wazuh SIEM with deeper telemetry retention for pattern detection and forensics" },
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
    gradientColors: "from-purple-600 via-indigo-600 to-blue-600"
  },
  'backup-disaster-recovery': {
    title: "Backup & Disaster Recovery (BCDR)",
    subtitle: "Tested recovery with guaranteed targets—business won't stay down",
    description: "BCDR is guaranteed continuity, not just 'we have backups.' Agreed RPO/RTO targets, image-based backups, scheduled restore tests, and DR runbooks. Your business comes back up on a timeline you define—not when backups finally work.",
    features: [
      { title: "Guaranteed RTO/RTO Targets", description: "Committed recovery time and data-loss objectives with SLA backing" },
      { title: "Image-Based Backups", description: "MSP360 Server/VM features for full-system restore, not file-by-file recovery" },
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
    gradientColors: "from-cyan-600 via-blue-600 to-indigo-600"
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
    gradientColors: "from-emerald-600 via-green-600 to-teal-600"
  },
  'data-encryption': {
    title: "Data Encryption & Control",
    subtitle: "Stop data leakage and risky browsing at the source",
    description: "Data Encryption & Control uses browser-layer security (Atakama) to protect data even if endpoints are compromised. DLP policies, anti-phishing, DNS filtering, and secure browsing controls at the gateway. Data governance happens inside the browser—the last place hackers look.",
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
    gradientColors: "from-indigo-600 via-blue-600 to-cyan-600"
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
    gradientColors: "from-purple-600 via-violet-600 to-indigo-600"
  },
  'unified-security': {
    title: "Unified Security Posture",
    subtitle: "Comprehensive managed security—not a pile of tools",
    description: "Unified Security Posture is DE's highest security promise: identity, endpoint, cloud, email, network, and incident response fully integrated and continuously governed. Single pane of glass. One cohesive security strategy, not a collection of disconnected tools.",
    features: [
      { title: "IAM Spine + Zero Trust", description: "JumpCloud Prime identity with Zero Trust enforcement across all access" },
      { title: "Integrated Endpoint-Cloud-Email Security", description: "Coro.net unified threat detection across all surfaces aligned to policy" },
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
    gradientColors: "from-red-600 via-pink-600 to-rose-600"
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
    gradientColors: "from-green-700 via-emerald-700 to-teal-700"
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
    gradientColors: "from-indigo-700 via-blue-700 to-cyan-700"
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
    gradientColors: "from-purple-600 via-fuchsia-600 to-pink-600"
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
    gradientColors: "from-slate-700 via-gray-700 to-zinc-700"
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
    gradientColors: "from-red-600 via-orange-600 to-amber-600"
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
    gradientColors: "from-gray-600 via-slate-600 to-zinc-600"
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
    gradientColors: "from-blue-600 via-indigo-600 to-violet-600"
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
    gradientColors: "from-green-600 via-emerald-600 to-teal-600"
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
    gradientColors: "from-cyan-600 via-sky-600 to-blue-600"
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
    gradientColors: "from-emerald-600 via-green-600 to-lime-600"
  }
};
