import React from "react";
import type { LucideIcon } from "lucide-react";
import { StatusToken, type StatusTokenType } from "./StatusToken";

/* 1. Security Boundary Container */
export interface SecurityBoundaryProps {
  label: string;
  sublabel?: string;
  status?: StatusTokenType;
  children: React.ReactNode;
  variant?: "perimeter" | "enclave" | "cloud" | "dmz";
  className?: string;
}

export const SecurityBoundary: React.FC<SecurityBoundaryProps> = ({
  label,
  sublabel,
  status = "active",
  children,
  variant = "perimeter",
  className = "",
}) => {
  const borderStyles = {
    perimeter: "border-[#D3126A]/40 bg-[#151217]/50 shadow-[0_0_24px_-8px_rgba(211,18,106,0.15)]",
    enclave: "border-emerald-500/30 bg-emerald-950/10",
    cloud: "border-cyan-500/30 bg-cyan-950/10",
    dmz: "border-amber-500/30 bg-amber-950/10",
  }[variant];

  return (
    <div className={`relative rounded-xl border p-4 md:p-5 transition-all ${borderStyles} ${className}`}>
      {/* Header Label Stamp */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5 mb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            {label}
          </span>
          {sublabel && <span className="font-mono text-[10px] text-white/50">({sublabel})</span>}
        </div>
        <StatusToken status={status} />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* 2. Diagram Node */
export interface DiagramNodeProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  status?: "healthy" | "monitored" | "alert" | "isolated";
  metrics?: string;
  className?: string;
}

export const DiagramNode: React.FC<DiagramNodeProps> = ({
  title,
  subtitle,
  icon: Icon,
  status = "monitored",
  metrics,
  className = "",
}) => {
  const statusStyles = {
    healthy: "border-emerald-500/30 text-emerald-300",
    monitored: "border-white/10 text-white/90",
    alert: "border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    isolated: "border-[#D3126A]/50 text-[#F04C97] shadow-[0_0_12px_rgba(211,18,106,0.25)]",
  }[status];

  return (
    <div
      className={`rounded-lg border bg-[#0d0a14]/90 p-3 shadow-md backdrop-blur-sm transition-all hover:border-[#D3126A]/40 ${statusStyles} ${className}`}
    >
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/40 text-white">
            <Icon className="h-4 w-4 text-[#F04C97]" aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-white font-heading">{title}</p>
          {subtitle && <p className="truncate text-[11px] text-white/60 font-sans">{subtitle}</p>}
        </div>
      </div>
      {metrics && (
        <div className="mt-2 border-t border-white/5 pt-1.5 font-mono text-[10px] text-white/50 flex justify-between items-center">
          <span>Telemetry:</span>
          <span className="font-semibold text-white/80">{metrics}</span>
        </div>
      )}
    </div>
  );
};

/* 3. Control Gate / Inspection Point */
export interface ControlGateProps {
  label: string;
  policy: string;
  enforced?: boolean;
}

export const ControlGate: React.FC<ControlGateProps> = ({
  label,
  policy,
  enforced = true,
}) => {
  return (
    <div className="flex items-center gap-2 rounded border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-[11px]">
      <span
        className={`h-2 w-2 rounded-full ${
          enforced ? "bg-emerald-400 shadow-[0_0_6px_#10B981]" : "bg-amber-400"
        }`}
        aria-hidden="true"
      />
      <span className="font-bold text-white">{label}:</span>
      <span className="text-white/70">{policy}</span>
    </div>
  );
};
