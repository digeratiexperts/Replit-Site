import { useReducedMotion, motion } from "framer-motion";
import { Shield, CheckCircle, Lock, FileCheck, Server, Mail } from "lucide-react";

/**
 * Illustrative product preview — not live customer data.
 * Labeled clearly so it reads as a sample Cyber Risk Assessment interface.
 */
export const DashboardMockup = ({ className = "" }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();

  const reviewAreas = [
    { icon: Lock, label: "Identity & access" },
    { icon: Server, label: "Endpoints & devices" },
    { icon: Mail, label: "Email security" },
    { icon: FileCheck, label: "Backups & recovery" },
  ];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
      aria-label="Illustrative sample of a Digerati Cyber Risk Assessment report preview"
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c0a14]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/30">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-1 bg-white/5 rounded-md text-[11px] text-white/50 flex items-center gap-2">
              <Shield className="w-3 h-3 text-violet-400" aria-hidden="true" />
              Sample Cyber Risk Assessment
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-violet-300" aria-hidden="true" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Cyber Risk Assessment</div>
                <div className="text-white/45 text-xs">Illustrative preview · not live customer data</div>
              </div>
            </div>
            <span className="shrink-0 text-[10px] uppercase tracking-wider font-semibold text-violet-300/90 bg-violet-500/10 border border-violet-500/25 px-2 py-1 rounded">
              Sample
            </span>
          </div>

          <p className="text-sm text-white/60 leading-relaxed">
            A practical review of posture across identity, endpoints, email, backups, and
            controls—sized to your Arizona business.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {reviewAreas.map((area) => (
              <div
                key={area.label}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <area.icon className="w-4 h-4 text-violet-400 shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-white/75">{area.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {[
              "Prioritized findings with clear business impact",
              "Recommendations matched to your size and risk",
              "No obligation follow-up within one business day",
            ].map((line) => (
              <div key={line} className="flex items-start gap-2.5 text-sm text-white/65">
                <CheckCircle className="w-4 h-4 text-emerald-500/90 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
