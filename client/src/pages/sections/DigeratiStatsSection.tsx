/**
 * Industry context stats only — not "Why Digerati" proof.
 * Sourced from client/src/data/cyberAwarenessFacts.ts.
 */
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, DollarSign, MapPin, Shield } from "lucide-react";
import {
  getHomepageCyberFacts,
  type CyberAwarenessFact,
} from "@/data/cyberAwarenessFacts";

const iconForFact = (fact: CyberAwarenessFact) => {
  if (fact.scope === "arizona") return MapPin;
  if (fact.id.includes("mfa") || fact.id.includes("microsoft")) return Shield;
  if (fact.id.includes("cost") || fact.id.includes("ibm") || fact.metric.startsWith("$")) {
    return DollarSign;
  }
  return AlertTriangle;
};

export const DigeratiStatsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const facts = getHomepageCyberFacts();

  return (
    <section
      className="py-10 lg:py-12 bg-[#0a0a0a] relative overflow-hidden"
      aria-label="Industry cybersecurity context"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-xs md:text-sm font-medium text-[#FF477F] tracking-wide uppercase mb-3">
            Industry context
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Why cybersecurity readiness matters for Arizona SMBs
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm">
            Sourced industry research for awareness — not a substitute for Digerati-specific proof
            (Bill of Rights, Trust Center, and how we operate).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => {
            const Icon = iconForFact(fact);
            const sourceLine = `${fact.source} ${fact.year}`;
            return (
              <motion.div
                key={fact.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                data-testid={`homepage-stat-${fact.id}`}
              >
                <Icon className="h-5 w-5 text-violet-400 mb-4" aria-hidden />
                <div className="text-3xl font-bold text-white mb-2">{fact.metric}</div>
                <p className="text-white/70 text-sm leading-relaxed mb-2">{fact.statement}</p>
                {fact.sourceUrl ? (
                  <a
                    href={fact.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 text-xs hover:text-violet-300 underline-offset-2 hover:underline"
                  >
                    — {sourceLine}
                  </a>
                ) : (
                  <p className="text-white/40 text-xs">— {sourceLine}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
