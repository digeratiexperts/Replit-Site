import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { analytics } from "@/lib/analytics";
import type { OpenMspAdvisorDetail } from "@/lib/openMspAdvisor";
import { STORE_ADVISOR_SEED } from "@/lib/openMspAdvisor";
import { PRIMARY_PHONE } from "@/data/companyContact";

type PageType =
  | "home"
  | "cybersecurity"
  | "pricing"
  | "store"
  | "compliance"
  | "service"
  | "industry"
  | "support"
  | "other";

type AdvisorAction = {
  type: string;
  label: string;
  href?: string;
  path?: string;
};

type ChatTurn = {
  role: "user" | "assistant";
  content: string;
  actions?: AdvisorAction[];
};

function inferPageType(pathname: string): PageType {
  const p = pathname.toLowerCase();
  if (p === "/" || p === "") return "home";
  if (p.includes("cyber") || p.includes("security") || p.includes("ransomware")) return "cybersecurity";
  if (p.includes("pricing") || p.includes("ecosystem") || p.includes("proactive")) return "pricing";
  if (p.includes("/store")) return "store";
  if (p.includes("compliance") || p.includes("hipaa") || p.includes("cmmc")) return "compliance";
  if (p.includes("/industries/")) return "industry";
  if (p.includes("/support")) return "support";
  if (p.includes("/solutions/") || p.includes("/services/")) return "service";
  return "other";
}

function buildPageContext(pathname: string) {
  return {
    pathname,
    pageTitle: typeof document !== "undefined" ? document.title : undefined,
    pageType: inferPageType(pathname),
    serviceContext: pathname.startsWith("/solutions/")
      ? pathname.split("/").filter(Boolean).slice(-1)[0]
      : undefined,
  };
}

const WELCOME: ChatTurn = {
  role: "assistant",
  content:
    "DE Desk here. Tell me what broke, what you're evaluating, or what you're trying to protect — I'll give you a clear read and the sensible next step.",
};

