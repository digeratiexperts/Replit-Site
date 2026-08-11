import { Link } from "wouter";
import { ArrowRight, Calendar, ClipboardList, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openMspAdvisor } from "@/lib/openMspAdvisor";

interface StoreAssessmentPanelProps {
  variant?: "sticky" | "inline";
  onFilterAssessments?: () => void;
  onBuildSolution?: () => void;
}

/**
 * Relocated assessment CTA — keeps the concept without cutting the product grid.
 */
export function StoreAssessmentPanel({
  variant = "sticky",
  onFilterAssessments,
  onBuildSolution,
}: StoreAssessmentPanelProps) {
  const shell = variant === "sticky" ? "lg:sticky lg:top-28 space-y-4" : "mb-10";

  return (
    <aside className={shell} data-testid="store-assessment-panel">
      <div className="rounded-xl border border-white/10 bg-[#141414] p-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[#5034ff]/30 bg-[#5034ff]/15">
          <ClipboardList className="h-5 w-5 text-[#a78bfa]" />
        </div>
        <h3 className="text-lg font-semibold text-white">Not sure where to start?</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          Book a free cyber risk assessment, build a guided stack, or open Ask Digerati. We map gaps
          to catalog items — no obligation.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <a href="/book">
            <Button
              className="h-10 w-full bg-[#5034ff] text-white hover:bg-[#6548ff]"
              data-testid="button-assessment-book"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book assessment
            </Button>
          </a>
          {onFilterAssessments && (
            <Button
              variant="outline"
              className="h-10 w-full border-white/15 bg-transparent text-white hover:bg-white/5"
              onClick={onFilterAssessments}
              data-testid="button-filter-assessments"
            >
              View assessment products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            className="h-10 w-full text-white/70 hover:bg-white/5 hover:text-white"
            onClick={() => {
              if (onBuildSolution) onBuildSolution();
              else openMspAdvisor({ context: "store" });
            }}
            data-testid="button-open-advisor-from-store"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Build my solution
          </Button>
        </div>
        <p className="mt-3 text-xs text-white/40">
          Or call{" "}
          <a href="tel:480-519-5892" className="text-[#a78bfa] hover:underline">
            480-519-5892
          </a>
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
        <p className="text-sm font-medium text-white">Need full-service IT?</p>
        <p className="mt-1 text-xs text-white/50">
          ProActive Ecosystem packages include layered security and support in one plan.
        </p>
        <Link href="/store/managed">
          <span className="mt-3 inline-flex items-center text-sm text-[#a78bfa] hover:text-[#c4b5fd]">
            View managed packages
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </aside>
  );
}
