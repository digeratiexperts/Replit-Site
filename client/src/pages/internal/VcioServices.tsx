import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronRight } from "lucide-react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

type ServiceLevel = "strategic" | "planning" | "operational";
type TierBadge = "business" | "enterprise" | "addon" | null;

interface ServiceFeature {
  id: string;
  name: string;
  serviceLevel: ServiceLevel;
  tierBadge: TierBadge;
  description: string;
  deliverables: string[];
  businessValue: string;
  reviewFrequency?: string;
  note?: string;
}

interface ServiceArea {
  id: string;
  number: number;
  name: string;
  icon: string;
  features: ServiceFeature[];
}

const serviceAreas: ServiceArea[] = [
  {
    id: "business-reviews",
    number: 1,
    name: "Business Reviews & Executive Reporting",
    icon: "📊",
    features: [
      {
        id: "tbr-qbr",
        name: "Technology Business Reviews (TBR/QBR)",
        serviceLevel: "strategic",
        tierBadge: null,
        description: "Regular executive meetings that translate IT performance into business outcomes and strategic insights.",
        deliverables: [
          "Executive Summary — High-level overview designed for leadership, no technical jargon",
          "Wins & Achievements — Technology initiatives that drove business value this period",
          "Issues & Challenges — Current blockers, risks, and how we're addressing them",
          "KPI Dashboard — Key metrics like uptime, ticket response times, security posture, and user satisfaction",
          "Roadmap Progress — Status updates on strategic initiatives and upcoming priorities"
        ],
        businessValue: "Monthly or quarterly reviews keep leadership informed, ensure IT aligns with business goals, and provide visibility into technology investments."
      },
      {
        id: "performance-metrics",
        name: "Performance Metrics & KPI Tracking",
        serviceLevel: "operational",
        tierBadge: null,
        description: "Comprehensive metrics and dashboards that show IT performance trends.",
        deliverables: [
          "Ticket Trends — Volume, response times, resolution rates by department",
          "System Uptime — Availability metrics for critical systems",
          "Security Metrics — Threat detection, patching compliance, vulnerability status",
          "User Satisfaction — Support ratings and feedback analysis",
          "Cost Per User — IT spending efficiency metrics"
        ],
        businessValue: "Data-driven visibility into IT operations enables informed decision-making."
      }
    ]
  },
  {
    id: "strategic-planning",
    number: 2,
    name: "Strategic Planning & Roadmap",
    icon: "🎯",
    features: [
      {
        id: "tech-roadmap",
        name: "Technology Roadmap Development",
        serviceLevel: "strategic",
        tierBadge: "business",
        description: "Multi-year strategic plan that aligns technology investments with business objectives.",
        deliverables: [
          "Current State Assessment — Where you are today",
          "Future State Vision — Where technology should take you",
          "Gap Analysis — What needs to change",
          "Prioritized Initiatives — Sequenced projects with timelines",
          "Investment Requirements — Budget implications over 12-36 months"
        ],
        businessValue: "Eliminates reactive IT spending and ensures technology investments support business growth.",
        reviewFrequency: "Quarterly (Business) | Monthly (Enterprise)"
      },
      {
        id: "tech-standards",
        name: "Technology Standards & Governance",
        serviceLevel: "planning",
        tierBadge: "business",
        description: "Defined standards that reduce complexity and control costs.",
        deliverables: [
          "Hardware Standards — Approved device models",
          "Software Standards — Approved applications by function",
          "Lifecycle Policies — When to refresh or replace systems",
          "Procurement Standards — Approved vendors and workflows",
          "Configuration Baselines — Standard security settings"
        ],
        businessValue: "Reduces support complexity, improves security, and lowers costs through volume purchasing."
      }
    ]
  },
  {
    id: "budgeting",
    number: 3,
    name: "Budgeting & Financial Planning",
    icon: "💰",
    features: [
      {
        id: "annual-budget",
        name: "Annual IT Budget Planning",
        serviceLevel: "strategic",
        tierBadge: "business",
        description: "Comprehensive IT budget that aligns with business goals.",
        deliverables: [
          "OPEX vs CAPEX Analysis — Optimal mix of operational and capital expenses",
          "Refresh Cycle Planning — Multi-year hardware replacement budgets",
          "Software Licensing — Current subscriptions plus projected growth",
          "Project Budgets — One-time costs for strategic initiatives",
          "Quarterly True-Ups — Review actual vs budget"
        ],
        businessValue: "Eliminates budget surprises and provides financial accountability for technology spending.",
        reviewFrequency: "Quarterly (Business) | Monthly (Enterprise)"
      },
      {
        id: "cost-optimization",
        name: "Cost Optimization & Forecasting",
        serviceLevel: "planning",
        tierBadge: "business",
        description: "Ongoing analysis to reduce waste and forecast future costs.",
        deliverables: [
          "License Rightsizing — Eliminate unused licenses",
          "Vendor Consolidation — Reduce vendor sprawl for better pricing",
          "Cloud Cost Management — Optimize Azure/AWS/M365 spending",
          "Contract Renewals — Negotiate better terms at renewal",
          "TCO Analysis — Total cost of ownership for major decisions"
        ],
        businessValue: "Reduces IT costs while maintaining or improving service levels."
      }
    ]
  },
  {
    id: "vendor-management",
    number: 4,
    name: "Vendor Management",
    icon: "🤝",
    features: [
      {
        id: "vendor-performance",
        name: "Vendor Performance Management",
        serviceLevel: "planning",
        tierBadge: "business",
        description: "Oversight and accountability for all your technology vendors.",
        deliverables: [
          "Performance Reviews — Regular evaluation against SLAs and expectations",
          "Contract Management — Track renewals, terms, and obligations",
          "Escalation Handling — Act as your advocate when issues arise",
          "Vendor Selection — Help evaluate and select new vendors",
          "Relationship Management — Maintain strategic vendor relationships"
        ],
        businessValue: "Ensures vendors deliver value and reduces time spent managing technology relationships.",
        reviewFrequency: "Annual (Business) | Quarterly (Enterprise)"
      },
      {
        id: "contract-negotiation",
        name: "Contract Negotiation Support",
        serviceLevel: "strategic",
        tierBadge: "enterprise",
        description: "Expert support during vendor negotiations to secure better terms.",
        deliverables: [
          "Market Intelligence — Know what fair pricing looks like",
          "Term Analysis — Identify risky or unfavorable contract terms",
          "Strategy Development — Plan negotiation approach",
          "Direct Participation — Join calls as your technology advisor",
          "Documentation — Ensure agreements are properly documented"
        ],
        businessValue: "Leverage our experience to get better pricing and terms than you could alone."
      }
    ]
  },
  {
    id: "security-compliance",
    number: 5,
    name: "Security & Compliance Guidance",
    icon: "🔒",
    features: [
      {
        id: "security-posture",
        name: "Security Posture Reviews",
        serviceLevel: "strategic",
        tierBadge: "business",
        description: "Executive-level visibility into your security posture and risk.",
        deliverables: [
          "Risk Assessment — Identify and prioritize security risks",
          "Control Effectiveness — Are security investments working?",
          "Gap Analysis — What's missing vs industry standards?",
          "Incident Review — Lessons learned from security events",
          "Improvement Roadmap — Prioritized security enhancements"
        ],
        businessValue: "Understand your security risk in business terms and make informed investment decisions.",
        reviewFrequency: "Annual (Business) | Quarterly (Enterprise)"
      },
      {
        id: "compliance-framework",
        name: "Compliance Framework Guidance",
        serviceLevel: "strategic",
        tierBadge: "enterprise",
        description: "Strategic guidance for achieving and maintaining compliance certifications.",
        deliverables: [
          "Framework Selection — Determine which standards apply (SOC 2, HIPAA, PCI-DSS, etc.)",
          "Readiness Assessment — Current state vs compliance requirements",
          "Remediation Roadmap — Prioritized path to compliance",
          "Audit Preparation — Get ready for assessments",
          "Ongoing Maintenance — Keep compliance current"
        ],
        businessValue: "Achieve compliance efficiently without over-investing or missing requirements.",
        note: "Enterprise tier includes $1,500/mo compliance allocation"
      }
    ]
  },
  {
    id: "project-guidance",
    number: 6,
    name: "Project & Initiative Guidance",
    icon: "📋",
    features: [
      {
        id: "project-oversight",
        name: "Technology Project Oversight",
        serviceLevel: "planning",
        tierBadge: "business",
        description: "Strategic oversight for major technology initiatives.",
        deliverables: [
          "Business Case Development — Define ROI and success criteria",
          "Vendor Selection — Evaluate options and make recommendations",
          "Progress Monitoring — Track milestones and flag risks",
          "Change Management — Plan for organizational impact",
          "Post-Implementation Review — Did we achieve the goals?"
        ],
        businessValue: "Ensure technology projects deliver promised business outcomes."
      },
      {
        id: "ma-due-diligence",
        name: "M&A Technology Due Diligence",
        serviceLevel: "strategic",
        tierBadge: "addon",
        description: "Technology assessment for mergers, acquisitions, or divestitures.",
        deliverables: [
          "Infrastructure Assessment — Current state and technical debt",
          "Integration Planning — What it takes to combine systems",
          "Risk Identification — Security, compliance, and operational risks",
          "Cost Estimation — Integration and ongoing operational costs",
          "Timeline Development — Realistic integration schedule"
        ],
        businessValue: "Make informed M&A decisions with accurate technology cost and risk data.",
        note: "Project-based add-on for any tier"
      }
    ]
  },
  {
    id: "executive-advisory",
    number: 7,
    name: "Executive Advisory & Board Support",
    icon: "🎓",
    features: [
      {
        id: "board-presentations",
        name: "Board & Executive Presentations",
        serviceLevel: "strategic",
        tierBadge: "enterprise",
        description: "Executive-ready presentations for board meetings and leadership updates.",
        deliverables: [
          "Board Decks — Technology updates in business language",
          "Risk Reporting — Cyber risk in terms boards understand",
          "Investment Proposals — Business cases for technology initiatives",
          "Benchmarking — How you compare to industry peers",
          "Direct Support — Available to present or answer questions"
        ],
        businessValue: "Communicate technology strategy effectively to leadership and stakeholders."
      },
      {
        id: "strategy-advisory",
        name: "Technology Strategy Advisory",
        serviceLevel: "strategic",
        tierBadge: "enterprise",
        description: "On-demand strategic technology guidance for business decisions.",
        deliverables: [
          "Strategic Sounding Board — Discuss technology implications of business decisions",
          "Industry Trends — Stay informed on relevant technology developments",
          "Competitive Intelligence — What are peers doing with technology?",
          "Innovation Opportunities — Where can technology create advantage?",
          "Risk Assessment — Technology risks in business context"
        ],
        businessValue: "Have a trusted technology advisor available when making important business decisions."
      }
    ]
  }
];

