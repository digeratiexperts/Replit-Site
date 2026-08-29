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
  getFamilyBySlug,
  offerForDelivery,
  parseDeliveryModel,
  type CuratedDeliveryModel,
} from "@/lib/businessNeeds";

type Intent = "request" | "quote" | "assessment" | "consultation";

const INTENT_LABEL: Record<Intent, string> = {
  request: "Request this solution",
  quote: "Request a quote",
  assessment: "Start an assessment",
  consultation: "Schedule a consultation",
};

function parseIntent(value: string | null): Intent {
  if (value === "quote" || value === "assessment" || value === "consultation") return value;
  return "request";
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
  const family = getFamilyBySlug(params.get("family") || "");
  const delivery: CuratedDeliveryModel = parseDeliveryModel(params.get("delivery"));
  const intent = parseIntent(params.get("intent"));
  const offer = family ? offerForDelivery(family, delivery) : null;

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
    crm: string;
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
    if (!family || !offer) {
      setError("Select a solution family before submitting this Solution Request.");
      return;
    }
    if (form.contactName.trim().length < 2 || !form.contactEmail.includes("@")) {
      setError("A name and email are required to submit or save this Solution Request.");
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
          familyId: family.id,
          offerId: offer.id,
          deliveryModel: delivery,
          intent,
          organizationName: form.organizationName,
          contactName: form.contactName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
          notes: form.notes,
          idempotencyKey: `${form.contactEmail.trim().toLowerCase()}|${offer.id}|${delivery}|${intent}`,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "We could not save your Solution Request. Please try again.");
        return;
      }
      setResult({
        correlationId: data.correlationId,
        crm: data.crm,
        message: data.message,
      });
    } catch {
      setError("We could not save your Solution Request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-de-bg">
      <div className="relative z-10">
        <MegaMenu />
        <main className="de-nav-clear mx-auto max-w-3xl px-4 pb-40 sm:px-6 lg:px-8">
          <Link
            href={family ? familyPath(family.id) : BUSINESS_NEEDS_INDEX_PATH}
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
            This is a Solution Request, not a cart. You are asking Digerati Experts to follow up —
            not paying online.
          </p>

          <section className="mb-8 rounded-2xl border border-de-hairline bg-de-raised p-6" data-testid="request-selection">
            {family && offer ? (
              <>
                <p className="text-sm text-white/50">Selected solution</p>
                <h2 className="mt-1 text-xl font-semibold text-white">{offer.name}</h2>
                <p className="mt-2 text-sm text-white/65">
                  {family.label} · {delivery === "co_managed" ? "Co-managed" : "Standalone"}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{offer.summary}</p>
                <p className="mt-4 text-sm text-white/55">Next step: {offer.nextStep}</p>
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
              <p className="mt-3 text-sm text-white/55">
                Reference: {result.correlationId}
                {result.crm === "pending" ? " · Follow-up is pending" : ""}
              </p>
              <Button asChild variant="outline" className="mt-6 h-11 border-white/20 text-white hover:bg-white/10">
                <Link href={BUSINESS_NEEDS_INDEX_PATH}>Browse another family</Link>
              </Button>
            </section>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
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
                {submitting ? "Saving…" : INTENT_LABEL[intent]}
              </Button>
              <p className="text-xs text-white/45">
                Contact details are used only to save this Solution Request. We will not claim a CRM
                handoff succeeded unless the request is stored first.
              </p>
            </form>
          )}
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    </div>
  );
}
