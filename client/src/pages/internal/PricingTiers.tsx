import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown, Check, Clock, Zap, Gift, Users, Building, Briefcase, Crown, Target } from "lucide-react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  priceUnit: string;
  minimum?: string;
  siteBase?: string;
  featured?: boolean;
  included: string[];
  components: { label: string; value: string }[];
}

interface PricingTier {
  id: string;
  name: string;
  icon: string;
  meta: string;
  description: string;
  colorClass: string;
  bgColorClass: string;
  plans: PricingPlan[];
}

const pricingTiers: PricingTier[] = [
  {
    id: "essentials",
    name: "IT Essentials",
    icon: "📋",
    meta: "1-3 users • Foundation monitoring",
    description: "Baseline visibility & protection for micro-businesses",
    colorClass: "text-gray-400",
    bgColorClass: "bg-gray-500",
    plans: [
      {
        name: "DE Essentials Monitoring",
        description: "Baseline visibility & protection for micro-businesses",
        price: "$500",
        priceUnit: "/site/month",
        minimum: "Flat rate for 1-3 users",
        included: [
          "Monitoring agents on covered systems",
          "Automatic patching & updates",
          "Security alerts (malware, risky activity)",
          "Basic XDR for up to 3 devices",
          "Monthly health reports"
        ],
        components: [
          { label: "Basic IT", value: "RMM + Patching" },
          { label: "Cyber Security", value: "Basic XDR only" }
        ]
      }
    ]
  },
  {
    id: "office",
    name: "Office Ecosystem",
    icon: "🏢",
    meta: "1-6 users • Startups & small offices",
    description: "Real security, backup & guidance — choose your add-on",
    colorClass: "text-violet-400",
    bgColorClass: "bg-violet-500",
    plans: [
      {
        name: "Custom Buildout",
        description: "Real security, backup & guidance — choose your add-on",
        price: "$125",
        priceUnit: "/user/month",
        siteBase: "+ $750/site base",
        minimum: "Min $750/mo (covers up to 6 users)",
        included: [
          "Core Platform (Choose One): Microsoft Native or Cross-Platform JumpCloud",
          "Endpoint Security (anti-malware, DNS)",
          "Backup Foundation (workstation files)",
          "Security Awareness Training",
          "Business-hours helpdesk",
          "Monthly reviews",
          "Choose ONE premium add-on"
        ],
        components: [
          { label: "DE Workplace", value: "Full (lane-based core)" },
          { label: "Basic IT", value: "Full" },
          { label: "Cyber Security", value: "Base + 1 add-on" },
          { label: "Backup & DR", value: "Base" }
        ]
      }
    ]
  },
  {
    id: "business",
    name: "Business Ecosystem",
    icon: "📈",
    meta: "5-50 users • Growing teams",
    description: "Secure-by-default for cloud-first teams",
    colorClass: "text-emerald-400",
    bgColorClass: "bg-emerald-500",
    plans: [
      {
        name: "Managed Security & Continuity",
        description: "Secure-by-default for cloud-first teams",
        price: "$240",
        priceUnit: "/user/month",
        minimum: "Min $1,200/mo (5 users)",
        featured: true,
        included: [
          "CloudShield SASE — identity-aware access",
          "Identity & Access (MFA/SSO)",
          "Advanced Endpoint (XDR + 24/7 MDR)",
          "Email Security (anti-phish, DLP)",
          "Business Continuity (instant failover)",
          "Training & phishing simulations",
          "Passwordless data protection",
          "Unlimited business-hours helpdesk",
          "Quarterly DR validation"
        ],
        components: [
          { label: "DE Workplace", value: "Full (Microsoft Native default)" },
          { label: "Basic IT", value: "Full" },
          { label: "Cyber Security", value: "Full" },
          { label: "Backup & DR", value: "Full w/ Continuity" },
          { label: "Infrastructure", value: "SASE/ZTNA" }
        ]
      },
      {
        name: "Network Integration",
        description: "Security modernization for existing hardware",
        price: "$250",
        priceUnit: "/user/month",
        siteBase: "+ $2,500/site (one-time)",
        minimum: "Min 10 users",
        included: [
          "Everything in Managed Security",
          "SASE overlay (no rip-and-replace)",
          "Legacy HW support (Meraki, Cisco, SonicWall, UniFi)",
          "Remote access control & segmentation",
          "Network diagrams & documentation",
          "Lifecycle planning"
        ],
        components: [
          { label: "All Managed Security", value: "+" },
          { label: "Infrastructure", value: "Full (bridge mode)" }
        ]
      }
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise Ecosystem",
    icon: "🏛️",
    meta: "10-200+ users • Regulated industries",
    description: "Compliance-driven ops with executive reporting",
    colorClass: "text-amber-400",
    bgColorClass: "bg-amber-500",
    plans: [
      {
        name: "Managed Compliance (Zero-Trust)",
        description: "Compliance-driven ops with executive reporting",
        price: "$350",
        priceUnit: "/user/month",
        minimum: "Min $3,500/mo (10 users)",
        included: [
          "Everything in Network Integration",
          "HIPAA, GDPR, FTC Safeguards alignment",
          "vCISO services & board reporting",
          "Annual penetration test & remediation",
          "Live SOC reporting & forensic logging",
          "Defined incident response",
          "DLP enforcement & vendor review",
          "Insurance documentation",
          "2 hrs/user + 3 hrs/company OOS monthly"
        ],
        components: [
          { label: "All Network Integration", value: "+" },
          { label: "Compliance Services", value: "Full" },
          { label: "vCISO Advisory", value: "Included" }
        ]
      },
      {
        name: "Enterprise & Multi-Site",
        description: "Flexible governance for large organizations",
        price: "Custom",
        priceUnit: "Quote",
        minimum: "Based on users, sites, requirements",
        included: [
          "Everything in Managed Compliance",
          "Multi-site management",
          "Custom SLAs",
          "Dedicated account team",
          "Custom integrations",
          "Executive-level reporting"
        ],
        components: [
          { label: "Custom scope", value: "Tailored to requirements" }
        ]
      }
    ]
  }
];

const techtimeIncluded = [
  "Password resets & lockouts",
  "Printer issues & driver updates",
  "Email sync problems",
  "MFA setup & troubleshooting",
  "SSO configuration & access issues",
  "Basic how-to questions"
];

const techtimeBillable = [
  "New user onboarding (device setup, account creation)",
  "Device refresh projects",
  "LOB app installations & configuration",
  "Migration projects (email, file, app)",
  "Custom automation & workflows",
  "After-hours emergency response"
];

const techtimeAllocation = [
  { tier: "essentials", label: "Essentials", included: "0 hrs", rollover: "N/A", overage: "$175/hr" },
  { tier: "office", label: "Office", included: "1 hr/user", rollover: "1 month", overage: "$150/hr" },
  { tier: "business", label: "Business", included: "2 hrs/user", rollover: "3 months", overage: "$125/hr" },
  { tier: "enterprise", label: "Enterprise", included: "3 hrs/user", rollover: "6 months", overage: "$100/hr" }
];

export default function PricingTiers() {
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set(["business"]));

  const toggleTier = (id: string) => {
    setExpandedTiers(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
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
        return { text: "text-gray-400", bg: "bg-gray-500", border: "border-gray-400/30", gradient: "from-gray-600/20 to-gray-700/20" };
      case "office":
        return { text: "text-violet-400", bg: "bg-violet-500", border: "border-violet-400/30", gradient: "from-violet-600/20 to-purple-600/20" };
      case "business":
        return { text: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-400/30", gradient: "from-emerald-600/20 to-green-600/20" };
      case "enterprise":
        return { text: "text-amber-400", bg: "bg-amber-500", border: "border-amber-400/30", gradient: "from-amber-600/20 to-orange-600/20" };
      default:
        return { text: "text-violet-400", bg: "bg-violet-500", border: "border-violet-400/30", gradient: "from-violet-600/20 to-purple-600/20" };
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <Helmet>
        <title>ProActive Ecosystem — Pricing Tiers | Internal Reference | Digerati Experts</title>
        <meta name="description" content="Internal reference for tiered service packages built for your business stage. IT Essentials, Office, Business, and Enterprise ecosystems with clear pricing." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-emerald-900/5" />
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
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-white/70">Internal Reference</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="heading-pricing-tiers">
              ProActive Ecosystem — Pricing Tiers
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Tiered service packages built for your business stage
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {pricingTiers.map((tier) => {
              const colors = getTierColors(tier.id);
              return (
                <button
                  key={tier.id}
                  onClick={() => scrollToTier(tier.id)}
                  className={`px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-all hover:-translate-y-0.5 ${colors.bg}`}
                  data-testid={`badge-tier-${tier.id}`}
                >
                  {tier.name}
                </button>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-cyan-600/10 to-cyan-800/5 border border-cyan-400/20 rounded-2xl p-8 mb-10">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-2" data-testid="section-techtime">
                TechTime Support Model
              </h2>
              <p className="text-white/70">Understanding included vs. billable support</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-emerald-400/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-400">Included Support</h3>
                    <p className="text-xs text-white/50">No additional charge</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {techtimeIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-cyan-400/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cyan-400">TechTime (Billable)</h3>
                    <p className="text-xs text-white/50">Uses allocated hours</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {techtimeBillable.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/70">
                      <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-4 py-3 text-white/60 font-semibold">Tier</th>
                    <th className="text-center px-4 py-3 text-white/60 font-semibold">Included</th>
                    <th className="text-center px-4 py-3 text-white/60 font-semibold">Rollover</th>
                    <th className="text-center px-4 py-3 text-white/60 font-semibold">Overage Rate</th>
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
                        <td className={`text-center px-4 py-3 font-semibold ${colors.text}`}>{row.included}</td>
                        <td className="text-center px-4 py-3 text-white/60">{row.rollover}</td>
                        <td className="text-center px-4 py-3 text-cyan-400 font-semibold">{row.overage}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-xs text-cyan-400 font-semibold uppercase">Min Increment</p>
                <p className="text-lg font-bold text-white">15 min</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-xs text-cyan-400 font-semibold uppercase">After-Hours</p>
                <p className="text-lg font-bold text-white">1.5× rate</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Target className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-xs text-cyan-400 font-semibold uppercase">Emergency</p>
                <p className="text-lg font-bold text-white">2× rate</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Gift className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-xs text-amber-400 font-semibold uppercase">Prepay 10hr</p>
                <p className="text-lg font-bold text-white">10% off</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
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
                      <div className={`grid gap-6 mt-6 ${tier.plans.length > 1 ? 'md:grid-cols-2' : 'max-w-xl'}`}>
                        {tier.plans.map((plan, planIdx) => (
                          <div
                            key={planIdx}
                            className={`bg-white/[0.03] border ${plan.featured ? 'border-emerald-400/40 bg-emerald-500/5' : 'border-white/10'} rounded-xl p-6 relative`}
                            data-testid={`plan-card-${tier.id}-${planIdx}`}
                          >
                            {plan.featured && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full text-xs font-bold text-white shadow-lg">
                                MOST POPULAR
                              </div>
                            )}
                            <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                            <p className="text-sm text-white/50 mb-4">{plan.description}</p>

                            <div className="bg-white/5 rounded-xl p-5 mb-4 text-center">
                              <div className={`text-3xl font-bold ${colors.text}`}>{plan.price}</div>
                              <div className="text-sm text-white/50">{plan.priceUnit}</div>
                              {plan.siteBase && <div className="text-sm text-white/40 mt-1">{plan.siteBase}</div>}
                              {plan.minimum && <div className="text-sm text-amber-400 font-medium mt-2">{plan.minimum}</div>}
                            </div>

                            <div className="mb-4">
                              <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3">What's Included</h4>
                              <ul className="space-y-2">
                                {plan.included.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                              <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3">Package Components</h4>
                              <ul className="space-y-2">
                                {plan.components.map((comp, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-sm">
                                    <span className="text-white/50">{comp.label}</span>
                                    <span className="text-white font-medium">{comp.value}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-violet-400/20 border-l-4 border-l-violet-400 rounded-xl p-6">
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
