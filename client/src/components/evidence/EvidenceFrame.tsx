import React from "react";
import { ShieldCheck, Info, Database, Activity } from "lucide-react";
import { StatusToken, type StatusTokenType } from "./StatusToken";

export type EvidenceClassification =
  | "LIVE"
  | "SANITIZED_REAL"
  | "EXAMPLE"
  | "ILLUSTRATIVE";

interface EvidenceFrameProps {
  children: React.ReactNode;
  classification: EvidenceClassification;
  title: string;
  subtitle?: string;
  timestamp?: string;
  status?: StatusTokenType;
  statusLabel?: string;
  sourceNote?: string;
  variant?: "dark" | "paper" | "interactive";
  className?: string;
}

const classificationConfig: Record<
  EvidenceClassification,
  { label: string; badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  LIVE: {
    label: "LIVE DATA",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: Activity,
  },
  SANITIZED_REAL: {
    label: "SANITIZED ARTIFACT",
    badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    icon: Database,
  },
  EXAMPLE: {
    label: "EXAMPLE SCENARIO",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: Info,
  },
  ILLUSTRATIVE: {
    label: "ILLUSTRATIVE ARCHITECTURE",
    badgeClass: "bg-[#D3126A]/10 text-[#F04C97] border-[#D3126A]/30",
    icon: ShieldCheck,
  },
};

export const EvidenceFrame: React.FC<EvidenceFrameProps> = ({
  children,
  classification,
  title,
  subtitle,
  timestamp,
  status,
  statusLabel,
  sourceNote,
  variant = "dark",
  className = "",
}) => {
  const isDark = variant === "dark" || variant === "interactive";
  const classMeta = classificationConfig[classification];
  const ClassIcon = classMeta.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all ${
        isDark
          ? "border-white/10 bg-[#0d0a14] text-white shadow-xl shadow-black/40"
          : "border-[var(--de-paper-hairline)] bg-white text-[#1A1228] shadow-md shadow-black/5"
      } ${
        variant === "interactive"
          ? "hover:border-[#D3126A]/50 hover:shadow-[0_8px_32px_-8px_rgba(211,18,106,0.3)] duration-200"
          : ""
      } ${className}`}
    >
      {/* Precision Top Meta Bar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5 ${
          isDark
            ? "border-white/10 bg-[#050312]/60"
            : "border-[var(--de-paper-hairline)] bg-[var(--de-paper)]/50"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Truthfulness Classification Stamp */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border font-mono text-[10px] font-bold tracking-wider uppercase ${classMeta.badgeClass}`}
            data-testid="evidence-classification-badge"
          >
            <ClassIcon className="h-3 w-3 shrink-0" />
            <span>{classMeta.label}</span>
          </span>

          {status && <StatusToken status={status} label={statusLabel} />}
        </div>

        {/* Timestamp / Freshness */}
        {timestamp && (
          <span
            className={`font-mono text-[11px] ${
              isDark ? "text-white/40" : "text-[#5A5368]"
            }`}
          >
            {timestamp}
          </span>
        )}
      </div>

      {/* Frame Header */}
      <div className="px-5 pt-4 pb-2 md:px-6">
        <h4
          className={`font-heading text-lg md:text-xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-[#1A1228]"
          }`}
        >
          {title}
        </h4>
        {subtitle && (
          <p
            className={`mt-1 text-xs md:text-sm leading-relaxed ${
              isDark ? "text-white/70" : "text-[#3A3448]"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Main Evidence Content Slot */}
      <div className="px-5 py-3 md:px-6 md:py-4 relative z-10">{children}</div>

      {/* Footer / Provenance Note */}
      {sourceNote && (
        <div
          className={`border-t px-5 py-2.5 font-mono text-[11px] ${
            isDark
              ? "border-white/5 bg-black/30 text-white/50"
              : "border-[var(--de-paper-hairline)] bg-[var(--de-paper)]/40 text-[#5A5368]"
          }`}
        >
          <span>Source: {sourceNote}</span>
        </div>
      )}
    </div>
  );
};
