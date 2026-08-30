import { Link, useParams } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
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
} from "@/lib/businessNeeds";
import { openMspAdvisor } from "@/lib/openMspAdvisor";
import { StorePageAtmosphere } from "@/components/store/StorePageAtmosphere";
import { PublicSolutionCart } from "@/components/store/PublicSolutionCart";
import { addDraftNeed, patchSolutionDraft, readSolutionDraft, type DeliveryPreference } from "@/lib/solutionDraft";
import { useToast } from "@/hooks/use-toast";

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

const DELIVERY_OPTIONS: Array<[DeliveryPreference, string]> = [
  ["standalone", "DE manages this"],
  ["co_managed", "Work with our IT team"],
  ["unsure", "Not sure — help me decide"],
];

export default function BusinessNeedsFamily() {
  const params = useParams<{ family?: string }>();
  const family = getFamilyBySlug(params.family || "");
  const [delivery, setDelivery] = useState<DeliveryPreference | "">("");
  const { toast } = useToast();

  useEffect(() => {
    if (!family) return;
    const draft = readSolutionDraft();
    setDelivery(
      draft.needs.find((need) => need.familyId === family.id)?.delivery || draft.deliveryPreference || "",
    );
  }, [family?.id]);

  const offer = useMemo(() => {
    if (!family) return null;
    if (delivery === "co_managed" || delivery === "standalone") {
      return offerForDelivery(family, delivery);
    }
    return offerForDelivery(family, "standalone");
  }, [family, delivery]);

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
      seedMessage: `I am reviewing the Digerati Experts ${family.label} solution and want to ask about fit, scope, and next steps.`,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      <StorePageAtmosphere />
      <div className="relative z-10">
        <MegaMenu />
        <main className="de-nav-clear mx-auto max-w-5xl px-4 pb-40 sm:px-6 lg:px-8">
          <Link
            href={BUSINESS_NEEDS_INDEX_PATH}
            className="mb-10 inline-flex h-11 items-center text-sm text-white/55 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050312]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to the Store
          </Link>

          <header className="max-w-3xl pb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-de-accent-ink">
              Curated DE solution
            </p>
            <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.035em] text-white" data-testid="heading-family">
              {family.label}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{family.description}</p>
          </header>

          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/45">
            What fits your organization?
          </h2>
          <div
            className="mb-8 grid grid-cols-1 gap-2 rounded-xl border border-de-hairline bg-de-raised p-2 sm:grid-cols-3"
            role="tablist"
            aria-label="What fits your organization?"
          >
            {DELIVERY_OPTIONS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={delivery === value}
                className={`h-11 rounded-lg px-3 text-left text-sm font-semibold sm:text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] ${
                  delivery === value
                    ? "bg-[#D3126A] text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
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
            <p className="mb-2 text-xs uppercase tracking-wide text-de-accent-ink">
              {delivery === "co_managed"
                ? "Shared delivery"
                : delivery === "standalone"
                  ? "DE-managed delivery"
                  : "Select how DE should be involved"}
            </p>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              {delivery === "co_managed" || delivery === "standalone" ? offer.name : family.label}
            </h2>
            <p className="mb-8 text-white/75 leading-relaxed">
              {delivery === "co_managed" || delivery === "standalone" ? offer.summary : family.description}
            </p>

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
              <OfferList title="What this helps you achieve" items={offer.outcomes} />
              <OfferList title="What DE provides" items={offer.includes} />
              <OfferList title="Prerequisites" items={offer.prerequisites} />
              <OfferList title="What is scoped separately" items={offer.boundaries} />
            </div>

            <section className="mt-8 border-t border-de-hairline pt-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/55">
                Service approach
              </h3>
              <p className="text-sm leading-relaxed text-white/75">{offer.serviceLevel}</p>
            </section>
            <section className="mt-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/55">
                Pricing approach
              </h3>
              <p className="text-sm leading-relaxed text-white/75">{offer.commercialModel}</p>
            </section>
            <section className="mt-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/55">
                What happens next
              </h3>
              <p className="text-sm leading-relaxed text-white/75">{offer.nextStep}</p>
            </section>

          </article>

          <section className="mt-8" aria-label="Solution actions">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                variant="brand"
                className="h-11"
                disabled={!delivery}
                data-testid="continue-building"
                onClick={() => {
                  if (!delivery) return;
                  addDraftNeed({
                    familyId: family.id,
                    delivery,
                  });
                  const current = readSolutionDraft();
                  if (!current.deliveryPreference) {
                    patchSolutionDraft({ deliveryPreference: delivery });
                  }
                  toast({
                    title: "Added to Your Solution",
                    description: `${family.label} is in Your Solution.`,
                  });
                }}
              >
                Continue building
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
            <p className="mt-4 flex items-start gap-2 text-sm text-white/50">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-de-accent-ink" />
              No payment is required. We'll confirm fit, scope, and pricing before you commit.
            </p>
          </section>
        </main>
        <PublicSolutionCart />
        <DigeratiEnhancedFooterSection />
      </div>
    </div>
  );
}
