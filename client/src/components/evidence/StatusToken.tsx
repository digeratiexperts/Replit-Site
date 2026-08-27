import React from "react";

export type StatusTokenType = "active" | "verified" | "attention" | "informational";

interface StatusTokenProps {
  status: StatusTokenType;
  label?: string;
  className?: string;
  pulsing?: boolean;
}

const statusConfig: Record<
  StatusTokenType,
  { defaultLabel: string; dotClass: string; containerClass: string; textClass: string }
> = {
  active: {
    defaultLabel: "ACTIVE",
    dotClass: "bg-emerald-400 shadow-[0_0_8px_#10B981]",
    containerClass: "bg-emerald-500/10 border-emerald-500/30",
    textClass: "text-emerald-400",
  },
  verified: {
    defaultLabel: "VERIFIED",
    dotClass: "bg-emerald-400",
    containerClass: "bg-emerald-500/10 border-emerald-500/25",
    textClass: "text-emerald-300",
  },
  attention: {
    defaultLabel: "ACTION REQUIRED",
    dotClass: "bg-amber-400 shadow-[0_0_8px_#F59E0B]",
    containerClass: "bg-amber-500/10 border-amber-500/30",
    textClass: "text-amber-400",
  },
  informational: {
    defaultLabel: "TELEMETRY",
    dotClass: "bg-[#D3126A]",
    containerClass: "bg-[#D3126A]/10 border-[#D3126A]/30",
    textClass: "text-[#F04C97]",
  },
};

export const StatusToken: React.FC<StatusTokenProps> = ({
  status,
  label,
  className = "",
  pulsing = false,
}) => {
  const config = statusConfig[status];
  const displayLabel = label ?? config.defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-mono text-[11px] font-semibold tracking-wider uppercase transition-colors ${config.containerClass} ${config.textClass} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full shrink-0 ${config.dotClass} ${
          pulsing ? "animate-pulse" : ""
        }`}
        aria-hidden="true"
      />
      <span>{displayLabel}</span>
    </span>
  );
};
