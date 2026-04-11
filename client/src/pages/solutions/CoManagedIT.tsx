import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, ChevronUp, Shield, Monitor, Cloud, Key,
  Check, X, Phone, ArrowRight, Users, Building2, Clock,
  FileCheck, HelpCircle, AlertTriangle, Info, Zap,
  Package, Laptop, Settings, Truck, Headphones, Download,
  BarChart3, UserCheck, Network, RefreshCw, Lock
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { GuidedSalesPitch } from "@/components/GuidedSalesPitch";

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

const coManagedSalesPitchData = {
  corePitch: [
    "Fill skill gaps without full-time hires—get specialized expertise on demand",
    "24/7 coverage without burning out your internal team",
    "Clear RACI matrix—everyone knows who owns what",
    "Stack-native integration with your existing tools and processes",
    "Start with Kits, expand to full Collaboration—scale at your pace",
    "Your IT team stays in control while we handle the heavy lifting"
  ],
  discoveryQuestions: [
    "Where does your IT team spend most of their time—strategic work or firefighting?",
    "What happens when your senior IT person is on vacation or leaves?",
    "Do you have 24/7 monitoring, or are incidents discovered in the morning?",
    "Which specialized skills are hardest to hire for—security, cloud, compliance?",
    "How often do projects stall because your team is pulled into support?"
  ],
  objections: [
    {
      objection: "We already have internal IT",
      response: "Great—we don't replace them, we augment them. Clear RACI means no confusion. Your team focuses on what they do best; we handle the rest."
    },
    {
      objection: "We don't want to give up control",
      response: "You keep full control. We work under your direction with defined scope. Think of us as an extension of your team, not a replacement."
    },
    {
      objection: "Our IT person handles everything",
      response: "What happens when they're out? Or when they need specialized skills? Co-Managed means coverage without the single-point-of-failure risk."
    },
    {
      objection: "It's too expensive to add more IT support",
      response: "Compare it to hiring: salary, benefits, training, turnover. Co-Managed gives you flexible expertise at a fraction of the cost."
    }
  ],
  valueProof: [
    "RACI matrix included—no ambiguity about responsibilities",
    "24/7 monitoring coverage without overtime costs",
    "Specialized expertise available without hiring full-time",
    "Kits option for project-based or device-specific management",
    "Quarterly posture meetings keep everyone aligned"
  ]
};

const outcomes = [
  { stat: "30–50%", label: "fewer interruptions after 60–90 days" },
  { stat: "24/7", label: "coverage without hiring more staff" },
  { stat: "Clear", label: "roles = no finger-pointing" }
];

