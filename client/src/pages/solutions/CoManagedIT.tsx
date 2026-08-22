import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PageTemplate } from "@/components/PageTemplate";
import { IconWell } from "@/components/visual/IconWell";
import { Button } from "@/components/ui/button";
import { CTA } from "@/lib/ctaCopy";
import {
  ChevronDown, ChevronUp, Monitor, Check, Phone, ArrowRight, Users,
  AlertTriangle, Info, Zap, Package, Laptop, Settings, Headphones, Network,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { PRIMARY_PHONE } from "@/data/companyContact";

type EngagementMode = "collaboration" | "kits";
type Ownership = "de" | "client" | "shared";

interface CollaborationRow {
  capability: string;
  owner: Ownership;
  description?: string;
}

interface KitsRow {
  capability: string;
  status: "included" | "optional";
  tooltip?: string;
}

interface RACIRow {
  responsibility: string;
  de: string;
  client: string;
}

const collaborationMatrix: CollaborationRow[] = [
  { capability: "Shared ticketing + escalation rules", owner: "shared", description: "Joint queue with clear escalation paths" },
  { capability: "Monitoring & alerting", owner: "de", description: "24/7 monitoring of agreed systems" },
  { capability: "Patching & updates", owner: "de", description: "Automated patching within maintenance windows" },
  { capability: "Identity/access changes", owner: "shared", description: "Coordination on user provisioning" },
  { capability: "Network changes", owner: "shared", description: "Joint review for infrastructure changes" },
  { capability: "Security incident triage", owner: "de", description: "First response and containment" },
  { capability: "Vendor coordination", owner: "shared", description: "Joint vendor management" },
  { capability: "Reporting cadence", owner: "de", description: "Quarterly or monthly deliverable" }
];

const kitsMatrix: KitsRow[] = [
  { capability: "Provisioning & enrollment", status: "included" },
  { capability: "Baseline security configuration", status: "included" },
  { capability: "Monitoring & alerting", status: "included" },
  { capability: "Patch management", status: "included" },
  { capability: "Endpoint threat protection baseline", status: "included" },
  { capability: "Email/account security alignment", status: "included", tooltip: "If client allows access" },
  { capability: "Backup configuration for the device", status: "optional" },
  { capability: "Restore support", status: "optional" },
  { capability: "After-hours monitoring", status: "optional" },
  { capability: "Onsite setup", status: "optional", tooltip: "Where available" }
];

const raciPreview: RACIRow[] = [
  { responsibility: "User onboarding/offboarding", de: "Support", client: "Approve" },
  { responsibility: "Device patching", de: "Responsible", client: "Informed" },
  { responsibility: "Account access requests", de: "Consult", client: "Approve" },
  { responsibility: "Network changes", de: "Consult", client: "Responsible" },
  { responsibility: "Security incident triage", de: "Responsible", client: "Informed" },
  { responsibility: "Vendor coordination", de: "Support", client: "Responsible" },
  { responsibility: "Backups/restores", de: "Responsible", client: "Informed" }
];

const kitsSteps = [
  { 
    step: 1, 
    title: "Pick the kit", 
    description: "Choose laptop, workstation, or network kit + define service scope",
    icon: Package
  },
  { 
    step: 2, 
    title: "We pre-configure", 
    description: "Baseline security, access controls, and monitoring enrollment",
    icon: Settings
  },
  { 
    step: 3, 
    title: "We manage that system", 
    description: "Updates, alerts, support lane, and secure offboarding",
    icon: Headphones
  }
];

const faqs = [
  {
    question: "What's the difference between Collaboration and Kits?",
    answer: "Collaboration is a joint effort—you have internal IT or another vendor, and we integrate with defined roles. Kits is simpler: you buy a device/kit from us, and we manage only that system with a defined scope."
  },
  {
    question: "Can I start with Kits and expand to Collaboration later?",
    answer: "Yes. Many clients start with a Co-Managed Kit for a specific need (e.g., a secure laptop for an executive), then expand to Collaboration as trust builds."
  },
  {
    question: "How do you define 'who does what'?",
    answer: "We create a Responsibility Matrix (RACI) during onboarding. It documents who owns each domain—onboarding, patching, incidents, vendor comms—so there's no confusion."
  },
  {
    question: "What if we don't have internal IT?",
    answer: "If you have no internal IT, you likely need our Office or Business tier instead of Co-Managed. Co-Managed assumes you have someone on your side to coordinate with."
  },
  {
    question: "What devices can you ship as Co-Managed Kits?",
    answer: "Secure laptops, high-performance workstations, network kits (router + firewall + Wi-Fi), and MFA hardware keys. All ship pre-configured and enrollment-ready."
  },
  {
    question: "Is there a minimum commitment?",
    answer: "Collaboration typically requires a 12-month agreement. Kits can be month-to-month after the initial setup, depending on the service scope."
  }
];

const outcomes = [
  { stat: "Joint", label: "coverage with your existing IT" },
  { stat: "24/7", label: "monitoring on agreed systems" },
  { stat: "Clear", label: "RACI so ownership is written down" }
];

function OwnershipBadge({ owner }: { owner: Ownership }) {
  const config = {
    de: { bg: "bg-de-raised", text: "text-de-accent-ink", border: "border-de-hairline", label: "DE-owned" },
    client: { bg: "bg-de-bg", text: "text-white/80", border: "border-de-hairline", label: "Client-owned" },
    shared: { bg: "bg-de-bg", text: "text-white/80", border: "border-[#D3126A]/40", label: "Shared" }
  };
  const { bg, text, border, label } = config[owner];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg} ${text} border ${border}`}>
      {label}
    </span>
  );
}

function StatusBadge({ status, tooltip }: { status: "included" | "optional"; tooltip?: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = {
    included: { bg: "bg-de-raised", text: "text-de-accent-ink", border: "border-de-hairline", label: "Included", icon: <Check className="w-3 h-3" /> },
    optional: { bg: "bg-de-bg", text: "text-white/70", border: "border-de-hairline", label: "Add-On", icon: <Zap className="w-3 h-3" /> }
  };
  const { bg, text, border, label, icon } = config[status];
  
  return (
    <div className="relative inline-block">
      <span 
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg} ${text} border ${border} cursor-default`}
        onMouseEnter={() => tooltip && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {icon}
        {label}
        {tooltip && <Info className="w-3 h-3 ml-0.5 opacity-60" />}
      </span>
      {showTooltip && tooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-white/20 rounded-lg text-xs text-white/80 whitespace-nowrap shadow-xl">
          {tooltip}
        </div>
      )}
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onToggle, index }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onToggle: () => void; 
  index: number 
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-de-hairline bg-de-raised">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left hover:bg-de-bg/60 transition-colors"
        aria-expanded={isOpen}
        data-testid={`faq-toggle-${index}`}
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-de-accent-ink flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-de-accent-ink flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-white/70 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

