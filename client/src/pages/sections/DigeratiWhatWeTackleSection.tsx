import { Shield, Bug, Lock, Database, AlertTriangle, Users, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { IconWell } from "@/components/visual/IconWell";
import type { LucideIcon } from "lucide-react";

type Challenge = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const challenges: Challenge[] = [
  {
    icon: Bug,
    title: "Ransomware & Malware",
    description:
      "Advanced threat detection and rapid response to eliminate malicious attacks before damage occurs",
  },
  {
    icon: Database,
    title: "Data Loss Prevention",
    description:
      "Comprehensive backup strategies with tested disaster recovery ensuring business continuity",
  },
  {
    icon: AlertTriangle,
    title: "Compliance Gaps",
    description:
      "Navigate HIPAA, PCI DSS, and SOC 2 requirements with continuous monitoring and reporting",
  },
  {
    icon: Lock,
    title: "Phishing & Social Engineering",
    description:
      "Multi-layered email security combined with ongoing employee security awareness training",
  },
  {
    icon: Shield,
    title: "Zero-Day Vulnerabilities",
    description:
      "Proactive patch management and security assessments to close gaps before exploitation",
  },
  {
    icon: Users,
    title: "Insider Threats",
    description:
      "User behavior analytics and access controls to prevent internal security breaches",
  },
];

export const DigeratiWhatWeTackleSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="de-dark-chapter relative py-16 lg:py-24">
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-5"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF477F]">
              Problems we solve
            </p>
            <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              What We Tackle
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/65 md:text-lg">
              Compact view of the problems we own with you. Sourced industry statistics live on
              Cyber Facts; capability detail lives on Solutions.
            </p>
            <Link href="/resources/cyber-facts">
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#FF477F] hover:text-pink-300">
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
                  data-testid={`tackle-card-${index}`}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="flex gap-4"
                >
                  <IconWell icon={Icon} size="sm" surface="dark" />
                  <div className="min-w-0">
                    <h3 className="mb-1 text-base font-semibold text-white md:text-lg">
                      {challenge.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/55 md:text-base">
                      {challenge.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 lg:mt-14">
          <p className="text-sm text-white/45">
            Don&apos;t see your specific challenge? We handle it all.
          </p>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-lg border border-pink-300/30 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition-all duration-200 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400"
            data-testid="tackle-cta"
          >
            Discuss Your Security Needs
          </a>
        </div>
      </div>
    </section>
  );
};