function OwnershipBadge({ owner }: { owner: Ownership }) {
  const config = {
    de: { bg: "bg-violet-500/20", text: "text-violet-300", border: "border-violet-500/30", label: "DE-owned" },
    client: { bg: "bg-amber-500/20", text: "text-amber-300", border: "border-amber-500/30", label: "Client-owned" },
    shared: { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/30", label: "Shared" }
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
    included: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30", label: "Included", icon: <Check className="w-3 h-3" /> },
    optional: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30", label: "Add-On", icon: <Zap className="w-3 h-3" /> }
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
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
        data-testid={`faq-toggle-${index}`}
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-violet-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-violet-400 flex-shrink-0" />
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-violet-400" />
          <span className="text-white font-medium">Co-Managed IT</span>
          <span className="text-white/60 text-sm hidden sm:inline">Augment your team or manage a single kit</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="bg-transparent border border-white/20 text-white hover:bg-white/10"
            data-testid="btn-sticky-quote"
          >
            <a href="#kits">Request Kit Quote</a>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-white text-violet-700 hover:bg-violet-50 font-semibold"
            data-testid="btn-sticky-consultation"
          >
            <a href="/book">
              Schedule Consult
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
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      <MegaMenu />
      
      <main className="relative pt-32 pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Hero Section */}
          <motion.section {...fadeInUp} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/10 to-transparent rounded-3xl pointer-events-none" />
            <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
                  <Users className="w-4 h-4" />
                  Flexible engagement models
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Co-Managed IT
                  <span className="block text-2xl md:text-3xl font-normal text-white/70 mt-2">
                    Your team + our expertise = higher maturity without hiring
                  </span>
                </h1>
                
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  Already have internal IT? We integrate, define roles, and take ownership of agreed domains. 
                  Or just need one device managed? We ship it pre-configured and manage only that system.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-violet-700 hover:bg-violet-50 font-semibold shadow-lg"
                    data-testid="btn-hero-consultation"
                  >
                    <a href="/book">
                      Schedule Co-Managed Consult
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    data-testid="btn-hero-quote"
                  >
                    <a href="#kits">Request a Kit Quote</a>
                  </Button>
                </div>

                {/* Outcomes KPIs */}
                <div className="flex flex-wrap gap-4">
                  {outcomes.map((outcome, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                      <span className="text-2xl font-bold text-white">{outcome.stat}</span>
                      <span className="text-white/60 text-sm ml-2">{outcome.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Two Ways to Co-Manage */}
          <motion.section {...fadeInUp}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Two Ways to Co-Manage</h2>
              <p className="text-white/60">Choose the engagement model that matches your reality</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card A: Collaboration */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Co-Managed Collaboration</h3>
                    <p className="text-violet-300 text-sm">Joint effort with internal IT</p>
                  </div>
                </div>
                <p className="text-white/70 mb-6">
                  You have internal IT (or another vendor). We integrate, define roles, and take ownership of agreed domains.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Shared queue + escalation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Clear responsibility matrix (RACI)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">After-hours + Tier 2/3 depth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Quarterly posture / roadmap check-ins</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-violet-600 text-white hover:bg-violet-500"
                  data-testid="btn-card-collaboration"
                >
                  <a href="/book">
                    Discuss Collaboration Model
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Card B: Kits */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors" id="kits">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Co-Managed Kits</h3>
                    <p className="text-amber-300 text-sm">Single system / drop-ship</p>
                  </div>
                </div>
                <p className="text-white/70 mb-6">
                  You buy a device or pre-built kit from us. We manage <strong>only that system</strong> with a defined service scope.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Pre-configured + shipped to site/user</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Remote onboarding + baseline hardening</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Monitoring + patching + protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Optional onsite setup (where available)</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-amber-500 text-gray-900 hover:bg-amber-400 font-semibold"
                  data-testid="btn-card-kits"
                >
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
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <step.icon className="w-8 h-8 text-amber-400 mx-auto mb-4" />
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
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6 text-center">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
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
              <div className="inline-flex bg-white/5 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setEngagementMode("collaboration")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    engagementMode === "collaboration" 
                      ? "bg-violet-600 text-white" 
                      : "text-white/60 hover:text-white"
                  }`}
                  data-testid="btn-mode-collaboration"
                >
                  Collaboration
                </button>
                <button
                  onClick={() => setEngagementMode("kits")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    engagementMode === "kits" 
                      ? "bg-amber-500 text-gray-900" 
                      : "text-white/60 hover:text-white"
                  }`}
                  data-testid="btn-mode-kits"
                >
                  Kits
                </button>
              </div>
            </div>

            {engagementMode === "collaboration" ? (
              <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-violet-600/20 border-b border-white/10 px-6 py-4">
                  <h3 className="font-semibold text-white">Collaboration Co-Managed</h3>
                  <p className="text-white/60 text-sm">Joint effort with internal IT — clear ownership per domain</p>
                </div>
                <div className="divide-y divide-white/10">
                  {collaborationMatrix.map((row, index) => (
                    <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02]">
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
              <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-amber-500/20 border-b border-white/10 px-6 py-4">
                  <h3 className="font-semibold text-white">Co-Managed Kits (Device/Kit-only)</h3>
                  <p className="text-white/60 text-sm">What we manage on the shipped system</p>
                </div>
                <div className="divide-y divide-white/10">
                  {kitsMatrix.map((row, index) => (
                    <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02]">
                      <span className="text-white">{row.capability}</span>
                      <StatusBadge status={row.status} tooltip={row.tooltip} />
                    </div>
                  ))}
                </div>
                <div className="bg-amber-500/10 border-t border-amber-500/30 px-6 py-3">
                  <p className="text-amber-300 text-sm">
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
            <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="text-left px-6 py-4 text-white font-semibold">Responsibility</th>
                    <th className="text-center px-4 py-4 text-violet-300 font-semibold">DE</th>
                    <th className="text-center px-4 py-4 text-amber-300 font-semibold">Client</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {raciPreview.map((row, index) => (
                    <tr key={index} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-3 text-white/80">{row.responsibility}</td>
                      <td className="px-4 py-3 text-center text-violet-300 text-sm">{row.de}</td>
                      <td className="px-4 py-3 text-center text-amber-300 text-sm">{row.client}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4">
              <Button
                className="bg-transparent border border-white/20 text-white hover:bg-white/10"
                data-testid="btn-download-raci"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Full RACI Template
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
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center mb-4">
                  <Laptop className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Secure Laptops</h3>
                <p className="text-white/60 text-sm mb-4">Refurbished, baseline-hardened laptops with identity access controls and endpoint protection.</p>
                <p className="text-amber-400 font-semibold">Starting at $495</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center mb-4">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Workstations</h3>
                <p className="text-white/60 text-sm mb-4">High-performance systems for finance, design, and data-heavy workflows. Dual-monitor ready.</p>
                <p className="text-amber-400 font-semibold">Starting at $650</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center mb-4">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Network Kits</h3>
                <p className="text-white/60 text-sm mb-4">Business-class router, firewall, and Wi-Fi access points. Segmented networks, threat monitoring.</p>
                <p className="text-amber-400 font-semibold">Starting at $999/site</p>
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
          <section className="py-16 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
              <GuidedSalesPitch data={coManagedSalesPitchData} />
            </div>
          </section>

          {/* Final CTA */}
          <motion.section {...fadeInUp}>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 opacity-90" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] pointer-events-none" />
              <div className="relative py-16 px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Augment Your IT?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Schedule a consultation. We'll assess your situation and recommend the right co-managed model.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-violet-700 hover:bg-violet-50 font-semibold shadow-lg"
                    data-testid="btn-final-consultation"
                  >
                    <a href="/book">
                      Schedule Co-Managed Consult
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-transparent border border-white/30 text-white hover:bg-white/10"
                    data-testid="btn-final-call"
                  >
                    <a href="tel:325-480-9870">
                      <Phone className="mr-2 h-5 w-5" />
                      Call 325-480-9870
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <StickyCTA />
      <DigeratiEnhancedFooterSection />
    </div>
  );
}
