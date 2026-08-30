import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { ArrowLeft } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSEO } from "@/hooks/useSEO";
import {
  BUSINESS_NEEDS_INDEX_PATH,
  familyPath,
  getFamilyById,
  getFamilyBySlug,
  offerForDelivery,
  parseDeliveryPreference,
  SOLUTION_WORKSPACE_PATH,
} from "@/lib/businessNeeds";
import { DOOR_2_ELIGIBILITY } from "@shared/checkoutEligibility";
import {
  addDraftNeed,
  emptyDraft,
  patchSolutionDraft,
  readSolutionDraft,
  recommendedCtaLabel,
  recommendedIntent,
  toRequestNeeds,
  type SolutionDraft,
  type SolutionRequestIntent,
} from "@/lib/solutionDraft";

const INTENT_LABEL: Record<SolutionRequestIntent, string> = {
  request: "Submit this solution",
  quote: "Request a quote",
  assessment: "Start a Cyber Risk Assessment",
  consultation: "Schedule a consultation",
};

function parseIntent(value: string | null): SolutionRequestIntent {
  if (value === "quote" || value === "assessment" || value === "consultation" || value === "request") return value;
  return "assessment";
}

type FormState = {
  organizationName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
};

export default function SolutionRequest() {
  const search = useSearch();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const [draft, setDraft] = useState<SolutionDraft>(emptyDraft);

  useEffect(() => {
    const current = readSolutionDraft();
    const family = getFamilyBySlug(params.get("family") || "");
    const delivery = parseDeliveryPreference(params.get("delivery"));
    const intent = parseIntent(params.get("intent"));
    let next = current;
    if (family) {
      next = addDraftNeed({
        familyId: family.id,
        ...(delivery ? { delivery } : {}),
      });
    }
    if (delivery && !next.deliveryPreference) {
      next = patchSolutionDraft({ deliveryPreference: delivery });
    }
    if (intent) {
      next = patchSolutionDraft({ intent });
    }
    setDraft(next);
  }, [params]);

  const intent = parseIntent(params.get("intent")) || recommendedIntent(draft);
  const needs = toRequestNeeds(draft);

  const [form, setForm] = useState<FormState>({
    organizationName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    notes: "",
  });
  const [requestId, setRequestId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    correlationId: string;
    message: string;
  } | null>(null);

  useSEO({
    title: "Solution Request",
    description:
      "Request a Digerati Experts solution. Contact details are collected only when you save or submit.",
    canonical: "/solutions/request",
    noIndex: true,
  });

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/public/solutions/request", { credentials: "include" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled || !data?.request) return;
        setRequestId(data.request.id);
        setForm((current) => ({
          organizationName: data.request.organizationName || current.organizationName,
          contactName: data.request.contactName || current.contactName,
          contactEmail: data.request.contactEmail || current.contactEmail,
          contactPhone: data.request.contactPhone || current.contactPhone,
          notes: data.request.notes || current.notes,
        }));
      })
      .catch(() => {
        /* draft load is optional; submit still persists */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setResult(null);
    if (needs.length === 0) {
      setError("Select at least one business need before submitting this solution.");
      return;
    }
    if (form.contactName.trim().length < 2 || !form.contactEmail.includes("@")) {
      setError("A name and email are required to submit this solution.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/public/solutions/request", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: requestId,
          familyId: needs[0]?.familyId,
          offerId: needs[0]?.offerId,
          deliveryModel: needs[0]?.deliveryModel,
          deliveryPreference: draft.deliveryPreference || "unsure",
          selectedNeeds: needs,
          environment: draft.environment,
          intent,
          organizationName: form.organizationName,
          contactName: form.contactName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
          notes: form.notes,
          idempotencyKey: `${form.contactEmail.trim().toLowerCase()}|${needs
            .map((need) => need.familyId)
            .sort()
            .join(",")}|${draft.deliveryPreference || "unsure"}|${intent}`,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "We could not save your solution request. Please try again.");
        return;
      }
      setResult({
        correlationId: data.correlationId,
        message: data.message,
      });
    } catch {
      setError("We could not save your solution request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const backHref = needs[0]?.familyId
    ? familyPath(needs[0].familyId as Parameters<typeof familyPath>[0])
    : SOLUTION_WORKSPACE_PATH;

  return (
    <div className="relative min-h-screen overflow-hidden bg-de-bg">
      <div className="relative z-10">
        <MegaMenu />
        <main className="de-nav-clear mx-auto max-w-3xl px-4 pb-40 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="mb-8 inline-flex h-11 items-center text-sm text-white/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050312]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back
          </Link>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-de-accent-ink">
            Solution Request
          </p>
          <h1 className="mb-3 text-4xl font-bold text-white" data-testid="heading-solution-request">
            {INTENT_LABEL[intent]}
          </h1>
          <p className="mb-8 text-white/70">
            No payment is required. We'll confirm fit, scope, and pricing before you commit.
          </p>

          <section className="mb-8 rounded-2xl border border-de-hairline bg-de-raised p-6" data-testid="request-selection">
            {needs.length ? (
              <>
                <p className="text-sm text-white/50">Your Solution</p>
                <ul className="mt-3 space-y-3">
                  {needs.map((need) => {
                    const family = getFamilyById(need.familyId);
                    if (!family) return null;
                    const offer =
                      need.deliveryModel === "co_managed" || need.deliveryModel === "standalone"
                        ? offerForDelivery(family, need.deliveryModel)
                        : null;
                    return (
                      <li key={need.familyId}>
                        <h2 className="text-xl font-semibold text-white">{family.label}</h2>
                        <p className="mt-1 text-sm text-white/65">
                          {need.deliveryModel === "co_managed"
                            ? "Work with your IT team"
                            : need.deliveryModel === "standalone"
                              ? "DE managed"
                              : "We'll help you decide how DE is involved"}
                        </p>
                        {offer ? <p className="mt-2 text-sm leading-relaxed text-white/75">{offer.summary}</p> : null}
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="text-sm text-white/70">
                No solution is selected yet.{" "}
                <Link href={BUSINESS_NEEDS_INDEX_PATH} className="text-de-accent-ink underline">
                  Browse solution families
                </Link>{" "}
                first — recommendations stay visible without an email address.
              </p>
            )}
          </section>

          {result ? (
            <section
              className="rounded-2xl border border-de-hairline bg-de-raised p-6"
              data-testid="request-confirmation"
            >
              <h2 className="text-xl font-semibold text-white">Request saved</h2>
              <p className="mt-3 text-white/75">{result.message}</p>
              <p className="mt-3 text-sm text-white/55">Reference: {result.correlationId}</p>
              <Button asChild variant="outline" className="mt-6 h-11 border-white/20 text-white hover:bg-white/10">
                <Link href={BUSINESS_NEEDS_INDEX_PATH}>Browse another family</Link>
              </Button>
            </section>
          ) : (
            <form
              onSubmit={onSubmit}
              className="space-y-5"
              noValidate
              data-eligibility={DOOR_2_ELIGIBILITY}
            >
              <div className="space-y-2">
                <Label htmlFor="sr-org" className="text-white/80">
                  Organization
                </Label>
                <Input
                  id="sr-org"
                  value={form.organizationName}
                  onChange={(event) => setForm((current) => ({ ...current, organizationName: event.target.value }))}
                  className="h-11 border-white/15 bg-de-raised text-white"
                  autoComplete="organization"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sr-name" className="text-white/80">
                  Name
                </Label>
                <Input
                  id="sr-name"
                  required
                  value={form.contactName}
                  onChange={(event) => setForm((current) => ({ ...current, contactName: event.target.value }))}
                  className="h-11 border-white/15 bg-de-raised text-white"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sr-email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="sr-email"
                  type="email"
                  required
                  value={form.contactEmail}
                  onChange={(event) => setForm((current) => ({ ...current, contactEmail: event.target.value }))}
                  className="h-11 border-white/15 bg-de-raised text-white"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sr-phone" className="text-white/80">
                  Phone
                </Label>
                <Input
                  id="sr-phone"
                  value={form.contactPhone}
                  onChange={(event) => setForm((current) => ({ ...current, contactPhone: event.target.value }))}
                  className="h-11 border-white/15 bg-de-raised text-white"
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sr-notes" className="text-white/80">
                  Anything DE should know
                </Label>
                <textarea
                  id="sr-notes"
                  value={form.notes}
                  onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                  className="min-h-[7rem] w-full rounded-md border border-white/15 bg-de-raised px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]"
                />
              </div>

              <div aria-live="polite" className="min-h-6 text-sm text-[#f5b4c8]" data-testid="request-error">
                {error}
              </div>

              <Button type="submit" variant="brand" className="h-11 w-full sm:w-auto" disabled={submitting}>
                {submitting ? "Saving…" : recommendedCtaLabel(intent)}
              </Button>
              <p className="text-xs text-white/45">
                Contact details are used only to follow up on this solution. No payment is required.
              </p>
            </form>
          )}
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    </div>
  );
}
