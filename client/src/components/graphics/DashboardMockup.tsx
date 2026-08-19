import { useReducedMotion, motion } from "framer-motion";
import { Shield, CheckCircle, Lock, FileCheck, Server, Mail, Activity } from "lucide-react";

/**
 * Hero product preview for the Cyber Risk Assessment experience.
 * Decorative posture bars are unlabeled example levels — not customer metrics.
 */
export const DashboardMockup = ({ className = "" }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();

  const reviewAreas = [
    { icon: Lock, label: "Identity & access" },
    { icon: Server, label: "Endpoints & devices" },
    { icon: Mail, label: "Email security" },
    { icon: FileCheck, label: "Backups & recovery" },
  ];

  const postureBars = [
    { label: "Identity", level: 78, color: "#D3126A" },
    { label: "Endpoints", level: 84, color: "#f0187a" },
    { label: "Email", level: 72, color: "#D3126A" },
    { label: "Backups", level: 88, color: "#34d399" },
    { label: "Controls", level: 70, color: "#9ca3af" },
    { label: "Overall", level: 80, color: "#D3126A" },
  ];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeOut" }}
      aria-label="Illustrative preview of a Digerati Experts Cyber Risk Assessment"
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/12"
        style={{
          background:
            "linear-gradient(145deg, #0a0a0a 0%, #151217 55%, #0a0a0a 100%)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/8 bg-black/25">
          <div className="flex gap-1" aria-hidden="true">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/15" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-2.5 py-0.5 text-base text-white/55 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-pink-400/80" aria-hidden="true" />
              Cyber Risk Assessment
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl bg-[#D3126A] flex items-center justify-center border border-[#D3126A]"
              aria-hidden="true"
            >
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">Cyber Risk Assessment</div>
              <div className="text-white/50 text-base italic">Illustrative preview · not live customer data</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {reviewAreas.map((area, index) => (
              <motion.div
                key={area.label}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.035] border border-white/10"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  delay: prefersReducedMotion ? 0 : 0.15 + index * 0.06,
                }}
              >
                <div className="w-8 h-8 rounded-lg border border-de-hairline bg-de-raised flex items-center justify-center shrink-0">
                  <area.icon className="w-4 h-4 text-[#D3126A]" aria-hidden="true" />
                </div>
                <span className="text-base text-white font-medium">{area.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.35 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-[#D3126A]" aria-hidden="true" />
              <span className="text-white text-base font-medium">Posture across key areas</span>
            </div>
            <div className="flex items-end gap-2 h-[62px]" aria-hidden="true">
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
                />
              ))}
            </div>
            <div className="flex justify-between mt-2" aria-hidden="true">
              {postureBars.map((bar) => (
                <span key={bar.label} className="text-[14px] text-white/50 truncate max-w-[14%]">
                  {bar.label}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-1.5">
            {[
              "Prioritized findings",
              "Recommendations matched to your size",
              "No obligation follow-up",
            ].map((line, index) => (
              <motion.div
                key={line}
                className="flex items-start gap-2.5 text-base text-white"
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
