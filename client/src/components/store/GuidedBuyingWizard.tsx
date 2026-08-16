import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildGuidedRecommendation,
  type GuidedBuyingAnswers,
} from "@/data/storeMerchandising";
import type { StoreProduct } from "@/data/storeProducts";
import { openMspAdvisor } from "@/lib/openMspAdvisor";

const STEPS = [
  {
    key: "companySize" as const,
    title: "Company size",
    options: [
      { value: "1-10", label: "1–10 people" },
      { value: "11-49", label: "11–49 people" },
      { value: "50-199", label: "50–199 people" },
      { value: "200+", label: "200+ people" },
    ],
  },
  {
    key: "industry" as const,
    title: "Industry",
    options: [
      { value: "professional", label: "Professional services" },
      { value: "healthcare", label: "Healthcare" },
      { value: "finance", label: "Finance / accounting" },
      { value: "nonprofit", label: "Nonprofit" },
      { value: "other", label: "Other" },
    ],
  },
  {
    key: "locations" as const,
    title: "Number of locations",
    options: [
      { value: "1", label: "Single site" },
      { value: "2-5", label: "2–5 sites" },
      { value: "6+", label: "6+ sites" },
    ],
  },
  {
    key: "productivity" as const,
    title: "Productivity suite",
    options: [
      { value: "m365", label: "Microsoft 365" },
      { value: "google", label: "Google Workspace" },
      { value: "mixed", label: "Mixed / both" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    key: "itStaff" as const,
    title: "Internal IT",
    options: [
      { value: "internal", label: "We have IT staff" },
      { value: "partial", label: "Part-time / fractional IT" },
      { value: "none", label: "No internal IT" },
    ],
  },
  {
    key: "objective" as const,
    title: "Main objective",
    options: [
      { value: "protect", label: "Protect the business" },
      { value: "modernize", label: "Modernize IT / comms" },
      { value: "compliance", label: "Meet compliance" },
      { value: "recover", label: "Backup & recover" },
      { value: "support_it", label: "Support our IT team" },
      { value: "outsource", label: "Outsource IT" },
    ],
  },
];

const INITIAL: GuidedBuyingAnswers = {
  companySize: "11-49",
  industry: "professional",
  locations: "1",
  productivity: "m365",
  itStaff: "internal",
  objective: "protect",
};

interface GuidedBuyingWizardProps {
  open: boolean;
  onClose: () => void;
  onAddStack: (products: StoreProduct[], seatHint: number) => void;
}

export function GuidedBuyingWizard({ open, onClose, onAddStack }: GuidedBuyingWizardProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<GuidedBuyingAnswers>(INITIAL);
  const [showResult, setShowResult] = useState(false);

  const recommendation = useMemo(
    () => (showResult ? buildGuidedRecommendation(answers) : null),
    [answers, showResult]
  );

  const reset = () => {
    setStep(0);
    setAnswers(INITIAL);
    setShowResult(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const current = STEPS[step];
  const progress = showResult ? 100 : Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-sm"
            onClick={handleClose}
            data-testid="guided-buying-overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-[#0a0a0a]"
            data-testid="guided-buying-wizard"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-de-accent/30 bg-de-accent/15">
                  <Sparkles className="h-5 w-5 text-de-accent-ink" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Build my solution</h2>
                  <p className="text-sm text-white/50">Six quick questions · live catalog</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white/60 hover:bg-white/5 hover:text-white"
                data-testid="button-close-guided"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="border-b border-white/10 px-6 py-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-de-accent transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!showResult ? (
                <div>
                  <p className="mb-2 text-sm text-white/55">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  <h3 className="mb-5 text-2xl font-semibold text-white">{current.title}</h3>
                  <div className="space-y-2.5">
                    {current.options.map((opt) => {
                      const selected = answers[current.key] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [current.key]: opt.value,
                            }))
                          }
                          className={`flex w-full items-center rounded-xl border px-4 py-3.5 text-left text-base transition-colors ${
                            selected
                              ? "border-de-accent/50 bg-de-accent/15 text-white"
                              : "border-white/10 bg-[#141414] text-white/75 hover:border-white/20 hover:bg-[#171717]"
                          }`}
                          data-testid={`guided-option-${current.key}-${opt.value}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : recommendation ? (
                <div data-testid="guided-buying-result">
                  <h3 className="mb-2 text-2xl font-semibold text-white">
                    {recommendation.headline}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-white/55">
                    {recommendation.summary}
                  </p>
                  <ul className="mb-6 space-y-3">
                    {recommendation.products.map((product) => (
                      <li
                        key={product.sku}
                        className="rounded-xl border border-white/10 bg-[#141414] px-4 py-3"
                      >
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="mt-1 text-sm text-white/50 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl border border-de-accent/25 bg-de-accent/10 p-4">
                    <p className="text-sm text-white/60">Estimated list total (soft)</p>
                    <p className="mt-1 text-3xl font-bold text-white">
                      ${recommendation.recurringEstimate.toLocaleString()}
                      <span className="text-lg font-medium text-white/50">/mo</span>
                    </p>
                    {recommendation.oneTimeEstimate > 0 && (
                      <p className="mt-1 text-sm text-white/55">
                        + ${recommendation.oneTimeEstimate.toLocaleString()} one-time
                      </p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-2 border-t border-white/10 p-6">
              {!showResult ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="h-11 border-white/15 bg-transparent text-white hover:bg-white/5"
                    disabled={step === 0}
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    data-testid="button-guided-back"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="h-11 flex-1 bg-de-accent text-white hover:bg-[#6548ff]"
                    onClick={() => {
                      if (step >= STEPS.length - 1) {
                        setShowResult(true);
                      } else {
                        setStep((s) => s + 1);
                      }
                    }}
                    data-testid="button-guided-next"
                  >
                    {step >= STEPS.length - 1 ? "See recommendation" : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    className="h-12 w-full bg-de-accent text-base text-white hover:bg-[#6548ff]"
                    disabled={!recommendation?.products.length}
                    onClick={() => {
                      if (!recommendation) return;
                      onAddStack(recommendation.products, recommendation.seatHint);
                      handleClose();
                    }}
                    data-testid="button-add-recommended-stack"
                  >
                    Add recommended stack
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="h-11 flex-1 border-white/15 bg-transparent text-white hover:bg-white/5"
                      onClick={() => {
                        openMspAdvisor({
                          context: "store",
                          seedMessage: `Help me refine this guided stack for a ${answers.companySize} ${answers.industry} company (${answers.itStaff} IT, ${answers.productivity}, goal: ${answers.objective}).`,
                        });
                        handleClose();
                      }}
                      data-testid="button-guided-ask-advisor"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Talk to advisor
                    </Button>
                    <a href="/book" className="flex-1">
                      <Button
                        variant="outline"
                        className="h-11 w-full border-white/15 bg-transparent text-white hover:bg-white/5"
                        data-testid="button-guided-book"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book architect
                      </Button>
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    className="h-10 w-full text-white/55 hover:bg-white/5 hover:text-white"
                    onClick={() => {
                      setShowResult(false);
                      setStep(0);
                    }}
                    data-testid="button-guided-restart"
                  >
                    Start over
                  </Button>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
