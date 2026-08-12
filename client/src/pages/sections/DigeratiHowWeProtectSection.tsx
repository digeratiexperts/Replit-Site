import { motion, useReducedMotion } from "framer-motion";
import { Search, FileText, Settings, Activity, Eye, ShieldCheck, UserCheck, KeyRound, Cloud, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { IconWell } from "@/components/visual/IconWell";

export const DigeratiHowWeProtectSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      number: 1,
      title: "Discovery & Assessment",
      description: "We analyze your current security posture, identify vulnerabilities, and understand your business needs.",
      icon: Search,
      testId: "step-discovery"
    },
    {
      number: 2,
      title: "Strategic Planning",
      description: "Custom security roadmap aligned with your business goals, compliance requirements, and budget.",
      icon: FileText,
      testId: "step-planning"
    },
    {
      number: 3,
      title: "Implementation",
      description: "Deploy enterprise-grade security tools, configure policies, and train your team on best practices.",
      icon: Settings,
      testId: "step-implementation"
    },
    {
      number: 4,
      title: "Continuous Protection",
      description: "24/7 monitoring, regular updates, proactive threat hunting, and quarterly business reviews.",
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
            Our Process
          </p>
          <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-gray-900 md:text-4xl">
            How We Protect Your Business
          </h2>
          <p className="text-base leading-relaxed text-gray-600 md:text-lg">
            Our proven 4-step process ensures your business stays secure and compliant
          </p>
        </motion.div>

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

        <div className="mx-auto mt-16 max-w-[92rem] border-t border-gray-200 pt-12 md:mt-20" id="protection-stack">
          <div className="mb-8 max-w-2xl">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
              Security stack we manage
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              Technical depth lives here and on each solution page — so the homepage stays clear
              without losing capability.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Eye, title: "SOC / MDR Monitoring", link: "/solutions/security-operations", desc: "24/7 detection and response." },
              { icon: ShieldCheck, title: "Endpoint Security (EDR)", link: "/solutions/threat-detection", desc: "Protect devices across the environment." },
              { icon: UserCheck, title: "SMART Identity (MFA + SSO)", link: "/solutions/unified-security", desc: "Stronger access without user chaos." },
              { icon: KeyRound, title: "Privileged Access Controls", link: "/solutions/unified-security", desc: "Admin controls and audit visibility." },
              { icon: Cloud, title: "Backup & Disaster Recovery", link: "/solutions/backup-disaster-recovery", desc: "Recovery planning and restore discipline." },
              { icon: AlertCircle, title: "Email Protection", link: "/solutions/security-operations", desc: "Anti-phishing and mailbox defenses." },
            ].map((item) => {
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
        </div>
      </div>
    </section>
  );
};
