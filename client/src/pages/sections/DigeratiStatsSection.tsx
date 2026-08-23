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
      <div 
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[100rem] mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm md:text-base font-semibold text-[#FF477F] tracking-widest uppercase mb-3">
            Why Digerati Experts
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            The Threats Are Real
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Don't become a statistic. These numbers show why proactive, layered security matters.
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
              <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 p-7 lg:p-8 h-full transition-all duration-300 group-hover:border-violet-400/40 group-hover:shadow-2xl group-hover:shadow-violet-950/40 group-hover:-translate-y-1">
                {/* Ambient top border accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent group-hover:via-pink-500/80 transition-all duration-500" />
                
                {/* Background glow on hover */}
                <div className="absolute -right-8 -top-8 w-28 h-28 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-pink-500/15 transition-all duration-500 pointer-events-none" />

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-violet-500/15 border border-violet-500/25 shadow-inner shadow-violet-500/10 group-hover:scale-105 group-hover:bg-pink-500/20 group-hover:border-pink-500/35 transition-all duration-300">
                    <stat.icon className="h-6 w-6 text-violet-300 group-hover:text-pink-300 transition-colors" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-pink-200 to-violet-300 bg-clip-text text-transparent mb-3 tracking-tight">
                  {stat.value}
                </div>
                <p className="text-white/80 text-base leading-relaxed mb-2.5 font-medium">
                  {stat.label}
                </p>
                <p className="text-white/45 text-sm font-light">
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
