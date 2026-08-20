import { useReducedMotion, motion } from "framer-motion";
import { Activity, CheckCircle, FileCheck, Lock, Mail, Server, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const REVIEW_AREAS: Array<{ icon: LucideIcon; label: string; accent: string }> = [
  { icon: Lock, label: "Identity & access", accent: "text-[#c4b5fd]" },
  { icon: Server, label: "Endpoints & devices", accent: "text-[#c4b5fd]" },
  { icon: Mail, label: "Email security", accent: "text-[#c4b5fd]" },
  { icon: FileCheck, label: "Backups & recovery", accent: "text-emerald-300/90" },
];

const POSTURE_BARS: Array<{
  label: string;
  level: number;
  color: string;
  overall?: boolean;
}> = [
  { label: "Identity", level: 68, color: "#7c3aed" },
  { label: "Endpoints", level: 77, color: "#8b5cf6" },
  { label: "Email", level: 61, color: "#6b7280" },
  { label: "Backups", level: 84, color: "#34d399" },
  { label: "Controls", level: 56, color: "#64748b" },
  { label: "Overall", level: 69, color: "#D3126A", overall: true },
];

const OVERALL_SCORE = POSTURE_BARS.find((bar) => bar.overall)?.level ?? 69;

const OUTCOMES = [
  "Prioritized findings",
  "Business-impact context",
  "Right-sized recommendations",
];

/**
 * Hero product preview for the Cyber Risk Assessment experience.
 * Values are illustrative sample posture — not live customer data.
 */
export const DashboardMockup = ({ className = "" }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
      aria-label="Illustrative preview of a Digerati Experts Cyber Risk Assessment"
    >
      <div
        className="relative overflow-hidden rounded-[16px] border border-white/[0.12]"
        style={{
          background: "linear-gradient(180deg, #17141c 0%, #121014 58%, #0c0a10 100%)",
          boxShadow: "0 20px 48px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.08] bg-black/30 px-3 py-1.5">
          <div className="flex gap-1" aria-hidden="true">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <div className="flex flex-1 items-center justify-center gap-1.5 text-[12px] text-white/50">
            <Shield className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
            Assessment overview
          </div>
        </div>

        <div className="space-y-3 p-3.5 sm:p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold tracking-tight text-white">
                What the assessment reviews
              </p>
              <p className="mt-1 max-w-[28rem] text-[13px] leading-5 text-white/60">
                Review of identity, endpoints, email, backups, and foundational security controls.
              </p>
            </div>
            <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-white/45">
              Illustrative preview
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
            {REVIEW_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.label}
                  className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-2.5 py-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#151217]">
                    <Icon className={`h-4 w-4 ${area.accent}`} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="text-[13px] font-medium leading-4 text-white">{area.label}</span>
                </div>
              );
            })}
          </div>

          <div className="rounded-[10px] border border-white/[0.10] bg-[#0b0a0e] p-3">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#A78BFA]" aria-hidden="true" />
                <p className="text-[13px] font-medium text-white">Posture across key areas</p>
              </div>
              <p className="text-right">
                <span className="block text-[10px] font-medium uppercase tracking-[0.08em] text-white/40">
                  Overall posture
                </span>
                <span className="text-[15px] font-semibold tabular-nums text-white">
                  {OVERALL_SCORE}
                  <span className="text-[12px] font-medium text-white/45"> / 100</span>
                </span>
                <span className="ml-1.5 text-[10px] text-white/35">Illustrative</span>
              </p>
            </div>
            <div className="flex h-[78px] items-end gap-2" aria-hidden="true">
              {POSTURE_BARS.map((bar, index) => (
                <motion.div
                  key={bar.label}
                  className={`flex-1 ${bar.overall ? "rounded-t-md ring-1 ring-white/15" : "rounded-t-[6px]"}`}
                  style={{ backgroundColor: bar.color }}
                  initial={prefersReducedMotion ? false : { height: 0 }}
                  animate={{ height: `${bar.level}%` }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.42,
                    delay: prefersReducedMotion ? 0 : 0.2 + index * 0.04,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between gap-1">
              {POSTURE_BARS.map((bar) => (
                <span
                  key={bar.label}
                  className={`max-w-[16%] truncate text-center text-[11px] leading-4 ${
                    bar.overall ? "font-medium text-white/70" : "text-white/45"
                  }`}
                >
                  {bar.label}
                </span>
              ))}
            </div>
          </div>

          <ul className="space-y-1.5">
            {OUTCOMES.map((line) => (
              <li key={line} className="flex items-start gap-2 text-[13px] leading-5 text-white/90">
                <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
