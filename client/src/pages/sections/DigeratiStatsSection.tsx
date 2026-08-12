import { motion, useReducedMotion } from "framer-motion";

const stats = [
  {
    value: "88%",
    label: "of SMB breaches involve ransomware",
    source: "Verizon DBIR 2025",
  },
  {
    value: "$4.88M",
    label: "average cost of a data breach",
    source: "IBM 2024",
  },
  {
    value: "99.9%",
    label: "of compromised accounts lacked MFA",
    source: "Microsoft 2025",
  },
  {
    value: "60%",
    label: "of small businesses close within 6 months of an attack",
    source: "Industry Data",
  },
];

export const DigeratiStatsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-[#0a0a0a] py-16 lg:py-24">
      <div className="relative mx-auto max-w-[100rem] px-3 sm:px-4 lg:px-6">
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
            The Threats Are Real
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            Don&apos;t become a statistic. These numbers show why proactive security matters —
            and why endpoint, identity, and recovery discipline have to be owned, not assumed.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="lg:px-8 first:lg:pl-0 last:lg:pr-0"
              data-testid={`homepage-stat-${index}`}
            >
              <p className="font-mono text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">{stat.label}</p>
              <p className="mt-2 text-xs text-white/40">— {stat.source}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
