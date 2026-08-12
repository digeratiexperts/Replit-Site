import { isApprovedStill, type VisualStill } from "@/lib/visualAssets";

type VisualStageLayout = "card" | "editorial";

type VisualStageProps = {
  still: VisualStill | undefined;
  alt: string;
  /** card = full-bleed path tile; editorial = one section-level still */
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
      : "relative aspect-[5/3] w-full max-w-md overflow-hidden rounded-2xl bg-[#151217]";

  return (
    <div className={[frame, className].filter(Boolean).join(" ")}>
      <picture>
        <source media="(max-width: 767px)" srcSet={still.srcThumb} type="image/webp" />
        <source srcSet={still.src} type="image/webp" />
        <img
          src={still.srcPng}
          alt={alt}
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#151217] to-transparent"
        aria-hidden
      />
    </div>
  );
}
