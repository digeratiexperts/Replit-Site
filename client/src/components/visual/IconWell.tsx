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
 * Shared Lucide chrome for marketing cards — muted violet well, not 3D toys.
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
      ? "border-white/10 bg-violet-500/15 text-violet-300"
      : "border-violet-200 bg-violet-50 text-violet-600";

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
