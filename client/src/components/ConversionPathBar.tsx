import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/lib/ctaCopy";
import { PRIMARY_PHONE } from "@/data/companyContact";

type ConversionPathBarProps = {
  headline: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  primaryTestId?: string;
  showPhone?: boolean;
  /** Extra action rendered after the primary button (e.g. page-specific mailto). */
  extraAction?: ReactNode;
};

/**
 * Magenta conversion-path bar used on inner marketing pages.
 * Primary CTA stays on /book unless the page purpose is a report/mailto.
 */
export function ConversionPathBar({
  headline,
  body,
  primaryHref = "/book",
  primaryLabel = CTA.primary,
  primaryTestId = "button-conversion-assessment",
  showPhone = true,
  extraAction,
}: ConversionPathBarProps): JSX.Element {
  return (
    <div className="rounded-2xl border border-[#D3126A]/40 bg-[#D3126A] px-8 py-10 text-center md:px-12 md:py-12">
      <h2 className="mb-4 font-heading text-3xl font-semibold text-white md:text-4xl">{headline}</h2>
      <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 md:text-xl">{body}</p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button asChild size="lg" className="h-12 bg-white px-8 font-semibold text-[#D3126A] hover:bg-white/95">
          <a href={primaryHref} data-testid={primaryTestId}>
            {primaryLabel}
            <ArrowRight className="ml-1 h-5 w-5" aria-hidden="true" />
          </a>
        </Button>
        {showPhone ? (
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-white/70 bg-transparent px-8 font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            <a href={PRIMARY_PHONE.telHref} data-testid="button-conversion-call">
              <Phone className="mr-1 h-5 w-5" aria-hidden="true" />
              Call {PRIMARY_PHONE.display}
            </a>
          </Button>
        ) : null}
        {extraAction}
      </div>
    </div>
  );
}
