import { useReducedMotion, motion } from "framer-motion";
import { Shield, CheckCircle, Lock, FileCheck, Server, Mail, Activity } from "lucide-react";

/**
 * Illustrative product preview — not live customer data.
 * Visual depth inspired by production mockup; content stays honest (no invented metrics).
 */
export const DashboardMockup = ({ className = "" }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();

  const reviewAreas = [
    { icon: Lock, label: "Identity & access", tone: "from-violet-500/25 to-purple-600/20" },
    { icon: Server, label: "Endpoints & devices", tone: "from-indigo-500/25 to-violet-600/20" },
    { icon: Mail, label: "Email security", tone: "from-fuchsia-500/20 to-violet-600/20" },
    { icon: FileCheck, label: "Backups & recovery", tone: "from-emerald-500/20 to-teal-600/15" },
  ];

  const postureBars = [
    { label: "Identity", level: 78, color: "#8b5cf6" },
    { label: "Endpoints", level: 84, color: "#a78bfa" },
    { label: "Email", level: 72, color: "#c084fc" },
    { label: "Backups", level: 88, color: "#34d399" },
    { label: "Controls", level: 70, color: "#818cf8" },
    { label: "Overall", level: 80, color: "#8b5cf6" },
  ];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeOut" }}
      aria-label="Illustrative sample of a Digerati Experts Cyber Risk Assessment report preview"
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/12"
        style={{
          background:
            "linear-gradient(145deg, rgba(12, 10, 22, 0.98) 0%, rgba(18, 12, 36, 0.96) 55%, rgba(10, 8, 20, 0.98) 100%)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/35">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/90" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/90" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/90" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-1 bg-white/5 rounded-md text-[11px] text-white/55 flex items-center gap-2 border border-white/5">
              <Shield className="w-3 h-3 text-violet-400" aria-hidden="true" />
              Sample Cyber Risk Assessment
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-violet-600 flex items-center justify-center border border-pink-300/25"
                aria-hidden="true"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        boxShadow: [
                          "0 0 16px rgba(236, 72, 153, 0.28)",
                          "0 0 28px rgba(236, 72, 153, 0.48)",
                          "0 0 16px rgba(236, 72, 153, 0.28)",
                        ],
                      }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <div className="text-white font-semibold text-sm">Cyber Risk Assessment</div>
                <div className="text-white/45 text-xs">Illustrative preview · not live customer data</div>
              </div>
            </div>
            <span className="shrink-0 text-[10px] uppercase tracking-wider font-semibold text-pink-100/95 bg-pink-500/20 border border-pink-400/35 px-2.5 py-1 rounded-md">
              Sample
            </span>
          </div>

          <p className="text-sm text-white leading-relaxed">
            A practical review of posture across identity, endpoints, email, backups, and
            controls—sized to your Arizona business.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {reviewAreas.map((area, index) => (
              <motion.div
                key={area.label}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.035] border border-white/10"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  delay: prefersReducedMotion ? 0 : 0.15 + index * 0.06,
                }}
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${area.tone} border border-white/10 flex items-center justify-center shrink-0`}
                >
                  <area.icon className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm text-white font-medium">{area.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.35 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-violet-400" aria-hidden="true" />
                <span className="text-white text-sm font-medium">Sample posture areas</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-white/40">Illustrative</span>
            </div>
            <div className="flex items-end gap-2 h-[72px]" aria-hidden="true">
              {postureBars.map((bar, index) => (
                <motion.div
                  key={bar.label}
                  className="flex-1 rounded-t-md opacity-90"
                  style={{ backgroundColor: bar.color }}
                  initial={prefersReducedMotion ? false : { height: 0 }}
                  animate={{ height: `${bar.level}%` }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    delay: prefersReducedMotion ? 0 : 0.45 + index * 0.05,
                    ease: "easeOut",
                  }}
                  title={bar.label}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {postureBars.map((bar) => (
                <span key={bar.label} className="text-[9px] text-white/35 truncate max-w-[14%]">
                  {bar.label}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-2">
            {[
              "Prioritized findings with clear business impact",
              "Recommendations matched to your size and risk",
              "No obligation follow-up within one business day",
            ].map((line, index) => (
              <motion.div
                key={line}
                className="flex items-start gap-2.5 text-sm text-white selection:bg-violet-500 selection:text-white"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                  delay: prefersReducedMotion ? 0 : 0.55 + index * 0.06,
                }}
              >
                <CheckCircle className="w-4 h-4 text-emerald-400/95 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{line}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
