import { motion, useReducedMotion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  Cloud,
  FileCheck,
  Headphones,
  Layers,
  Lock,
  Monitor,
  Phone,
  RefreshCw,
  Shield,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { pricingTiers, getPricingFooterText } from "@/data/pricing";
import { IconWell } from "@/components/visual/IconWell";
import { PRIMARY_PHONE } from "@/data/companyContact";
import { CTA } from "@/lib/ctaCopy";
import { StatementHeading } from "@/components/visual/StatementHeading";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import { revealInView, revealInitial, revealTransition, revealViewport } from "@/lib/animations";
import { ProofChip } from "@/components/evidence/ProofChip";
import { IncidentFlow } from "@/components/evidence/IncidentFlow";

const SolutionsIndex = () => {
  const prefersReducedMotion = useReducedMotion();

  useSEO({
    title: "Managed IT & Security Solutions",
    description: "Comprehensive managed IT and cybersecurity solutions. Network security, endpoint protection, cloud security, compliance support, and 24/7 monitoring for Arizona businesses.",
    canonical: "/solutions",
  });

  const plans = pricingTiers.map((tier) => ({
    name: tier.name,
    tier: tier.label,
    price: tier.user,
    monthlyMinimum: tier.monthlyMinimum,
    description: tier.idealBuyer,
    features: [...tier.inclusions],
    learnMoreUrl: tier.learnMoreUrl,
  }));

  const foundationServices = [
    {
      icon: Headphones,
      title: "Service Desk & Support",
      description: "Fast help for day-to-day issues, questions, and requests—plus escalation when it's more complex. Response targets are defined in your service agreement.",
    },
    {
      icon: Wifi,
      title: "Managed Network Security",
      description: "We review your router/firewall, Wi-Fi, and switches. Identify risks, provide upgrade timelines, and handle ongoing monitoring, updates, and security settings.",
    },
    {
      icon: Monitor,
      title: "Device & User Management",
      description: "We manage users, devices, access, and standard configurations. Onboarding and offboarding handled securely and consistently.",
    },
    {
      icon: Activity,
      title: "Monitoring & Maintenance",
      description: "Always-on monitoring and proactive maintenance to reduce downtime and surface issues that need attention.",
    },
    {
      icon: RefreshCw,
      title: "Updates & Patch Management",
      description: "Operating systems and core apps kept current. Security patches are managed to reduce vulnerability windows.",
    },
    {
      icon: Shield,
      title: "Security Settings Management",
      description: "Baseline hardening and secure configuration management. Consistent security posture maintained over time.",
    },
  ];

  const securityServices = [
    {
      icon: Lock,
      title: "24/7 Human-Led Monitoring",
      description: "Human-led monitoring through the security operations stack selected for the client environment.",
      tier: "Business+",
    },
    {
      icon: Zap,
      title: "Threat Detection & Response",
      description: "Detection and response capabilities are matched to the environment; containment and remediation depend on the deployed controls and authorized actions.",
      tier: "Business+",
    },
    {
      icon: Users,
      title: "Security Awareness Training",
      description: "Ongoing phishing simulations and training designed to improve how staff recognize and respond to common threats.",
      tier: "Business+",
    },
    {
      icon: Cloud,
      title: "Backup & Disaster Recovery",
      description: "Continuity, restore testing, and DR planning. Operating depth increases at Business and Enterprise — Office includes endpoint backup; IT does not include backup by default.",
      tier: "Business+",
    },
  ];

  const complianceServices = [
    {
      icon: FileCheck,
      title: "HIPAA / GDPR Support",
      description: "Compliance and risk reporting support for regulated environments. Not a substitute for your legal or compliance program, and not a claim of full certification.",
      tier: "Enterprise",
    },
    {
      icon: BarChart3,
      title: "vCIO & Strategy",
      description: "Executive IT guidance with business reviews, technology roadmaps, and budget planning according to the selected operating model.",
      tier: "Business+",
    },
    {
      icon: Award,
      title: "Cyber Insurance Readiness",
      description: "Controls and documentation commonly requested during underwriting and renewals. Readiness work does not guarantee premiums, coverage, or carrier approval.",
      tier: "Business+",
    },
    {
      icon: Shield,
      title: "Scoped Security Assessments",
      description: "Targeted assessments when the engagement requires them — not a complimentary pentest on every plan.",
      tier: "Enterprise",
    },
  ];

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-de-bg">
      <MegaMenu />

      <main className="de-nav-clear pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16 text-center"
            initial={prefersReducedMotion ? false : revealInitial}
            animate={prefersReducedMotion ? undefined : revealInView}
            transition={revealTransition}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-de-hairline bg-de-raised px-4 py-2">
              <Shield className="h-4 w-4 text-de-accent-ink" />
              <span className="text-sm text-de-accent-ink">Complete IT & Security Solutions</span>
            </div>
            <StatementHeading as="h1" className="mb-6 text-4xl md:text-5xl lg:text-6xl">
              The ProActive Ecosystem
            </StatementHeading>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/70">
              Everything your business needs to stay secure, productive, and compliant—all in one monthly subscription. No surprise bills. No nickel-and-diming. Just predictable, professional IT.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="brand" size="lg" className="h-12">
                <a href="/book">{CTA.primary}<ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 border-de-hairline bg-de-raised text-white hover:text-white">
                <a href={CTA.secondaryHref}>{CTA.secondary}</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3" aria-label="ProActive operating context">
              <ProofChip metric="24/7" label="Human-led monitoring" icon={Lock} />
              <ProofChip metric="ARIZONA" label="Principal-led service" icon={Users} />
              <ProofChip metric="4 MODELS" label="IT · Office · Business · Enterprise" icon={Layers} />
            </div>
          </motion.div>

          <motion.section
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mb-10 text-center">
              <StatementHeading as="h2" className="mb-3 text-2xl md:text-3xl">
                Four operating models. One matched to your environment
              </StatementHeading>
              <p className="text-white/60">Baseline capabilities are shared. Network, backup, security operations, BCDR, and governance depth increase by fit — not because a higher tier is universally “better.”</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  variants={itemVariants}
                  className="de-interactive-card relative rounded-2xl border border-de-hairline bg-de-raised p-6"
                  data-testid={`plan-${plan.name.toLowerCase()}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-heading text-lg font-bold text-white">{plan.name}</span>
                    <span className="rounded border border-de-hairline bg-de-bg px-2 py-0.5 font-mono text-xs font-semibold text-white/80">
                      {plan.tier}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="de-tabular-nums font-mono text-4xl font-black tracking-tight text-white">${plan.price}</span>
                    <span className="ml-2 text-sm text-white/50">/ user / mo</span>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-white/60">{plan.description}</p>

                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-de-accent-ink" />
                        <span className="text-sm text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="outline" className="w-full border-white/15 bg-de-bg text-white hover:border-[#D3126A]/50 hover:text-white" data-testid={`button-get-${plan.name.toLowerCase()}`}>
                    <a href="/book">
                      {CTA.primaryShort}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-white/55">
              {getPricingFooterText()}. Final pricing tailored to your users, sites, and compliance needs.
            </p>
          </motion.section>

          <motion.section
            className="mb-20 rounded-2xl border border-de-hairline bg-de-raised p-8"
            initial={prefersReducedMotion ? false : revealInitial}
            whileInView={revealInView}
            viewport={revealViewport}
            transition={revealTransition}
          >
            <div className="mb-10 text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-de-hairline bg-de-bg px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-white/70">
                Baseline vs depth
              </span>
              <StatementHeading as="h2" className="mb-3 text-2xl md:text-3xl">
                What every model starts from
              </StatementHeading>
              <p className="mx-auto max-w-2xl text-white/60">
                Service desk, endpoint foundation, identity guidance, and a documented environment are the baseline. Managed network and endpoint backup typically arrive at Office. Security operations, awareness training, and BCDR posture typically arrive at Business. Unified posture reporting and deeper governance typically arrive at Enterprise.
              </p>
            </div>

            <motion.div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {foundationServices.map((service, index) => (
                <motion.div key={service.title} variants={itemVariants} className="de-interactive-card rounded-2xl border border-de-hairline bg-de-bg p-5" data-testid={`foundation-${index}`}>
                  <div className="mb-4"><IconWell icon={service.icon} size="md" surface="dark" /></div>
                  <h3 className="mb-2 font-semibold text-white">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section className="mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="mb-10 text-center">
              <StatementHeading as="h2" className="mb-3 text-2xl md:text-3xl">
                Security operations in context
              </StatementHeading>
              <p className="mx-auto max-w-2xl text-white/60">
                The example below shows how detection, human review, containment, remediation, and documentation can connect. It is not live telemetry or a measured response-time claim.
              </p>
            </div>

            <div className="mb-10"><IncidentFlow /></div>

            <motion.div className="grid gap-5 md:grid-cols-2" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {securityServices.map((service, index) => (
                <motion.div key={service.title} variants={itemVariants} className="de-interactive-card flex gap-4 rounded-2xl border border-de-hairline bg-de-raised p-5" data-testid={`security-${index}`}>
                  <IconWell icon={service.icon} size="md" surface="dark" />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="font-semibold text-white">{service.title}</h3>
                      <span className="rounded bg-de-bg px-2 py-0.5 font-mono text-xs font-medium text-de-magenta-ink">{service.tier}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section className="mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="mb-10 text-center">
              <StatementHeading as="h2" className="mb-3 text-2xl md:text-3xl">Compliance & Strategy</StatementHeading>
              <p className="text-white/60">Governance, audit readiness, and executive IT guidance for regulated industries.</p>
            </div>

            <motion.div className="grid gap-5 md:grid-cols-2" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {complianceServices.map((service, index) => (
                <motion.div key={service.title} variants={itemVariants} className="de-interactive-card flex gap-4 rounded-2xl border border-de-hairline bg-de-raised p-5" data-testid={`compliance-${index}`}>
                  <IconWell icon={service.icon} size="md" surface="dark" />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="font-semibold text-white">{service.title}</h3>
                      <span className="rounded bg-de-bg px-2 py-0.5 text-xs text-de-magenta-ink">{service.tier}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section className="mb-20 rounded-2xl border border-de-hairline bg-de-raised p-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="mb-10 text-center">
              <StatementHeading as="h2" className="text-2xl md:text-3xl">Why Arizona Businesses Choose Us</StatementHeading>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { icon: Clock, value: "Assessment-led", label: "Engagement", description: "Prioritize before you buy" },
                { icon: Shield, value: "Client-owned", label: "Access model", description: "Credentials & tenants stay yours" },
                { icon: Phone, value: "Human support", label: "Service desk", description: "Accountable issue ownership" },
                { icon: Award, value: "Security-first", label: "Operating model", description: "IT + cyber together" },
              ].map((stat, index) => (
                <div key={index} className="p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-de-bg"><stat.icon className="h-6 w-6 text-de-magenta-ink" /></div>
                  <div className="mb-1 text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-white/80">{stat.label}</div>
                  <div className="text-xs text-white/50">{stat.description}</div>
                </div>
              ))}
            </div>
          </motion.section>

          <ConversionPathBar headline="Ready to get protected" body="Schedule a Cyber Risk Assessment to discuss your needs. No pressure, no obligation — honest advice about what your business actually needs." />
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default SolutionsIndex;