function StickyCTA() {
  return (
    <div className="mt-16 rounded-2xl border border-de-hairline bg-de-raised p-4 md:p-5">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-de-accent-ink" />
          <span className="font-medium text-white">Co-Managed IT</span>
          <span className="hidden text-sm text-white/60 sm:inline">Augment your team or manage a single kit</span>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10" data-testid="btn-sticky-quote">
            <a href="#kits">Request Kit Quote</a>
          </Button>
          <Button asChild variant="brand" size="sm" className="font-semibold" data-testid="btn-sticky-consultation">
            <a href="/book">
              {CTA.primary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CoManagedIT() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [engagementMode, setEngagementMode] = useState<EngagementMode>("collaboration");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Co-Managed IT - Augment Your Team or Manage a Single Kit | Digerati Experts",
    description: "Two ways to co-manage: partner with your internal IT team for joint coverage, or buy a pre-configured device/kit and let us manage just that system. Clear roles, no confusion.",
    canonical: "/solutions/co-managed-it"
  });

  const fadeInUp = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <PageTemplate
      title="Co-Managed IT"
      subtitle="Your team + our expertise = higher maturity without hiring. Already have internal IT? We integrate, define roles, and take ownership of agreed domains. Or just need one device managed? We ship it pre-configured and manage only that system."
      breadcrumbs={[{ label: "Solutions", href: "/solutions" }, { label: "Co-Managed IT" }]}
      actions={
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="lg" className="h-12 px-6 font-semibold" data-testid="btn-hero-consultation">
            <a href="/book">
              {CTA.primary}
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 border-white/20 px-6 font-semibold text-white hover:bg-white/10" data-testid="btn-hero-quote">
            <a href="#kits">Request a Kit Quote</a>
          </Button>
        </div>
      }
    >
      <ServiceJsonLd
        name="Co-Managed IT"
        description="Augment your internal IT team or let us manage a single device kit. Clear roles, joint coverage, no confusion."
        url="/solutions/co-managed-it"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Solutions", url: "/solutions" },
        { name: "Co-Managed IT", url: "/solutions/co-managed-it" }
      ]} />
      <div className="space-y-20">
          <div className="flex flex-wrap gap-3">
            {outcomes.map((outcome) => (
              <div key={outcome.label} className="rounded-xl border border-de-hairline bg-de-raised px-4 py-3">
                <span className="text-lg font-semibold text-white">{outcome.stat}</span>
                <span className="ml-2 text-sm text-white/60">{outcome.label}</span>
              </div>
            ))}
          </div>

          {/* Two Ways to Co-Manage */}
          <motion.section {...fadeInUp}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Two Ways to Co-Manage</h2>
              <p className="text-white/60">Choose the engagement model that matches your reality</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card A: Collaboration */}
              <div className="de-interactive-card rounded-2xl border border-de-hairline bg-de-raised p-8">
                <div className="flex items-center gap-3 mb-4">
                  <IconWell icon={Users} size="md" surface="dark" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Co-Managed Collaboration</h3>
                    <p className="text-de-accent-ink text-sm">Joint effort with internal IT</p>
                  </div>
                </div>
                <p className="text-white/70 mb-6">
                  You have internal IT (or another vendor). We integrate, define roles, and take ownership of agreed domains.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-de-accent-ink flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Shared queue + escalation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-de-accent-ink flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Clear responsibility matrix (RACI)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-de-accent-ink flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">After-hours + Tier 2/3 depth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-de-accent-ink flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Quarterly posture / roadmap check-ins</span>
                  </li>
                </ul>
                <Button asChild variant="brand" className="w-full font-semibold" data-testid="btn-card-collaboration">
                  <a href="/book">
                    Discuss Collaboration Model
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Card B: Kits */}
              <div className="de-interactive-card rounded-2xl border border-de-hairline bg-de-raised p-8" id="kits">
                <div className="flex items-center gap-3 mb-4">
                  <IconWell icon={Package} size="md" surface="dark" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Co-Managed Kits</h3>
                    <p className="text-sm text-de-accent-ink">Single system / drop-ship</p>
                  </div>
                </div>
                <p className="text-white/70 mb-6">
                  You buy a device or pre-built kit from us. We manage <strong>only that system</strong> with a defined service scope.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-de-accent-ink flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Pre-configured + shipped to site/user</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-de-accent-ink flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Remote onboarding + baseline hardening</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-de-accent-ink flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Monitoring + patching + protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-de-accent-ink flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Optional onsite setup (where available)</span>
                  </li>
                </ul>
                <Button asChild variant="brand" className="w-full font-semibold" data-testid="btn-card-kits">
                  <a href="/book">
                    Request Kit Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.section>

          {/* How Co-Managed Kits Work */}
          <motion.section {...fadeInUp}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">How Co-Managed Kits Work</h2>
              <p className="text-white/60">Simple, scoped, and secure</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {kitsSteps.map((step, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="h-full rounded-xl border border-de-hairline bg-de-raised p-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-de-hairline bg-de-bg">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <step.icon className="mx-auto mb-4 h-8 w-8 text-de-accent-ink" />
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-white/60">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-white/20" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-de-hairline bg-de-bg p-4 text-center">
              <p className="text-sm text-white/75">
                <AlertTriangle className="mr-2 inline h-4 w-4 text-de-accent-ink" />
                <strong>Scope note:</strong> This model covers only the shipped systems unless you expand scope.
              </p>
            </div>
          </motion.section>

          {/* Matrix Toggle */}
          <motion.section {...fadeInUp}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Service Matrix</h2>
              <p className="text-white/60 mb-6">What's covered in each engagement model</p>
              
              {/* Toggle */}
              <div className="inline-flex rounded-xl border border-de-hairline bg-de-bg p-1">
                <button
                  onClick={() => setEngagementMode("collaboration")}
                  className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
                    engagementMode === "collaboration"
                      ? "bg-[#D3126A] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                  data-testid="btn-mode-collaboration"
                >
                  Collaboration
                </button>
                <button
                  onClick={() => setEngagementMode("kits")}
                  className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
                    engagementMode === "kits"
                      ? "bg-[#D3126A] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                  data-testid="btn-mode-kits"
                >
                  Kits
                </button>
              </div>
            </div>

            {engagementMode === "collaboration" ? (
              <div className="overflow-hidden rounded-xl border border-de-hairline bg-de-raised">
                <div className="border-b border-de-hairline bg-de-bg px-6 py-4">
                  <h3 className="font-semibold text-white">Collaboration Co-Managed</h3>
                  <p className="text-white/60 text-sm">Joint effort with internal IT — clear ownership per domain</p>
                </div>
                <div className="divide-y divide-white/10">
                  {collaborationMatrix.map((row, index) => (
                    <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-de-bg/50">
                      <div>
                        <span className="text-white">{row.capability}</span>
                        {row.description && (
                          <p className="text-white/50 text-xs mt-0.5">{row.description}</p>
                        )}
                      </div>
                      <OwnershipBadge owner={row.owner} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-de-hairline bg-de-raised">
                <div className="border-b border-de-hairline bg-de-bg px-6 py-4">
                  <h3 className="font-semibold text-white">Co-Managed Kits (Device/Kit-only)</h3>
                  <p className="text-sm text-white/60">What we manage on the shipped system</p>
                </div>
                <div className="divide-y divide-de-hairline">
                  {kitsMatrix.map((row, index) => (
                    <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-de-bg/50">
                      <span className="text-white">{row.capability}</span>
                      <StatusBadge status={row.status} tooltip={row.tooltip} />
                    </div>
                  ))}
                </div>
                <div className="border-t border-de-hairline bg-de-bg px-6 py-3">
                  <p className="text-sm text-white/70">
                    This covers shipped devices/kits only. Company-wide IT is outside scope unless contracted.
                  </p>
                </div>
              </div>
            )}
          </motion.section>

          {/* RACI Preview */}
          <motion.section {...fadeInUp}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Roles & Responsibilities</h2>
              <p className="text-white/60">Clear RACI matrix prevents finger-pointing</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-de-hairline bg-de-raised">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-de-hairline bg-de-bg">
                    <th className="px-6 py-4 text-left font-semibold text-white">Responsibility</th>
                    <th className="px-4 py-4 text-center font-semibold text-de-accent-ink">DE</th>
                    <th className="px-4 py-4 text-center font-semibold text-white/80">Client</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-de-hairline">
                  {raciPreview.map((row, index) => (
                    <tr key={index} className="hover:bg-de-bg/50">
                      <td className="px-6 py-3 text-white/80">{row.responsibility}</td>
                      <td className="px-4 py-3 text-center text-sm text-de-accent-ink">{row.de}</td>
                      <td className="px-4 py-3 text-center text-sm text-white/70">{row.client}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10" data-testid="btn-download-raci">
                <a href="/book">
                  Request Full RACI Template
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.section>

          {/* Kit Options Preview */}
          <motion.section {...fadeInUp}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Available Kits</h2>
              <p className="text-white/60">Pre-configured, security-hardened, ready to ship</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="de-interactive-card rounded-xl border border-de-hairline bg-de-raised p-6">
                <IconWell icon={Laptop} size="md" surface="dark" className="mb-4" />
                <h3 className="mb-2 text-lg font-semibold text-white">Secure Laptops</h3>
                <p className="mb-4 text-sm text-white/60">Refurbished, baseline-hardened laptops with identity access controls and endpoint protection.</p>
                <p className="font-semibold text-de-accent-ink">Starting at $495</p>
              </div>
              <div className="de-interactive-card rounded-xl border border-de-hairline bg-de-raised p-6">
                <IconWell icon={Monitor} size="md" surface="dark" className="mb-4" />
                <h3 className="mb-2 text-lg font-semibold text-white">Workstations</h3>
                <p className="mb-4 text-sm text-white/60">High-performance systems for finance, design, and data-heavy workflows. Dual-monitor ready.</p>
                <p className="font-semibold text-de-accent-ink">Starting at $650</p>
              </div>
              <div className="de-interactive-card rounded-xl border border-de-hairline bg-de-raised p-6">
                <IconWell icon={Network} size="md" surface="dark" className="mb-4" />
                <h3 className="mb-2 text-lg font-semibold text-white">Network Kits</h3>
                <p className="mb-4 text-sm text-white/60">Business-class router, firewall, and Wi-Fi access points. Segmented networks, threat monitoring.</p>
                <p className="font-semibold text-de-accent-ink">Starting at $999/site</p>
              </div>
            </div>
          </motion.section>

          {/* FAQs */}
          <motion.section {...fadeInUp}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  index={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </motion.section>

          {/* Sales Pitch Section */}
          {/* Final CTA */}
          <motion.section {...fadeInUp} className="rounded-2xl border border-de-hairline bg-de-raised p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Augment Your IT?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
              Schedule a consultation. We'll assess your situation and recommend the right co-managed model.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="brand" size="lg" className="h-12 px-8 font-semibold" data-testid="btn-final-consultation">
                <a href="/book">
                  {CTA.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 border-white/20 px-8 font-semibold text-white hover:bg-white/10" data-testid="btn-final-call">
                <a href={PRIMARY_PHONE.telHref}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call {PRIMARY_PHONE.display}
                </a>
              </Button>
            </div>
          </motion.section>
          <StickyCTA />
      </div>
    </PageTemplate>
  );
}
