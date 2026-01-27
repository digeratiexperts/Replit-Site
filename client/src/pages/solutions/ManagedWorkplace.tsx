import { useState } from "react";
import { PageTemplate } from "@/components/PageTemplate";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { GuidedSalesPitch } from "@/components/GuidedSalesPitch";
import {
  Shield,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Laptop,
  Mail,
  UserPlus,
  UserMinus,
  Lock,
  Building2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Phone,
  FileText,
  Check,
  X,
  Star,
  Info,
  ExternalLink
} from "lucide-react";

const workplaceSalesPitchData = {
  corePitch: [
    "New hires ready in 1 day—not a week",
    "Offboarding completed in minutes with full access revocation",
    "One identity across all apps with SSO and MFA enforced",
    "Device compliance enforced automatically across all endpoints",
    "Complete visibility into SaaS sprawl and shadow IT"
  ],
  discoveryQuestions: [
    "How long does it currently take to onboard a new hire with full access?",
    "How quickly can you revoke all access when someone leaves?",
    "How many different apps do your users access daily?",
    "Are there gaps in your device security policies?",
    "Who manages identity and access today—is it someone's side job?"
  ],
  objections: [
    {
      objection: "We already have Microsoft/Google",
      response: "We manage them for you and extend with SSO, MFA, and device policies that go beyond the basics."
    },
    {
      objection: "Too much change at once",
      response: "We do phased rollouts and handle the migration—your team sees minimal disruption."
    },
    {
      objection: "We can manage this ourselves",
      response: "Focus on your business, not IT admin. We free up your team to do what they were hired for."
    }
  ],
  valueProof: [
    "90% reduction in onboarding time",
    "Zero orphan accounts after offboarding",
    "Complete audit trail for compliance",
    "Single pane of glass for all identity"
  ]
};

const workplaceData = {
  product: "Managed Workplace",
  pricing: { mode: "per_user", minimum_users: 5 },
  packages: [
    {
      sku: "workplace_essentials",
      name: "Workplace Essentials",
      starting_price: 165,
      best_for: "Small teams needing a secure, standardized baseline",
      includes: [
        "DE Identity & SSO",
        "MFA enforcement",
        "Device baseline policies",
        "Email/collab admin",
        "Basic onboarding/offboarding"
      ],
      outcomes: ["New hires ready in 1 day", "Consistent access controls"],
      not_included: ["Privileged access management", "Advanced DLP", "Custom compliance reporting", "Advanced conditional access"]
    },
    {
      sku: "workplace_business",
      name: "Workplace Business",
      starting_price: 195,
      best_for: "Growing teams needing governance and automation",
      featured: true,
      includes: [
        "Advanced conditional access",
        "App/license governance",
        "Workflow automation",
        "Quarterly business reviews",
        "Enhanced device compliance"
      ],
      outcomes: ["Reduced SaaS sprawl", "Offboarding in minutes"],
      not_included: ["PAM/privileged access", "Advanced DLP"]
    },
    {
      sku: "workplace_enterprise",
      name: "Workplace Enterprise",
      starting_price: null,
      best_for: "Regulated teams needing advanced controls + tailored policy",
      includes: [
        "Zero-trust policy set",
        "Continuous access reviews",
        "Advanced reporting cadence",
        "Custom integrations",
        "Optional PAM/DLP add-ons"
      ],
      outcomes: ["Audit-ready posture", "Least-privilege at scale"],
      not_included: []
    }
  ],
  addons: [
    { name: "Managed IT Help Desk", description: "Full support desk with SLA-backed response times" },
    { name: "Privileged Access Management", description: "Secure admin credentials with session recording" },
    { name: "Data Loss Prevention", description: "Prevent sensitive data exfiltration" },
    { name: "Advanced Email Security", description: "Enhanced phishing and malware protection" },
    { name: "vCIO/QBR Upgrades", description: "Strategic IT planning and executive reporting" }
  ],
  compareRows: [
    { feature: "Onboarding automation (HR→Identity→Apps)", essentials: true, business: true, enterprise: true },
    { feature: "Offboarding in minutes (full access revocation)", essentials: "basic", business: true, enterprise: true },
    { feature: "MFA + Conditional Access policies", essentials: "basic", business: "advanced", enterprise: "zero-trust" },
    { feature: "Device baseline + compliance policies", essentials: true, business: "enhanced", enterprise: "custom" },
    { feature: "App access + role mapping", essentials: true, business: true, enterprise: true },
    { feature: "License governance + audits", essentials: false, business: true, enterprise: true },
    { feature: "Email security baseline", essentials: true, business: true, enterprise: "advanced" },
    { feature: "Reporting cadence", essentials: "monthly", business: "quarterly QBR", enterprise: "custom" },
    { feature: "Admin change management / approvals", essentials: false, business: true, enterprise: true },
    { feature: "Integrations (HR/IdP/PSA)", essentials: "limited", business: "standard", enterprise: "custom" }
  ],
  faqs: [
    {
      question: "Do we need to replace our current tools?",
      answer: "Not necessarily. We work with your existing email and productivity platform, and can integrate with most HR systems and identity providers. Our goal is to enhance and standardize what you have, not force a complete overhaul."
    },
    {
      question: "Which email and productivity platforms do you support?",
      answer: "We support all major cloud productivity platforms fully—email administration, collaboration tools, file storage, retention policies, and security settings are all included in Managed Workplace."
    },
    {
      question: "What's the minimum user count?",
      answer: "Our minimum is 5 users. Pricing starts at $165/user/month for Workplace Essentials, with a minimum monthly commitment of $825."
    },
    {
      question: "How fast can you onboard/offboard?",
      answer: "New hires can be fully productive within 1 business day—with email, apps, SSO access, and device baseline configured. Offboarding takes minutes: we revoke all access, disable accounts, and transfer data per your policies."
    },
    {
      question: "What's included vs add-ons?",
      answer: "Core Workplace packages include identity, device baseline, email admin, app access, and onboarding automation. Add-ons include Managed IT Help Desk, Privileged Access Management (PAM), Data Loss Prevention (DLP), and Advanced Email Security."
    },
    {
      question: "Do you provide support, or just management?",
      answer: "Managed Workplace focuses on identity, devices, and app management. For full help desk support with SLAs, add our Managed IT Help Desk service. Many clients bundle both for complete coverage."
    }
  ]
};