export function VirtualMspAdvisor() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([WELCOME]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [leadForm, setLeadForm] = useState<{
    open: boolean;
    action: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  } | null>(null);
  const [cookieBannerClear, setCookieBannerClear] = useState(() => {
    try {
      return !!(
        localStorage.getItem("de_cookie_consent_v2") ||
        localStorage.getItem("de_cookie_consent")
      );
    } catch {
      return false;
    }
  });
  const [pendingSeed, setPendingSeed] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const abandonedRef = useRef(false);

  useEffect(() => {
    if (cookieBannerClear) return;
    const check = () => {
      try {
        if (
          localStorage.getItem("de_cookie_consent_v2") ||
          localStorage.getItem("de_cookie_consent")
        ) {
          setCookieBannerClear(true);
        }
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("de-cookie-consent", check);
    window.addEventListener("storage", check);
    const id = window.setInterval(check, 800);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("de-cookie-consent", check);
      window.removeEventListener("storage", check);
    };
  }, [cookieBannerClear]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, loading, leadForm]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenMspAdvisorDetail>).detail || {};
      setIsOpen(true);
      const seed =
        detail.seedMessage ||
        (detail.context === "store" ||
        (typeof window !== "undefined" && window.location.pathname.includes("/store"))
          ? STORE_ADVISOR_SEED
          : undefined);
      if (seed) setPendingSeed(seed);
    };
    window.addEventListener("de-open-msp-advisor", onOpen as EventListener);
    return () => window.removeEventListener("de-open-msp-advisor", onOpen as EventListener);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    analytics.chatOpened();
    const onHide = () => {
      if (!abandonedRef.current && turns.some((t) => t.role === "user")) {
        abandonedRef.current = true;
        analytics.chatAbandoned();
      }
    };
    window.addEventListener("beforeunload", onHide);
    return () => window.removeEventListener("beforeunload", onHide);
  }, [isOpen, turns]);

  const fireServerEvents = (events: string[]) => {
    for (const e of events || []) {
      if (e === "conversation_started") analytics.chatConversationStarted();
      if (e === "qualified_question") analytics.chatQualifiedQuestion();
      if (e === "service_recommended") analytics.chatServiceRecommended();
      if (e === "assessment_offered") analytics.chatAssessmentOffered();
      if (e === "lead_capture_started") analytics.chatLeadCaptureStarted();
      if (e === "lead_created") analytics.chatLeadCreated();
      if (e === "booking_clicked") analytics.chatBookingClicked();
      if (e === "support_routed") analytics.chatSupportRouted();
      if (e === "off_topic_redirected") analytics.chatOffTopicRedirected();
    }
  };

  const sendMessage = async (text: string) => {
    const message = text.trim();
    if (!message || loading) return;
    setInput("");
    setTurns((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);
    try {
      const res = await fetch("/api/public/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message,
          pageContext: buildPageContext(location),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Advisor unavailable");
      }
      const data = await res.json();
      setSessionId(data.sessionId);
      fireServerEvents(data.analyticsEvents || []);
      setTurns((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, actions: data.actions || [] },
      ]);
    } catch (e: any) {
      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            e?.message ||
            `I'm having trouble responding right now. Call ${PRIMARY_PHONE.display} or book at meet.digerati-experts.com.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pendingSeed || !isOpen || loading) return;
    const seed = pendingSeed;
    setPendingSeed(null);
    void sendMessage(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSeed, isOpen]);

  const runAction = async (action: AdvisorAction) => {
    if (!sessionId) {
      // Allow booking/portal without session
      if (action.href?.startsWith("http") || action.href?.startsWith("tel:")) {
        if (action.type === "schedule_consultation") analytics.chatBookingClicked();
        if (action.type === "open_portal" || action.type === "existing_client_support") {
          analytics.chatSupportRouted();
        }
        window.open(action.href, action.href.startsWith("tel:") ? "_self" : "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (
      action.type === "request_assessment" ||
      action.type === "create_lead" ||
      action.type === "request_callback" ||
      action.type === "leave_message" ||
      action.type === "contact_sales"
    ) {
      analytics.chatLeadCaptureStarted();
      setLeadForm({
        open: true,
        action: action.type,
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      return;
    }

    try {
      const res = await fetch("/api/public/advisor/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          action: action.type,
          payload: { path: action.path },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      const href = data.action?.href || action.href;
      if (action.type === "schedule_consultation") analytics.chatBookingClicked();
      if (action.type === "open_portal" || action.type === "existing_client_support") {
        analytics.chatSupportRouted();
      }
      if (href) {
        if (href.startsWith("/")) {
          window.location.href = href;
        } else {
          window.open(href, href.startsWith("tel:") ? "_self" : "_blank", "noopener,noreferrer");
        }
      }
    } catch (e: any) {
      setTurns((prev) => [
        ...prev,
        { role: "assistant", content: e?.message || "Could not complete that action." },
      ]);
    }
  };

  const submitLeadForm = async () => {
    if (!leadForm || !sessionId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/public/advisor/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          action: leadForm.action,
          payload: {
            name: leadForm.name,
            email: leadForm.email,
            phone: leadForm.phone,
            company: leadForm.company,
            message: leadForm.message,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not submit");
      analytics.chatLeadCreated();
      analytics.leadCaptured("virtual_msp_advisor", leadForm.action);
      setLeadForm(null);
      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.message ||
            "Thanks — we captured your details with the conversation context. Our team will follow up.",
          actions: data.bookingUrl
            ? [{ type: "schedule_consultation", label: "Schedule now", href: data.bookingUrl }]
            : undefined,
        },
      ]);
    } catch (e: any) {
      setTurns((prev) => [
        ...prev,
        { role: "assistant", content: e?.message || "Submission failed. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed right-4 sm:right-6 ${cookieBannerClear ? "bottom-6" : "bottom-28"} z-[100]`}
      data-testid="widget-msp-advisor-container"
    >
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-[#0a0a0a] text-sm font-bold tracking-tight text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5"
          data-testid="button-open-msp-advisor"
          title="Ask DE"
          aria-label="Open DE Desk"
        >
          DE
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
        </button>
      )}

      {isOpen && (
        <div
          className="absolute bottom-0 right-0 w-[min(420px,92vw)] h-[min(640px,80vh)] bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col"
          data-testid="panel-msp-advisor"
        >
          <div className="bg-de-raised text-white p-4 flex justify-between items-start flex-shrink-0">
            <div>
              <h3 className="font-semibold text-base" data-testid="text-advisor-title">
                DE Desk
              </h3>
              <p className="text-xs text-white/80 mt-0.5">
                Digerati Experts · IT, cybersecurity & compliance
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/15 rounded"
              data-testid="button-close-msp-advisor"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollerRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
            {turns.map((t, i) => (
              <div
                key={i}
                className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    t.role === "user"
                      ? "bg-de-accent text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md shadow-sm"
                  }`}
                  data-testid={t.role === "user" ? "advisor-msg-user" : "advisor-msg-assistant"}
                >
                  {t.content}
                  {t.actions && t.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {t.actions.map((a) => (
                        <button
                          key={`${a.type}-${a.label}`}
                          type="button"
                          onClick={() => runAction(a)}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-de-paper-raised text-de-accent border border-de-hairline hover:bg-de-paper-raised"
                          data-testid={`advisor-action-${a.type}`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Thinking…
              </div>
            )}

            {leadForm?.open && (
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-md" data-testid="advisor-lead-form">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D3126A]">
                    ARIZONA MSP ADVISOR
                  </p>
                  <h4 className="text-sm font-bold text-[#1A1228] mt-0.5">
                    {leadForm.action === "leave_message"
                      ? "Leave a message"
                      : leadForm.action === "request_callback"
                        ? "Request a callback"
                        : "Share your details for personalized guidance"}
                  </h4>
                </div>

                <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-2 space-y-1">
                  <div className="flex items-baseline gap-2 text-xs font-semibold text-[#1A1228]">
                    <span className="mt-[0.55em] h-px w-2 shrink-0 bg-[#D3126A]" aria-hidden="true" />
                    <span>Independent findings</span>
                  </div>
                  <div className="flex items-baseline gap-2 text-xs font-semibold text-[#1A1228]">
                    <span className="mt-[0.55em] h-px w-2 shrink-0 bg-[#D3126A]" aria-hidden="true" />
                    <span>Direct Arizona engineer follow-up</span>
                  </div>
                </div>

                <Input
                  placeholder="Name"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="h-9 text-sm"
                  data-testid="advisor-lead-name"
                />
                <Input
                  type="email"
                  placeholder="Work email"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="h-9 text-sm"
                  data-testid="advisor-lead-email"
                />
                <Input
                  placeholder="Phone (optional)"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="h-9 text-sm"
                  data-testid="advisor-lead-phone"
                />
                <Input
                  placeholder="Company (optional)"
                  value={leadForm.company}
                  onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                  className="h-9 text-sm"
                  data-testid="advisor-lead-company"
                />
                {(leadForm.action === "leave_message" || leadForm.action === "request_callback") && (
                  <textarea
                    placeholder="How can we help?"
                    value={leadForm.message}
                    onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                    className="w-full text-sm border rounded-md px-2.5 py-1.5 min-h-[64px]"
                    data-testid="advisor-lead-message"
                  />
                )}
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    className="flex-1 bg-[#D3126A] hover:bg-[#bd105f] text-white font-semibold"
                    onClick={submitLeadForm}
                    disabled={loading}
                    data-testid="advisor-lead-submit"
                  >
                    Submit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setLeadForm(null)}
                    data-testid="advisor-lead-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <form
            className="p-3 border-t bg-white flex gap-2 flex-shrink-0"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about IT, security, compliance…"
              className="text-sm h-10"
              disabled={loading}
              data-testid="advisor-input"
              maxLength={4000}
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 px-3 bg-de-accent hover:bg-de-accent"
              data-testid="advisor-send"
              aria-label="Send message"
            >
              <Send size={16} />
            </Button>
          </form>
          <div className="px-3 pb-2 bg-white text-xs text-slate-400 text-center">
            Not a general chatbot · Digerati Experts · {PRIMARY_PHONE.display}
          </div>
        </div>
      )}
    </div>
  );
}
