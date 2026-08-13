import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Width = "content" | "wide" | "prose";

const widthClass: Record<Width, string> = {
  content: "max-w-[var(--de-w-content)]",
  wide: "max-w-[var(--de-w-wide)]",
  prose: "max-w-[var(--de-w-prose)]",
};

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  width?: Width;
  children: ReactNode;
}

/**
 * Canonical marketing content width. Gutters use --de-gutter.
 * Prefer width="content" for bands; "wide" for galleries; "prose" for long copy.
 */
export function Container({
  as: Comp = "div",
  width = "content",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        "relative z-10 mx-auto w-full px-[var(--de-gutter)]",
        widthClass[width],
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
