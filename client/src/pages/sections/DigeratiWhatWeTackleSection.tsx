import { Shield, Bug, Lock, Database, AlertTriangle, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
    <section className="relative overflow-hidden bg-[#0a0a0a] py-12 lg:py-16">
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mb-10 lg:mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Shield className="h-4 w-4 text-[#FF477F]" aria-hidden />
            <span className="text-sm text-gray-300">Problems we solve</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            What We{" "}
            <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              Tackle
            </span>
          </h2>
          <p className="max-w-3xl text-xl leading-relaxed text-gray-400">
            Your business faces evolving cyber threats daily. We handle these complex challenges
            with enterprise-grade solutions, so you can focus on growth without worry.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;

            return (
              <motion.div
                key={challenge.title}
                className="group relative"
                data-testid={`tackle-card-${index}`}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="relative h-full rounded-2xl border border-white/10 bg-[#151217] p-7 transition-all duration-300 group-hover:border-white/20 lg:p-8">
                  <div className="mb-5">
                    <IconWell icon={Icon} size="md" surface="dark" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-white md:text-2xl">
                    {challenge.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-400 md:text-lg">
                    {challenge.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="mb-6 text-lg text-gray-400">
            Don&apos;t see your specific challenge? We handle it all.
          </p>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-pink-300/30 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 hover:shadow-pink-500/40"
            data-testid="tackle-cta"
          >
            Discuss Your Security Needs
            <Shield className="ml-2 h-5 w-5" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
