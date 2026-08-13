import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, DollarSign, MapPin, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { VisualStage } from "@/components/visual/VisualStage";
import { IconWell } from "@/components/visual/IconWell";
import { homepageSectionAccents } from "@/lib/visualAssets";
import {
  getHomepageCyberFacts,
  type CyberAwarenessFact,
} from "@/data/cyberAwarenessFacts";

const factIcons: Record<string, LucideIcon> = {
  "dbir-ransomware-2026": AlertTriangle,
  "ibm-us-breach-cost-2026": DollarSign,
  "microsoft-mfa-blocks-2025": Shield,
  "az-ic3-losses-2024": MapPin,
};

function FactCard({
  fact,
  index,
  prefersReducedMotion,
}: {
  fact: CyberAwarenessFact;
  index: number;
  prefersReducedMotion: boolean | null;
}) {
  const Icon = factIcons[fact.id] ?? AlertTriangle;
  const sourceLine = `— ${fact.source} ${fact.year}`;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="h-full rounded-2xl border border-white/10 bg-[#151217] p-6 md:p-7"
      data-testid={`homepage-stat-${index}`}
    >
      <IconWell icon={Icon} size="sm" surface="dark" />
      <p className="mt-5 font-mono text-3xl font-semibold tracking-tight text-violet-300 md:text-4xl">
        {fact.metric}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/75 md:text-base">{fact.statement}</p>
      {fact.sourceUrl ? (
        <a
          href={fact.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-white/45 hover:text-white/70"
        >
          {sourceLine}
        </a>
      ) : (
        <p className="mt-2 text-sm text-white/45">{sourceLine}</p>
      )}
    </motion.div>
  );
}

export const DigeratiStatsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const facts = getHomepageCyberFacts();

  return (
    <section className="relative bg-[#0a0a0a] py-16 lg:py-24">
      <div className="relative mx-auto max-w-[100rem] px-3 sm:px-4 lg:px-6">
        <div className="mb-10 grid items-center gap-8 lg:mb-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF477F]">
              Why Digerati Experts
            </p>
            <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              The Threats Are Real
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Don&apos;t become a statistic. These numbers show why proactive security matters —
              and why endpoint, identity, and recovery discipline have to be owned, not assumed.
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <VisualStage
              still={homepageSectionAccents.statsThreats}
              layout="spot"
              alt="Graphite telemetry sculpture with smoked-glass plates and violet-lit nodes"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {facts.map((fact, index) => (
            <FactCard
              key={fact.id}
              fact={fact}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <p className="mt-6">
          <Link href="/resources/cyber-facts">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF477F] hover:text-pink-300">
              Full sourced facts
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
};
