/**
 * Industry context stats only — not "Why Digerati" proof.
 * Prefer current Verizon/IBM/Microsoft baselines; never invent DE metrics here.
 */
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, DollarSign, Shield } from "lucide-react";

const stats = [
  {
    value: "48%",
    label: "of breaches involve ransomware",
    source: "Verizon DBIR 2026",
    icon: AlertTriangle,
  },
  {
    value: "31%",
    label: "of breaches begin with exploitation of software vulnerabilities",
    source: "Verizon DBIR 2026",
    icon: AlertTriangle,
  },
  {
    value: "$4.99M",
    label: "global average cost of a data breach",
    source: "IBM Cost of a Data Breach 2026",
    icon: DollarSign,
  },
  {
    value: "99.9%+",
    label: "of compromised accounts in Microsoft’s cited dataset lacked MFA",
    source: "Microsoft",
    icon: Shield,
  },
];

export const DigeratiStatsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-10 lg:py-12 bg-[#0a0a0a] relative overflow-hidden" aria-label="Industry cybersecurity context">
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
            Why cybersecurity readiness matters for SMBs
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm">
            Industry research — not a substitute for Digerati-specific proof. Sources shown on each card.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              data-testid={`homepage-stat-${index}`}
            >
              <stat.icon className="h-5 w-5 text-violet-400 mb-4" aria-hidden />
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <p className="text-white/70 text-sm leading-relaxed mb-2">{stat.label}</p>
              <p className="text-white/40 text-xs">— {stat.source}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
