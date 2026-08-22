import { motion, useReducedMotion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { CTA } from "@/lib/ctaCopy";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import {
  Monitor, Shield, Radar, Database, Network, GraduationCap,
  FileCheck, Briefcase, ArrowRight, CheckCircle, ClipboardCheck,
  Map, FileText, PlayCircle, Search,
} from "lucide-react";

const standaloneServices = [
  {
    icon: Monitor,
    title: "Managed Workplace / User Support",
    description:
      "Secure user access, devices, productivity apps, and employee lifecycle changes — without turning your entire environment over to a new provider.",
    meta: "Project or monthly engagement · Assessment required for final scope",
  },
  {
    icon: Radar,
    title: "Threat Detection",
    description:
      "Visibility into endpoint risks, security alerts, and suspicious activity so meaningful threats surface instead of hiding in noise.",
    meta: "Monthly engagement · Assessment-based pricing",
  },
  {
    icon: Shield,
    title: "Security Operations / SOC",
    description:
      "Alert review, triage, escalation, and response coordination — an ongoing security operations process layered on top of detection.",
    meta: "Monthly engagement · Assessment-based pricing",
  },
  {
    icon: Database,
    title: "Cloud Backup & Recovery",
    description:
      "Protect business data and recover from accidents, ransomware, or hardware failure without rebuilding from scratch.",
    meta: "Monthly engagement · Assessment-based pricing",
  },
  {
    icon: Network,
    title: "Network & Secure Access",
    description:
      "Give employees secure, reliable access to work from the office, home, or anywhere — without exposing the network.",
    meta: "Project or monthly · Assessment required",
  },
  {
    icon: GraduationCap,
    title: "Security Awareness",
    description:
      "Reduce phishing and human-error incidents with training that actually changes employee security behavior.",
    meta: "Monthly engagement · Per-user pricing after assessment",
  },
  {
    icon: FileCheck,
    title: "Compliance Reporting",
    description:
      "Show leadership, insurers, and auditors that your security posture is mapped, measured, and improving.",
    meta: "Project or quarterly · Assessment required",
  },
  {
    icon: Briefcase,
    title: "Technology & Cyber Strategy (vCIO)",
    description:
      "Executive-level technology and cybersecurity advisory — risk-based planning, roadmap, and decision support for leadership.",
    meta: "Monthly or quarterly advisory · Best when internal IT already exists",
  },
];

const assessmentDeliverables = [
  "Risk and environment review",
  "Scope recommendation",
  "Responsibility map",
  "Priority remediation items",
  "Recommended next step",
];

const engagementSteps = [
  {
    icon: Search,
    title: "Cyber Risk Assessment",
    description: "We review the environment, risk, and business need before scoping any work.",
  },
  {
    icon: ClipboardCheck,
    title: "Site Survey / Environment Review",
    description: "Where applicable, we review the site, systems, users, vendors, and current support model.",
  },
  {
    icon: Map,
    title: "Scope & Responsibility Map",
    description:
      "We define what Digerati Experts owns, what the client owns, and what any other provider remains responsible for.",
  },
  {
    icon: FileText,
    title: "Proposal / SOW",
    description:
      "Written agreement with deliverables, supported systems, approval points, exclusions, and service boundaries.",
  },
  {
    icon: PlayCircle,
    title: "Implementation or Ongoing Service",
    description:
      "We begin the standalone engagement — or recommend a ProActive Ecosystem package if the environment requires broader ownership.",
  },
];

const boundaries = [
  "Supported systems are documented before work begins",
  "Responsibilities are defined in writing",
  "Internal IT or existing providers remain responsible for areas outside the scope",
  "Security gaps may need to be resolved before service begins",
  "Destructive access, admin control, and production changes require approval",
];

export default function StandaloneServices() {
  const prefersReducedMotion = useReducedMotion();

  useSEO({
    title: "Standalone IT & Cybersecurity Services",
    description:
      "Need one critical IT or security gap covered? Digerati Experts can step into a clearly defined technology or security role — backup, threat detection, SOC, secure access, compliance reporting, workplace technology, security awareness, or vCIO advisory — after we assess the environment and document the scope.",
    canonical: "/solutions/standalone-services",
  });

  const fadeIn = prefersReducedMotion
    ? undefined
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="relative min-h-screen overflow-hidden bg-de-bg">
      <div className="relative z-10">
        <MegaMenu />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 de-nav-clear pb-20">
          {/* Hero */}
          <motion.header
            className="text-center max-w-3xl mx-auto mb-16"
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" data-testid="heading-standalone-hero">
              Need One Critical IT or{" "}
              <span className="text-de-accent-ink">
                Security Gap
              </span>{" "}
              Covered?
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              When you do not need a full managed IT program yet, Digerati Experts can step into a clearly defined
              technology or security role — after we assess the environment, document the scope, and confirm ownership.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-10">
              <Button asChild size="lg" variant="brand" className="w-full">
                  <a href="/book" data-testid="cta-hero-assessment">
                    {CTA.primary}
                  <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              <Link href="/proactive-ecosystem-pricing">
                <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10" data-testid="cta-hero-compare">
                  Compare ProActive Ecosystem
                </Button>
              </Link>
            </div>
          </motion.header>

          {/* Standalone vs Ecosystem */}
          <section className="grid md:grid-cols-2 gap-6 mb-20" aria-label="Standalone versus ProActive Ecosystem">
            <div className="rounded-2xl border border-de-hairline bg-de-raised p-7" data-testid="compare-standalone">
              <h2 className="text-xl font-bold text-white mb-4">Standalone Services</h2>
              <ul className="space-y-3 mb-6">
                {[
                  "Narrow, documented scope",
                  "Works alongside internal IT or another provider",
                  "Starts with a Cyber Risk Assessment",
                  "Clear responsibilities before work begins",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-de-accent-ink mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <a href="/book" data-testid="cta-standalone-scope">
                    Request Standalone Scope
                  </a>
                </Button>
            </div>
            <div className="rounded-2xl border border-de-hairline bg-de-raised p-7" data-testid="compare-ecosystem">
              <h2 className="text-xl font-bold text-white mb-4">ProActive Ecosystem</h2>
              <ul className="space-y-3 mb-6">
                {[
                  "Ongoing operational responsibility",
                  "Package-based architecture: IT, Office, Business, Enterprise",
                  "Security-first technology management",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-de-accent-ink mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/proactive-ecosystem-pricing">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" data-testid="link-proactive-ecosystem">
                  Explore ProActive Ecosystem
                </Button>
              </Link>
            </div>
          </section>

          {/* Required first step */}
          <motion.section
            className="mb-20 rounded-2xl border border-de-hairline bg-de-raised p-8 md:p-10"
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true }}
            variants={fadeIn}
            aria-labelledby="assessment-heading"
          >
            <span className="mb-4 inline-block rounded-full border border-de-hairline bg-de-bg px-3 py-1 text-xs font-semibold uppercase tracking-wide text-de-accent-ink">
              Required First Step
            </span>
            <h2 id="assessment-heading" className="text-3xl font-bold text-white mb-4">
              The Cyber Risk Assessment Is the Entry Point
            </h2>
            <p className="text-white/70 leading-relaxed mb-4 max-w-3xl">
              The Cyber Risk Assessment gives Digerati Experts a clear view of your environment before we accept
              responsibility for any system. We review key risks, users, devices, access, vendors, backup posture,
              network exposure, and current support model.
            </p>
            <p className="text-white/70 leading-relaxed mb-8 max-w-3xl">
              From there, we define the right scope, identify immediate gaps, and recommend either a standalone service
              or a ProActive Ecosystem package — whichever is the safer path for your business.
            </p>
            <h3 className="text-lg font-semibold text-white mb-4">What You Receive</h3>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {assessmentDeliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70">
                  <CheckCircle className="w-5 h-5 text-de-accent-ink mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Service roles */}
          <section className="mb-20" aria-labelledby="roles-heading">
            <div className="text-center mb-10">
              <h2 id="roles-heading" className="text-3xl font-bold text-white mb-3">Standalone Service Roles</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Pick the role you need Digerati Experts to fill. Final pricing and scope are set after the Cyber Risk
                Assessment.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {standaloneServices.map((service) => (
                <motion.article
                  key={service.title}
                  className="flex flex-col rounded-2xl border border-de-hairline bg-de-raised p-6"
                  initial={prefersReducedMotion ? undefined : "hidden"}
                  whileInView={prefersReducedMotion ? undefined : "visible"}
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <span className="w-11 h-11 rounded-xl bg-de-raised flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-de-accent-ink" />
                  </span>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1">{service.description}</p>
                  <p className="text-xs text-white/55">{service.meta}</p>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Engagement process */}
          <section className="mb-20" aria-labelledby="process-heading">
            <div className="text-center mb-10">
              <h2 id="process-heading" className="text-3xl font-bold text-white mb-3">How Standalone Engagements Work</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                We do not guess, overpromise, or take silent responsibility for systems we have not reviewed. Every
                engagement follows a clear path.
              </p>
            </div>
            <ol className="grid md:grid-cols-5 gap-5">
              {engagementSteps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-de-hairline bg-de-raised p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-de-raised text-de-accent-ink text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <step.icon className="w-5 h-5 text-white/55" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Boundaries */}
          <section className="mb-20 rounded-2xl border border-de-hairline bg-de-raised p-8 md:p-10" aria-labelledby="boundaries-heading">
            <h2 id="boundaries-heading" className="text-3xl font-bold text-white mb-3">
              No Blind Spots. No Finger-Pointing. No Unclear Ownership.
            </h2>
            <p className="text-white/70 leading-relaxed mb-6 max-w-3xl">
              Standalone services only work when the boundaries are clear. Before we begin, we document supported
              systems, access requirements, approval points, and who owns the areas outside our scope.
            </p>
            <ul className="space-y-3">
              {boundaries.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70">
                  <CheckCircle className="w-5 h-5 text-de-accent-ink mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <ConversionPathBar
            headline="Not sure whether you need one service or full coverage?"
            body="Start with a Cyber Risk Assessment. We will identify the risks, clarify the scope, and recommend whether a standalone service or ProActive Ecosystem package is the safer path forward."
            extraAction={
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/70 bg-transparent px-8 font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/proactive-ecosystem-pricing">Compare ProActive Ecosystem</Link>
              </Button>
            }
          />
        </main>

        <DigeratiEnhancedFooterSection />
      </div>
    </div>
  );
}
