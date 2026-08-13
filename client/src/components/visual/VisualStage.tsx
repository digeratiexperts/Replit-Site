import { isApprovedStill, type VisualStill } from "@/lib/visualAssets";

type VisualStageLayout = "card" | "editorial" | "spot";

type VisualStageProps = {
  still: VisualStill | undefined;
  alt: string;
  /** card = full-bleed path tile; editorial = section still; spot = transparent icon, no frame */
  layout?: VisualStageLayout;
  className?: string;
};

/**
 * Dark technical sculpture stage — same field as the card/section (#151217).
 * No inner purple square. Sculptures only; not for small card chrome.
 */
export function VisualStage({
  still,
  alt,
  layout = "editorial",
  className = "",
}: VisualStageProps) {
  if (!isApprovedStill(still)) return null;

  const frame =
    layout === "card"
      ? "relative aspect-[5/3] w-full overflow-hidden"
      : layout === "spot"
        ? "relative flex h-44 w-44 shrink-0 items-center justify-center sm:h-56 sm:w-56 lg:h-64 lg:w-64"
        : "relative aspect-[5/3] w-full max-w-md overflow-hidden rounded-2xl bg-[#151217]";

  const imgClass =
    layout === "spot"
      ? "h-full w-full object-contain object-center"
      : "h-full w-full object-cover object-center";

  return (
    <div className={[frame, className].filter(Boolean).join(" ")}>
      <picture>
        <source media="(max-width: 767px)" srcSet={still.srcThumb} type="image/webp" />
        <source srcSet={still.src} type="image/webp" />
        <img
          src={still.srcPng}
          alt={alt}
          width={layout === "spot" ? 512 : 1200}
          height={layout === "spot" ? 512 : 800}
          loading="lazy"
          decoding="async"
          className={imgClass}
        />
      </picture>
      {layout !== "spot" ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#151217] to-transparent"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
