import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Chapter = "well" | "field" | "paper" | "statement" | "transparent";
type Rhythm = "sm" | "md" | "lg" | "none";
type Seam = "none" | "hairline" | "magenta";

const chapterClass: Record<Chapter, string> = {
  well: "de-dark-well",
  field: "de-dark-chapter",
  paper: "de-paper-chapter",
  statement: "de-brand-energy-band",
  transparent: "",
};

const rhythmClass: Record<Rhythm, string> = {
  none: "",
  sm: "py-[var(--de-section-y-sm)]",
  md: "py-[var(--de-section-y)]",
  lg: "py-[var(--de-section-y-lg)]",
};

const seamClass: Record<Seam, string> = {
  none: "",
  hairline: "de-chapter-hairline",
  magenta: "de-founder-seam",
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  chapter?: Chapter;
  rhythm?: Rhythm;
  seam?: Seam;
  children: ReactNode;
}

/**
 * Marketing section shell over the --de-* chapter ladder.
 * Additive: pass className to extend; does not force a container width.
 */
export function Section({
  as: Comp = "section",
  chapter = "transparent",
  rhythm = "md",
  seam = "none",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Comp
      className={cn(
        "relative",
        chapterClass[chapter],
        rhythmClass[rhythm],
        seamClass[seam],
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
