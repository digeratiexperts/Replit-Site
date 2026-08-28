import React from "react";
import { Activity, Database, Info, ShieldCheck } from "lucide-react";
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
    label: "SANITIZED REAL",
    badgeClass: "bg-de-raised text-white/80 border-white/15",
    icon: Database,
  },
  EXAMPLE: {
    label: "EXAMPLE",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: Info,
  },
  ILLUSTRATIVE: {
    label: "ILLUSTRATIVE",
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
      className={`relative overflow-hidden rounded-2xl border ${
        isDark
          ? "border-de-hairline bg-de-raised text-white shadow-lg shadow-black/25"
          : "border-[var(--de-paper-hairline)] bg-white text-[#1A1228] shadow-md shadow-black/5"
      } ${
        variant === "interactive"
          ? "transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#D3126A]/35 hover:shadow-xl hover:shadow-black/30"
          : ""
      } ${className}`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5 ${
          isDark
            ? "border-de-hairline bg-de-bg/60"
            : "border-[var(--de-paper-hairline)] bg-[var(--de-paper)]/55"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${classMeta.badgeClass}`}
            data-testid="evidence-classification-badge"
          >
            <ClassIcon className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>{classMeta.label}</span>
          </span>
          {status && <StatusToken status={status} label={statusLabel} />}
        </div>
        {timestamp && (
          <span className={`font-mono text-[11px] ${isDark ? "text-white/45" : "text-[#5A5368]"}`}>
            {timestamp}
          </span>
        )}
      </div>

      <div className="px-5 pb-2 pt-4 md:px-6">
        <h4 className={`font-heading text-lg font-bold tracking-tight md:text-xl ${isDark ? "text-white" : "text-[#1A1228]"}`}>
          {title}
        </h4>
        {subtitle && <p className={`mt-1 text-sm leading-relaxed ${isDark ? "text-white/70" : "text-[#3A3448]"}`}>{subtitle}</p>}
      </div>

      <div className="relative z-10 px-5 py-3 md:px-6 md:py-4">{children}</div>

      {sourceNote && (
        <div className={`border-t px-5 py-2.5 font-mono text-[11px] ${isDark ? "border-de-hairline bg-de-bg/45 text-white/50" : "border-[var(--de-paper-hairline)] bg-[var(--de-paper)]/45 text-[#5A5368]"}`}>
          <span>Source: {sourceNote}</span>
        </div>
      )}
    </div>
  );
};
