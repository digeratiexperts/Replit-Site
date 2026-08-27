import React from "react";

interface HUDFrameProps {
  children: React.ReactNode;
  technicalId?: string;
  className?: string;
  cornerMarks?: boolean;
  gridMatrix?: boolean;
  accentBorder?: boolean;
}

export const HUDFrame: React.FC<HUDFrameProps> = ({
  children,
  technicalId,
  className = "",
  cornerMarks = true,
  gridMatrix = false,
  accentBorder = false,
}) => {
  return (
    <div
      className={`relative rounded-xl border transition-all ${
        accentBorder
          ? "border-[#D3126A]/40 shadow-[0_0_24px_-8px_rgba(211,18,106,0.25)]"
          : "border-white/10"
      } bg-[#0e0b14]/90 backdrop-blur-md ${
        gridMatrix ? "de-grid-matrix" : ""
      } ${className}`}
    >
      {/* Precision Corner Marks */}
      {cornerMarks && (
        <>
          <span
            className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-[#D3126A] rounded-tl-xl"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#D3126A] rounded-br-xl"
            aria-hidden="true"
          />
        </>
      )}

      {/* Technical ID Header Stamp */}
      {technicalId && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
          <span>{technicalId}</span>
          <span className="h-1 w-1 rounded-full bg-[#D3126A]" aria-hidden="true" />
        </div>
      )}

      {/* Interior Body */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
