import { isApprovedStill, type VisualStill } from "@/lib/visualAssets";

type StageSize = "md" | "lg" | "xl";

const sizeMap: Record<
  StageSize,
  { wrap: string; img: string; width: number; height: number }
> = {
  md: { wrap: "h-36 w-36 sm:h-40 sm:w-40", img: "h-28 w-28 sm:h-32 sm:w-32", width: 128, height: 128 },
  lg: { wrap: "h-44 w-44 sm:h-52 sm:w-52", img: "h-36 w-36 sm:h-44 sm:w-44", width: 176, height: 176 },
  xl: {
    wrap: "h-52 w-52 sm:h-64 sm:w-64 lg:h-72 lg:w-72",
    img: "h-44 w-44 sm:h-56 sm:w-56 lg:h-64 lg:w-64",
    width: 256,
    height: 256,
  },
};

type SectionVisualStageProps = {
  still: VisualStill | undefined;
  size?: StageSize;
  /** dark homepage panels vs light protect panels */
  surface?: "dark" | "light";
  className?: string;
  /** Meaningful alt when the still is content, not pure decoration */
  alt?: string;
};

/**
 * Editorial Meshy stage — one large visual plane for section rhythm.
 * Prefer one per section. Not a card grid replacement.
 */
export function SectionVisualStage({
  still,
  size = "lg",
  surface = "dark",
  className = "",
  alt,
}: SectionVisualStageProps) {
  if (!isApprovedStill(still)) return null;

  const s = sizeMap[size];
  const framed =
    surface === "dark"
      ? "border-white/10 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/[0.07] to-transparent shadow-[0_0_60px_-20px_rgba(168,85,247,0.45)]"
      : "border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/60 shadow-lg shadow-violet-500/10";

  return (
    <div
      className={[
        s.wrap,
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-3xl border",
        framed,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={alt ? undefined : true}
    >
      <div
        className={[
          "pointer-events-none absolute inset-0 opacity-70",
          surface === "dark"
            ? "bg-[radial-gradient(circle_at_30%_20%,rgba(255,71,127,0.18),transparent_55%)]"
            : "bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.12),transparent_55%)]",
        ].join(" ")}
      />
      <picture>
        <source srcSet={still.src} type="image/webp" />
        <img
          src={still.srcPng}
          alt={alt ?? ""}
          width={s.width}
          height={s.height}
          loading="lazy"
          decoding="async"
          className={`${s.img} relative z-[1] object-contain drop-shadow-lg`}
        />
      </picture>
    </div>
  );
}
