import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "./sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users, Building2, Shield, Server, Layers, Bookmark, Briefcase,
  FileCheck, ArrowRight, Check, Calculator, Database, Info,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { pricing, estimateMonthly, PRICING_SCOPE_NOTE, NO_BLACK_BOX_TAGLINE, type PricingTierKey } from "@/data/pricing";
import { PricingToolsSection } from "./sections/PricingToolsSection";

type CellValue = boolean | string;

interface MatrixService {
  name: string;
  tooltip?: string;
  it: CellValue;
  office: CellValue;
  business: CellValue;
  enterprise: CellValue;
}

interface MatrixCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  isAddon?: boolean;
  ribbon?: string;
  services: MatrixService[];
}

const matrixCategories: MatrixCategory[] = [
  {
    id: "core-it",
    title: "Productivity & Core IT",
    icon: <Server className="w-5 h-5" />,
    services: [
      { name: "Managed IT Support / Service Desk + Ticketing", it: true, office: true, business: true, enterprise: true },
      { name: "Microsoft 365 / Google Workspace / Zoho workspace support", it: true, office: true, business: true, enterprise: true },
      { name: "MFA / SSO / Password Manager", it: "Baseline", office: "Stronger identity", business: "Enhanced", enterprise: "Identity governance" },
      { name: "Endpoint Security", it: "Baseline", office: "Stronger protection", business: "Enhanced EDR", enterprise: "Advanced" },
      { name: "Email Protection", it: "Baseline", office: "Advanced anti-phishing", business: "Enhanced", enterprise: "Advanced" },
      { name: "Basic IT Planning", it: true, office: true, business: true, enterprise: true },
    ],
  },
  {
    id: "workplace-network",
    title: "Workplace & Network",
    icon: <Building2 className="w-5 h-5" />,
    services: [
      { name: "Managed Workplace", tooltip: "Office: User provisioning, workspace setup, and Microsoft 365, Google Workspace, or Zoho SKU/workspace support.", it: "Limited / add-on", office: "Limited included", business: "Enhanced", enterprise: "Advanced / custom" },
      { name: "Managed Network & Connectivity", it: false, office: true, business: true, enterprise: "Multi-site / complex" },
    ],
  },
  {
    id: "backup",
    title: "Backup & Recovery",
    icon: <Database className="w-5 h-5" />,
    services: [
      { name: "Endpoint Backup", it: false, office: true, business: true, enterprise: "Advanced / custom" },
      { name: "Backup & Disaster Recovery (BCDR)", it: false, office: "addon", business: true, enterprise: "Advanced / custom" },
      { name: "User Cloud Storage Backup", it: false, office: false, business: true, enterprise: "Advanced / custom" },
    ],
  },
  {
    id: "security-ops",
    title: "Security Operations",
    icon: <Shield className="w-5 h-5" />,
    services: [
      { name: "Security Awareness Training", it: false, office: "Basic / add-on", business: true, enterprise: true },
      { name: "Threat Detection & Response", tooltip: "Monitoring, detection, triage, containment, and guided recovery signals from endpoint, identity, email, cloud, or other detection systems.", it: false, office: "addon", business: true, enterprise: "Advanced / custom" },
      { name: "Security Operations / SOC-as-a-Service", tooltip: "Security monitoring, alert triage, tuning, escalation, reporting, and response coordination.", it: false, office: "addon", business: true, enterprise: "Advanced / custom" },
    ],
  },
  {
    id: "compliance-strategy",
    title: "Compliance & Strategy",
    icon: <FileCheck className="w-5 h-5" />,
    services: [
      { name: "vCIO / Strategy Reviews", it: false, office: "1× combined tech + cyber / yr", business: "Budgeting + 2× tech & security / yr", enterprise: "Quarterly tech & security" },
      { name: "Compliance Evidence & Risk Reporting", it: false, office: "Add-on / custom", business: "Basic included", enterprise: "Advanced / audit-grade" },
      { name: "Unified Security Posture", it: false, office: "Add-on / custom", business: "Partial / scoped", enterprise: "Full" },
    ],
  },
  {
    id: "addons",
    title: "Optional Add-Ons",
    icon: <Bookmark className="w-5 h-5" />,
    isAddon: true,
    ribbon: "Available with any package",
    services: [
      { name: "UCaaS: Voice & Meetings", it: "addon", office: "addon", business: "addon", enterprise: "addon" },
      { name: "Company Spend-Card Controls", it: "addon", office: "addon", business: "Included or available", enterprise: "Included / custom" },
      { name: "Advanced Managed Workplace", it: "addon", office: "addon", business: "addon", enterprise: "Included / custom" },
    ],
  },
  {
    id: "separate-path",
    title: "Separate Service Path",
    icon: <Briefcase className="w-5 h-5" />,
    isAddon: true,
    ribbon: "Not part of the package ladder",
    services: [
      { name: "Co-Managed IT (for clients with internal IT)", it: "Separate path", office: "Separate path", business: "Separate path", enterprise: "Separate path" },
    ],
  },
];

