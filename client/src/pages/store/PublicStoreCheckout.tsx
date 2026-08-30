import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, ClipboardCheck, Layers, Trash2 } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { StorePageAtmosphere } from "@/components/store/StorePageAtmosphere";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BUSINESS_NEEDS_INDEX_PATH,
  getFamilyById,
  offerForDelivery,
  requestPath,
} from "@/lib/businessNeeds";
import { openMspAdvisor } from "@/lib/openMspAdvisor";
import {
  emptyDraft,
  patchEnvironment,
  patchSolutionDraft,
  readSolutionDraft,
  recommendedCtaLabel,
  recommendedIntent,
  removeDraftNeed,
  resolvedNeedDelivery,
  SOLUTION_DRAFT_EVENT,
  writeSolutionDraft,
  type DeliveryPreference,
  type DeviceOwnership,
  type InternalItStatus,
  type SolutionDraft,
  type SolutionEnvironment,
} from "@/lib/solutionDraft";
import { useSEO } from "@/hooks/useSEO";

const DELIVERY_OPTIONS: Array<[DeliveryPreference, string]> = [
  ["standalone", "DE manages this"],
  ["co_managed", "Work with our IT team"],
  ["unsure", "Not sure — help me decide"],
];

const OWNERSHIP_OPTIONS: Array<[Exclude<DeviceOwnership, "">, string]> = [
  ["company", "Company-owned"],
  ["byod", "BYOD"],
  ["hybrid", "Hybrid"],
];

const INTERNAL_IT_OPTIONS: Array<[Exclude<InternalItStatus, "">, string]> = [
  ["yes", "Yes"],
  ["no", "No"],
  ["unsure", "Not sure"],
];

function deliveryLabel(value: string): string {
  if (value === "co_managed") return "Work with your IT team";
  if (value === "standalone") return "Managed by DE";
  if (value === "unsure") return "Help me decide";
  return "Choose how DE is involved";
}

