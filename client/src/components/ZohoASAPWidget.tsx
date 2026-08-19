import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Activity,
  BookOpenText,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileText,
  LayoutGrid,
  SquareArrowOutUpRight,
  Lock,
  Mail,
  MessageCircle,
  MonitorPlay,
  Paperclip,
  Send,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { PORTAL_LOGIN } from "@/lib/portalUrls";
import type { OpenMspAdvisorDetail } from "@/lib/openMspAdvisor";
import { STORE_ADVISOR_SEED } from "@/lib/openMspAdvisor";
import { analytics } from "@/lib/analytics";

interface ZohoASAPWidgetProps {
  isEnabled?: boolean;
  accountId?: string;
  portalId?: string;
  customCSS?: string;
}

type ActiveTab = "chat" | "ticket" | "resources";
type ChatRole = "user" | "assistant" | "agent";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  senderName?: string | null;
  createdAt?: string;
};

type TicketResult = {
  ticketNumber?: string;
  message: string;
};

const CHAT_WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "DE Desk is here. Describe the outage, the risk, or the question — we'll take it and give you a clear next step.",
};

/** Optional starters — chips that seed the composer, not a competing card grid. */
const CHAT_STARTERS = [
  { label: "Something isn't working", seed: "Something isn't working: " },
  { label: "Possible security incident", seed: "Possible security incident: " },
] as const;

const TICKET_PRIORITIES = ["Low", "Medium", "High", "Urgent"] as const;

const TICKET_CATEGORIES = [
  "Email",
  "Access & Security",
  "Network & VPN",
  "Software & Applications",
  "Hardware & Devices",
  "Backup & Recovery",
  "Collaboration",
  "Other",
] as const;

type ClientTool = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
  badge?: string;
  guide?: { label: string; href: string };
  external?: boolean;
};

const CLIENT_TOOLS: ClientTool[] = [
  {
    id: "portal",
    title: "Client Portal",
    description: "Account, tickets, services and client resources.",
    href: PORTAL_LOGIN,
    icon: SquareArrowOutUpRight,
    featured: true,
    external: true,
  },
  {
    id: "remote",
    title: "Start Remote Support",
    description: "Launch a secure technician support session.",
    href: "https://assist.zoho.com/",
    icon: MonitorPlay,
    badge: "Fastest",
    guide: { label: "Remote support guide", href: "/support/remote-support" },
    external: true,
  },
  {
    id: "help",
    title: "Help Center",
    description: "Guides, common fixes and client documentation.",
    href: "/support/knowledge-base",
    icon: BookOpenText,
  },
  {
    id: "status",
    title: "Service Status",
    description: "Check availability of DE-managed services.",
    href: "/portal/status",
    icon: Activity,
  },
];