interface PlanCard {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  pricePerUser: number | null;
  priceLabel: string;
  priceNote?: string;
  minUsers?: number;
  siteMin?: number;
  bullets: string[];
  gradient: string;
  borderColor: string;
  popular?: boolean;
  learnMoreUrl: string;
}

const plans: PlanCard[] = [
  {
    id: "it",
    name: "ProActive IT Ecosystem",
    shortName: "IT",
    tagline: "Entry managed IT + baseline security",
    pricePerUser: pricing.it.user,
    priceLabel: `Starting at $${pricing.it.user}/user/mo`,
    minUsers: 5,
    siteMin: pricing.it.monthlyMin,
    bullets: [
      "Managed IT Support + Service Desk",
      "Microsoft 365 / Google Workspace / Zoho workspace support",
      "MFA / SSO / Password Manager (baseline)",
      "Endpoint security (basic)",
      "Email protection (basic)",
      "Basic IT planning",
      "Managed Workplace: limited / add-on",
      "No backup included by default",
    ],
    gradient: "from-slate-500 to-violet-500",
    borderColor: "border-slate-500/30",
    learnMoreUrl: pricing.it.learnMoreUrl,
  },
  {
    id: "office",
    name: "ProActive Office Ecosystem",
    shortName: "Office",
    tagline: "Small office operating package",
    pricePerUser: pricing.office.user,
    priceLabel: `Starting at $${pricing.office.user}/user/mo`,
    minUsers: 5,
    siteMin: pricing.office.monthlyMin,
    bullets: [
      "Everything in IT, plus:",
      "Managed Network & Connectivity",
      "Limited Managed Workplace",
      "Endpoint Backup",
      "Annual combined technology + cyber review",
      "Security Awareness Training (add-on)",
      "Threat Detection / SOC (add-on)",
      "BCDR, cloud backup, compliance reports (add-ons)",
    ],
    gradient: "from-violet-500 to-purple-500",
    borderColor: "border-violet-500/40",
    popular: true,
    learnMoreUrl: pricing.office.learnMoreUrl,
  },
  {
    id: "business",
    name: "ProActive Business Ecosystem",
    shortName: "Business",
    tagline: "Security-first business package",
    pricePerUser: pricing.business.user,
    priceLabel: `Starting at $${pricing.business.user}/user/mo`,
    priceNote: "Final scope confirmed after Cyber Risk Assessment — users, sites, backup, SOC, and compliance can change the total.",
    siteMin: pricing.business.monthlyMin,
    bullets: [
      "Everything in Office, plus:",
      "Enhanced Managed Workplace",
      "Security Awareness Training included",
      "Threat Detection / SOC included",
      "BCDR + user cloud storage backup included",
      "Compliance & Risk Reporting included",
      "Budgeting / planning + 2× tech & security business reviews per year",
      "Spend-card controls included or available",
    ],
    gradient: "from-purple-500 to-fuchsia-500",
    borderColor: "border-purple-500/40",
    learnMoreUrl: pricing.business.learnMoreUrl,
  },
  {
    id: "enterprise",
    name: "ProActive Enterprise Ecosystem",
    shortName: "Enterprise",
    tagline: "Governance, compliance, mature security",
    pricePerUser: pricing.enterprise.user,
    priceLabel: `Starting at $${pricing.enterprise.user}/user/mo`,
    priceNote: "Custom after assessment for governance, multi-site, and advanced compliance — published floor applies as the starting point.",
    siteMin: pricing.enterprise.monthlyMin,
    bullets: [
      "Everything in Business, plus:",
      "Advanced / custom Managed Workplace",
      "Advanced SOC / security operations",
      "Unified Security Posture (full)",
      "Advanced Compliance & Risk Reports (audit-grade)",
      "Quarterly technology + security business reviews",
      "Advanced / custom backup, BCDR, data protection strategy",
      "Multi-site / complex network support, executive reporting",
    ],
    gradient: "from-fuchsia-500 to-pink-500",
    borderColor: "border-fuchsia-500/40",
    learnMoreUrl: pricing.enterprise.learnMoreUrl,
  },
];

