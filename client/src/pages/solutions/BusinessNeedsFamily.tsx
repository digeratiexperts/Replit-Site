import { Link, useParams } from "wouter";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import NotFound from "@/pages/not-found";
import {
  BUSINESS_NEEDS_INDEX_PATH,
  familyPath,
  getFamilyBySlug,
  offerForDelivery,
  parseDeliveryModel,
  requestPath,
  type CuratedDeliveryModel,
} from "@/lib/businessNeeds";
import { openMspAdvisor } from "@/lib/openMspAdvisor";

function OfferList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/55">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-white/75">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function BusinessNeedsFamily() {
  const params = useParams<{ family?: string }>();
  const family = getFamilyBySlug(params.family || "");
  const [delivery, setDelivery] = useState<CuratedDeliveryModel>("standalone");

  const offer = useMemo(() => (family ? offerForDelivery(family, delivery) : null), [family, delivery]);

  useSEO(
    family
      ? {
          title: `${family.label} | Solve a Business Need`,
          description: family.description,
          canonical: familyPath(family.id),
        }
      : {
          title: "Page not found",
          description: "That solution family is not published.",
          noIndex: true,
        },
  );

  if (!family || !offer) {
    return <NotFound />;
  }

  const askAbout = () => {
    openMspAdvisor({
      context: "other",
      seedMessage: `I am reviewing the Digerati Experts ${family.label} ${
        delivery === "co_managed" ? "co-managed" : "standalone"
      } solution and want to ask about fit, scope, and next steps. Do not recommend a shopping cart.`,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-de-bg">
      <div className="relative z-10">
        <MegaMenu />
        <main className="de-nav-clear mx-auto max-w-4xl px-4 pb-40 sm:px-6 lg:px-8">
          <Link
            href={BUSINESS_NEEDS_INDEX_PATH}
            className="mb-8 inline-flex h-11 items-center text-sm text-white/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050312]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            All solution families
          </Link>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-de-accent-ink">
            Solve a Business Need
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl" data-testid="heading-family">
            {family.label}
          </h1>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-white/75">{family.description}</p>

          <div
            className="mb-8 grid grid-cols-2 gap-2 rounded-xl border border-de-hairline bg-de-raised p-2"
            role="tablist"
            aria-label="Delivery model"
          >
            {(
              [
                ["standalone", "Standalone"],
                ["co_managed", "Co-managed"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={delivery === value}
                className={`h-11 rounded-lg text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] ${
                  delivery === value
                    ? "bg-[#D3126A] text-white"
                    : "text-white/70 hover:bg-white/5"
                }`}
                onClick={() => setDelivery(value)}
                data-testid={`delivery-${value}`}
              >
                {label}
              </button>
            ))}
          </div>

          <article
            className="rounded-2xl border border-de-hairline bg-de-raised p-6 md:p-8"
            data-testid="offer-panel"
          >
            <p className="mb-2 text-xs uppercase tracking-wide text-white/45">
              {delivery === "co_managed" ? "Co-managed delivery" : "Standalone delivery"}
            </p>
            <h2 className="mb-3 text-2xl font-semibold text-white">{offer.name}</h2>
            <p className="mb-8 text-white/75 leading-relaxed">{offer.summary}</p>

            <div className="grid gap-8 md:grid-cols-2">
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/55">
                  Business problem
                </h3>
                <p className="text-sm leading-relaxed text-white/75">{family.description}</p>
              </section>
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/55">
                  Intended customer
                </h3>
                <p className="text-sm leading-relaxed text-white/75">{offer.audience}</p>
              </section>
              <OfferList title="Expected outcomes" items={offer.outcomes} />
              <OfferList title="Included capabilities" items={offer.includes} />
              <OfferList title="Prerequisites" items={offer.prerequisites} />
              <OfferList title="Scope boundaries and exclusions" items={offer.boundaries} />
            </div>

            <section className="mt-8 border-t border-de-hairline pt-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/55">
                Service-level description
              </h3>
              <p className="text-sm leading-relaxed text-white/75">{offer.serviceLevel}</p>
            </section>
            <section className="mt-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/55">
                Approved pricing structure
              </h3>
              <p className="text-sm leading-relaxed text-white/75">{offer.commercialModel}</p>
            </section>
            <section className="mt-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/55">
                What happens next
              </h3>
              <p className="text-sm leading-relaxed text-white/75">{offer.nextStep}</p>
            </section>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-dashed border-white/15 bg-de-bg p-4">
                <h3 className="mb-1 text-sm font-semibold text-white">Optional enhancements</h3>
                <p className="text-sm text-white/55">
                  No approved public enhancements are listed for this solution yet.
                </p>
              </div>
              <div className="rounded-xl border border-dashed border-white/15 bg-de-bg p-4">
                <h3 className="mb-1 text-sm font-semibold text-white">Compatibility or eligibility</h3>
                <p className="text-sm text-white/55">
                  No additional public eligibility questions are published for this solution. Digerati
                  Experts confirms compatibility during assessment and scope approval.
                </p>
              </div>
            </div>
          </article>

          <section className="mt-8" aria-label="Solution actions">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="brand" className="h-11">
                <Link href={requestPath({ family: family.id, delivery, intent: "request" })}>
                  Request this solution
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 border-white/20 text-white hover:bg-white/10">
                <Link href={requestPath({ family: family.id, delivery, intent: "quote" })}>
                  Request a quote
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 border-white/20 text-white hover:bg-white/10">
                <Link href={requestPath({ family: family.id, delivery, intent: "assessment" })}>
                  Start an assessment
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 border-white/20 text-white hover:bg-white/10">
                <Link href={requestPath({ family: family.id, delivery, intent: "consultation" })}>
                  Schedule a consultation
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 border-white/20 text-white hover:bg-white/10"
                onClick={askAbout}
                data-testid="ask-de-solution"
              >
                Ask DE about this solution
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/50">
              A Solution Request is not a cart order. Payment is not available on this path.
            </p>
          </section>
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    </div>
  );
}
