import React from "react";
import type { LucideIcon } from "lucide-react";

interface ProofChipProps {
  label: string;
  metric?: string;
  icon?: LucideIcon;
  variant?: "dark" | "paper";
  className?: string;
}

export const ProofChip: React.FC<ProofChipProps> = ({
  label,
  metric,
  icon: Icon,
  variant = "dark",
  className = "",
}) => {
  const isDark = variant === "dark";

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
        isDark
          ? "bg-[#151217]/90 border-white/10 text-white/90 shadow-sm"
          : "bg-white border-[var(--de-paper-hairline)] text-[#1A1228] shadow-sm"
      } ${className}`}
    >
      {Icon && (
        <Icon
          className={`h-3.5 w-3.5 shrink-0 ${
            isDark ? "text-[#F04C97]" : "text-[#D3126A]"
          }`}
          aria-hidden="true"
        />
      )}
      {metric && (
        <span
          className={`font-bold font-mono tracking-tight ${
            isDark ? "text-white" : "text-[#1A1228]"
          }`}
        >
          {metric}
        </span>
      )}
      <span className={isDark ? "text-white/70" : "text-[#5A5368]"}>{label}</span>
    </div>
  );
};