const MatrixCell = ({ value }: { value: CellValue }) => {
  if (value === true) {
    return (
      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
        <Check className="w-3 h-3 text-emerald-400" />
      </div>
    );
  }
  if (value === false) {
    return <div className="w-2 h-0.5 bg-white/20 rounded mx-auto" />;
  }
  if (value === "addon") {
    return <span className="text-xs text-amber-400 font-medium">Add-On</span>;
  }
  return <span className="text-xs text-white/80 font-medium">{value}</span>;
};

export default function ProActiveEcosystemPricing() {
  const prefersReducedMotion = useReducedMotion();
  const [userCount, setUserCount] = useState<number | "">(10);
  const [siteCount, setSiteCount] = useState<number | "">(1);

  useSEO({
    title: "ProActive Ecosystem Pricing — Managed IT & Cybersecurity Packages",
    description:
      "Estimate your ProActive Ecosystem starting point across IT, Office, Business, and Enterprise packages. Final pricing is confirmed after assessment.",
    canonical: "/proactive-ecosystem-pricing",
  });

  const effectiveUsers = typeof userCount === "number" ? Math.max(userCount, 1) : 1;
  const effectiveSites = typeof siteCount === "number" ? Math.max(siteCount, 1) : 1;

  const estimates = useMemo(
    () =>
      plans.map((plan) => {
        if (plan.pricePerUser == null) {
          return { ...plan, monthlyEstimate: null as number | null };
        }
        const key = plan.id as PricingTierKey;
        const users = Math.max(effectiveUsers, plan.minUsers ?? 1);
        return {
          ...plan,
          monthlyEstimate: estimateMonthly(key, users, effectiveSites) as number | null,
        };
      }),
    [effectiveUsers, effectiveSites],
  );

  const fadeIn = prefersReducedMotion
    ? undefined
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0118] via-[#0d0720] to-[#050312]" aria-hidden="true" />
      <div className="relative z-10">
        <MegaMenu />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          {/* Hero */}
          <motion.header
            className="text-center max-w-3xl mx-auto mb-14"
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ProActive Ecosystem{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="text-lg text-white/70 mb-3">
              Estimate your ProActive Ecosystem starting point. Final pricing is confirmed after assessment.
            </p>
            <p className="text-sm text-white/50">
              Pricing depends on users, endpoints, sites, network requirements, backup scope, infrastructure needs,
              compliance requirements, and selected add-ons.
            </p>
          </motion.header>

          {/* Estimator */}
          <section className="mb-14" aria-labelledby="estimator-heading">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h2 id="estimator-heading" className="flex items-center gap-3 text-xl font-semibold text-white mb-2">
                <Calculator className="w-5 h-5 text-violet-400" />
                Estimate Your Starting Point
              </h2>
              <p className="text-sm text-white/50 mb-6">Estimates only — exact pricing confirmed after assessment.</p>
              <div className="grid sm:grid-cols-2 gap-6 max-w-xl">
                <label className="block">
                  <span className="flex items-center gap-2 text-sm text-white/70 mb-2">
                    <Users className="w-4 h-4" /> Number of users
                  </span>
                  <Input
                    type="number"
                    min={1}
                    value={userCount}
                    onChange={(e) => setUserCount(e.target.value === "" ? "" : Math.max(1, Number(e.target.value)))}
                    className="bg-white/5 border-white/10 text-white"
                    data-testid="input-user-count"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-sm text-white/70 mb-2">
                    <Building2 className="w-4 h-4" /> Number of sites
                  </span>
                  <Input
                    type="number"
                    min={1}
                    value={siteCount}
                    onChange={(e) => setSiteCount(e.target.value === "" ? "" : Math.max(1, Number(e.target.value)))}
                    className="bg-white/5 border-white/10 text-white"
                    data-testid="input-site-count"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Plan cards */}
          <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6" aria-label="ProActive Ecosystem packages">
            {estimates.map((plan) => (
              <motion.article
                key={plan.id}
                className={`relative rounded-2xl border ${plan.borderColor} bg-white/[0.03] p-6 flex flex-col`}
                initial={prefersReducedMotion ? undefined : "hidden"}
                whileInView={prefersReducedMotion ? undefined : "visible"}
                viewport={{ once: true }}
                variants={fadeIn}
                data-testid={`plan-card-${plan.id}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <div className={`inline-flex self-start px-3 py-1 rounded-full bg-gradient-to-r ${plan.gradient} text-white text-xs font-semibold mb-4`}>
                  {plan.shortName}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-white/50 mb-4">{plan.tagline}</p>
                <div className="mb-4">
                  <p className="text-violet-300 font-semibold">{plan.priceLabel}</p>
                  {plan.siteMin ? (
                    <p className="text-xs text-white/50 mt-1">${plan.siteMin.toLocaleString()}/site/mo minimum</p>
                  ) : null}
                  {plan.minUsers ? (
                    <p className="text-xs text-white/50 mt-1">Minimum {plan.minUsers} users</p>
                  ) : null}
                  {plan.monthlyEstimate != null && (
                    <p className="text-2xl font-bold text-white mt-2" data-testid={`estimate-${plan.id}`}>
                      ~${plan.monthlyEstimate.toLocaleString()}<span className="text-sm font-normal text-white/50">/mo</span>
                    </p>
                  )}
                  {plan.priceNote && <p className="text-xs text-white/50 mt-2">{plan.priceNote}</p>}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.learnMoreUrl}>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.article>
            ))}
          </section>

          <p className="text-center text-sm text-white/40 mb-16 max-w-2xl mx-auto">
            All numbers shown are estimated starting points, not exact totals. Final pricing is confirmed after a brief
            assessment of your environment, security needs, and selected add-ons.
          </p>

          {/* Comparison matrix */}
          <section className="mb-16" aria-labelledby="matrix-heading">
            <div className="text-center mb-8">
              <h2 id="matrix-heading" className="text-3xl font-bold text-white mb-2">
                Service Comparison Matrix
              </h2>
              <p className="text-white/60">
                What's included, enhanced, or available as an add-on across each ProActive Ecosystem package.
              </p>
            </div>

            <div className="space-y-8">
              {matrixCategories.map((category) => (
                <div key={category.id} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                    <span className="text-violet-400">{category.icon}</span>
                    <h3 className="font-semibold text-white">{category.title}</h3>
                    {category.ribbon && (
                      <span className="ml-auto text-xs text-amber-400/90 border border-amber-400/30 rounded-full px-3 py-1">
                        {category.ribbon}
                      </span>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-xs uppercase tracking-wide text-white/40">
                          <th className="px-5 py-3 font-medium min-w-[220px]">Service</th>
                          <th className="px-3 py-3 font-medium text-center">IT</th>
                          <th className="px-3 py-3 font-medium text-center">Office</th>
                          <th className="px-3 py-3 font-medium text-center">Business</th>
                          <th className="px-3 py-3 font-medium text-center">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.services.map((service) => (
                          <tr key={service.name} className="border-t border-white/5">
                            <td className="px-5 py-3 text-sm text-white/80">
                              <span className="inline-flex items-center gap-1.5">
                                {service.name}
                                {service.tooltip && (
                                  <span title={service.tooltip}>
                                    <Info className="w-3.5 h-3.5 text-white/30" aria-label={service.tooltip} />
                                  </span>
                                )}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center"><MatrixCell value={service.it} /></td>
                            <td className="px-3 py-3 text-center"><MatrixCell value={service.office} /></td>
                            <td className="px-3 py-3 text-center"><MatrixCell value={service.business} /></td>
                            <td className="px-3 py-3 text-center"><MatrixCell value={service.enterprise} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-white/40 mt-6 max-w-3xl mx-auto">
              Digerati Experts provides audit readiness, evidence support, framework mapping, and risk reporting. We do
              not provide legal compliance signoff or certification.
            </p>
          </section>

          {/* Relocated from homepage — keep tools, deepen pricing page */}
          <section className="mb-16" aria-label="Pricing calculators">
            <div className="mb-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF477F]">Pricing tools</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Calculate investment &amp; downtime risk</h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-white/55">{PRICING_SCOPE_NOTE}</p>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-white/40">{NO_BLACK_BOX_TAGLINE}</p>
            </div>
            <PricingToolsSection />
          </section>

          {/* CTA */}
          <section className="text-center rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 px-6 py-12">
            <Layers className="w-10 h-10 text-violet-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">Ready to Confirm Your Pricing?</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Schedule a brief assessment so we can scope users, devices, sites, backup, network, and compliance needs —
              then confirm your exact ProActive Ecosystem investment.
            </p>
            <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white">
                Schedule Cyber Risk Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </section>
        </main>

        <DigeratiEnhancedFooterSection />
      </div>
    </div>
  );
}
