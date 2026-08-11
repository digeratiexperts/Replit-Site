import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, DollarSign, Shield, Clock } from "lucide-react";

const stats = [
  {
    value: "88%",
    label: "of SMB breaches involve ransomware",
    source: "Verizon DBIR 2025",
    icon: AlertTriangle,
  },
  {
    value: "$4.88M",
    label: "average cost of a data breach",
    source: "IBM 2024",
    icon: DollarSign,
  },
  {
    value: "99.9%",
    label: "of compromised accounts lacked MFA",
    source: "Microsoft 2025",
    icon: Shield,
  },
  {
    value: "60%",
    label: "of small businesses close within 6 months of an attack",
    source: "Industry Data",
    icon: Clock,
  },
];

export const DigeratiStatsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-12 lg:py-16 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm md:text-base font-medium text-[#FF477F] tracking-wide uppercase mb-3">
            Why Digerati Experts
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            The Threats Are Real
          </h2>
          <p className="text-lg text-white/65 max-w-3xl mx-auto">
            Don't become a statistic. These numbers show why proactive security matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              data-testid={`homepage-stat-${index}`}
            >
              <div className="p-7 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-violet-500/20">
                    <stat.icon className="h-6 w-6 text-violet-400" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <p className="text-white/75 text-base leading-relaxed mb-2">
                  {stat.label}
                </p>
                <p className="text-white/45 text-sm">
                  — {stat.source}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
