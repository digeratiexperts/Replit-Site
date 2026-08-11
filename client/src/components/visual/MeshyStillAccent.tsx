import { isApprovedStill, type VisualStill } from "@/lib/visualAssets";

type StillSize = "sm" | "md" | "lg";

const sizeMap: Record<
  StillSize,
  { box: string; img: string; width: number; height: number }
> = {
  sm: { box: "h-12 w-12", img: "h-9 w-9", width: 36, height: 36 },
  md: { box: "h-14 w-14", img: "h-11 w-11", width: 44, height: 44 },
  lg: { box: "h-16 w-16", img: "h-14 w-14", width: 56, height: 56 },
};

type MeshyStillAccentProps = {
  still: VisualStill | undefined;
  size?: StillSize;
  className?: string;
  /** Soft frame behind the still; keep muted on dark surfaces */
  framed?: boolean;
};

/**
 * Selective Meshy still — one accent per section max.
 * Decorative by default (empty alt); pair with nearby copy for meaning.
 */
export function MeshyStillAccent({
  still,
  size = "md",
  className = "",
  framed = true,
}: MeshyStillAccentProps) {
  if (!isApprovedStill(still)) return null;

  const s = sizeMap[size];

  return (
    <div
      className={[
        s.box,
        "flex shrink-0 items-center justify-center overflow-hidden",
        framed
          ? "rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/[0.06] to-transparent"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <picture>
        <source srcSet={still.srcThumb} type="image/webp" />
        <img
          src={still.srcPng}
          alt=""
          width={s.width}
          height={s.height}
          loading="lazy"
          decoding="async"
          className={`${s.img} object-contain opacity-85`}
          aria-hidden
        />
      </picture>
    </div>
  );
}