const outcomes = [
  { icon: UserPlus, text: "New hires ready in 1 day", detail: "Email, SSO, apps, device baseline—all configured" },
  { icon: UserMinus, text: "Offboarding completed in minutes", detail: "Full access revocation, data transfer, audit trail" },
  { icon: Laptop, text: "Reduce tool sprawl", detail: "License + access governance across all SaaS apps" },
  { icon: Lock, text: "MFA + conditional access everywhere", detail: "Consistent login security for every user" },
  { icon: Zap, text: "Fewer support tickets", detail: "Standard baselines reduce endpoint issues" }
];

const howItWorks = [
  {
    step: 1,
    title: "Discovery Call",
    description: "15–25 minute call to understand your current tools, team size, and security requirements",
    icon: Phone
  },
  {
    step: 2,
    title: "Access & Inventory",
    description: "We assess your identity providers, devices, apps, and document your current state",
    icon: FileText
  },
  {
    step: 3,
    title: "Onboarding & Handoff",
    description: "We configure your environment, train your team, and take over ongoing management",
    icon: Users
  }
];

function CompareCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-emerald-400 mx-auto" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-white/30 mx-auto" />;
  }
  return <span className="text-sm text-white/80">{value}</span>;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: { question: string; answer: string; isOpen: boolean; onToggle: () => void; index: number }) {
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

export default function ManagedWorkplace() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pricingMode, setPricingMode] = useState<'per_user' | 'monthly'>('per_user');

  useSEO({
    title: "Managed Workplace - Identity, Devices & Apps Management | Digerati Experts",
    description: "We manage identity, devices, email, and app access so your staff stays productive and your business stays protected. New hires ready in 1 day.",
    canonical: "/solutions/managed-workplace"
  });

  const fadeInUp = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <PageTemplate 
      title="Managed Workplace" 
      subtitle="Identity, Devices & Apps Management"
    >
      <div className="space-y-24">
        {/* Hero Section */}
        <motion.section {...fadeInUp} className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-transparent rounded-3xl pointer-events-none" />
          <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Managed Workplace for{" "}
                <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  security-first teams
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl">
                We manage identity, devices, email, and app access so your staff stays productive—and your business stays protected. New hires ready in 1 day, not a week.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-violet-700 hover:bg-violet-50 font-semibold shadow-lg"
                  data-testid="btn-hero-consultation"
                >
                  <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  data-testid="btn-hero-packages"
                >
                  <a href="#packages">
                    See Packages & Pricing
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Shield className="w-4 h-4 text-violet-400" />
                  <span>Zero-trust access policies</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <UserPlus className="w-4 h-4 text-violet-400" />
                  <span>Onboarding automation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Laptop className="w-4 h-4 text-violet-400" />
                  <span>Standardized device baseline</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Guided Sales Pitch */}
        <motion.section {...fadeInUp}>
          <GuidedSalesPitch data={workplaceSalesPitchData} />
        </motion.section>

        {/* Outcomes Section */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Measurable Business Outcomes</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              What you actually get with Managed Workplace—not just features, but results
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <outcome.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{outcome.text}</h3>
                    <p className="text-white/60 text-sm">{outcome.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/60">Three simple steps to a managed workplace</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <step.icon className="w-8 h-8 text-violet-400 mx-auto mb-4" />
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
        </motion.section>

        {/* Packages Section */}
        <motion.section {...fadeInUp} id="packages" className="scroll-mt-32">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Package</h2>
            <p className="text-white/60 mb-6">Clear pricing, clear inclusions. Pick what fits your team.</p>
            
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1">
              <button
                onClick={() => setPricingMode('per_user')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  pricingMode === 'per_user' 
                    ? 'bg-violet-600 text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
                data-testid="btn-pricing-per-user"
              >
                Per User/Month
              </button>
              <button
                onClick={() => setPricingMode('monthly')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  pricingMode === 'monthly' 
                    ? 'bg-violet-600 text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
                data-testid="btn-pricing-monthly"
              >
                Monthly Minimum
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {workplaceData.packages.map((pkg, index) => (
              <motion.div
                key={pkg.sku}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${
                  pkg.featured 
                    ? 'border-2 border-violet-500 bg-gradient-to-b from-violet-600/20 to-transparent' 
                    : 'border border-white/10 bg-white/[0.02]'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute top-0 left-0 right-0 bg-violet-600 text-white text-center text-sm py-1 font-medium">
                    <Star className="w-4 h-4 inline mr-1" /> Most Popular
                  </div>
                )}
                <div className={`p-8 ${pkg.featured ? 'pt-12' : ''}`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-white/60 text-sm mb-6">{pkg.best_for}</p>
                  
                  <div className="mb-6">
                    {pkg.starting_price ? (
                      <>
                        <div className="text-4xl font-bold text-white">
                          {pricingMode === 'per_user' 
                            ? `$${pkg.starting_price}` 
                            : `$${pkg.starting_price * 5}`
                          }
                          <span className="text-lg font-normal text-white/60">
                            {pricingMode === 'per_user' ? '/user/mo' : '/mo'}
                          </span>
                        </div>
                        <p className="text-white/50 text-sm mt-1">
                          {pricingMode === 'per_user' 
                            ? `Min ${workplaceData.pricing.minimum_users} users ($${pkg.starting_price * 5}/mo)` 
                            : `Includes ${workplaceData.pricing.minimum_users} users ($${pkg.starting_price}/user)`
                          }
                        </p>
                      </>
                    ) : (
                      <div className="text-3xl font-bold text-white">Custom Pricing</div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    {pkg.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 mb-6">
                    <p className="text-sm text-white/60 mb-2">Key Outcomes:</p>
                    {pkg.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-violet-300">
                        <Sparkles className="w-4 h-4" />
                        {outcome}
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className={`w-full ${
                      pkg.featured 
                        ? 'bg-white text-violet-700 hover:bg-violet-50' 
                        : 'bg-violet-600 text-white hover:bg-violet-500'
                    }`}
                    data-testid={`btn-package-${pkg.sku}`}
                  >
                    <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                      {pkg.starting_price ? 'Get Started' : 'Contact Sales'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  {pkg.not_included && pkg.not_included.length > 0 && (
                    <p className="text-xs text-white/40 mt-4 text-center">
                      <Info className="w-3 h-3 inline mr-1" />
                      Not included: {pkg.not_included.slice(0, 2).join(', ')}
                      {pkg.not_included.length > 2 && ` +${pkg.not_included.length - 2} more`}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Compare Section */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Compare Packages</h2>
            <p className="text-white/60">See exactly what's included at each tier</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" data-testid="compare-table">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/60 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Essentials</th>
                  <th className="text-center py-4 px-4 text-white font-semibold bg-violet-600/20">Business</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {workplaceData.compareRows.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-4 px-4 text-white/80 text-sm">{row.feature}</td>
                    <td className="py-4 px-4 text-center"><CompareCell value={row.essentials} /></td>
                    <td className="py-4 px-4 text-center bg-violet-600/10"><CompareCell value={row.business} /></td>
                    <td className="py-4 px-4 text-center"><CompareCell value={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-6">
            <a 
              href="/ecosystem-pricing" 
              className="text-violet-400 hover:text-violet-300 text-sm inline-flex items-center gap-1"
              data-testid="link-full-matrix"
            >
              View full service matrix
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.section>

        {/* Add-ons Section */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Available Add-ons</h2>
            <p className="text-white/60">Extend your Workplace package with these optional services</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {workplaceData.addons.map((addon, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:border-violet-500/50 transition-colors"
              >
                <h3 className="text-white font-semibold mb-2">{addon.name}</h3>
                <p className="text-white/60 text-sm">{addon.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQs */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60">Common questions about Managed Workplace</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-3">
            {workplaceData.faqs.map((faq, index) => (
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

        {/* What Happens After You Book */}
        <motion.section {...fadeInUp}>
          <div className="bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-transparent rounded-2xl border border-white/10 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What Happens After You Book?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Discovery Call</h3>
                <p className="text-white/60 text-sm">15–25 min call to understand your tools, team, and goals</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Access & Inventory</h3>
                <p className="text-white/60 text-sm">We document your current state and create an action plan</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Onboarding Timeline</h3>
                <p className="text-white/60 text-sm">Clear responsibilities and milestones for go-live</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section {...fadeInUp}>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] pointer-events-none" />
            <div className="relative py-16 px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Simplify Your Workplace?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Book a consultation to discuss your team's needs. Get a quote within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-violet-700 hover:bg-violet-50 font-semibold shadow-lg"
                  data-testid="btn-final-consultation"
                >
                  <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
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
    </PageTemplate>
  );
}
