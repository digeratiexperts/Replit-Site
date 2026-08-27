import { motion, useReducedMotion } from "framer-motion";
import { Search, FileText, Settings, Activity, KeyRound, Monitor, Mail, Wifi, Database, Radio, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { IconWell } from "@/components/visual/IconWell";
import type { LucideIcon } from "lucide-react";
import { revealInitial, revealInView, revealTransition, revealViewport } from "@/lib/animations";

const domains = [
  { icon: KeyRound, title: "Identity", link: "/solutions/unified-security", desc: "SSO, MFA, and access architecture." },
  { icon: Monitor, title: "Endpoints", link: "/solutions/threat-detection", desc: "Device protection and hardening." },
  { icon: Mail, title: "Email", link: "/solutions/security-operations", desc: "Anti-phishing and mailbox defenses." },
  { icon: Wifi, title: "Network", link: "/solutions/managed-it-support", desc: "Firewall, Wi-Fi, and connectivity operations." },
  { icon: Database, title: "Data & Recovery", link: "/solutions/backup-disaster-recovery", desc: "Backup, restore testing, and continuity." },
  { icon: Radio, title: "Security Operations", link: "/solutions/security-operations", desc: "Detection, response, and human triage." },
];

const steps: {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  testId: string;
  href: string;
}[] = [
  {
    number: 1,
    title: "Assessment",
    description: "Review identity, endpoints, email, backups, network, and operating reality.",
    icon: Search,
    testId: "step-discovery",
    href: "/book",
  },
  {
    number: 2,
    title: "Roadmap",
    description: "Match the operating model to the environment — fit, not a ranking ladder.",
    icon: FileText,
    testId: "step-planning",
    href: "/solutions/proactive-ecosystem",
  },
  {
    number: 3,
    title: "Implementation",
    description: "Documented credentials you own. Controls sized to the model we matched.",
    icon: Settings,
    testId: "step-implementation",
    href: "/solutions/proactive-ecosystem",
  },
  {
    number: 4,
    title: "Continuous",
    description: "Day-to-day support, security operations where included, and reviews at that tier’s cadence.",
    icon: Activity,
    testId: "step-protection",
    href: "/solutions/proactive-ecosystem",
  },
];

export const DigeratiHowWeProtectSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section className="de-dark-well relative py-8 md:py-14">
        <div className="mx-auto max-w-[var(--de-canvas)] px-3 sm:px-4 lg:px-6">
          <div className="de-paper-island relative px-6 py-10 sm:px-10 sm:py-14 md:px-12 md:py-16">
            <div className="relative z-10">
              <motion.div
                className="mb-12 max-w-2xl md:mb-16"
                initial={prefersReducedMotion ? false : revealInitial}
                whileInView={revealInView}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-de-magenta">
                  What we protect
                </p>
                <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-[#1A1228] md:text-4xl">
                  Six domains. One accountable operating model.
                </h2>
                <p className="text-lg leading-relaxed text-[#3A3448]">
                  Capability pages live under Solutions. The methodology — assessment through operations —
                  is documented on the ProActive Ecosystem overview.
                </p>
              </motion.div>

              <div
                id="protection-stack"
                className="mx-auto grid max-w-[92rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {domains.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.link}
                      className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-[var(--de-paper-hairline)] bg-white p-5 transition-all duration-200 hover:border-[#D3126A]/30 hover:shadow-[0_4px_20px_-6px_rgba(211,18,106,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/70 focus-visible:ring-offset-2"
                    >
                      <span className="absolute inset-x-0 top-0 h-[2px] rounded-t-xl bg-gradient-to-r from-[#D3126A]/40 via-[#D3126A]/80 to-[#D3126A]/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
                      <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#D3126A]/20 bg-[#D3126A]/8 text-[#D3126A] transition-colors group-hover:border-[#D3126A]/40 group-hover:bg-[#D3126A]/12">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold text-[#1A1228] transition-colors group-hover:text-[#A30E52] md:text-base">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[#5A5368]">{item.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-protection-works"
        className="de-process-band relative overflow-hidden py-14 md:py-16 lg:py-20"
        aria-labelledby="how-protection-works-heading"
      >
        <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <div className="max-w-3xl">
              <p className="mb-2 text-base font-semibold uppercase tracking-[0.2em] text-de-magenta-ink">
                How protection works
              </p>
              <h3
                id="how-protection-works-heading"
                className="font-heading text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl"
              >
                Assessment → Roadmap → Implementation → Continuous
              </h3>
            </div>
            <Link href="/solutions/proactive-ecosystem">
              <span className="inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-white underline-offset-4 hover:text-[#D3126A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-surface)]">
                Full methodology
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          <ol className="mx-auto grid max-w-[92rem] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <li
                  key={step.number}
                  className={`${index > 0 ? "lg:border-l lg:border-[var(--de-hairline)]" : "lg:pl-0"} lg:px-6`}
                >
                  <Link
                    href={step.href}
                    data-testid={step.testId}
                    className="de-interactive-tile group flex h-full flex-col rounded-xl border border-transparent p-3 hover:border-de-hairline hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-surface)]"
                  >
                    <p className="font-mono text-sm font-bold tracking-[0.18em] text-[#D3126A]" aria-hidden="true">
                      {String(step.number).padStart(2, "0")}
                    </p>
                    <span className="mt-3 mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D3126A]/30 bg-[#D3126A]/10 text-[#D3126A] shadow-[0_0_16px_-4px_rgba(211,18,106,0.45)] transition-all group-hover:border-[#D3126A]/60 group-hover:shadow-[0_0_20px_-4px_rgba(211,18,106,0.6)]">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      {step.title}
                    </h4>
                    <p className="text-base leading-relaxed text-white/75 md:text-lg">
                      {step.description}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
};