export const ZohoASAPWidget = ({
  isEnabled = true,
  accountId,
  portalId,
  customCSS,
}: ZohoASAPWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("chat");
  const [location] = useLocation();
  const [advisorSessionId, setAdvisorSessionId] = useState<string | null>(null);
  const [pendingSeed, setPendingSeed] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([CHAT_WELCOME]);
  const [chatInput, setChatInput] = useState("");
  const [isChatSending, setIsChatSending] = useState(false);
  const [assistantAvailable, setAssistantAvailable] = useState<boolean | null>(null);
  const [agentLive, setAgentLive] = useState(false);
  const [agentName, setAgentName] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const pollSinceRef = useRef<string | null>(null);
  const knownMsgIdsRef = useRef<Set<string>>(new Set(["welcome"]));

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium");
  const [category, setCategory] = useState("");
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [isTicketSending, setIsTicketSending] = useState(false);
  const [ticketResult, setTicketResult] = useState<TicketResult | null>(null);
  const [showTicketExtras, setShowTicketExtras] = useState(false);
  const [dialogHeight, setDialogHeight] = useState<number | undefined>(undefined);
  const [reduceMotion, setReduceMotion] = useState(false);
  const ticketFileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const panelMeasureRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

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

  const { toast } = useToast();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      setDialogHeight(undefined);
      return;
    }

    const measure = () => {
      const dialog = dialogRef.current;
      const chrome = chromeRef.current;
      const panel = panelMeasureRef.current;
      if (!dialog || !chrome || !panel) return;
      const vh = window.innerHeight;
      const maxH = Math.min(Math.round(vh * 0.86), vh - 72);
      const prevHeight = dialog.style.height;
      const prevMax = dialog.style.maxHeight;
      dialog.style.height = "auto";
      dialog.style.maxHeight = "none";
      const next = Math.min(maxH, chrome.offsetHeight + panel.scrollHeight + 16);
      dialog.style.height = prevHeight;
      dialog.style.maxHeight = prevMax;
      setDialogHeight(next);
    };

    measure();
    const panel = panelMeasureRef.current;
    const chrome = chromeRef.current;
    if (!panel) return;
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    if (chrome) observer.observe(chrome);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isOpen, activeTab, ticketResult, showTicketExtras, chatMessages, isChatSending]);

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
        /* ignore storage access failures */
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
    // Keep the existing Zoho ASAP bootstrap available for Desk integrations, but
    // do not make it responsible for the custom Digerati support experience.
    if (!isEnabled || !accountId || !portalId) return;
    if (typeof document === "undefined") return;
    if (document.querySelector('script[data-zoho-asap="1"]')) return;

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;

      const config = document.createElement("script");
      config.innerHTML = `
        window.ZohoDeskAsapConfig = {
          accountId: "${accountId}",
          portalId: "${portalId}"
        };
      `;
      document.head.appendChild(config);

      const asapScript = document.createElement("script");
      asapScript.src = "https://static.zohocdn.com/desk/web-client/asap/v1/api.js";
      asapScript.async = true;
      asapScript.dataset.zohoAsap = "1";
      document.head.appendChild(asapScript);
    };

    const idleApi = window as unknown as {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const requestIdle = idleApi.requestIdleCallback;
    const cancelIdle = idleApi.cancelIdleCallback;
    const usedIdleCallback = typeof requestIdle === "function";
    const idle = usedIdleCallback
      ? requestIdle(load, { timeout: 4000 })
      : window.setTimeout(load, 2500);

    const onInteract = () => load();
    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      if (usedIdleCallback && typeof cancelIdle === "function") {
        cancelIdle(idle);
      } else {
        window.clearTimeout(idle);
      }
    };
  }, [isEnabled, accountId, portalId]);

  useEffect(() => {
    if (!isOpen) return;
    // DE Desk (advisor API) powers the Desk tab on the public site.
    setAssistantAvailable(true);
    analytics.chatOpened();
  }, [isOpen]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenMspAdvisorDetail>).detail || {};
      setIsOpen(true);
      setActiveTab("chat");
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
    if (activeTab !== "chat") return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeTab, chatMessages]);

  // Pull portal agent (and any missed) messages into the website desk
  useEffect(() => {
    if (!advisorSessionId || !isOpen) return;
    let cancelled = false;

    const mergeIncoming = (incoming: ChatMessage[], live?: boolean, name?: string | null) => {
      if (typeof live === "boolean") setAgentLive(live);
      if (name) setAgentName(name);
      if (!incoming.length) return;
      setChatMessages((current) => {
        const next = [...current];
        const recentAssistantContent = new Set(
          current
            .filter((m) => m.role === "assistant")
            .slice(-8)
            .map((m) => m.content.trim()),
        );
        for (const msg of incoming) {
          if (knownMsgIdsRef.current.has(msg.id)) continue;
          // Skip echoing the visitor's own turns (already rendered optimistically)
          if (msg.role === "user") {
            knownMsgIdsRef.current.add(msg.id);
            if (msg.createdAt) pollSinceRef.current = msg.createdAt;
            continue;
          }
          // Skip AI bubbles already shown from the chat POST (different server id).
          // Never content-dedupe agent messages — those are the live handoff.
          if (msg.role === "assistant" && recentAssistantContent.has(msg.content.trim())) {
            knownMsgIdsRef.current.add(msg.id);
            if (msg.createdAt) pollSinceRef.current = msg.createdAt;
            continue;
          }
          knownMsgIdsRef.current.add(msg.id);
          if (msg.createdAt) pollSinceRef.current = msg.createdAt;
          if (msg.role === "assistant") recentAssistantContent.add(msg.content.trim());
          next.push({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            senderName: msg.senderName,
            createdAt: msg.createdAt,
          });
        }
        return next;
      });
    };

    const poll = async () => {
      try {
        const qs = pollSinceRef.current
          ? `?since=${encodeURIComponent(pollSinceRef.current)}`
          : "";
        const res = await fetch(`/api/public/advisor/chat/${encodeURIComponent(advisorSessionId)}/messages${qs}`);
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (!data.success || cancelled) return;
        mergeIncoming(
          Array.isArray(data.messages) ? data.messages : [],
          !!data.agentLive,
          data.agentName || null,
        );
      } catch {
        /* ignore transient poll errors */
      }
    };

    void poll();
    const id = window.setInterval(poll, 2500);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [advisorSessionId, isOpen]);

  const handleSendChat = async (prompt?: string) => {
    const content = (prompt ?? chatInput).trim();
    if (!content || isChatSending) return;

    if (content.length > 2000) {
      toast({
        title: "Message is too long",
        description: "Please keep chat messages under 2,000 characters.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    knownMsgIdsRef.current.add(userMessage.id);

    setChatMessages((current) => [...current, userMessage]);
    setChatInput("");
    setIsChatSending(true);

    try {
      const response = await fetch("/api/public/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: advisorSessionId,
          message: content,
          pageContext: {
            pathname: location,
            pageTitle: typeof document !== "undefined" ? document.title : undefined,
            pageType: location.includes("/store")
              ? "store"
              : location.includes("cyber")
                ? "cybersecurity"
                : location === "/"
                  ? "home"
                  : "other",
          },
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "DE Desk couldn't answer right now. Try again or open a ticket.");
      }

      const replyContent = data.reply;
      if (!replyContent || typeof replyContent !== "string") {
        throw new Error("The advisor returned an invalid response.");
      }

      if (data.sessionId) {
        setAdvisorSessionId(data.sessionId);
      }
      setAssistantAvailable(true);
      if (data.agentLive) {
        setAgentLive(true);
        if (data.agentName) setAgentName(String(data.agentName));
      }

      // Prefer server ids/timestamps so poll won't re-add this bubble
      const assistantId =
        typeof data.messageId === "string" && data.messageId
          ? data.messageId
          : `assistant-${Date.now()}`;
      const createdAt =
        typeof data.messageCreatedAt === "string" && data.messageCreatedAt
          ? data.messageCreatedAt
          : new Date().toISOString();
      knownMsgIdsRef.current.add(assistantId);
      pollSinceRef.current = createdAt;

      setChatMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          content: replyContent,
          createdAt,
          senderName: data.agentLive ? data.agentName || "DE Desk" : null,
        },
      ]);
    } catch (error) {
      const description = error instanceof Error ? error.message : "Chat is temporarily unavailable.";
      setChatMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content: `${description} You can create a support ticket here and the team will follow up.`,
        },
      ]);
      toast({
        title: "Chat unavailable",
        description: "Your message was not submitted as a ticket. Use Get Support if you need team follow-up.",
        variant: "destructive",
      });
    } finally {
      setIsChatSending(false);
    }
  };


  useEffect(() => {
    if (!pendingSeed || !isOpen || isChatSending || activeTab !== "chat") return;
    const seed = pendingSeed;
    setPendingSeed(null);
    void handleSendChat(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSeed, isOpen, activeTab]);

  const handleTicketFile = (file: File | undefined) => {
    if (!file) {
      setAttachmentName(null);
      return;
    }
    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    const okType = allowed.includes(file.type) || /\.(png|jpe?g|pdf)$/i.test(file.name);
    if (!okType) {
      toast({
        title: "File type not supported",
        description: "Please choose a PNG, JPG, or PDF.",
        variant: "destructive",
      });
      if (ticketFileRef.current) ticketFileRef.current.value = "";
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File is too large",
        description: "Please keep attachments under 10MB.",
        variant: "destructive",
      });
      if (ticketFileRef.current) ticketFileRef.current.value = "";
      return;
    }
    setAttachmentName(file.name);
  };

  const handleSubmitTicket = async () => {
    if (!email || !subject || !message) {
      toast({
        title: "Missing information",
        description: "Please enter your email, subject, and message.",
        variant: "destructive",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      toast({
        title: "Check your email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsTicketSending(true);
    setTicketResult(null);

    const description = [
      message.trim(),
      "",
      fullName.trim() ? `Name: ${fullName.trim()}` : null,
      company.trim() ? `Company: ${company.trim()}` : null,
      category ? `Category: ${category}` : null,
      attachmentName
        ? `Visitor noted a file: ${attachmentName} (not uploaded in this form — follow up to collect PNG/JPG/PDF).`
        : null,
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, 5000);

    try {
      const response = await fetch("/api/portal/zoho/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          subject: subject.trim(),
          description,
          priority,
          name: fullName.trim() || undefined,
          sessionId: advisorSessionId || undefined,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.zohoTicketId) {
        throw new Error(data.error || "We couldn't open the ticket right now. Please try again.");
      }

      setTicketResult({
        ticketNumber: data.ticketNumber,
        message: data.message || "Your support request has been received.",
      });
      setFullName("");
      setEmail("");
      setCompany("");
      setSubject("");
      setMessage("");
      setPriority("Medium");
      setCategory("");
      setAttachmentName(null);
      setShowTicketExtras(false);
      if (ticketFileRef.current) ticketFileRef.current.value = "";

      toast({
        title: "Ticket created",
        description: data.ticketNumber
          ? `Reference ${data.ticketNumber}`
          : "We’ll be in touch shortly.",
      });
    } catch (error) {
      toast({
        title: "Couldn’t create the ticket",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTicketSending(false);
    }
  };

  if (!isEnabled) return null;

  return (
    <>
      {/* Bottom-right utility — cookie banner lifts it; no second nav bar */}
      <div
        className={`fixed z-[100] right-3 sm:right-4 ${
          cookieBannerClear ? "bottom-5" : "bottom-28"
        }`}
        data-testid="widget-zoho-asap-container"
      >
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex h-14 items-center gap-3 rounded-full border border-white/12 bg-[#0a0a0a]/95 px-4 pr-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            data-testid="button-open-asap-widget"
            aria-label="Open DE Desk"
            aria-expanded={isOpen}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#D3126A] text-sm font-bold tracking-tight">
              DE
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold leading-4 tracking-tight">Ask DE</span>
              <span className="block text-[11px] leading-4 text-white/55">Technology desk · live</span>
            </span>
          </button>
        )}

        {isOpen && (
          <section
            ref={dialogRef}
            className="absolute bottom-0 right-0 z-[100] flex w-[min(460px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.5rem] border-[3px] border-[#A78BFA]/75 bg-[#1a0b33] shadow-[0_0_0_1px_rgba(196,181,253,0.45),0_0_0_6px_rgba(124,58,237,0.22),0_28px_80px_rgba(50,15,90,0.7),0_0_100px_rgba(139,92,246,0.4)]"
            style={{
              height: dialogHeight,
              maxHeight: "min(86vh, calc(100dvh - 4.5rem))",
              transition: reduceMotion ? undefined : "height 220ms ease",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="DE Desk help"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 80% 55% at 10% 0%, rgba(167,139,250,0.42), transparent 58%), radial-gradient(ellipse 65% 50% at 100% 5%, rgba(211,18,106,0.24), transparent 55%), linear-gradient(180deg, rgba(124,58,237,0.28) 0%, rgba(26,11,51,0.2) 38%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div ref={chromeRef} className="relative flex-shrink-0">
              <header className="flex items-center justify-between gap-3 px-4 pb-1 pt-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D3126A] to-[#7c3aed] text-[12px] font-bold tracking-wide text-white shadow-[0_0_22px_rgba(211,18,106,0.4)]">
                    DE
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1a0b33] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-[16px] font-semibold tracking-tight text-white" data-testid="text-widget-title">
                      DE Desk
                    </h2>
                    <p className="truncate text-[11px] text-white/55" data-testid="text-widget-status">
                      {agentLive
                        ? `${agentName || "Specialist"} joined · live handoff`
                        : "DE Desk is available"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/45"
                  data-testid="button-close-widget"
                  aria-label="Close DE Desk"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </header>

              <nav className="mx-3 mb-2 grid grid-cols-3 border-b border-white/10" aria-label="Support options">
                {(
                  [
                    { id: "chat" as const, label: "Ask DE", icon: MessageCircle },
                    { id: "ticket" as const, label: "Get Support", icon: FileText },
                    { id: "resources" as const, label: "Client Tools", icon: LayoutGrid },
                  ]
                ).map(({ id, label, icon: Icon }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveTab(id)}
                      className={`relative flex min-h-11 items-center justify-center gap-1.5 px-1 text-[12px] font-semibold transition sm:text-[12.5px] ${
                        isActive ? "text-white" : "text-white/45 hover:text-white/80"
                      }`}
                      data-testid={`button-tab-${id}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 ${isActive ? "text-[#F0B4CC]" : ""}`}
                        aria-hidden="true"
                      />
                      <span className={isActive ? "text-[#F0B4CC]" : undefined}>{label}</span>
                      {isActive && (
                        <span className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[#D3126A] shadow-[0_0_12px_rgba(211,18,106,0.95)]" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="relative min-h-0 flex-1 overflow-y-auto px-3 pb-3">
              <div ref={panelMeasureRef}>
              {activeTab === "chat" && (
                <div
                  className="flex min-h-[320px] flex-col overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#f7f5f2] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                  data-testid="panel-support-chat"
                >
                  <div className="min-h-[200px] flex-1 space-y-3.5 overflow-y-auto px-3.5 py-4" aria-live="polite">
                    {chatMessages.map((chatMessage, index) => {
                      const isUser = chatMessage.role === "user";
                      const isAgent = chatMessage.role === "agent";
                      const isOpening = !isUser && index === 0;
                      return (
                        <div
                          key={chatMessage.id}
                          className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[92%] ${isUser ? "" : "flex gap-2.5"}`}>
                            {!isUser && (
                              <div className="relative mt-0.5 h-8 w-8 flex-shrink-0">
                                <span
                                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                                    isAgent ? "bg-[#3d5a73]" : "bg-[#151217]"
                                  }`}
                                >
                                  {isAgent ? "AG" : "DE"}
                                </span>
                                {isOpening && (
                                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#f7f5f2] bg-emerald-400" />
                                )}
                              </div>
                            )}
                            <div>
                              {!isUser && (
                                <div className="mb-1.5 flex items-center gap-2">
                                  <span className="text-[12px] font-semibold text-[#151217]">
                                    {isAgent ? chatMessage.senderName || agentName || "Specialist" : "DE Desk"}
                                  </span>
                                  {isOpening && (
                                    <span className="text-[11px] font-medium text-emerald-700">
                                      Available
                                    </span>
                                  )}
                                </div>
                              )}
                              <div
                                className={`px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                                  isUser
                                    ? "rounded-2xl rounded-br-md bg-[#D3126A] text-white shadow-[0_8px_22px_rgba(211,18,106,0.28)]"
                                    : isAgent
                                      ? "rounded-2xl rounded-bl-md border border-[#d4e6f4] bg-[#eef5f9] text-[#1a2434]"
                                      : "rounded-2xl rounded-bl-md bg-[#151217] text-[#f7f5f2]"
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{chatMessage.content}</p>
                              </div>
                              {isOpening && chatMessages.length === 1 && (
                                <div className="mt-2.5 flex flex-wrap gap-1.5">
                                  {CHAT_STARTERS.map(({ label, seed }) => (
                                    <button
                                      key={label}
                                      type="button"
                                      onClick={() => {
                                        setChatInput(seed);
                                        requestAnimationFrame(() => chatInputRef.current?.focus());
                                      }}
                                      className="rounded-full border border-[#d8d2cc] bg-white px-2.5 py-1 text-[11px] font-medium text-[#3d342f] transition hover:border-[#151217] hover:text-[#151217] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/45"
                                    >
                                      {label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {isChatSending && (
                      <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-md bg-[#151217] px-3.5 py-2.5 text-xs text-[#f7f5f2]/70">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D3126A]" />
                            {agentLive ? "Delivering to specialist…" : "Reading your note…"}
                          </span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="border-t border-[#e4dfd8] bg-white px-3 py-3">
                    <div className="flex items-end gap-2">
                      <Textarea
                        ref={chatInputRef}
                        value={chatInput}
                        onChange={(event) => setChatInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            void handleSendChat();
                          }
                        }}
                        maxLength={2000}
                        rows={2}
                        placeholder={
                          agentLive
                            ? `Message ${agentName || "the specialist"}…`
                            : "Type the issue — we're ready now"
                        }
                        className="min-h-[48px] resize-none rounded-xl border-[#d8d2cc] bg-[#f7f5f2] text-[13.5px] text-[#151217] placeholder:text-[#7a7168] focus-visible:ring-[#D3126A]/70"
                        disabled={isChatSending}
                        data-testid="input-support-chat"
                        aria-label="Chat message"
                      />
                      <Button
                        type="button"
                        onClick={() => void handleSendChat()}
                        disabled={!chatInput.trim() || isChatSending}
                        className="h-12 w-12 flex-shrink-0 rounded-xl bg-[#D3126A] p-0 text-white shadow-[0_8px_22px_rgba(211,18,106,0.35)] hover:bg-[#c01060]"
                        data-testid="button-send-support-chat"
                        aria-label="Send chat message"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                    <p className="mt-2 text-[10.5px] leading-4 text-[#7a7168]">
                      <Lock className="mr-1 inline h-3 w-3 align-[-2px]" aria-hidden="true" />
                      {agentLive
                        ? "A Digerati agent is in this thread. Never share passwords or MFA codes."
                        : "Never share passwords, MFA codes, or private keys."}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "ticket" && (
                <div
                  className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#12141c] p-3.5"
                  data-testid="panel-support-ticket"
                >
                    {ticketResult ? (
                      <div className="flex flex-col items-center px-2 py-6 text-center">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-white">Support request received</h3>
                        {ticketResult.ticketNumber && (
                          <p className="mt-2 rounded-lg border border-white/10 bg-[#0b0c10] px-3 py-1.5 font-mono text-xs font-semibold text-white/80">
                            {ticketResult.ticketNumber}
                          </p>
                        )}
                        <p className="mt-3 max-w-sm text-sm leading-5 text-white/65">{ticketResult.message}</p>
                        <div className="mt-5 flex flex-wrap justify-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setTicketResult(null);
                              setActiveTab("chat");
                            }}
                            className="border-white/15 bg-transparent text-white hover:bg-white/10"
                          >
                            Back to desk
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setTicketResult(null)}
                            className="bg-[#D3126A] text-white hover:bg-[#c01060]"
                          >
                            Open another ticket
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <form
                        className="space-y-2.5"
                        onSubmit={(event) => {
                          event.preventDefault();
                          void handleSubmitTicket();
                        }}
                      >
                          <div>
                            <h3 className="text-[15px] font-semibold tracking-tight text-white">
                              Open a support ticket
                            </h3>
                            <p className="mt-1 text-[12px] leading-5 text-white/55">
                              Tell us what happened. We&apos;ll route it to the desk.
                            </p>
                          </div>

                          <div className="space-y-2.5">
                            <div>
                              <label htmlFor="support-name" className="mb-1.5 block text-[11px] font-semibold text-white">
                                Name
                              </label>
                              <div className="relative">
                                <User className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6b5a78]" aria-hidden="true" />
                                <Input
                                  id="support-name"
                                  autoComplete="name"
                                  placeholder="Your name"
                                  value={fullName}
                                  onChange={(event) => setFullName(event.target.value)}
                                  data-testid="input-support-name"
                                  className="h-10 rounded-xl border border-white/15 bg-[#f7f5f2] pl-9 text-[13.5px] text-[#151217] placeholder:text-[#7a7168] focus-visible:ring-[#D3126A]/50"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="support-email" className="mb-1.5 block text-[11px] font-semibold text-white">
                                Work email
                              </label>
                              <div className="relative">
                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6b5a78]" aria-hidden="true" />
                                <Input
                                  id="support-email"
                                  type="email"
                                  autoComplete="email"
                                  placeholder="you@company.com"
                                  value={email}
                                  onChange={(event) => setEmail(event.target.value)}
                                  required
                                  data-testid="input-support-email"
                                  className="h-10 rounded-xl border border-white/15 bg-[#f7f5f2] pl-9 text-[13.5px] text-[#151217] placeholder:text-[#7a7168] focus-visible:ring-[#D3126A]/50"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="support-subject" className="mb-1.5 block text-[11px] font-semibold text-white">
                                What&apos;s happening?
                              </label>
                              <Input
                                id="support-subject"
                                maxLength={200}
                                placeholder="Short summary"
                                value={subject}
                                onChange={(event) => setSubject(event.target.value)}
                                required
                                data-testid="input-support-subject"
                                className="h-10 rounded-xl border border-white/15 bg-[#f7f5f2] text-[13.5px] text-[#151217] placeholder:text-[#7a7168] focus-visible:ring-[#D3126A]/50"
                              />
                            </div>
                            <div>
                              <label htmlFor="support-message" className="mb-1.5 block text-[11px] font-semibold text-white">
                                Details
                              </label>
                              <Textarea
                                id="support-message"
                                maxLength={5000}
                                placeholder="What broke, who is affected, and what you already tried."
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                rows={2}
                                required
                                className="min-h-[72px] resize-none rounded-xl border border-white/15 bg-[#f7f5f2] text-[13.5px] text-[#151217] placeholder:text-[#7a7168] focus-visible:ring-[#D3126A]/50"
                                data-testid="input-support-message"
                              />
                            </div>

                            <div>
                              <p className="mb-1.5 text-[11px] font-semibold text-white">Urgency</p>
                              <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Ticket urgency">
                                {TICKET_PRIORITIES.map((level) => {
                                  const selected = priority === level;
                                  return (
                                    <button
                                      key={level}
                                      type="button"
                                      onClick={() => setPriority(level)}
                                      className={`min-h-9 rounded-lg px-1 text-[11px] font-semibold transition ${
                                        selected
                                          ? "bg-white text-[#151217]"
                                          : "border border-white/15 bg-transparent text-white/60 hover:text-white"
                                      }`}
                                      aria-pressed={selected}
                                    >
                                      {level}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <input
                                ref={ticketFileRef}
                                type="file"
                                accept="image/png,image/jpeg,application/pdf,.png,.jpg,.jpeg,.pdf"
                                className="sr-only"
                                onChange={(event) => handleTicketFile(event.target.files?.[0])}
                                data-testid="input-support-attachment"
                              />
                              <button
                                type="button"
                                onClick={() => ticketFileRef.current?.click()}
                                className="inline-flex min-h-10 items-center gap-2 text-[12px] font-medium text-white/65 transition hover:text-white"
                              >
                                <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
                                {attachmentName || "Attach a screenshot (optional)"}
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => setShowTicketExtras((open) => !open)}
                              className="text-[12px] font-medium text-white/55 underline-offset-2 hover:text-white hover:underline"
                              aria-expanded={showTicketExtras}
                            >
                              {showTicketExtras ? "Hide extra details" : "Add company or category"}
                            </button>

                            {showTicketExtras && (
                              <div className="space-y-3">
                                <div>
                                  <label htmlFor="support-company" className="mb-1.5 block text-[11px] font-semibold text-white">
                                    Company
                                  </label>
                                  <div className="relative">
                                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6b5a78]" aria-hidden="true" />
                                    <Input
                                      id="support-company"
                                      autoComplete="organization"
                                      placeholder="Company name"
                                      value={company}
                                      onChange={(event) => setCompany(event.target.value)}
                                      data-testid="input-support-company"
                                      className="h-10 rounded-xl border border-white/15 bg-[#f7f5f2] pl-9 text-[13.5px] text-[#151217] placeholder:text-[#7a7168] focus-visible:ring-[#D3126A]/50"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="support-category" className="mb-1.5 block text-[11px] font-semibold text-white">
                                    Category
                                  </label>
                                  <select
                                    id="support-category"
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                    className="h-10 w-full appearance-none rounded-xl border border-white/15 bg-[#f7f5f2] px-3 text-[13px] text-[#151217] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/50"
                                    data-testid="select-support-category"
                                  >
                                    <option value="">Select a category</option>
                                    {TICKET_CATEGORIES.map((item) => (
                                      <option key={item} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            )}

                            <p className="text-[10.5px] leading-4 text-white/45">
                              <Lock className="mr-1 inline h-3 w-3 align-[-2px]" aria-hidden="true" />
                              Never share passwords, MFA codes, or private keys.
                            </p>

                            <Button
                              type="submit"
                              disabled={isTicketSending}
                              className="h-11 w-full rounded-xl bg-[#D3126A] text-white shadow-[0_10px_28px_rgba(211,18,106,0.28)] hover:bg-[#c01060]"
                              data-testid="button-submit-support"
                            >
                              {isTicketSending ? "Opening ticket…" : "Submit ticket"}
                              {!isTicketSending && <Send size={15} className="ml-2" aria-hidden="true" />}
                            </Button>
                          </div>
                      </form>
                    )}
                </div>
              )}

              {activeTab === "resources" && (
                <div
                  className="rounded-[1.2rem] border border-white/10 bg-[#12141c] p-3.5"
                  data-testid="panel-support-resources"
                >
                  <div className="px-0.5 pb-3">
                    <h3 className="text-[15px] font-semibold tracking-tight text-white">Your client shortcuts</h3>
                    <p className="mt-1 text-[12px] leading-5 text-white/55">Go directly to the tool you need.</p>
                  </div>

                  <div className="space-y-2">
                    {CLIENT_TOOLS.map((tool) => {
                      const Icon = tool.icon;
                      const opensAway = Boolean(tool.external || tool.href.startsWith("http"));
                      return (
                        <div
                          key={tool.id}
                          className={`overflow-hidden rounded-2xl border bg-[#0b0c10] transition hover:border-white/25 ${
                            tool.featured ? "border-[#D3126A]/40" : "border-white/10"
                          }`}
                        >
                          <a
                            href={tool.href}
                            {...(opensAway ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="group flex items-center gap-3 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/45"
                            data-testid={`resource-link-${tool.id}`}
                          >
                            <span
                              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                                tool.featured
                                  ? "bg-[#D3126A] text-white shadow-[0_8px_20px_rgba(211,18,106,0.35)]"
                                  : "bg-white/[0.06] text-white/90 ring-1 ring-white/10"
                              }`}
                            >
                              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="text-[13.5px] font-semibold text-white">{tool.title}</span>
                                {tool.badge && (
                                  <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-semibold text-[#F0B4CC]">
                                    {tool.badge}
                                  </span>
                                )}
                              </span>
                              <span className="mt-0.5 block text-[12px] leading-4 text-white/55">{tool.description}</span>
                            </span>
                            <ChevronRight
                              className="h-4 w-4 flex-shrink-0 text-white/35 transition group-hover:text-white/70"
                              aria-hidden="true"
                            />
                          </a>
                          {tool.guide && (
                            <div className="px-3 pb-3 pl-[3.75rem]">
                              <a
                                href={tool.guide.href}
                                className="text-[11.5px] font-medium text-[#F0B4CC] underline-offset-2 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/45"
                                data-testid="resource-link-remote-support-guide"
                              >
                                {tool.guide.label}
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 rounded-2xl border border-white/10 bg-[#0b0c10] p-3">
                    <div className="flex gap-3">
                      <span className="h-10 w-[3px] flex-shrink-0 rounded-full bg-[#D3126A]" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-white">Possible security incident?</p>
                        <p className="mt-0.5 text-[11.5px] leading-4 text-white/55">
                          Skip the tools and route it as urgent support.
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("ticket")}
                      className="mt-3 h-11 w-full rounded-xl bg-[#D3126A] text-[13px] text-white hover:bg-[#c01060]"
                      data-testid="button-tools-go-to-support"
                    >
                      Go to Get Support
                    </Button>
                  </div>
                </div>
              )}
              </div>
            </div>
          </section>
        )}
      </div>

      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
    </>
  );
};
