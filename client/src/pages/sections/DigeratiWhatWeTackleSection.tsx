import { Shield, Bug, Lock, Database, AlertTriangle, Users, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { IconWell } from "@/components/visual/IconWell";
import type { LucideIcon } from "lucide-react";
import { revealInitial, revealInView, revealTransition, revealViewport } from "@/lib/animations";

type Challenge = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

const challenges: Challenge[] = [
  {
    icon: Bug,
    title: "Ransomware & Malware",
    description:
      "Advanced threat detection and rapid response to eliminate malicious attacks before damage occurs",
    href: "/solutions/threat-detection",
  },
  {
    icon: Database,
    title: "Data Loss Prevention",
    description:
      "Comprehensive backup strategies with tested disaster recovery ensuring business continuity",
    href: "/solutions/backup-disaster-recovery",
  },
  {
    icon: AlertTriangle,
    title: "Compliance Gaps",
    description:
      "Navigate HIPAA, PCI DSS, and SOC 2 requirements with continuous monitoring and reporting",
    href: "/resources/cyber-facts",
  },
  {
    icon: Lock,
    title: "Phishing & Social Engineering",
    description:
      "Multi-layered email security combined with ongoing employee security awareness training",
    href: "/solutions/security-operations",
  },
  {
    icon: Shield,
    title: "Zero-Day Vulnerabilities",
    description:
      "Proactive patch management and security assessments to close gaps before exploitation",
    href: "/solutions/threat-detection",
  },
  {
    icon: Users,
    title: "Insider Threats",
    description:
      "User behavior analytics and access controls to prevent internal security breaches",
    href: "/solutions/unified-security",
  },
];

export const DigeratiWhatWeTackleSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="de-dark-well de-chapter-hairline de-field-grain relative py-16 lg:py-24">
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-5"
            initial={prefersReducedMotion ? false : revealInitial}
            whileInView={revealInView}
            viewport={revealViewport}
            transition={revealTransition}
          >
            <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-de-magenta-ink">
              Problems we solve
            </p>
            <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              What We Tackle
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-white/65">
              Compact view of the problems we own with you. Sourced industry statistics live on
              Cyber Facts; capability detail lives on Solutions.
            </p>
            <Link href="/resources/cyber-facts">
              <span className="mt-4 inline-flex items-center gap-1 text-base font-semibold text-de-magenta-ink hover:text-[#f0187a]">
                Full threat context
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <motion.div
                  key={challenge.title}
                  initial={prefersReducedMotion ? false : revealInitial}
                  whileInView={revealInView}
                  viewport={revealViewport}
                  transition={{ ...revealTransition, delay: index * 0.04 }}
                >
                  <Link
                    href={challenge.href}
                    data-testid={`tackle-card-${index}`}
                    className="de-interactive-tile group flex gap-4 rounded-xl border border-transparent p-3 hover:border-de-hairline hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)]"
                  >
                    <IconWell icon={Icon} size="sm" surface="dark" />
                    <div className="min-w-0">
                      <h3 className="mb-1 text-base font-semibold text-white md:text-lg">
                        {challenge.title}
                      </h3>
                      <p className="text-base leading-relaxed text-white/55 md:text-lg group-hover:text-white/70">
                        {challenge.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 lg:mt-14">
          <p className="text-base text-white/55">
            Don&apos;t see your specific challenge? We handle it all.
          </p>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-lg bg-[#D3126A] px-6 py-2.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#e01874] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)]"
            data-testid="tackle-cta"
          >
            Discuss Your Security Needs
          </a>
        </div>
      </div>
    </section>
  );
};
