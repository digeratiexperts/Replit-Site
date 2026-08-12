import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, DollarSign, Shield, Clock } from "lucide-react";
import { SectionVisualStage } from "@/components/visual/SectionVisualStage";
import { homepageSectionAccents } from "@/lib/visualAssets";

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
    <section className="relative overflow-hidden bg-[#0a0a0a] py-12 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 85% 35%, rgba(139,92,246,0.18) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-3 sm:px-4 lg:px-6">
        <div className="mb-10 grid items-center gap-8 lg:mb-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-[#FF477F] md:text-base">
              Why Digerati Experts
            </p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              The Threats Are Real
            </h2>
            <p className="max-w-2xl text-lg text-white/65">
              Don&apos;t become a statistic. These numbers show why proactive security matters —
              and why endpoint, identity, and recovery discipline have to be owned, not assumed.
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <SectionVisualStage
              still={homepageSectionAccents.statsThreats}
              size="xl"
              alt="Endpoint protection visual representing ransomware and device risk"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative"
              data-testid={`homepage-stat-${index}`}
            >
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-violet-500/30 lg:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-lg bg-violet-500/20 p-2.5">
                    <stat.icon className="h-6 w-6 text-violet-400" aria-hidden />
                  </div>
                </div>
                <div className="mb-3 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  {stat.value}
                </div>
                <p className="mb-2 text-base leading-relaxed text-white/75">{stat.label}</p>
                <p className="text-sm text-white/45">— {stat.source}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
