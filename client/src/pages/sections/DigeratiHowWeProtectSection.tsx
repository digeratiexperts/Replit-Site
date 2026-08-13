import { motion, useReducedMotion } from "framer-motion";
import { Search, FileText, Settings, Activity, KeyRound, Monitor, Mail, Wifi, Database, Radio } from "lucide-react";
import { Link } from "wouter";
import { IconWell } from "@/components/visual/IconWell";
import { ArrowRight } from "lucide-react";

const domains = [
  { icon: KeyRound, title: "Identity", link: "/solutions/unified-security", desc: "SSO, MFA, and access architecture." },
  { icon: Monitor, title: "Endpoints", link: "/solutions/threat-detection", desc: "Device protection and hardening." },
  { icon: Mail, title: "Email", link: "/solutions/security-operations", desc: "Anti-phishing and mailbox defenses." },
  { icon: Wifi, title: "Network", link: "/solutions/managed-it-support", desc: "Firewall, Wi-Fi, and connectivity operations." },
  { icon: Database, title: "Data & Recovery", link: "/solutions/backup-disaster-recovery", desc: "Backup, restore testing, and continuity." },
  { icon: Radio, title: "Security Operations", link: "/solutions/security-operations", desc: "Detection, response, and human triage." },
];

export const DigeratiHowWeProtectSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      number: 1,
      title: "Assessment",
      description: "Review identity, endpoints, email, backups, network, and operating reality.",
      icon: Search,
      testId: "step-discovery"
    },
    {
      number: 2,
      title: "Roadmap",
      description: "Match the operating model to the environment — fit, not a ranking ladder.",
      icon: FileText,
      testId: "step-planning"
    },
    {
      number: 3,
      title: "Implementation",
      description: "Documented credentials you own. Controls sized to the model we matched.",
      icon: Settings,
      testId: "step-implementation"
    },
    {
      number: 4,
      title: "Continuous",
      description: "Day-to-day support, security operations where included, and reviews at that tier’s cadence.",
      icon: Activity,
      testId: "step-protection"
    }
  ];

  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mb-12 max-w-2xl md:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.35 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            What we protect
          </p>
          <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-gray-900 md:text-4xl">
            Six domains. One accountable operating model.
          </h2>
          <p className="text-base leading-relaxed text-gray-600 md:text-lg">
            Capability pages live under Solutions. The methodology — assessment through operations —
            is documented on the ProActive Ecosystem overview.
          </p>
        </motion.div>

        <div className="mx-auto mb-16 grid max-w-[92rem] grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3" id="protection-stack">
          {domains.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.link}>
                <div className="flex cursor-pointer items-start gap-3">
                  <IconWell icon={Icon} size="sm" surface="light" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 md:text-base">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-t border-gray-200 pt-12">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              How protection works
            </p>
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-gray-900">
              Assessment → Roadmap → Implementation → Continuous
            </h3>
          </div>
          <Link href="/solutions/proactive-ecosystem">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:text-violet-900">
              Full methodology
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        <ol className="mx-auto grid max-w-[92rem] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <li key={step.number} data-testid={step.testId}>
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-violet-500">
                  {String(step.number).padStart(2, "0")}
                </p>
                <div className="mt-3 mb-3">
                  <IconWell icon={IconComponent} size="sm" surface="light" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
