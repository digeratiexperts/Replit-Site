import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3";

export function shouldAppendStatementColon(text: string): boolean {
  return !/[.:!?…]$/.test(text.trim());
}

/**
 * Statement heading with the Trust/Engage magenta (or page-family) colon.
 * Accent ink follows `data-accent` so Journal/blog stays amber.
 */
export function StatementHeading({
  as: Tag = "h1",
  children,
  className,
  colon = true,
}: {
  as?: HeadingTag;
  children: string;
  className?: string;
  colon?: boolean;
}) {
  const showColon = colon && shouldAppendStatementColon(children);

  return (
    <Tag className={cn("font-heading font-semibold tracking-[-0.02em] text-white", className)}>
      {children}
      {showColon ? (
        <span className="text-de-accent-ink" aria-hidden="true">
          :
        </span>
      ) : null}
    </Tag>
  );
}
