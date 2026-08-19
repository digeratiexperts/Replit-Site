import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Extra travel as a percent of the frame. 8–14 is cinematic; keep ≤14. */
export function parallaxTravelRange(
  reduceMotion: boolean | null,
  travelPercent: number,
): [string, string] {
  if (reduceMotion) return ["0%", "0%"];
  return [`-${travelPercent}%`, `${travelPercent}%`];
}

type ParallaxStillProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  travel?: number;
  sizes?: string;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
  testId?: string;
};

/**
 * In-frame photography parallax. Parent should clip (`overflow-hidden`).
 * Reduced motion holds the still. Do not use on card grids, forms, or FAQ.
 */
export function ParallaxStill({
  src,
  alt,
  className,
  imgClassName,
  travel = 12,
  sizes,
  loading = "lazy",
  width,
  height,
  testId,
}: ParallaxStillProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallaxTravelRange(reduceMotion, travel));
  const extra = reduceMotion ? 0 : travel;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
        aria-hidden={alt === "" ? true : undefined}
        data-testid={testId}
        className={cn("absolute left-0 w-full object-cover object-center", imgClassName)}
        style={{
          y,
          top: extra ? `-${extra}%` : 0,
          height: extra ? `${100 + extra * 2}%` : "100%",
        }}
      />
    </div>
  );
}