export default function PublicStoreCheckout() {
  const [draft, setDraft] = useState<SolutionDraft>(emptyDraft);
  useSEO({
    title: "Your Solution | Digerati Experts",
    description: "Review the Digerati Experts solution you are building and continue to the recommended next step.",
    canonical: "/store/solution",
    noIndex: true,
  });

  useEffect(() => {
    const refresh = () => setDraft(readSolutionDraft());
    refresh();
    window.addEventListener(SOLUTION_DRAFT_EVENT, refresh);
    return () => window.removeEventListener(SOLUTION_DRAFT_EVENT, refresh);
  }, []);

  const rows = useMemo(
    () =>
      draft.needs.flatMap((item) => {
        const family = getFamilyById(item.familyId);
        return family ? [{ item, family }] : [];
      }),
    [draft.needs],
  );

  const intent = recommendedIntent(draft);
  const setEnv = <K extends keyof SolutionEnvironment>(key: K, value: SolutionEnvironment[K]) => {
    setDraft(writeSolutionDraft(patchEnvironment(readSolutionDraft(), { [key]: value })));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      <StorePageAtmosphere />
      <div className="relative z-10">
        <MegaMenu />
        <main className="de-nav-clear mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">
          <Link href="/store" className="mb-7 inline-flex min-h-11 items-center text-sm text-white/65 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue browsing
          </Link>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-de-accent-ink">Your Solution</p>
              <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Review Your Solution</h1>
              <p className="mt-3 max-w-2xl text-lg text-white/65">
                These business needs will be scoped together. No payment is required. We'll confirm fit, scope, and pricing before you commit.
              </p>

              <h2 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wide text-white/55">
                What fits your organization?
              </h2>
              <div
                className="mb-8 grid grid-cols-1 gap-2 rounded-xl border border-white/10 bg-[#121212] p-2 sm:grid-cols-3"
                role="tablist"
                aria-label="What fits your organization?"
              >
                {DELIVERY_OPTIONS.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={draft.deliveryPreference === value}
                    className={`h-11 rounded-lg px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] ${
                      draft.deliveryPreference === value ? "bg-[#D3126A] text-white" : "text-white/70 hover:bg-white/5"
                    }`}
                    onClick={() => setDraft(patchSolutionDraft({ deliveryPreference: value }))}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {rows.length ? (
                  rows.map(({ item, family }) => {
                    const delivery = resolvedNeedDelivery(item, draft.deliveryPreference);
                    const offer =
                      delivery === "co_managed" || delivery === "standalone"
                        ? offerForDelivery(family, delivery)
                        : null;
                    return (
                      <article key={item.familyId} className="rounded-2xl border border-white/10 bg-[#121212] p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-de-accent-ink">{deliveryLabel(delivery)}</p>
                            <h2 className="mt-2 text-xl font-semibold text-white">{family.label}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-white/60">{offer?.summary ?? family.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDraftNeed(item.familyId)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white/45 hover:bg-white/5 hover:text-white"
                            aria-label={`Remove ${family.label}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-[#121212] px-6 py-14 text-center">
                    <ClipboardCheck className="mx-auto h-8 w-8 text-white/30" />
                    <h2 className="mt-4 text-xl font-semibold text-white">Your Solution is empty</h2>
                    <Button asChild className="mt-5 bg-de-accent text-white">
                      <Link href="/store">Browse solutions</Link>
                    </Button>
                  </div>
                )}
              </div>

              {rows.length > 0 && (
                <section className="mt-8 rounded-2xl border border-white/10 bg-[#121212] p-5 sm:p-6" aria-labelledby="environment-heading">
                  <h2 id="environment-heading" className="text-xl font-semibold text-white">
                    Tell us about your environment
                  </h2>
                  <p className="mt-2 text-sm text-white/55">
                    These facts help DE scope the work. You can leave anything blank if you are not sure.
                  </p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sol-users" className="text-white/80">How many users?</Label>
                      <Input id="sol-users" inputMode="numeric" value={draft.environment.userCount} onChange={(event) => setEnv("userCount", event.target.value)} className="h-11 border-white/15 bg-[#121212] text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sol-sites" className="text-white/80">How many sites?</Label>
                      <Input id="sol-sites" inputMode="numeric" value={draft.environment.siteCount} onChange={(event) => setEnv("siteCount", event.target.value)} className="h-11 border-white/15 bg-[#121212] text-white" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <p className="text-sm text-white/80">Company-owned, BYOD, or hybrid devices?</p>
                      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 p-2">
                        {OWNERSHIP_OPTIONS.map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            className={`h-11 rounded-lg text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] ${
                              draft.environment.deviceOwnership === value ? "bg-[#D3126A] text-white" : "text-white/70 hover:bg-white/5"
                            }`}
                            onClick={() => setEnv("deviceOwnership", value)}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="sol-mix" className="text-white/80">Laptop / desktop / mobile mix</Label>
                      <Input id="sol-mix" value={draft.environment.deviceMix} onChange={(event) => setEnv("deviceMix", event.target.value)} className="h-11 border-white/15 bg-[#121212] text-white" placeholder="e.g. mostly laptops, some phones" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <p className="text-sm text-white/80">Any internal IT?</p>
                      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 p-2">
                        {INTERNAL_IT_OPTIONS.map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            className={`h-11 rounded-lg text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] ${
                              draft.environment.internalIt === value ? "bg-[#D3126A] text-white" : "text-white/70 hover:bg-white/5"
                            }`}
                            onClick={() => setEnv("internalIt", value)}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sol-compliance" className="text-white/80">Compliance requirements</Label>
                      <Input id="sol-compliance" value={draft.environment.complianceNeeds} onChange={(event) => setEnv("complianceNeeds", event.target.value)} className="h-11 border-white/15 bg-[#121212] text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sol-provider" className="text-white/80">Current provider</Label>
                      <Input id="sol-provider" value={draft.environment.currentProvider} onChange={(event) => setEnv("currentProvider", event.target.value)} className="h-11 border-white/15 bg-[#121212] text-white" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="sol-urgency" className="text-white/80">Urgency / problem severity</Label>
                      <Input id="sol-urgency" value={draft.environment.urgency} onChange={(event) => setEnv("urgency", event.target.value)} className="h-11 border-white/15 bg-[#121212] text-white" />
                    </div>
                  </div>
                </section>
              )}
            </section>
            <aside className="h-fit rounded-2xl border border-white/10 bg-[#121212] p-6 lg:sticky lg:top-28">
              <Layers className="h-8 w-8 text-de-accent-ink" />
              <h2 className="mt-4 text-xl font-semibold text-white">Recommended next step</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {rows.length
                  ? "After we review this solution together, the next step is a Cyber Risk Assessment so scope and pricing stay honest."
                  : "Add at least one business need to continue."}
              </p>
              {rows.length ? (
                <Button asChild className="mt-5 h-11 w-full bg-[#D3126A] text-white hover:bg-[#b90f5d]">
                  <Link
                    href={requestPath({ intent })}
                    onClick={() => patchSolutionDraft({ intent })}
                    data-testid="recommended-next-step"
                  >
                    {recommendedCtaLabel(intent)}
                  </Link>
                </Button>
              ) : (
                <Button className="mt-5 h-11 w-full" disabled>
                  {recommendedCtaLabel(intent)}
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                className="mt-3 h-11 w-full border-white/20 text-white hover:bg-white/10"
                onClick={() =>
                  openMspAdvisor({
                    context: "other",
                    seedMessage: "I am building a Digerati Experts solution and want to ask about fit, scope, and next steps.",
                  })
                }
              >
                Ask DE
              </Button>
              <p className="mt-5 flex items-start gap-2 text-sm text-white/55">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-de-accent-ink" />
                No payment is required. We'll confirm fit, scope, and pricing before you commit.
              </p>
              <Link href={BUSINESS_NEEDS_INDEX_PATH} className="mt-4 inline-flex min-h-11 items-center text-sm text-white/55 hover:text-white">
                Add another business need
              </Link>
            </aside>
          </div>
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    </div>
  );
}
