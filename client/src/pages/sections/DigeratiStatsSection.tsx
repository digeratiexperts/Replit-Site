import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, DollarSign, MapPin, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IconWell } from "@/components/visual/IconWell";
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
      className="de-style-box-inset h-full rounded-2xl p-6 md:p-7"
      data-testid={`homepage-stat-${index}`}
    >
      <IconWell icon={Icon} size="sm" surface="dark" />
      <p className="mt-5 font-mono text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {fact.metric}
      </p>
      <p className="mt-2 text-base leading-relaxed text-white/75 md:text-lg">{fact.statement}</p>
      {fact.sourceUrl ? (
        <a
          href={fact.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block border-t border-de-hairline pt-3 text-base font-medium text-white/70 hover:text-white"
        >
          {sourceLine}
        </a>
      ) : (
        <p className="mt-4 border-t border-de-hairline pt-3 text-base font-medium text-white/70">{sourceLine}</p>
      )}
    </motion.div>
  );
}

export const DigeratiStatsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const facts = getHomepageCyberFacts();

  return (
    <section className="de-dark-well relative py-6 lg:py-8">
      <div className="de-style-box relative mx-3 px-5 py-12 sm:mx-4 sm:px-8 md:py-16 lg:mx-6 lg:px-10 lg:py-20">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10 max-w-3xl lg:mb-12"
        >
          <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-[#D3126A]">
            Why Digerati Experts
          </p>
          <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
            The Threats Are Real
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-white/65">
            Don&apos;t become a statistic. These numbers show why proactive security matters —
            and why endpoint, identity, and recovery discipline have to be owned, not assumed.
          </p>
        </motion.div>

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
            <span className="inline-flex items-center gap-1 text-base font-semibold text-[#D3126A] hover:text-[#f0187a]">
              Full sourced facts
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
};
