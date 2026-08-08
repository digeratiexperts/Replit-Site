import { motion, useReducedMotion } from "framer-motion";
import { KeyRound, HardDrive, ShieldCheck, MessageSquareWarning } from "lucide-react";

const reviewAreas = [
  {
    value: "Identity",
    label: "Who can sign in, how access is protected, and what happens when someone leaves",
    icon: KeyRound,
  },
  {
    value: "Endpoints",
    label: "Whether laptops, servers, and mobile devices are patched, monitored, and recoverable",
    icon: ShieldCheck,
  },
  {
    value: "Backup",
    label: "What is protected, how quickly it can be restored, and whether recovery has been tested",
    icon: HardDrive,
  },
  {
    value: "The human layer",
    label: "Email risk, approval habits, security training, and the process people actually follow",
    icon: MessageSquareWarning,
  },
];

export const DigeratiStatsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-10 lg:py-12 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            We Start With What Is Actually Happening
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            No dramatic statistics and no mystery score. We look at the systems and habits that determine whether your business can prevent, detect, and recover from a problem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              data-testid={`homepage-stat-${index}`}
            >
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-violet-500/20">
                    <area.icon className="h-5 w-5 text-violet-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {area.value}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-2">
                  {area.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
