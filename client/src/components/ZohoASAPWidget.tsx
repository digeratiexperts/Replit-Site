import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Flag,
  LifeBuoy,
  Lock,
  Mail,
  Monitor,
  MessageCircle,
  Scale,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Tag,
  Users,
  Zap,
  X,
} from "lucide-react";
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
    "DE Desk here. Tell me what broke, what you're evaluating, or what you're trying to protect — I'll give you a clear read and the sensible next step.",
};

const QUICK_CHAT_PROMPTS: Array<{
  label: string;
  icon: typeof Shield;
}> = [
  { label: "We need stronger cybersecurity", icon: Shield },
  { label: "Compare managed IT options", icon: Scale },
  { label: "Microsoft 365 feels messy", icon: Monitor },
  { label: "Possible security incident", icon: AlertTriangle },
];

const RESOURCE_LINKS: Array<{
  title: string;
  description: string;
  href: string;
  icon: typeof BookOpen;
  external?: boolean;
  tags: [string, string];
  cta: string;
  accent: string;
  iconBg: string;
}> = [
  {
    title: "Remote session",
    description: "Join a secure live session so a technician can help on your screen",
    href: "https://assist.zoho.com/",
    icon: Monitor,
    external: true,
    tags: ["Live help", "Screen share"],
    cta: "Start session",
    accent: "text-[#c4b5fd]",
    iconBg: "bg-[#7c3aed]/20 ring-[#7c3aed]/35",
  },
  {
    title: "Remote support guide",
    description: "How remote sessions work and what to expect",
    href: "/support/remote-support",
    icon: LifeBuoy,
    tags: ["Support process", "Quick guide"],
    cta: "View guide",
    accent: "text-[#7dd3fc]",
    iconBg: "bg-[#0284c7]/20 ring-[#0284c7]/35",
  },
  {
    title: "Knowledge base",
    description: "Setup guides, troubleshooting, and security help",
    href: "/support/knowledge-base",
    icon: BookOpen,
    tags: ["Guides", "Troubleshooting"],
    cta: "Browse articles",
    accent: "text-[#86efac]",
    iconBg: "bg-[#16a34a]/20 ring-[#16a34a]/35",
  },
  {
    title: "Client portal",
    description: "Tickets, services, billing, approvals, and account tools",
    href: PORTAL_LOGIN,
    icon: ShieldCheck,
    tags: ["Account access", "Self-service"],
    cta: "Open portal",
    accent: "text-[#fdba74]",
    iconBg: "bg-[#ea580c]/20 ring-[#ea580c]/35",
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

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium");
  const [isTicketSending, setIsTicketSending] = useState(false);
  const [ticketResult, setTicketResult] = useState<TicketResult | null>(null);

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
        for (const msg of incoming) {
          if (knownMsgIdsRef.current.has(msg.id)) continue;
          // Skip echoing the visitor's own turns (already rendered optimistically)
          if (msg.role === "user") {
            knownMsgIdsRef.current.add(msg.id);
            if (msg.createdAt) pollSinceRef.current = msg.createdAt;
            continue;
          }
          knownMsgIdsRef.current.add(msg.id);
          if (msg.createdAt) pollSinceRef.current = msg.createdAt;
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
        // Only poll for messages newer than this turn (avoid duplicating local AI bubbles)
        if (!pollSinceRef.current) {
          pollSinceRef.current = new Date().toISOString();
        }
      }
      setAssistantAvailable(true);
      if (data.agentLive) {
        setAgentLive(true);
        if (data.agentName) setAgentName(String(data.agentName));
      }
      const assistantId = `assistant-${Date.now()}`;
      knownMsgIdsRef.current.add(assistantId);
      const createdAt = new Date().toISOString();
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
        description: "Your message was not submitted as a ticket. Use the Ticket tab if you need team follow-up.",
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

    try {
      const response = await fetch("/api/portal/zoho/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          subject: subject.trim(),
          description: message.trim(),
          priority,
          sessionId: advisorSessionId || undefined,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Failed to create ticket");
      }

      setTicketResult({
        ticketNumber: data.ticketNumber,
        message: data.message || "Your support request has been received.",
      });
      setEmail("");
      setSubject("");
      setMessage("");
      setPriority("Medium");

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
      {/* Above section dock; clears hero mockup / scroll-to-top track on the right */}
      <div
        className={`fixed z-[100] ${
          cookieBannerClear
            ? "bottom-5 right-3 sm:right-4 lg:bottom-[5.25rem] lg:right-[4.75rem]"
            : "bottom-28 right-3 sm:right-4 lg:bottom-[5.25rem] lg:right-[4.75rem]"
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
            className="fixed inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[100] flex max-h-[100dvh] w-auto flex-col overflow-hidden rounded-[1.5rem] border border-[#D3126A]/20 bg-[#0b0c10] shadow-[0_0_0_1px_rgba(139,44,245,0.12),0_30px_90px_rgba(0,0,0,0.7),0_0_70px_rgba(91,69,224,0.16)] sm:absolute sm:inset-auto sm:bottom-0 sm:right-0 sm:top-auto sm:h-[min(760px,calc(100dvh-5.5rem))] sm:max-h-[min(86vh,calc(100dvh-4.5rem))] sm:w-[460px] sm:max-w-[calc(100vw-2rem)]"
            role="dialog"
            aria-modal="true"
            aria-label="DE Desk help"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 45% at 0% 0%, rgba(211,18,106,0.20), transparent 55%), radial-gradient(ellipse 55% 40% at 100% 0%, rgba(91,69,224,0.18), transparent 50%)",
              }}
              aria-hidden="true"
            />

            {/* Shared chrome — same for all three tabs */}
            <header className="relative flex flex-shrink-0 items-center justify-between gap-3 px-4 pb-1 pt-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D3126A] to-[#7c3aed] text-[12px] font-bold tracking-wide text-white shadow-[0_0_22px_rgba(211,18,106,0.4)]">
                  DE
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0c10] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]" />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-[16px] font-semibold tracking-tight text-white" data-testid="text-widget-title">
                    DE Desk
                  </h2>
                  <p className="truncate text-[11px] text-white/50" data-testid="text-widget-status">
                    {agentLive
                      ? `${agentName || "Specialist"} joined · live handoff`
                      : "Answers · Tickets · Assist"}
                  </p>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 sm:flex">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      agentLive
                        ? "bg-sky-400"
                        : assistantAvailable === true
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]"
                          : assistantAvailable === false
                            ? "bg-amber-400"
                            : "bg-white/30"
                    }`}
                  />
                  <span className="text-[10px] font-medium text-white/65">
                    {agentLive
                      ? `${agentName || "Specialist"} live`
                      : assistantAvailable === false
                        ? "Ticket desk ready"
                        : "DE Desk is online"}
                  </span>
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
              </div>
            </header>

            <nav className="relative mx-3 mb-2 grid flex-shrink-0 grid-cols-3 border-b border-white/10" aria-label="Support options">
              {(
                [
                  { id: "chat" as const, label: "Desk", icon: MessageCircle },
                  { id: "ticket" as const, label: "Ticket", icon: FileText },
                  { id: "resources" as const, label: "Resources", icon: BookOpen },
                ]
              ).map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`relative flex min-h-11 items-center justify-center gap-1.5 px-2 text-[12.5px] font-semibold transition ${
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
                      <span className="absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-[#D3126A] shadow-[0_0_12px_rgba(211,18,106,0.95)]" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="relative mx-3 mb-2 flex flex-shrink-0 items-center justify-between gap-3 px-0.5">
              <div className="flex items-center gap-2 text-[11px] font-medium text-white/65">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    agentLive
                      ? "bg-sky-400"
                      : assistantAvailable === true
                        ? "bg-emerald-400"
                        : assistantAvailable === false
                          ? "bg-amber-400"
                          : "bg-white/30"
                  }`}
                />
                {agentLive
                  ? `${agentName || "Specialist"} on desk`
                  : assistantAvailable === true
                    ? "DE Desk is online"
                    : assistantAvailable === false
                      ? "Ticket desk available"
                      : "Connecting…"}
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("ticket")}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F0B4CC] transition hover:text-white"
              >
                Need a human?
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 px-3 pb-2">
              {/* DESK — light nested panel inside dark shell */}
              {activeTab === "chat" && (
                <div
                  className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.2rem] border border-white/10 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                  data-testid="panel-support-chat"
                >
                  <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3.5 py-3.5" aria-live="polite">
                    {chatMessages.map((chatMessage) => {
                      const isUser = chatMessage.role === "user";
                      const isAgent = chatMessage.role === "agent";
                      return (
                        <div
                          key={chatMessage.id}
                          className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[90%] px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                              isUser
                                ? "rounded-2xl rounded-br-md bg-[#D3126A] text-white shadow-[0_8px_22px_rgba(211,18,106,0.28)]"
                                : isAgent
                                  ? "rounded-2xl rounded-bl-md border border-[#d4e6f4] bg-[#f4f9fc] text-[#1a2434]"
                                  : "rounded-2xl rounded-bl-md border border-[#ece6f2] bg-[#faf8fc] text-[#1a1228]"
                            }`}
                          >
                            {!isUser && (
                              <div
                                className={`mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                                  isAgent ? "text-[#3d6f94]" : "text-[#D3126A]"
                                }`}
                              >
                                <span
                                  className={`flex h-4 w-4 items-center justify-center rounded text-[8px] font-bold tracking-normal text-white ${
                                    isAgent ? "bg-[#4a7fa8]" : "bg-[#D3126A]"
                                  }`}
                                >
                                  {isAgent ? "AG" : "DE"}
                                </span>
                                {isAgent ? chatMessage.senderName || agentName || "Agent" : "Desk"}
                              </div>
                            )}
                            <p className="whitespace-pre-wrap">{chatMessage.content}</p>
                          </div>
                        </div>
                      );
                    })}

                    {chatMessages.length === 1 && (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {QUICK_CHAT_PROMPTS.map(({ label, icon: Icon }) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => void handleSendChat(label)}
                            className="group flex items-center gap-2.5 rounded-xl border border-[#e8e0f0] bg-white px-3 py-2.5 text-left transition hover:border-[#D3126A]/40 hover:bg-[#fff7fb]"
                          >
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#f3eef9] text-[#6d4aff]">
                              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1 text-[12px] font-medium leading-4 text-[#1a1228]">
                              {label}
                            </span>
                            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-[#b0a4c4] group-hover:text-[#D3126A]" aria-hidden="true" />
                          </button>
                        ))}
                      </div>
                    )}

                    {isChatSending && (
                      <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-md border border-[#ece6f2] bg-[#faf8fc] px-3.5 py-2.5 text-xs text-[#5A3A5E]">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D3126A]" />
                            {agentLive ? "Delivering to specialist…" : "Thinking it through…"}
                          </span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="border-t border-[#ece6f2] bg-[#faf8fc] px-3 py-3">
                    <div className="flex items-end gap-2">
                      <Textarea
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
                            : "Ask about risk, stack, pricing, or an outage…"
                        }
                        className="min-h-[48px] resize-none rounded-xl border-[#ddd3e8] bg-white text-[13.5px] text-[#1a1228] placeholder:text-[#8a6f8c] focus-visible:ring-[#D3126A]/70"
                        disabled={isChatSending}
                        data-testid="input-support-chat"
                        aria-label="Chat message"
                      />
                      <Button
                        type="button"
                        onClick={() => void handleSendChat()}
                        disabled={!chatInput.trim() || isChatSending}
                        className="h-[48px] w-[48px] flex-shrink-0 rounded-xl bg-[#D3126A] p-0 text-white shadow-[0_8px_22px_rgba(211,18,106,0.35)] hover:bg-[#c01060]"
                        data-testid="button-send-support-chat"
                        aria-label="Send chat message"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#6B3A62]">
                      <Lock className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                      {agentLive
                        ? "A Digerati agent is in this thread. Never share passwords or MFA codes."
                        : "Never share passwords, MFA codes, or private keys."}
                    </p>
                  </div>
                </div>
              )}

              {/* TICKET — dark nested panel, same language as Resources */}
              {activeTab === "ticket" && (
                <div
                  className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#12141c]"
                  data-testid="panel-support-ticket"
                >
                  <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
                    {ticketResult ? (
                      <div className="flex min-h-[70%] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#171922] px-4 py-10 text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-white">Support request received</h3>
                        {ticketResult.ticketNumber && (
                          <p className="mt-2 rounded-lg border border-white/10 bg-[#0b0c10] px-3 py-1.5 font-mono text-xs font-semibold text-[#F0B4CC]">
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
                            className="bg-gradient-to-r from-[#5B45E0] to-[#D3126A] text-white hover:opacity-95"
                          >
                            Create another ticket
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="relative overflow-hidden rounded-2xl border border-[#7c3aed]/25 p-4"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(91,69,224,0.28) 0%, rgba(18,20,28,0.98) 52%, rgba(211,18,106,0.14) 100%)",
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#5B45E0]/25 text-[#c4b5fd] ring-1 ring-[#5B45E0]/40 shadow-[0_0_24px_rgba(91,69,224,0.35)]">
                              <Sparkles className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-[16px] font-semibold text-white">How can we help?</h3>
                              <p className="mt-1 text-[12px] leading-5 text-white/60">
                                Tell us what broke, what you&apos;re evaluating, or what you&apos;re trying to protect — we&apos;ll guide the next step.
                              </p>
                            </div>
                            <Shield className="mt-1 hidden h-9 w-9 flex-shrink-0 text-[#D3126A]/30 sm:block" aria-hidden="true" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {QUICK_CHAT_PROMPTS.map(({ label, icon: Icon }) => (
                            <button
                              key={label}
                              type="button"
                              onClick={() => setSubject(label)}
                              className="group rounded-xl border border-white/10 bg-[#171922] p-2.5 text-left transition hover:border-[#D3126A]/40 hover:bg-[#1c1524]"
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] text-[#c4b5fd]">
                                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                </span>
                                <ChevronRight className="h-3 w-3 text-white/25 group-hover:text-[#F0B4CC]" aria-hidden="true" />
                              </div>
                              <span className="block text-[10.5px] font-medium leading-3.5 text-white/80">{label}</span>
                            </button>
                          ))}
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#171922] p-4">
                          <div className="mb-4 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-[#c4b5fd]" aria-hidden="true" />
                              <h3 className="text-[14px] font-semibold text-white">Create a support ticket</h3>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#5B45E0]/30 bg-[#5B45E0]/15 px-2 py-0.5 text-[10px] font-semibold text-[#c4b5fd]">
                              <Lock className="h-2.5 w-2.5" aria-hidden="true" />
                              Secure & Private
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div className="grid gap-3 sm:grid-cols-[1fr_110px]">
                              <div>
                                <label htmlFor="support-email" className="mb-1.5 block text-[11px] font-semibold text-white/60">
                                  Email
                                </label>
                                <div className="relative">
                                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" aria-hidden="true" />
                                  <Input
                                    id="support-email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@company.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    data-testid="input-support-email"
                                    className="h-10 rounded-xl border-white/10 bg-[#0b0c10] pl-9 text-[13.5px] text-white placeholder:text-white/30 focus-visible:ring-[#5B45E0]/70"
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="support-priority" className="mb-1.5 block text-[11px] font-semibold text-white/60">
                                  Priority
                                </label>
                                <div className="relative">
                                  <Flag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" aria-hidden="true" />
                                  <select
                                    id="support-priority"
                                    value={priority}
                                    onChange={(event) =>
                                      setPriority(event.target.value as "Low" | "Medium" | "High" | "Urgent")
                                    }
                                    className="h-10 w-full appearance-none rounded-xl border border-white/10 bg-[#0b0c10] pl-9 pr-2 text-[13px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B45E0]/70"
                                    data-testid="select-support-priority"
                                  >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label htmlFor="support-subject" className="mb-1.5 block text-[11px] font-semibold text-white/60">
                                Subject
                              </label>
                              <div className="relative">
                                <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" aria-hidden="true" />
                                <Input
                                  id="support-subject"
                                  maxLength={200}
                                  placeholder="Brief description"
                                  value={subject}
                                  onChange={(event) => setSubject(event.target.value)}
                                  data-testid="input-support-subject"
                                  className="h-10 rounded-xl border-white/10 bg-[#0b0c10] pl-9 text-[13.5px] text-white placeholder:text-white/30 focus-visible:ring-[#5B45E0]/70"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="support-message" className="mb-1.5 block text-[11px] font-semibold text-white/60">
                                What&apos;s happening?
                              </label>
                              <Textarea
                                id="support-message"
                                maxLength={5000}
                                placeholder="Device, service, error, and what you already tried. No passwords or codes."
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                rows={3}
                                className="min-h-[88px] resize-none rounded-xl border-white/10 bg-[#0b0c10] text-[13.5px] text-white placeholder:text-white/30 focus-visible:ring-[#5B45E0]/70"
                                data-testid="input-support-message"
                              />
                            </div>

                            <Button
                              type="button"
                              onClick={() => void handleSubmitTicket()}
                              disabled={isTicketSending}
                              className="h-11 w-full rounded-xl bg-gradient-to-r from-[#5B45E0] via-[#8b2cf5] to-[#D3126A] text-white shadow-[0_10px_28px_rgba(211,18,106,0.28)] hover:opacity-95"
                              data-testid="button-submit-support"
                            >
                              {isTicketSending ? "Creating ticket…" : "Create support ticket"}
                              {!isTicketSending && <Send size={15} className="ml-2" aria-hidden="true" />}
                            </Button>
                            <p className="flex items-center justify-center gap-1.5 text-[11px] text-white/40">
                              <Lock className="h-3 w-3" aria-hidden="true" />
                              Never share passwords, MFA codes, or private keys.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Persistent ask bar — same family as Resources composer cue */}
                  <div className="flex-shrink-0 border-t border-white/10 bg-[#0f1118] px-3 py-2.5">
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171922] px-3 py-2">
                      <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-[#c4b5fd]" aria-hidden="true" />
                      <button
                        type="button"
                        onClick={() => setActiveTab("chat")}
                        className="min-w-0 flex-1 truncate text-left text-[12.5px] text-white/40 hover:text-white/70"
                      >
                        Ask about risk, stack, pricing, or an outage…
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("chat")}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#D3126A] text-white hover:bg-[#c01060]"
                        aria-label="Open desk chat"
                      >
                        <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* RESOURCES — keep the dark card language that already works */}
              {activeTab === "resources" && (
                <div
                  className="h-full space-y-3 overflow-y-auto rounded-[1.2rem] border border-white/10 bg-[#12141c] p-3"
                  data-testid="panel-support-resources"
                >
                  <div
                    className="relative overflow-hidden rounded-2xl border border-[#5B45E0]/25 p-4"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(37,99,235,0.25) 0%, rgba(18,20,28,0.96) 48%, rgba(211,18,106,0.18) 100%)",
                    }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F0B4CC]">
                      Your AI help desk
                    </p>
                    <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight text-white">
                      Get clear answers, fast.
                    </h3>
                    <p className="mt-1.5 max-w-[90%] text-[12px] leading-5 text-white/65">
                      Find tools, client info, and step-by-step help — all in one place.
                    </p>
                    <p className="mt-2 text-[12px] italic text-[#c4b5fd]">Same team. Faster support.</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { icon: Zap, label: "Faster answers" },
                        { icon: Shield, label: "Trusted info" },
                        { icon: Users, label: "Built for DE" },
                        { icon: Clock, label: "24/7 available" },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-1.5 text-[10px] font-medium text-white/70">
                          <Icon className="h-3 w-3 text-[#F0B4CC]" aria-hidden="true" />
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-0.5">
                    <h3 className="text-[13px] font-semibold text-white">Resources</h3>
                    <a
                      href="/support/knowledge-base"
                      className="text-[11px] font-semibold text-[#F0B4CC] hover:text-white"
                    >
                      Browse all resources →
                    </a>
                  </div>

                  <div className="space-y-2">
                    {RESOURCE_LINKS.map(({ title, description, href, icon: Icon, external, tags, cta, accent, iconBg }) => (
                      <a
                        key={title}
                        href={href}
                        {...(external || href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171922] p-3 transition hover:border-[#D3126A]/35 hover:bg-[#1c1524]"
                        data-testid={`resource-link-${title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <span
                          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ring-1 ${iconBg} ${accent}`}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13.5px] font-semibold text-white">{title}</span>
                          <span className="mt-0.5 block text-[11.5px] leading-4 text-white/55">{description}</span>
                          <span className="mt-1.5 flex flex-wrap gap-1.5">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-white/55"
                              >
                                {tag}
                              </span>
                            ))}
                          </span>
                        </span>
                        <span className="hidden flex-shrink-0 items-center gap-1 text-[11px] font-semibold text-[#F0B4CC] sm:inline-flex">
                          {cta}
                          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-white/30 sm:hidden" aria-hidden="true" />
                      </a>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-[#D3126A]/35 bg-[#171922] p-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-1 gap-2.5">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#D3126A]/15 text-[#F0B4CC] ring-1 ring-[#D3126A]/35">
                          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[12px] font-semibold text-white">Security-sensitive issue?</p>
                          <p className="mt-0.5 text-[11.5px] leading-4 text-white/55">
                            Don&apos;t paste credentials into chat. Open a ticket and we&apos;ll move to a secure channel.
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => setActiveTab("ticket")}
                        className="h-9 flex-shrink-0 rounded-xl bg-[#D3126A] px-3 text-white hover:bg-[#c01060]"
                      >
                        Create ticket
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <footer className="relative flex flex-shrink-0 items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5 text-[11px] text-white/40">
              <span className="truncate">DE Desk · Ticket · Resources · Assist</span>
              <button
                type="button"
                onClick={() => setActiveTab("ticket")}
                className="inline-flex items-center gap-1 font-semibold text-[#F0B4CC] hover:text-white"
              >
                Create ticket
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </button>
            </footer>
          </section>
        )}
      </div>

      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
    </>
  );
};
