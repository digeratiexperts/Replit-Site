import { useReducedMotion, motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  Lock,
  FileCheck,
  Server,
  Mail,
  Network,
  Activity,
  Database,
} from "lucide-react";

/**
 * Hero product preview for the Cyber Risk Assessment experience.
 * Illustrative anatomy only — no client scores, fake ROI, or invented findings.
 */
export const DashboardMockup = ({ className = "" }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();

  const reviewAreas = [
    { icon: Lock, label: "Identity & access", tone: "from-violet-500/30 to-purple-600/15" },
    { icon: Server, label: "Endpoints & devices", tone: "from-violet-500/25 to-indigo-600/15" },
    { icon: Mail, label: "Email security", tone: "from-fuchsia-500/20 to-violet-600/15" },
    { icon: FileCheck, label: "Backups & recovery", tone: "from-violet-400/20 to-fuchsia-600/10" },
  ];

  /** Six DE domains — presence markers only, never numeric scores. */
  const domains = [
    { icon: Lock, label: "Identity" },
    { icon: Server, label: "Endpoint" },
    { icon: Mail, label: "Email" },
    { icon: Network, label: "Network" },
    { icon: Database, label: "Data & Recovery" },
    { icon: Activity, label: "Security Ops" },
  ];

  const outcomes = [
    "Prioritized findings with clear business impact",
    "Recommendations matched to your size and risk",
    "No-obligation follow-up within one business day",
  ];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Illustrative preview of a Digerati Experts Cyber Risk Assessment overview"
    >
      <div
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 40% 30%, rgba(211, 18, 106, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(91, 69, 224, 0.16) 0%, transparent 50%)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-white/12"
        style={{
          background:
            "linear-gradient(145deg, rgba(12, 10, 22, 0.98) 0%, rgba(18, 12, 36, 0.96) 55%, rgba(10, 8, 20, 0.98) 100%)",
          boxShadow:
            "0 28px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/8 bg-black/30 px-3.5 py-2.5">
          <div className="flex items-center gap-1.5 text-[11px] text-white/55">
            <Shield className="h-3 w-3 text-pink-400/85" aria-hidden="true" />
            <span className="font-medium text-white/70">Cyber Risk Assessment</span>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
            Illustrative view
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-pink-300/20 bg-gradient-to-br from-fuchsia-500/90 via-pink-500/90 to-violet-600/90"
                aria-hidden="true"
              >
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Assessment overview</div>
                <div className="text-xs text-white/45">Sample security posture structure</div>
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-white/85">
            A practical review of posture across identity, endpoints, email, backups, and
            controls — sized to your Arizona business.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {reviewAreas.map((area, index) => (
              <motion.div
                key={area.label}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] p-3"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                  delay: prefersReducedMotion ? 0 : 0.08 + index * 0.04,
                }}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br ${area.tone}`}
                >
                  <area.icon className="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <span className="text-xs font-medium text-white sm:text-sm">{area.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: prefersReducedMotion ? 0 : 0.22 }}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-violet-400" aria-hidden="true" />
                <span className="text-sm font-medium text-white">Domains reviewed</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/35">
                Structure only
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="list">
              {domains.map((domain) => (
                <li
                  key={domain.label}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-black/20 px-2.5 py-2"
                >
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-violet-400/20 bg-violet-500/15"
                    aria-hidden="true"
                  >
                    <domain.icon className="h-3 w-3 text-violet-200" />
                  </span>
                  <span className="truncate text-[11px] font-medium text-white/80 sm:text-xs">
                    {domain.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="space-y-2">
            {outcomes.map((line, index) => (
              <motion.div
                key={line}
                className="flex items-start gap-2.5 text-sm text-white"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.28,
                  delay: prefersReducedMotion ? 0 : 0.28 + index * 0.05,
                }}
              >
                <CheckCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/95"
                  aria-hidden="true"
                />
                <span>{line}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
