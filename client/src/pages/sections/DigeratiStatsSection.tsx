import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin, Shield, Radio, KeyRound } from "lucide-react";
import { VisualStage } from "@/components/visual/VisualStage";
import { engageSculptureSet } from "@/lib/visualAssets";
import { IconWell } from "@/components/visual/IconWell";

const credibility = [
  {
    icon: MapPin,
    title: "Arizona-based",
    body: "Principal-led accountability in the same time zone as the businesses we protect.",
  },
  {
    icon: Shield,
    title: "Cybersecurity-first IT",
    body: "Identity, endpoints, email, and recovery are designed in — not bolted on later.",
  },
  {
    icon: Radio,
    title: "24/7 operations",
    body: "Human-led monitoring and response coverage for the environments we operate.",
  },
  {
    icon: KeyRound,
    title: "Client-owned credentials",
    body: "Your technology, your data, your keys — documented and transferable.",
  },
];

export const DigeratiStatsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-[#0a0a0a] py-16 lg:py-24">
      <div className="relative mx-auto max-w-[100rem] px-3 sm:px-4 lg:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="max-w-2xl"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF477F]">
                Why Digerati Experts
              </p>
              <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
                Built around how your business operates
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
                We match an operating model to your environment — not a scare statistic to a package.
                Assessment first. Fit second. Implementation after that.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {credibility.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    data-testid={`homepage-stat-${index}`}
                  >
                    <IconWell icon={Icon} size="sm" surface="dark" />
                    <p className="mt-3 text-base font-semibold text-white">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.aside
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-[#151217] p-5 md:p-6"
          >
            <VisualStage
              still={engageSculptureSet.cyberRisk}
              alt="Network lattice illuminated by a scanning arc — cyber risk assessment"
              layout="editorial"
              className="max-w-none"
            />
            <p className="mt-5 font-mono text-3xl font-semibold tracking-tight text-white">88%</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              of SMB breaches involve ransomware — Verizon DBIR 2025.
            </p>
            <Link href="/resources/cyber-facts">
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#FF477F] hover:text-pink-300">
                Full sourced facts
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};
