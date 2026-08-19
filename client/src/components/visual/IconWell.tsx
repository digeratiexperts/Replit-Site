import type { LucideIcon } from "lucide-react";

type IconWellSize = "sm" | "md";
type IconWellSurface = "dark" | "light";

const sizeMap: Record<IconWellSize, { box: string; icon: string }> = {
  sm: { box: "h-11 w-11", icon: "h-5 w-5" },
  md: { box: "h-12 w-12", icon: "h-5 w-5" },
};

type IconWellProps = {
  icon: LucideIcon;
  size?: IconWellSize;
  surface?: IconWellSurface;
  className?: string;
};

/**
 * Shared Lucide chrome — quiet well so magenta pops. Not a purple-tinted fill.
 */
export function IconWell({
  icon: Icon,
  size = "md",
  surface = "dark",
  className = "",
}: IconWellProps) {
  const s = sizeMap[size];
  const tone =
    surface === "dark"
      ? "border-[var(--de-hairline)] bg-[#0a0a0a] text-[#D3126A]"
      : "border-[var(--de-paper-hairline)] bg-white text-[#D3126A]";

  return (
    <span
      className={[
        s.box,
        "inline-flex shrink-0 items-center justify-center rounded-xl border",
        tone,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon className={s.icon} aria-hidden="true" />
    </span>
  );
}
