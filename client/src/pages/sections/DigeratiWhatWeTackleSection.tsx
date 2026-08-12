import { Shield, Bug, Lock, Database, AlertTriangle, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MeshyStillAccent } from "@/components/visual/MeshyStillAccent";
import { SectionVisualStage } from "@/components/visual/SectionVisualStage";
import { meshyBatch01, tackleVisualByTitle } from "@/lib/visualAssets";
import type { LucideIcon } from "lucide-react";

type Challenge = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
};

const challenges: Challenge[] = [
  {
    icon: Bug,
    title: "Ransomware & Malware",
    description:
      "Advanced threat detection and rapid response to eliminate malicious attacks before damage occurs",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Database,
    title: "Data Loss Prevention",
    description:
      "Comprehensive backup strategies with tested disaster recovery ensuring business continuity",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: AlertTriangle,
    title: "Compliance Gaps",
    description:
      "Navigate HIPAA, PCI DSS, and SOC 2 requirements with continuous monitoring and reporting",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    icon: Lock,
    title: "Phishing & Social Engineering",
    description:
      "Multi-layered email security combined with ongoing employee security awareness training",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Zero-Day Vulnerabilities",
    description:
      "Proactive patch management and security assessments to close gaps before exploitation",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Insider Threats",
    description:
      "User behavior analytics and access controls to prevent internal security breaches",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export const DigeratiWhatWeTackleSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-12 lg:py-16">
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <div className="mb-10 grid items-end gap-8 lg:mb-12 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-8"
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

          <motion.div
            className="hidden justify-end lg:col-span-4 lg:flex"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SectionVisualStage
              still={meshyBatch01.identity}
              size="lg"
              alt="Identity and access control visual"
            />
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {challenges.map((challenge, index) => {
            const visual = tackleVisualByTitle[challenge.title];
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
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-7 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.07] lg:p-8">
                  <div className="mb-5">
                    {visual ? (
                      <MeshyStillAccent still={visual} size="lg" />
                    ) : (
                      <div
                        className={`inline-flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${challenge.gradient} bg-opacity-20 transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className="h-8 w-8 text-white" aria-hidden />
                      </div>
                    )}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-white transition-all group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text md:text-2xl group-hover:text-transparent">
                    {challenge.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-400 md:text-lg">
                    {challenge.description}
                  </p>

                  <div
                    className={`absolute right-0 top-0 h-20 w-20 rounded-bl-full rounded-tr-2xl bg-gradient-to-br ${challenge.gradient} opacity-5`}
                  />
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
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/40"
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
