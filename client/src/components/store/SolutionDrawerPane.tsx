import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SolutionDrawerPaneId } from "./solutionDrawerPanes";

type SolutionDrawerPaneProps = {
  id: SolutionDrawerPaneId;
  title: string;
  summary: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
};

export function SolutionDrawerPane({
  id,
  title,
  summary,
  open,
  onToggle,
  children,
  className,
}: SolutionDrawerPaneProps) {
  const panelId = `solution-pane-panel-${id}`;
  const headingId = `solution-pane-title-${id}`;

  return (
    <section
      className={cn(
        "flex h-full min-h-0 min-w-0 flex-col border-b border-[color:var(--dp-border-10)] md:border-b-0 md:border-r md:last:border-r-0",
        !open && "flex-none",
        className,
      )}
      data-testid={`solution-pane-${id}`}
      data-pane-open={open ? "true" : "false"}
    >
      <h3 id={headingId} className="sr-only">
        {title}
      </h3>
      <button
        type="button"
        className="flex min-h-11 w-full shrink-0 items-center gap-3 px-4 py-2.5 text-left hover:bg-[color:var(--dp-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-de-accent focus-visible:ring-inset"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        data-testid={`button-toggle-pane-${id}`}
      >
        <span className="text-sm font-semibold text-[color:var(--dp-text-primary)]">{title}</span>
        <span className="min-w-0 flex-1 truncate text-sm text-[color:var(--dp-text-50)]">
          {summary}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[color:var(--dp-text-55)] motion-safe:transition-transform motion-safe:duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-1 sm:px-5"
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