const tierAvailability = [
  { tier: "Essentials", description: "No vCIO services included", reviewFreq: "N/A", colorClass: "border-l-gray-500" },
  { tier: "Office", description: "Annual technology review", reviewFreq: "Annual", colorClass: "border-l-violet-300" },
  { tier: "Business", description: "Quarterly strategic touchpoints", reviewFreq: "Quarterly", colorClass: "border-l-violet-500" },
  { tier: "Enterprise", description: "Full vCIO engagement", reviewFreq: "Monthly", colorClass: "border-l-violet-600" }
];

const serviceLevelColors: Record<ServiceLevel, string> = {
  strategic: "bg-violet-600 text-white",
  planning: "bg-violet-500 text-white",
  operational: "bg-violet-400 text-white"
};

const tierBadgeColors: Record<string, string> = {
  business: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  enterprise: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  addon: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30"
};

export default function VcioServices() {
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

  const toggleFeature = (featureId: string) => {
    setExpandedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    const allIds = serviceAreas.flatMap(area => area.features.map(f => f.id));
    setExpandedFeatures(new Set(allIds));
  };

  const collapseAll = () => {
    setExpandedFeatures(new Set());
  };

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <Helmet>
        <title>DE vCIO Services | Internal Reference | Digerati Experts</title>
        <meta name="description" content="Internal reference for vCIO services. Strategic technology leadership without the executive salary." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-purple-900/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8">
          <Link href="/internal/sales-process" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Sales Process
          </Link>
          <div className="flex items-center gap-4 mt-4 mb-6">
            <img src={logoImage} alt="Digerati Experts" className="h-10 w-auto" />
          </div>
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" data-testid="heading-vcio">
                DE vCIO Services
              </h1>
              <p className="text-xl text-white/90 font-semibold mb-2">Virtual Chief Information Officer</p>
              <p className="text-white/80 max-w-3xl mb-6">
                Strategic technology leadership without the executive salary. We align your IT with business goals, manage vendors, plan budgets, and ensure your technology investments drive real business outcomes.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: "🎯", label: "Strategic Planning" },
                  { icon: "📊", label: "Executive Reporting" },
                  { icon: "💰", label: "Budget Management" },
                  { icon: "🤝", label: "Vendor Governance" }
                ].map((badge, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium border border-white/30" data-testid={`badge-service-${idx}`}>
                    <span>{badge.icon}</span>
                    <span>{badge.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "📈", value: "7", label: "Core Service Areas" },
            { icon: "🎯", value: "Quarterly", label: "Business Reviews" },
            { icon: "🗺️", value: "36-Month", label: "Strategic Roadmap" },
            { icon: "💼", value: "Executive", label: "Strategic Guidance" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center" data-testid={`stat-card-${idx}`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-violet-400">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-violet-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-lg">📅</span>
            </div>
            <h2 className="text-xl font-bold text-white">vCIO Service Availability by Tier</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tierAvailability.map((tier, idx) => (
              <div key={idx} className={`bg-white/5 rounded-lg p-4 border-l-4 ${tier.colorClass}`} data-testid={`tier-availability-${idx}`}>
                <div className="font-bold text-white mb-1">{tier.tier}</div>
                <div className="text-sm text-white/60 mb-2">{tier.description}</div>
                <span className="inline-block px-2 py-1 bg-violet-500/20 text-violet-400 text-xs font-semibold rounded">
                  {tier.reviewFreq}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-lg">💼</span>
            </div>
            <h2 className="text-xl font-bold text-white">Your Strategic Technology Partner</h2>
          </div>
          <p className="text-white/70 leading-relaxed">
            Technology decisions impact every part of your business. Our vCIO services provide executive-level strategic guidance to ensure your IT investments align with business goals, vendors are managed effectively, budgets are optimized, and your technology roadmap supports growth. Click any service below to learn how we provide CIO-level leadership.
          </p>
        </div>

        <div className="flex justify-end gap-3 mb-4">
          <button onClick={expandAll} className="text-sm text-violet-400 hover:text-violet-300 transition-colors" data-testid="button-expand-all">
            Expand All
          </button>
          <span className="text-white/30">|</span>
          <button onClick={collapseAll} className="text-sm text-violet-400 hover:text-violet-300 transition-colors" data-testid="button-collapse-all">
            Collapse All
          </button>
        </div>

        <div className="space-y-6">
          {serviceAreas.map((area) => (
            <div key={area.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden" data-testid={`area-${area.id}`}>
              <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {area.number}
                  </span>
                  <span className="text-2xl">{area.icon}</span>
                  <h3 className="text-xl font-bold text-white">{area.name}</h3>
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {area.features.map((feature) => {
                  const isExpanded = expandedFeatures.has(feature.id);
                  return (
                    <div key={feature.id}>
                      <button
                        onClick={() => toggleFeature(feature.id)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                        data-testid={`feature-toggle-${feature.id}`}
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <ChevronRight className={`w-5 h-5 text-violet-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          <span className="font-semibold text-white">{feature.name}</span>
                          {feature.tierBadge && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded border ${tierBadgeColors[feature.tierBadge]}`}>
                              {feature.tierBadge === "business" ? "Business+" : feature.tierBadge === "enterprise" ? "Enterprise" : "Add-On"}
                            </span>
                          )}
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${serviceLevelColors[feature.serviceLevel]}`}>
                            ● {feature.serviceLevel.charAt(0).toUpperCase() + feature.serviceLevel.slice(1)}
                          </span>
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-6 bg-violet-500/5 border-l-4 border-violet-500" data-testid={`feature-content-${feature.id}`}>
                          <div className="pl-8 pt-4 space-y-4">
                            <div>
                              <p className="text-white/80"><strong className="text-violet-400">What we deliver:</strong> {feature.description}</p>
                            </div>
                            <div>
                              <p className="text-violet-400 font-semibold mb-2">Includes:</p>
                              <ul className="space-y-2">
                                {feature.deliverables.map((item, idx) => (
                                  <li key={idx} className="text-white/70 flex items-start gap-2">
                                    <span className="text-violet-400 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-violet-500/10 border-l-4 border-violet-500 rounded-r-lg p-4">
                              <p className="text-white/80">
                                <strong className="text-violet-400">💼 Business Value:</strong> {feature.businessValue}
                              </p>
                              {feature.reviewFrequency && (
                                <p className="text-white/60 text-sm mt-2">
                                  <strong>Review Frequency:</strong> {feature.reviewFrequency}
                                </p>
                              )}
                              {feature.note && (
                                <p className="text-white/60 text-sm mt-2">
                                  <strong>Note:</strong> {feature.note}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-2xl p-8 mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-4" data-testid="heading-cta">
            Strategic Technology Leadership
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-2">
            Stop making reactive technology decisions. Our vCIO services give you executive-level strategic guidance to align IT with business goals, control costs, and ensure your technology investments drive real outcomes.
          </p>
          <p className="text-white/50 text-sm mb-6">
            <em>Full vCIO engagement included in Enterprise tier. Quarterly strategic touchpoints in Business tier.</em>
          </p>
          <Link href="/internal/pricing-tiers" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity" data-testid="link-pricing">
            See Pricing & Tiers
          </Link>
        </div>

        <footer className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">Internal Reference Document — Not for Customer Distribution</p>
        </footer>
      </div>
    </div>
  );
}
