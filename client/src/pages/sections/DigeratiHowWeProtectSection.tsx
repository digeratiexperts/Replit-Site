import { motion, useReducedMotion } from "framer-motion";
import { Search, FileText, Settings, Activity, KeyRound, Monitor, Mail, Wifi, Database, Radio, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { IconWell } from "@/components/visual/IconWell";
import type { LucideIcon } from "lucide-react";

const domains = [
  { icon: KeyRound, title: "Identity", link: "/solutions/unified-security", desc: "SSO, MFA, and access architecture." },
  { icon: Monitor, title: "Endpoints", link: "/solutions/threat-detection", desc: "Device protection and hardening." },
  { icon: Mail, title: "Email", link: "/solutions/security-operations", desc: "Anti-phishing and mailbox defenses." },
  { icon: Wifi, title: "Network", link: "/solutions/managed-it-support", desc: "Firewall, Wi-Fi, and connectivity operations." },
  { icon: Database, title: "Data & Recovery", link: "/solutions/backup-disaster-recovery", desc: "Backup, restore testing, and continuity." },
  { icon: Radio, title: "Security Operations", link: "/solutions/security-operations", desc: "Detection, response, and human triage." },
];

const steps: { number: number; title: string; description: string; icon: LucideIcon; testId: string }[] = [
  {
    number: 1,
    title: "Assessment",
    description: "Review identity, endpoints, email, backups, network, and operating reality.",
    icon: Search,
    testId: "step-discovery",
  },
  {
    number: 2,
    title: "Roadmap",
    description: "Match the operating model to the environment — fit, not a ranking ladder.",
    icon: FileText,
    testId: "step-planning",
  },
  {
    number: 3,
    title: "Implementation",
    description: "Documented credentials you own. Controls sized to the model we matched.",
    icon: Settings,
    testId: "step-implementation",
  },
  {
    number: 4,
    title: "Continuous",
    description: "Day-to-day support, security operations where included, and reviews at that tier’s cadence.",
    icon: Activity,
    testId: "step-protection",
  },
];

export const DigeratiHowWeProtectSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section className="de-paper-chapter de-chapter-fade-from-dark relative py-16 lg:py-24">
        <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
          <motion.div
            className="mb-12 max-w-2xl md:mb-16"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35 }}
          >
            <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-de-magenta">
              What we protect
            </p>
            <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-gray-900 md:text-4xl">
              Six domains. One accountable operating model.
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Capability pages live under Solutions. The methodology — assessment through operations —
              is documented on the ProActive Ecosystem overview.
            </p>
          </motion.div>

          <div
            id="protection-stack"
            className="de-paper-lift mx-auto grid max-w-[92rem] grid-cols-1 gap-x-10 gap-y-6 rounded-2xl p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-3 lg:p-10"
          >
            {domains.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.link}>
                  <div className="flex cursor-pointer items-start gap-3">
                    <IconWell icon={Icon} size="sm" surface="light" />
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-gray-900 md:text-lg">{item.title}</p>
                      <p className="mt-0.5 text-base leading-relaxed text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
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

          <ol className="mx-auto grid max-w-[92rem] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <li
                  key={step.number}
                  data-testid={step.testId}
                  className={`lg:px-6 ${index > 0 ? "lg:border-l lg:border-[var(--de-hairline)]" : "lg:pl-0"}`}
                >
                  <p className="font-mono text-base font-semibold tracking-[0.18em] text-de-magenta-ink">
                    {String(step.number).padStart(2, "0")}
                  </p>
                  <span className="mt-3 mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--de-hairline)] bg-[var(--de-bg)] text-[#D3126A]">
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mb-2 text-lg font-semibold text-white">
                    {step.title}
                  </h4>
                  <p className="text-base leading-relaxed text-white/75 md:text-lg">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
};
