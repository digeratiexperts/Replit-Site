import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  LifeBuoy,
  Monitor,
  MessageCircle,
  Send,
  ShieldCheck,
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

const QUICK_CHAT_PROMPTS = [
  "We need stronger cybersecurity",
  "Compare managed IT options",
  "Microsoft 365 feels messy",
  "Possible security incident",
];

const RESOURCE_LINKS: Array<{
  title: string;
  description: string;
  href: string;
  icon: typeof BookOpen;
  external?: boolean;
}> = [
  {
    title: "Zoho Assist",
    description: "Join a secure remote support session with our technicians",
    href: "https://assist.zoho.com/",
    icon: Monitor,
    external: true,
  },
  {
    title: "Remote Support",
    description: "How remote sessions work and what to expect",
    href: "/support/remote-support",
    icon: LifeBuoy,
  },
  {
    title: "Knowledge Base",
    description: "Setup guides, troubleshooting, and security help",
    href: "/support/knowledge-base",
    icon: BookOpen,
  },
  {
    title: "Client Portal",
    description: "Tickets, services, billing, approvals, and account tools",
    href: PORTAL_LOGIN,
    icon: ShieldCheck,
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
            className="fixed inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[100] flex max-h-[100dvh] w-auto flex-col overflow-hidden rounded-[1.25rem] border border-[#2a2433]/40 shadow-[0_24px_70px_rgba(12,10,18,0.42)] sm:absolute sm:inset-auto sm:bottom-0 sm:right-0 sm:top-auto sm:h-[min(700px,calc(100dvh-6rem))] sm:max-h-[min(82vh,calc(100dvh-5rem))] sm:w-[448px] sm:max-w-[calc(100vw-2rem)]"
            role="dialog"
            aria-modal="true"
            aria-label="DE Desk help"
            style={{
              background:
                "linear-gradient(128deg, #0e0e12 0%, #14141a 34%, #2a2433 46%, #ebe6f2 54%, #f7f5fa 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 55% at 0% -10%, rgba(211,18,106,0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(91,69,224,0.10), transparent 50%)",
              }}
              aria-hidden="true"
            />

            <header className="relative flex flex-shrink-0 items-center justify-between gap-3 px-4 pb-3 pt-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[0.85rem] bg-[#D3126A] text-[11px] font-bold tracking-wide text-white">
                  DE
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-[#0e0e12] bg-emerald-400" />
                </div>
                <div className="min-w-0">
                  <h2
                    className="truncate text-[15px] font-semibold tracking-tight text-white"
                    data-testid="text-widget-title"
                  >
                    DE Desk
                  </h2>
                  <p
                    className="truncate text-[11px] text-[#F2D6E4]"
                    data-testid="text-widget-status"
                  >
                    {agentLive
                      ? `${agentName || "Specialist"} joined · live handoff`
                      : "Answers · tickets · Assist"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-black/5 bg-[#f7f5fa]/90 p-2 text-[#4A2F55] shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-[#2A1530] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/35"
                data-testid="button-close-widget"
                aria-label="Close DE Desk"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </header>

            <nav
              className="relative mx-3 mb-2 grid flex-shrink-0 grid-cols-3 gap-0.5 rounded-2xl border border-black/[0.04] bg-[#f7f5fa]/80 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md"
              aria-label="Support options"
            >
              {(
                [
                  {
                    id: "chat" as const,
                    label: "Desk",
                    icon: MessageCircle,
                    active: "bg-[#16161c] text-white shadow-sm",
                    accent: "bg-[#D3126A]",
                  },
                  {
                    id: "ticket" as const,
                    label: "Ticket",
                    icon: FileText,
                    active: "bg-white text-[#5B45E0] shadow-sm",
                    accent: "bg-[#5B45E0]",
                  },
                  {
                    id: "resources" as const,
                    label: "Resources",
                    icon: BookOpen,
                    active: "bg-[#1a1520] text-[#E8A0BC] shadow-sm",
                    accent: "bg-[#C45B8A]",
                  },
                ]
              ).map(({ id, label, icon: Icon, active, accent }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`relative flex min-h-10 items-center justify-center gap-1.5 rounded-[0.85rem] px-2 text-[12.5px] font-semibold transition ${
                    activeTab === id
                      ? active
                      : "text-[#5A3D68] hover:bg-white/80 hover:text-[#5B45E0]"
                  }`}
                  data-testid={`button-tab-${id}`}
                  aria-current={activeTab === id ? "page" : undefined}
                >
                  <Icon className="h-3.5 w-3.5 opacity-90" aria-hidden="true" />
                  <span>{label}</span>
                  {activeTab === id && (
                    <span className={`absolute inset-x-6 bottom-1 h-[2px] rounded-full ${accent}`} />
                  )}
                </button>
              ))}
            </nav>

            <div className="relative min-h-0 flex-1">
              {activeTab === "chat" && (
                <div className="flex h-full min-h-0 flex-col" data-testid="panel-support-chat">
                  <div className="mx-3 mb-2 flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#121218]/75 px-3 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-[#FFF0F7]">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          agentLive
                            ? "bg-sky-400"
                            : assistantAvailable === true
                              ? "bg-emerald-400"
                              : assistantAvailable === false
                                ? "bg-amber-400"
                                : "bg-white/25"
                        }`}
                      />
                      {agentLive
                        ? `${agentName || "Specialist"} on desk`
                        : assistantAvailable === true
                          ? "DE Desk online"
                          : assistantAvailable === false
                            ? "Ticket desk available"
                            : "Connecting…"}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("ticket")}
                      className="text-[11px] font-semibold text-[#F0B4CC] transition hover:text-white"
                    >
                      Need a human?
                    </button>
                  </div>

                  <div
                    className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 pb-3"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(14,14,18,0.55) 0%, rgba(18,18,24,0.35) 62%, rgba(247,245,250,0.42) 100%)",
                    }}
                    aria-live="polite"
                  >
                    {chatMessages.map((chatMessage) => {
                      const isUser = chatMessage.role === "user";
                      const isAgent = chatMessage.role === "agent";
                      return (
                        <div
                          key={chatMessage.id}
                          className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[88%] px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                              isUser
                                ? "rounded-2xl rounded-br-md bg-[#D3126A] text-white"
                                : isAgent
                                  ? "rounded-2xl rounded-bl-md border border-[#cfe4f5] bg-[#f3f8fc] text-[#1a2434]"
                                  : "rounded-2xl rounded-bl-md border border-white/80 bg-[#fffafc] text-[#2A1530] shadow-[0_8px_24px_rgba(12,10,18,0.10)]"
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
                      <div className="grid grid-cols-1 gap-2 pt-0.5 sm:grid-cols-2">
                        {QUICK_CHAT_PROMPTS.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => void handleSendChat(prompt)}
                            className="rounded-xl border border-white/18 bg-white/[0.12] px-3 py-2.5 text-left text-[12px] font-medium text-[#FFF8FC] transition hover:border-[#D3126A]/35 hover:bg-[#D3126A]/15 hover:text-white"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}

                    {isChatSending && (
                      <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-md border border-white/80 bg-[#fffafc] px-3.5 py-2.5 text-xs text-[#5A3A5E]">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D3126A]" />
                            {agentLive ? "Delivering to specialist…" : "Thinking it through…"}
                          </span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="flex-shrink-0 border-t border-[#ddd6e6]/80 bg-[#f3f0f7]/95 px-3 py-3 backdrop-blur-md">
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
                        className="min-h-[50px] resize-none rounded-xl border-[#2a2433]/30 bg-[#16161c] text-[13.5px] text-[#FFF8FC] placeholder:text-[#E8B8D0] focus-visible:ring-[#D3126A]/70"
                        disabled={isChatSending}
                        data-testid="input-support-chat"
                        aria-label="Chat message"
                      />
                      <Button
                        type="button"
                        onClick={() => void handleSendChat()}
                        disabled={!chatInput.trim() || isChatSending}
                        className="h-[50px] w-[50px] flex-shrink-0 rounded-xl bg-[#D3126A] p-0 text-white hover:bg-[#c01060]"
                        data-testid="button-send-support-chat"
                        aria-label="Send chat message"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                    <p className="mt-2 text-[11px] font-medium leading-4 text-[#6B3A62]">
                      {agentLive
                        ? "A Digerati agent is in this thread. Never share passwords or MFA codes."
                        : "Never share passwords, MFA codes, or private keys."}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "ticket" && (
                <div
                  className="h-full overflow-y-auto px-3 pb-3"
                  data-testid="panel-support-ticket"
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(247,245,250,0.92) 0%, rgba(243,240,247,0.88) 46%, rgba(22,18,30,0.88) 70%, rgba(14,14,18,0.92) 100%)",
                  }}
                >
                  {ticketResult ? (
                    <div className="mt-1 flex h-[calc(100%-0.25rem)] flex-col items-center justify-center rounded-2xl border border-[#e4deec] bg-[#fbfafd] px-4 py-8 text-center shadow-[0_12px_36px_rgba(12,10,18,0.08)]">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#2A1530]">Support request received</h3>
                      {ticketResult.ticketNumber && (
                        <p className="mt-2 rounded-lg bg-[#16161c] px-3 py-1.5 font-mono text-xs font-semibold text-white">
                          {ticketResult.ticketNumber}
                        </p>
                      )}
                      <p className="mt-3 max-w-sm text-sm leading-5 text-[#5A3A5E]">{ticketResult.message}</p>
                      <div className="mt-5 flex flex-wrap justify-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setTicketResult(null);
                            setActiveTab("chat");
                          }}
                        >
                          Back to desk
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setTicketResult(null)}
                          className="bg-[#5B45E0] text-white hover:bg-[#4a37c7]"
                        >
                          Create another ticket
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 space-y-3">
                      <div className="rounded-2xl border border-[#e4deec] bg-[#fbfafd]/95 px-4 py-3.5 shadow-[0_10px_30px_rgba(91,69,224,0.06)]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5B45E0]">
                          Ticket
                        </p>
                        <h3 className="mt-1 text-[14px] font-semibold text-[#2A1530]">Create a support ticket</h3>
                        <p className="mt-1 text-[12px] leading-5 text-[#5A3A5E]">
                          Team follow-up, account changes, or work on your systems.
                        </p>
                      </div>

                      <div className="space-y-3 rounded-2xl border border-[#e4deec] bg-[#fbfafd] p-4 shadow-[0_10px_30px_rgba(12,10,18,0.06)]">
                        <div>
                          <label htmlFor="support-email" className="mb-1.5 block text-[11px] font-semibold text-[#4A2F55]">
                            Email
                          </label>
                          <Input
                            id="support-email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            data-testid="input-support-email"
                            className="h-10 rounded-xl border-[#2a2433]/25 bg-[#16161c] text-[13.5px] text-[#FFF8FC] placeholder:text-[#E8B8D0] focus-visible:ring-[#5B45E0]/70"
                          />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-[1fr_118px]">
                          <div>
                            <label htmlFor="support-subject" className="mb-1.5 block text-[11px] font-semibold text-[#4A2F55]">
                              Subject
                            </label>
                            <Input
                              id="support-subject"
                              maxLength={200}
                              placeholder="Brief description"
                              value={subject}
                              onChange={(event) => setSubject(event.target.value)}
                              data-testid="input-support-subject"
                              className="h-10 rounded-xl border-[#2a2433]/25 bg-[#16161c] text-[13.5px] text-[#FFF8FC] placeholder:text-[#E8B8D0] focus-visible:ring-[#5B45E0]/70"
                            />
                          </div>
                          <div>
                            <label htmlFor="support-priority" className="mb-1.5 block text-[11px] font-semibold text-[#4A2F55]">
                              Priority
                            </label>
                            <select
                              id="support-priority"
                              value={priority}
                              onChange={(event) =>
                                setPriority(event.target.value as "Low" | "Medium" | "High" | "Urgent")
                              }
                              className="h-10 w-full rounded-xl border border-[#2a2433]/25 bg-[#16161c] px-3 text-[13.5px] text-[#FFF8FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B45E0]/70"
                              data-testid="select-support-priority"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                              <option value="Urgent">Urgent</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="support-message" className="mb-1.5 block text-[11px] font-semibold text-[#4A2F55]">
                            What’s happening?
                          </label>
                          <Textarea
                            id="support-message"
                            maxLength={5000}
                            placeholder="Device, service, error, and what you already tried. No passwords or codes."
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            rows={4}
                            className="min-h-[100px] resize-none rounded-xl border-[#2a2433]/25 bg-[#16161c] text-[13.5px] text-[#FFF8FC] placeholder:text-[#E8B8D0] focus-visible:ring-[#5B45E0]/70"
                            data-testid="input-support-message"
                          />
                        </div>

                        <Button
                          type="button"
                          onClick={() => void handleSubmitTicket()}
                          disabled={isTicketSending}
                          className="h-11 w-full rounded-xl bg-[#5B45E0] text-white hover:bg-[#4a37c7]"
                          data-testid="button-submit-support"
                        >
                          {isTicketSending ? "Creating ticket…" : "Create support ticket"}
                          {!isTicketSending && <Send size={15} className="ml-2" aria-hidden="true" />}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "resources" && (
                <div
                  className="h-full overflow-y-auto px-3 pb-3"
                  data-testid="panel-support-resources"
                  style={{
                    background:
                      "linear-gradient(118deg, rgba(18,16,24,0.94) 0%, rgba(26,21,34,0.88) 44%, rgba(243,240,247,0.9) 56%, rgba(251,250,253,0.96) 100%)",
                  }}
                >
                  <div className="mb-3 grid gap-2.5 pt-1 sm:grid-cols-[118px_1fr]">
                    <div className="rounded-2xl border border-white/[0.08] bg-[#16161c]/80 p-3 text-white backdrop-blur-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E8A0BC]">
                        Resources
                      </p>
                      <p className="mt-2 text-[11px] leading-4 text-[#F5E6EE]">
                        Assist, portal, and knowledge tools.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#e4deec] bg-[#fbfafd]/95 p-3 shadow-sm">
                      <h3 className="text-[14px] font-semibold text-[#2A1530]">Get where you need to go</h3>
                      <p className="mt-1 text-[12px] leading-5 text-[#5A3A5E]">
                        Direct links clients use most.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {RESOURCE_LINKS.map(({ title, description, href, icon: Icon, external }, index) => {
                      const darkRow = index % 2 === 0;
                      return (
                        <a
                          key={title}
                          href={href}
                          {...(external || href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className={`group flex items-center gap-3 rounded-2xl border p-3 transition ${
                            darkRow
                              ? "border-white/[0.08] bg-[#16161c]/92 hover:border-[#D3126A]/35 hover:bg-[#1c1520]"
                              : "border-[#e4deec] bg-[#fbfafd] hover:border-[#5B45E0]/30 hover:bg-[#f5f2ff]"
                          }`}
                          data-testid={`resource-link-${title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <span
                            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition ${
                              darkRow
                                ? "bg-white/[0.06] text-[#E8A0BC] group-hover:bg-[#D3126A]/20 group-hover:text-white"
                                : "bg-[#efeaf6] text-[#3f3454] group-hover:bg-[#5B45E0]/12 group-hover:text-[#5B45E0]"
                            }`}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block text-[13.5px] font-semibold ${
                                darkRow ? "text-white" : "text-[#2A1530]"
                              }`}
                            >
                              {title}
                            </span>
                            <span
                              className={`mt-0.5 block text-[11.5px] leading-4 ${
                                darkRow ? "text-[#F0DCE6]" : "text-[#5A3A5E]"
                              }`}
                            >
                              {description}
                            </span>
                          </span>
                          <ExternalLink
                            className={`h-3.5 w-3.5 flex-shrink-0 transition ${
                              darkRow
                                ? "text-[#E8C0D2] group-hover:text-[#F0B4CC]"
                                : "text-[#9a8fb0] group-hover:text-[#5B45E0]"
                            }`}
                            aria-hidden="true"
                          />
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-3 rounded-2xl border border-[#D3126A]/20 bg-[#16161c]/90 p-3">
                    <div className="flex gap-2.5">
                      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C45B8A]" aria-hidden="true" />
                      <div>
                        <p className="text-[12px] font-semibold text-white">Security-sensitive issue?</p>
                        <p className="mt-1 text-[11.5px] leading-4 text-[#F2D6E4]">
                          Don’t paste credentials into chat. Open a ticket with the minimum details and we’ll move to a secure channel.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <footer className="relative flex flex-shrink-0 items-center justify-between gap-3 border-t border-[#e4deec]/90 bg-[#f7f5fa]/90 px-4 py-2.5 text-[11px] font-medium text-[#5A3558] backdrop-blur-md">
              <span className="truncate">DE Desk · Ticket · Resources · Assist</span>
              <button
                type="button"
                onClick={() => setActiveTab("ticket")}
                className="font-semibold text-[#D3126A] hover:text-[#a00e54]"
              >
                Create ticket
              </button>
            </footer>
          </section>
        )}
      </div>

      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
    </>
  );
};
