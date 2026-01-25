import { useState, Fragment } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown, Check, Clock, RefreshCw, Archive, Timer, Shuffle, Rocket, Calendar, Handshake, TrendingUp, Plus } from "lucide-react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  priceUnit: string;
  minimum?: string;
  siteBase?: string;
  featured?: boolean;
  outcome?: string;
  provisioningFees?: { name: string; badge?: string; fee: string; note?: string }[];
  techtime?: string;
  included: string[];
  addons?: string[];
}

interface PricingTier {
  id: string;
  name: string;
  icon: string;
  meta: string;
  description: string;
  plans: PricingPlan[];
}

const pricingTiers: PricingTier[] = [
  {
    id: "essentials",
    name: "IT Essentials",
    icon: "📋",
    meta: "1-3 users • Foundation monitoring",
    description: "1–3 user shops that want visibility, patching, and baseline protection without a full stack.",
    plans: [
      {
        name: "DE Essentials Monitoring",
        description: "Baseline visibility & protection for micro-businesses",
        price: "$500",
        priceUnit: "/site/month",
        minimum: "Flat rate for 1-3 users",
        techtime: "30 min / month",
        included: [
          "Monitoring agents on covered systems",
          "Automatic patching & updates",
          "Security alerts (malware, risky activity)",
          "Basic XDR for up to 3 devices",
          "Monthly health reports",
          "Unlimited support for DE-managed services"
        ]
      }
    ]
  },
  {
    id: "office",
    name: "Office Ecosystem",
    icon: "🏢",
    meta: "1-6 users • Startups & small offices",
    description: "Small teams that need real protection + backup + guidance, with a flexible buildout path.",
    plans: [
      {
        name: "Custom Buildout",
        description: "Real security, backup & guidance — choose your add-on",
        price: "$750",
        priceUnit: "/month minimum",
        siteBase: "Plus $125/user/month",
        minimum: "Formula: $750/site + $125 × users",
        techtime: "10 min/user + 30 min/co",
        provisioningFees: [
          { name: "Microsoft Native", badge: "Premium", fee: "$1,250/site + $50/user", note: "Entra + Intune + Autopilot, tenant hardening" },
          { name: "Cross-Platform", badge: "Cost-Saver", fee: "$500/site + $25/user", note: "JumpCloud + Atakama" }
        ],
        included: [
          "Core Platform (Choose One): Microsoft Native OR Cross-Platform",
          "Endpoint Security (anti-malware, DNS)",
          "Backup Foundation (workstation files)",
          "Security Awareness Training",
          "Business-hours helpdesk",
          "Monthly reviews",
          "Choose ONE premium add-on"
        ],
        addons: [
          "MDR (24/7 monitoring)",
          "Passwordless authentication",
          "Business Continuity",
          "Cloud Gateway (SASE)"
        ]
      }
    ]
  },
  {
    id: "business",
    name: "Business Ecosystem",
    icon: "📈",
    meta: "5-50 users • Growing teams",
    description: "Growing teams who want security-by-default, less downtime, and no vendor chaos.",
    plans: [
      {
        name: "Managed Security & Continuity",
        description: "Secure-by-default for cloud-first teams",
        price: "$240",
        priceUnit: "/user/month",
        minimum: "Min $1,200/mo (5 users)",
        featured: true,
        outcome: "Prevent breaches, reduce downtime, standardize your environment so support gets faster.",
        techtime: "20 min/user + 45 min/co",
        provisioningFees: [
          { name: "Microsoft Native (default)", fee: "$1,250/site + $50/user", note: "Standardized security + device mgmt" },
          { name: "Cross-Platform", badge: "Cost-Saver", fee: "$500/site + $25/user" }
        ],
        included: [
          "CloudShield SASE — identity-aware access",
          "Identity & Access (MFA/SSO)",
          "Advanced Endpoint (XDR + 24/7 MDR)",
          "Email Security (anti-phish, DLP)",
          "Business Continuity (instant failover)",
          "Training & phishing simulations",
          "Passwordless data protection",
          "Unlimited helpdesk",
          "Quarterly DR validation"
        ]
      },
      {
        name: "Network Integration",
        description: "Security modernization for existing hardware",
        price: "$250",
        priceUnit: "/user/month",
        siteBase: "+ $2,500/site (one-time)",
        minimum: "Min 10 users",
        techtime: "20 min/user + 45 min/co",
        included: [
          "Everything in Managed Security",
          "SASE overlay (no rip-and-replace)",
          "Legacy HW support (Meraki, Cisco, SonicWall, UniFi)",
          "Remote access control & segmentation",
          "Network diagrams & documentation",
          "Lifecycle planning"
        ]
      }
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise Ecosystem",
    icon: "🏛️",
    meta: "10-200+ users • Regulated industries",
    description: "Regulated orgs who need compliance operations, executive reporting, and serious incident readiness.",
    plans: [
      {
        name: "Managed Compliance (Zero-Trust)",
        description: "Compliance-driven ops with executive reporting",
        price: "$350",
        priceUnit: "/user/month",
        minimum: "Min $3,500/mo (10 users)",
        outcome: "Audit-ready controls, measurable risk reduction, leadership-level reporting insurers respect.",
        techtime: "2 hrs/user + 3 hrs/co",
        provisioningFees: [
          { name: "Microsoft Native (default)", fee: "$1,250/site + $50/user", note: "Policy, auditing, compliance mapping" },
          { name: "Cross-Platform", badge: "Cost-Saver", fee: "$500/site + $25/user" }
        ],
        included: [
          "Everything in Network Integration",
          "HIPAA, GDPR, FTC Safeguards alignment",
          "vCISO services & board reporting",
          "Annual penetration test & remediation",
          "Live SOC reporting & forensic logging",
          "Defined incident response",
          "DLP enforcement & vendor review",
          "Insurance documentation",
          "24/7 support"
        ]
      },
      {
        name: "Enterprise & Multi-Site",
        description: "Flexible governance for large organizations",
        price: "Custom",
        priceUnit: "Quote",
        minimum: "Based on users, sites, requirements",
        techtime: "Custom allocation",
        included: [
          "Centralized policy across locations",
          "24/7 SOC with named contacts",
          "Network design & rollout",
          "Multi-region DR & warm-site options",
          "Roadmap & lifecycle planning",
          "Priority escalation handling",
          "Custom frameworks (FINRA, CMMC, PCI, NIST)"
        ]
      }
    ]
  }
];

const includedSupport = [
  "All DE-provided hardware & software",
  "Managed security stack support",
  "Identity & access issues",
  "Backup & recovery assistance",
  "Network & connectivity (managed)",
  "Endpoint troubleshooting",
  "Security incident response",
  "Quarterly reviews & reporting"
];

const techtimeUses = [
  "Non-DE software troubleshooting",
  "Legacy system support",
  "Special projects & migrations",
  "Custom configuration work",
  "Training sessions & workshops",
  "Hardware procurement assistance",
  "Vendor coordination",
  "After-hours requests (2× rate)"
];

const techtimeAllocation = [
  { tier: "essentials", label: "Essentials", perUser: "—", perCompany: "30 min", example: "30 min/mo" },
  { tier: "office", label: "Office", perUser: "10 min", perCompany: "30 min", example: "3 hrs/mo" },
  { tier: "business", label: "Business", perUser: "20 min", perCompany: "45 min", example: "5.75 hrs/mo" },
  { tier: "enterprise", label: "Enterprise", perUser: "2 hrs", perCompany: "3 hrs", example: "33 hrs/mo" }
];

const bankingRules = [
  { icon: RefreshCw, title: "Rollover", value: "Quarterly", note: "Hours roll forward" },
  { icon: Archive, title: "Max Bank", value: "3× Monthly", note: "Prevents hoarding" },
  { icon: Timer, title: "Expiration", value: "6 Months", note: "If untouched" },
  { icon: Shuffle, title: "Transferable", value: "Yes", note: "Between users" }
];

const bonusTechtime = [
  { icon: Rocket, title: "Onboarding", value: "+2 hrs" },
  { icon: Calendar, title: "Annual Contract", value: "+10%/mo" },
  { icon: Handshake, title: "Referral", value: "+2 hrs" },
  { icon: TrendingUp, title: "Tier Upgrade", value: "+1 hr" }
];

const componentMatrix = [
  { category: "Support & TechTime", items: [
    { name: "DE Services Support", essentials: "✓ Free", office: "✓ Free", business: "✓ Free", enterprise: "✓ Free" },
    { name: "TechTime (non-DE)", essentials: "30 min/mo", office: "10m/u+30m", business: "20m/u+45m", enterprise: "2h/u+3h", techtime: true },
    { name: "Helpdesk Availability", essentials: "Business Hours", office: "Business Hours", business: "Business Hours", enterprise: "24/7" }
  ]},
  { category: "DE Workplace", items: [
    { name: "Microsoft Native", essentials: "—", office: "✓", business: "Default", enterprise: "Default" },
    { name: "Cross-Platform", essentials: "—", office: "✓", business: "Option", enterprise: "Option" },
    { name: "MFA", essentials: "—", office: "✓", business: "✓", enterprise: "✓" },
    { name: "Device Management", essentials: "—", office: "✓", business: "✓", enterprise: "✓" },
    { name: "Passwordless", essentials: "—", office: "Add-on", business: "✓", enterprise: "✓" }
  ]},
  { category: "Cyber Security", items: [
    { name: "Endpoint XDR", essentials: "Basic", office: "✓", business: "✓", enterprise: "✓" },
    { name: "24/7 MDR", essentials: "—", office: "Add-on", business: "✓", enterprise: "✓" },
    { name: "Email Security", essentials: "—", office: "✓", business: "✓", enterprise: "✓" },
    { name: "Security Training", essentials: "—", office: "✓", business: "✓", enterprise: "✓" }
  ]},
  { category: "Infrastructure", items: [
    { name: "SASE / ZTNA", essentials: "—", office: "Add-on", business: "✓", enterprise: "✓" },
    { name: "Network Integration", essentials: "—", office: "—", business: "+$2,500", enterprise: "✓" }
  ]},
  { category: "Backup & DR", items: [
    { name: "SaaS Backup", essentials: "—", office: "✓", business: "✓", enterprise: "✓" },
    { name: "Business Continuity", essentials: "—", office: "Add-on", business: "✓", enterprise: "✓" },
    { name: "DR Validation", essentials: "—", office: "—", business: "✓", enterprise: "✓" }
  ]},
  { category: "Compliance", items: [
    { name: "Compliance Alignment", essentials: "—", office: "—", business: "—", enterprise: "✓" },
    { name: "vCISO Services", essentials: "—", office: "—", business: "—", enterprise: "✓" },
    { name: "Penetration Test", essentials: "—", office: "—", business: "—", enterprise: "✓" }
  ]}
];

const quickPricingExamples = [
  { label: "6-user Office", items: [
    { name: "Monthly:", value: "$750 + (6×$125) = $1,500/mo", highlight: true },
    { name: "MS Native:", value: "$1,250 + (6×$50) = $1,550" },
    { name: "Cost-Saver:", value: "$500 + (6×$25) = $650" }
  ]},
  { label: "15-user Business", items: [
    { name: "Monthly:", value: "15 × $240 = $3,600/mo", highlight: true },
    { name: "MS Native:", value: "$1,250 + (15×$50) = $2,000" },
    { name: "TechTime:", value: "(15×20)+45 = 5.75 hrs/mo", techtime: true }
  ]},
  { label: "30-user Enterprise (2 sites)", items: [
    { name: "Monthly:", value: "30 × $350 = $10,500/mo", highlight: true },
    { name: "MS Native:", value: "(2×$1,250) + (30×$50) = $4,000" },
    { name: "TechTime:", value: "(30×2hr)+(2×3hr) = 66 hrs/mo", techtime: true }
  ]},
  { label: "Per-User Effective Rate", items: [
    { name: "Essentials", value: "~$167/user (at 3)" },
    { name: "Office", value: "$750/site min + $125/u" },
    { name: "Business", value: "$240–250/user" },
    { name: "Enterprise", value: "$350/user" }
  ]}
];

const faqs = [
  { q: 'What counts as "DE-managed" support?', a: "Anything we deploy, license, configure, or officially include in your package is DE-managed and supported unlimited. Third-party software, legacy gear, or special projects use TechTime." },
  { q: "What happens when TechTime runs out?", a: "You can (1) approve hourly billing, (2) upgrade tiers for more TechTime, or (3) move that workload into something DE manages. Goal: stabilize your environment." },
  { q: "Can we switch lanes later?", a: 'Yes. We can migrate lanes when it makes business sense. The only rule: we don\'t run two "bosses" on the same endpoints - we standardize to keep security + support clean.' },
  { q: "What does onboarding look like?", a: "Discovery, baseline hardening, identity + device enrollment, security stack deployment, backup validation, documentation and first review. End with clear policies, reliable recovery, clean support lanes." },
  { q: "Where do SASE and custom items belong?", a: "Business includes SASE/ZTNA by default. Office can add SASE as premium add-on. If needs don't fit cleanly, the Custom Buildout path is where we design the right stack." }
];

export default function PricingTiers() {
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set(["business"]));
  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(new Set());

  const toggleTier = (id: string) => {
    setExpandedTiers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaqs(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const scrollToTier = (id: string) => {
    const element = document.getElementById(`tier-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setExpandedTiers(prev => new Set([...prev, id]));
    }
  };

  const getTierColors = (id: string) => {
    switch (id) {
      case "essentials":
        return { text: "text-gray-400", bg: "bg-gray-500", border: "border-gray-400/30" };
      case "office":
        return { text: "text-violet-400", bg: "bg-violet-500", border: "border-violet-400/30" };
      case "business":
        return { text: "text-violet-300", bg: "bg-violet-600", border: "border-violet-300/30" };
      case "enterprise":
        return { text: "text-fuchsia-400", bg: "bg-fuchsia-500", border: "border-fuchsia-400/30" };
      default:
        return { text: "text-violet-400", bg: "bg-violet-500", border: "border-violet-400/30" };
    }
  };

  const getCellStyle = (value: string) => {
    if (value === "✓" || value === "✓ Free" || value === "24/7") return "text-violet-300 font-semibold";
    if (value === "Default") return "bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-xs font-semibold";
    if (value === "Option") return "bg-white/10 text-white/60 px-2 py-0.5 rounded text-xs";
    if (value === "Add-on") return "bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs font-semibold";
    if (value === "Basic" || value === "Business Hours") return "bg-violet-500/10 text-violet-300 px-2 py-0.5 rounded text-xs";
    if (value.includes("+$")) return "bg-violet-500/10 text-violet-300 px-2 py-0.5 rounded text-xs";
    if (value === "—") return "text-white/30";
    return "text-white/70";
  };

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <Helmet>
        <title>ProActive Ecosystem — Pricing Tiers | Internal Reference | Digerati Experts</title>
        <meta name="description" content="Internal reference for tiered service packages built for your business stage. IT Essentials, Office, Business, and Enterprise ecosystems with clear pricing." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-purple-900/5" />
      </div>

      <header className="border-b border-white/10 bg-[#0a0a12]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/internal/sales-process" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Sales Process
          </Link>
          <img src={logoImage} alt="Digerati Experts" className="h-8" />
        </div>
      </header>

      <section className="py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-white/70">Chandler, AZ — Serving Phoenix Metro</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="heading-pricing-tiers">
              ProActive Ecosystem
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Tiered IT & security packages engineered for your business stage. Pick a tier, choose a lane, and we standardize + protect your environment.
            </p>
          </div>

          {/* Top Note */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-fuchsia-600/10 to-purple-600/5 border border-fuchsia-400/20 rounded-2xl p-6 mb-10">
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-fuchsia-400">Provisioning & Hardening:</strong> Microsoft-native environments include deeper security baselines (tenant hardening, device enrollment, policy enforcement, auditing). That work is priced up front as a <strong className="text-white">Microsoft Native Security Baseline Fee</strong>. Budget-focused clients can choose the <strong className="text-white">Cross-Platform Directory Suite</strong> <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-300 ml-1">Cost-Saver</span> across all tiers.
            </p>
            <p className="text-white/50 text-sm mt-3">
              <strong className="text-white/70">Note:</strong> Microsoft licensing (M365/Entra/Intune SKUs) is billed separately unless explicitly bundled.
            </p>
          </div>

          {/* Tier Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {pricingTiers.map((tier) => {
              const colors = getTierColors(tier.id);
              return (
                <button
                  key={tier.id}
                  onClick={() => scrollToTier(tier.id)}
                  className={`px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-all hover:-translate-y-0.5 shadow-lg ${colors.bg}`}
                  data-testid={`badge-tier-${tier.id}`}
                >
                  {tier.name}
                </button>
              );
            })}
          </div>

          {/* TechTime Section */}
          <div className="bg-gradient-to-br from-violet-600/10 to-purple-800/5 border border-violet-400/20 rounded-2xl p-8 mb-10" data-testid="section-techtime">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-violet-400 mb-2 flex items-center justify-center gap-2">
                <Clock className="w-6 h-6" />
                TechTime Rewards
              </h2>
              <p className="text-white/70">Banked hours for work beyond your managed services — included with every tier</p>
              <p className="text-white/50 text-sm mt-2 max-w-xl mx-auto">
                <strong className="text-white">DE-managed support is always unlimited.</strong> TechTime is only for non-DE work (third-party apps, legacy systems, special projects).
              </p>
            </div>

            {/* Support Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-violet-400/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-violet-400">Included Support</h3>
                    <p className="text-xs text-white/50">Free & unlimited for everything we manage</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {includedSupport.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/70 border-b border-white/5 pb-2 last:border-0">
                      <Check className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-purple-400/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-400">TechTime Hours</h3>
                    <p className="text-xs text-white/50">Use your banked hours for everything else</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {techtimeUses.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/70 border-b border-white/5 pb-2 last:border-0">
                      <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Allocation Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-purple-400 mb-4 flex items-center gap-2">
                <span>📊</span> TechTime Allocation by Tier
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left px-4 py-3 text-white/60 font-semibold">Tier</th>
                      <th className="text-center px-4 py-3 text-white/60 font-semibold">Per User / Month</th>
                      <th className="text-center px-4 py-3 text-white/60 font-semibold">Per Company / Month</th>
                      <th className="text-center px-4 py-3 text-white/60 font-semibold">Example: 15 Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    {techtimeAllocation.map((row) => {
                      const colors = getTierColors(row.tier);
                      return (
                        <tr key={row.tier} className="border-t border-white/5 hover:bg-white/5">
                          <td className="px-4 py-3">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colors.bg} text-white`}>
                              {row.label}
                            </span>
                          </td>
                          <td className="text-center px-4 py-3 text-white/70">{row.perUser}</td>
                          <td className="text-center px-4 py-3 text-white/70">{row.perCompany}</td>
                          <td className="text-center px-4 py-3 text-purple-400 font-bold">{row.example}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Banking Rules */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-purple-400 mb-4 flex items-center gap-2">
                <span>🏦</span> Banking & Rollover Rules
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {bankingRules.map((rule, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-purple-400/30 transition-colors">
                    <rule.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-xs text-purple-400 font-semibold uppercase mb-1">{rule.title}</p>
                    <p className="text-lg font-bold text-white">{rule.value}</p>
                    <p className="text-xs text-white/50 mt-1">{rule.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonus TechTime */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
                <span>🎁</span> Bonus TechTime
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {bonusTechtime.map((bonus, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-fuchsia-600/10 to-purple-600/5 border border-fuchsia-400/20 rounded-xl p-4 text-center hover:border-fuchsia-400/40 transition-colors">
                    <bonus.icon className="w-6 h-6 text-fuchsia-400 mx-auto mb-2" />
                    <p className="text-xs text-fuchsia-400 font-semibold uppercase mb-1">{bonus.title}</p>
                    <p className="text-lg font-bold text-white">{bonus.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="space-y-8 mb-10">
            {pricingTiers.map((tier) => {
              const colors = getTierColors(tier.id);
              return (
                <div
                  key={tier.id}
                  id={`tier-${tier.id}`}
                  className={`bg-white/[0.02] border ${colors.border} rounded-2xl overflow-hidden scroll-mt-24`}
                  data-testid={`tier-section-${tier.id}`}
                >
                  <div className={`h-1 ${colors.bg}`} />
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                    onClick={() => toggleTier(tier.id)}
                    data-testid={`tier-toggle-${tier.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                        {tier.icon}
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${colors.text}`}>{tier.name}</h2>
                        <p className="text-sm text-white/50">{tier.meta}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 ${colors.text} transition-transform ${expandedTiers.has(tier.id) ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedTiers.has(tier.id) && (
                    <div className="px-6 pb-6 border-t border-white/10">
                      <p className="text-white/60 py-4">
                        <strong className="text-white">Best for:</strong> {tier.description}
                      </p>
                      <div className={`grid gap-6 ${tier.plans.length > 1 ? 'md:grid-cols-2' : 'max-w-xl'}`}>
                        {tier.plans.map((plan, planIdx) => (
                          <div
                            key={planIdx}
                            className={`bg-white/[0.03] border ${plan.featured ? 'border-violet-400/40 bg-violet-500/5' : 'border-white/10'} rounded-xl p-6 relative`}
                            data-testid={`plan-card-${tier.id}-${planIdx}`}
                          >
                            {plan.featured && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full text-xs font-bold text-white shadow-lg">
                                MOST POPULAR
                              </div>
                            )}
                            <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                            <p className="text-sm text-white/50 mb-4">{plan.description}</p>

                            <div className="bg-white/5 rounded-xl p-5 mb-4 text-center border border-white/10">
                              <div className={`text-3xl font-bold ${colors.text}`}>{plan.price}</div>
                              <div className="text-sm text-white/50">{plan.priceUnit}</div>
                              {plan.siteBase && <div className="text-sm text-white/40 mt-1">{plan.siteBase}</div>}
                              {plan.minimum && <div className="text-sm text-fuchsia-400 font-medium mt-2">{plan.minimum}</div>}
                            </div>

                            {plan.outcome && (
                              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 text-sm text-white/70">
                                <strong className="text-violet-400">Outcome:</strong> {plan.outcome}
                              </div>
                            )}

                            {plan.provisioningFees && (
                              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between mb-3 text-sm">
                                  <span className="text-white font-semibold">Platform Provisioning (one-time)</span>
                                  <span className="text-white/50 text-xs">Choose one lane</span>
                                </div>
                                {plan.provisioningFees.map((fee, fIdx) => (
                                  <div key={fIdx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 text-sm">
                                    <div>
                                      <span className="text-white/70">{fee.name}</span>
                                      {fee.badge && (
                                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${fee.badge === 'Premium' ? 'bg-fuchsia-500 text-white' : 'bg-gray-500/30 text-gray-300'}`}>
                                          {fee.badge}
                                        </span>
                                      )}
                                      {fee.note && <p className="text-xs text-white/40 mt-0.5">{fee.note}</p>}
                                    </div>
                                    <span className="text-white font-semibold">{fee.fee}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {plan.techtime && (
                              <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg p-4 mb-4 flex items-center gap-3">
                                <Clock className="w-6 h-6 text-white" />
                                <div>
                                  <p className="text-xs uppercase tracking-wide text-white/80">TechTime Included</p>
                                  <p className="font-bold text-white">{plan.techtime}</p>
                                </div>
                              </div>
                            )}

                            <div className="mb-4">
                              <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3 border-b border-white/10 pb-2">What's Included</h4>
                              <ul className="space-y-2">
                                {plan.included.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                                    <Check className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {plan.addons && (
                              <div className="pt-4 border-t border-white/10">
                                <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">Premium Add-ons (Choose 1)</h4>
                                <ul className="space-y-2">
                                  {plan.addons.map((addon, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-white/70">
                                      <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs font-semibold">OPTION</span>
                                      {addon}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Component Matrix */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-10 overflow-hidden" data-testid="section-matrix">
            <h2 className="text-xl font-bold text-violet-400 text-center mb-4">Package Components by Tier</h2>
            <div className="max-w-3xl mx-auto bg-violet-500/10 border border-violet-400/20 rounded-xl p-4 mb-6 text-center text-sm text-white/70">
              <strong className="text-violet-400">Core Platform is lane-based.</strong> Every tier supports two lanes: <strong className="text-white">Microsoft Native</strong> (default in Business/Enterprise) or <strong className="text-white">Cross-Platform Directory Suite</strong> <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-300 ml-1">Cost-Saver</span>. Choose one lane per environment.
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-4 py-3 text-white/60 font-semibold min-w-[180px]">Component</th>
                    <th className="text-center px-4 py-3 text-gray-400 font-semibold">Essentials<br/><span className="text-xs font-normal">$500/site</span></th>
                    <th className="text-center px-4 py-3 text-violet-400 font-semibold">Office<br/><span className="text-xs font-normal">$750 min + $125/u</span></th>
                    <th className="text-center px-4 py-3 text-violet-300 font-semibold">Business<br/><span className="text-xs font-normal">$240/user</span></th>
                    <th className="text-center px-4 py-3 text-fuchsia-400 font-semibold">Enterprise<br/><span className="text-xs font-normal">$350/user</span></th>
                  </tr>
                </thead>
                <tbody>
                  {componentMatrix.map((cat, catIdx) => (
                    <Fragment key={`cat-${catIdx}`}>
                      <tr className="bg-gradient-to-r from-violet-500/10 to-purple-500/5">
                        <td colSpan={5} className="px-4 py-2 text-xs font-bold text-violet-400 uppercase tracking-wider">{cat.category}</td>
                      </tr>
                      {cat.items.map((item, itemIdx) => (
                        <tr key={`item-${catIdx}-${itemIdx}`} className="border-t border-white/5 hover:bg-white/5">
                          <td className="px-4 py-2.5 text-white font-medium">{item.name}</td>
                          <td className="text-center px-4 py-2.5">
                            <span className={getCellStyle(item.essentials)}>{item.essentials}</span>
                          </td>
                          <td className="text-center px-4 py-2.5">
                            <span className={getCellStyle(item.office)}>{item.office}</span>
                          </td>
                          <td className="text-center px-4 py-2.5">
                            <span className={getCellStyle(item.business)}>{item.business}</span>
                          </td>
                          <td className="text-center px-4 py-2.5">
                            <span className={getCellStyle(item.enterprise)}>{item.enterprise}</span>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Pricing Reference */}
          <div className="bg-gradient-to-br from-violet-600/10 to-purple-800/5 border border-violet-400/20 rounded-2xl p-8 mb-10" data-testid="section-quick-pricing">
            <h2 className="text-xl font-bold text-violet-400 text-center mb-6 flex items-center justify-center gap-2">
              <span>📊</span> Quick Pricing Reference
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickPricingExamples.map((example, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-violet-400/30 transition-colors">
                  <h3 className="font-bold text-white mb-4">{example.label}</h3>
                  <div className="space-y-2 text-sm">
                    {example.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex justify-between">
                        <span className={item.techtime ? 'text-purple-400' : 'text-white/60'}>{item.name}</span>
                        <span className={item.highlight ? 'text-violet-400 font-bold' : item.techtime ? 'text-purple-400 font-semibold' : 'text-white/70'}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-10" data-testid="section-faq">
            <h2 className="text-xl font-bold text-violet-400 text-center mb-6">FAQ — How DE Packages Work</h2>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                    onClick={() => toggleFaq(idx)}
                    data-testid={`faq-toggle-${idx}`}
                  >
                    <span className="font-semibold text-white pr-4">{faq.q}</span>
                    <Plus className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform ${expandedFaqs.has(idx) ? 'rotate-45' : ''}`} />
                  </button>
                  {expandedFaqs.has(idx) && (
                    <div className="px-5 pb-5 text-white/70 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-violet-600/15 to-purple-600/10 border border-violet-400/25 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get a best-fit quote in 10 minutes</h3>
            <p className="text-white/60 max-w-2xl mx-auto mb-4">
              We'll confirm users + sites, pick the right lane, and map your onboarding + baseline fees upfront so your monthly is predictable.
            </p>
            <p className="text-sm text-white/50 mb-6">
              <strong className="text-violet-400">Office minimum $750</strong> • <strong className="text-violet-300">Business minimum $1,200</strong> • <strong className="text-fuchsia-400">Enterprise minimum $3,500</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://meet.digerati-experts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                data-testid="cta-book"
              >
                Book Tech Discovery
              </a>
              <Link
                href="/internal/pricing-tiers#section-matrix"
                className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                data-testid="cta-compare"
              >
                Compare Tiers
              </Link>
            </div>
          </div>

          {/* Sales Tip */}
          <div className="mt-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-violet-400/20 border-l-4 border-l-violet-400 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">💡</span>
              <strong className="text-violet-300">Sales Tip</strong>
            </div>
            <p className="text-white/70">
              Start with Business tier as the anchor — it's the most common fit. Move up to Enterprise for compliance-heavy industries 
              (healthcare, finance, legal) or down to Office for startups still validating product-market fit.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/50 text-sm">
              DIGERATI EXPERTS | (480) 519-5892 | info@digeratiexperts.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
