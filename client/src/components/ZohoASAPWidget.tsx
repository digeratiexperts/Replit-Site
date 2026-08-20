import { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  LayoutGrid,
  Lock,
  Mail,
  Maximize2,
  Minimize2,
  Monitor,
  MessageCircle,
  Paperclip,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Ticket,
  User,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { PORTAL_LOGIN } from "@/lib/portalUrls";
import type { OpenMspAdvisorDetail } from "@/lib/openMspAdvisor";
import { STORE_ADVISOR_SEED } from "@/lib/openMspAdvisor";
import { analytics } from "@/lib/analytics";
import { useDraggableWindow } from "@/hooks/useDraggableWindow";
import {
  DESK_TICKET_CATEGORIES,
  DESK_TICKET_CHIPS,
  DESK_TICKET_PRIORITIES,
  applyDeskTicketChip,
  type DeskTicketChipId,
  type DeskTicketPriority,
} from "@/lib/deskTicketChips";

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

type ChatHeadsUp = {
  id: string;
  from: string;
  preview: string;
  kind: "in" | "out";
  live?: boolean;
};

function previewChatLine(content: string, max = 108) {
  const text = content.replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

const CHAT_WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "DE Desk is here. Describe the outage, the risk, or the question — we'll take it and give you a clear next step.",
};

const QUICK_CHAT_PROMPTS: Array<{
  label: string;
  ticketChip?: DeskTicketChipId;
}> = [
  { label: "Something isn't working" },
  { label: "Possible security incident", ticketChip: "security-incident" },
];

function BookMagnifier({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className ?? "h-5 w-5"}`} aria-hidden="true">
      <BookOpen className="h-full w-full" />
      <Search className="absolute -bottom-[12%] -right-[14%] h-[58%] w-[58%]" strokeWidth={2.75} />
    </span>
  );
}

const RESOURCE_LINKS: Array<{
  title: string;
  description: string;
  href: string;
  icon: typeof BookOpen | typeof BookMagnifier;
  external?: boolean;
  guide?: { title: string; href: string };
  tags: [string, string];
  cta: string;
  accent: string;
  iconBg: string;
}> = [
  {
    title: "Client portal",
    description: "Tickets, services, approvals, and account management.",
    href: PORTAL_LOGIN,
    icon: ShieldCheck,
    tags: ["Account access", "Self-service"],
    cta: "Open portal",
    accent: "text-[#fed7aa]",
    iconBg:
      "bg-gradient-to-br from-[#fb923c]/45 to-[#ea580c]/25 ring-[#fdba74]/55 shadow-[0_0_20px_rgba(251,146,60,0.3)]",
  },
  {
    title: "Start remote support",
    description: "Connect securely with a technician.",
    href: "https://assist.zoho.com/",
    icon: Monitor,
    external: true,
    guide: { title: "Remote support guide", href: "/support/remote-support" },
    tags: ["Live help", "Screen share"],
    cta: "Start session",
    accent: "text-[#e9d5ff]",
    iconBg:
      "bg-gradient-to-br from-[#a855f7]/45 to-[#7c3aed]/30 ring-[#c084fc]/55 shadow-[0_0_20px_rgba(168,85,247,0.35)]",
  },
  {
    title: "Knowledge base",
    description: "Guides and troubleshooting.",
    href: "/support/knowledge-base",
    icon: BookMagnifier,
    tags: ["Guides", "Troubleshooting"],
    cta: "Browse articles",
    accent: "text-[#bbf7d0]",
    iconBg:
      "bg-gradient-to-br from-[#4ade80]/40 to-[#16a34a]/25 ring-[#86efac]/50 shadow-[0_0_20px_rgba(74,222,128,0.28)]",
  },
  {
    title: "System status",
    description: "Service advisories and known issues.",
    href: "/portal/status",
    icon: Activity,
    tags: ["Advisories", "Known issues"],
    cta: "View status",
    accent: "text-[#bae6fd]",
    iconBg:
      "bg-gradient-to-br from-[#38bdf8]/40 to-[#0284c7]/25 ring-[#7dd3fc]/50 shadow-[0_0_20px_rgba(56,189,248,0.3)]",
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
  const activeTabRef = useRef<ActiveTab>(activeTab);
  const agentNameRef = useRef<string | null>(null);
  const headsUpTimerRef = useRef<number | null>(null);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [headsUp, setHeadsUp] = useState<ChatHeadsUp | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium");
  const [category, setCategory] = useState("");
  const [selectedTicketChip, setSelectedTicketChip] = useState<DeskTicketChipId | null>(null);
  const ticketDetailsRef = useRef<HTMLDivElement>(null);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [isTicketSending, setIsTicketSending] = useState(false);
  const [ticketResult, setTicketResult] = useState<TicketResult | null>(null);
  const [showTicketMore, setShowTicketMore] = useState(false);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const ticketFileRef = useRef<HTMLInputElement>(null);

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
  const [canDrag, setCanDrag] = useState(false);

  const deskDrag = useDraggableWindow({
    enabled: canDrag,
    open: isOpen,
    storageKey: "de-desk-window-pos",
  });

  const { toast } = useToast();
  activeTabRef.current = activeTab;
  agentNameRef.current = agentName;

  useEffect(() => () => {
    if (headsUpTimerRef.current) window.clearTimeout(headsUpTimerRef.current);
  }, []);

  const clearHeadsUpTimer = () => {
    if (headsUpTimerRef.current) {
      window.clearTimeout(headsUpTimerRef.current);
      headsUpTimerRef.current = null;
    }
  };

  const showHeadsUp = (next: ChatHeadsUp, holdMs = next.kind === "in" && next.live ? 12000 : 7000) => {
    if (activeTabRef.current === "chat") return;
    setHeadsUp(next);
    clearHeadsUpTimer();
    headsUpTimerRef.current = window.setTimeout(() => setHeadsUp(null), holdMs);
  };

  const selectTab = (id: ActiveTab) => {
    setActiveTab(id);
    if (id === "chat") {
      setUnreadChatCount(0);
      setHeadsUp(null);
      clearHeadsUpTimer();
    }
  };

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setCanDrag(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
    window.dispatchEvent(new CustomEvent("de-desk-open-change", { detail: { open: isOpen } }));
    return () => {
      window.dispatchEvent(new CustomEvent("de-desk-open-change", { detail: { open: false } }));
    };
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

  useEffect(() => {
    if (activeTab === "chat" || !isChatSending) return;
    showHeadsUp(
      {
        id: "pending-reply",
        from: "DE Desk",
        preview: agentLive ? "Delivering to the specialist…" : "Working on your message…",
        kind: "in",
        live: agentLive,
      },
      20000,
    );
  }, [activeTab, isChatSending, agentLive]);

  // Pull portal agent (and any missed) messages into the website desk
  useEffect(() => {
    if (!advisorSessionId || !isOpen) return;
    let cancelled = false;

    const mergeIncoming = (incoming: ChatMessage[], live?: boolean, name?: string | null) => {
      if (typeof live === "boolean") setAgentLive(live);
      if (name) setAgentName(name);
      if (!incoming.length) return;
      const added: ChatMessage[] = [];
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
          const incomingMsg = {
            id: msg.id,
            role: msg.role,
            content: msg.content,
            senderName: msg.senderName,
            createdAt: msg.createdAt,
          };
          next.push(incomingMsg);
          added.push(incomingMsg);
        }
        return next;
      });
      if (added.length && activeTabRef.current !== "chat") {
        setUnreadChatCount((count) => count + added.length);
        const last = added[added.length - 1];
        showHeadsUp({
          id: last.id,
          from:
            last.role === "agent"
              ? last.senderName || name || agentNameRef.current || "Specialist"
              : "DE Desk",
          preview: previewChatLine(last.content),
          kind: "in",
          live: last.role === "agent" || !!live,
        });
      }
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
    const id = window.setInterval(poll, agentLive ? 1600 : 2400);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [advisorSessionId, isOpen, agentLive]);

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
    if (activeTabRef.current !== "chat") {
      showHeadsUp({
        id: userMessage.id,
        from: "You",
        preview: previewChatLine(content, 90),
        kind: "out",
      }, 4000);
    }

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
      if (activeTabRef.current !== "chat") {
        setUnreadChatCount((count) => count + 1);
        showHeadsUp({
          id: assistantId,
          from: data.agentLive ? String(data.agentName || "Specialist") : "DE Desk",
          preview: previewChatLine(replyContent),
          kind: "in",
          live: !!data.agentLive,
        });
      }
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
      if (activeTabRef.current !== "chat") {
        showHeadsUp({
          id: `assistant-error-${Date.now()}`,
          from: "DE Desk",
          preview: previewChatLine(description),
          kind: "in",
        });
      }
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

  const applyTicketChip = (chipId: DeskTicketChipId) => {
    const chip = DESK_TICKET_CHIPS.find((item) => item.id === chipId);
    if (!chip) return;
    const next = applyDeskTicketChip(chip, { message });
    setSelectedTicketChip(next.chipId);
    setSubject(next.subject);
    setCategory(next.category);
    setPriority(next.priority);
    setMessage(next.message);
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      ticketDetailsRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      const focusId = fullName.trim() && email.trim() ? "support-message" : "support-name";
      document.getElementById(focusId)?.focus();
    });
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
      setSelectedTicketChip(null);
      setAttachmentName(null);
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

  const dockClear = cookieBannerClear
    ? "calc(var(--de-chrome-inset) + env(safe-area-inset-bottom, 0px) + var(--de-cookie-h, 0px) + var(--de-unified-bar-h, 0px))"
    : "calc(5.75rem + var(--de-cookie-h, 0px) + var(--de-unified-bar-h, 0px))";

  const canvasRight = "calc(var(--de-canvas-gutter) + var(--de-chrome-inset))";

  const deskWindowStyle = canDrag
    ? {
        ...(deskDrag.pos
          ? {
              left: deskDrag.pos.x,
              top: deskDrag.pos.y,
              right: "auto",
              bottom: "auto",
            }
          : {
              right: canvasRight,
              bottom: dockClear,
              left: "auto",
              top: "auto",
            }),
        ...(deskDrag.size
          ? {
              width: deskDrag.size.w,
              height: deskDrag.size.h,
              maxWidth: "none",
              maxHeight: "none",
            }
          : {}),
      }
    : undefined;

  return (
    <>
        {isOpen && (
          <section
            ref={deskDrag.panelRef}
            className="de-desk-shell fixed inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[100] flex max-h-[100dvh] w-auto flex-col overflow-hidden sm:inset-auto sm:h-[min(760px,calc(100dvh-5.5rem))] sm:max-h-[min(86vh,calc(100dvh-4.5rem))] sm:w-[410px] sm:max-w-[calc(100vw-2rem)]"
            style={deskWindowStyle}
            role="dialog"
            aria-modal="true"
            aria-label="DE Desk help"
            data-testid="desk-modal"
            data-tab={activeTab}
          >
            <header className="de-desk-head">
              <div
                className={`de-desk-id ${
                  canDrag
                    ? deskDrag.dragging
                      ? "cursor-grabbing select-none"
                      : "cursor-grab select-none"
                    : ""
                }`}
                onPointerDown={canDrag ? deskDrag.onHandlePointerDown : undefined}
                onDoubleClick={canDrag ? deskDrag.reset : undefined}
                style={canDrag ? { touchAction: "none" } : undefined}
                data-testid="desk-drag-handle"
                aria-label={canDrag ? "Move DE Desk window. Double-click to reset size and position." : undefined}
              >
                <div className="de-desk-avatar">
                  DE
                  <span className="de-desk-avatar-dot" />
                </div>
                <div className="min-w-0">
                  <h2 data-testid="text-widget-title">DE Desk</h2>
                  <p data-testid="text-widget-status">
                    {agentLive
                      ? `${agentName || "Specialist"} joined · live handoff`
                      : "DE Desk is available"}
                  </p>
                </div>
              </div>
              {canDrag ? (
                <button
                  type="button"
                  className="de-desk-close"
                  data-testid="button-expand-desk"
                  aria-label={deskDrag.expanded ? "Reset DE Desk size" : "Expand DE Desk"}
                  title={deskDrag.expanded ? "Reset size" : "Expand"}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={deskDrag.toggleExpanded}
                >
                  {deskDrag.expanded ? (
                    <Minimize2 size={13} aria-hidden="true" />
                  ) : (
                    <Maximize2 size={13} aria-hidden="true" />
                  )}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="de-desk-close"
                data-testid="button-close-widget"
                aria-label="Close DE Desk"
              >
                <X size={13} aria-hidden="true" />
              </button>
            </header>

            <nav className="de-desk-tabs" aria-label="Support options">
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
                    onClick={() => selectTab(id)}
                    className={`de-desk-tab${isActive ? " is-active" : ""}${
                      id === "chat" && unreadChatCount > 0 ? " has-unread" : ""
                    }`}
                    data-testid={`button-tab-${id}`}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={
                      id === "chat" && unreadChatCount > 0
                        ? `Ask DE, ${unreadChatCount} new ${unreadChatCount === 1 ? "message" : "messages"}`
                        : undefined
                    }
                  >
                    <Icon aria-hidden="true" />
                    {label}
                    {id === "chat" && unreadChatCount > 0 ? (
                      <span className="de-desk-tab-badge" aria-hidden="true">
                        {unreadChatCount > 9 ? "9+" : unreadChatCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="de-desk-body">
              {headsUp && activeTab !== "chat" ? (
                <div
                  className={`de-desk-heads-up${headsUp.kind === "out" ? " is-out" : ""}${
                    headsUp.live ? " is-live" : ""
                  }`}
                  role="status"
                  aria-live="polite"
                  data-testid="desk-chat-heads-up"
                >
                  <button
                    type="button"
                    className="de-desk-heads-up-main"
                    onClick={() => selectTab("chat")}
                  >
                    <span className="de-desk-heads-up-mark" aria-hidden="true">
                      {headsUp.kind === "out" ? "You" : headsUp.live ? "AG" : "DE"}
                    </span>
                    <span className="de-desk-heads-up-copy">
                      <span className="de-desk-heads-up-top">
                        <strong>{headsUp.from}</strong>
                        <em>{headsUp.kind === "out" ? "sent" : "now"}</em>
                      </span>
                      <span className="de-desk-heads-up-preview">{headsUp.preview}</span>
                      <span className="de-desk-heads-up-hint">
                        Open Ask DE to reply
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="de-desk-heads-up-x"
                    onClick={() => {
                      setHeadsUp(null);
                      clearHeadsUpTimer();
                    }}
                    aria-label="Dismiss chat notification"
                  >
                    <X size={12} aria-hidden="true" />
                  </button>
                </div>
              ) : null}
              {activeTab === "chat" && (
                <div className="de-desk-panel" data-testid="panel-support-chat">
                  <div className="de-desk-scroll" aria-live="polite">
                    {chatMessages.map((chatMessage, index) => {
                      const isUser = chatMessage.role === "user";
                      const isAgent = chatMessage.role === "agent";
                      const isOpening = !isUser && index === 0;
                      return (
                        <div
                          key={chatMessage.id}
                          className={`de-desk-msg ${isUser ? "is-user" : "is-bot"}`}
                        >
                          {!isUser ? (
                            <div className="de-desk-msg-id" aria-hidden="true">
                              {isAgent ? "AG" : "DE"}
                              {isOpening ? <span className="de-desk-avatar-dot" /> : null}
                            </div>
                          ) : null}
                          <div className="de-desk-msg-col">
                            {!isUser ? (
                              <div className="de-desk-msg-who">
                                <strong>
                                  {isAgent ? chatMessage.senderName || agentName || "Agent" : "DE Desk"}
                                </strong>
                                {isOpening ? <em>Available</em> : null}
                              </div>
                            ) : null}
                            <div
                              className={`de-desk-bubble ${
                                isUser ? "is-user" : isAgent ? "is-agent" : "is-bot"
                              }`}
                            >
                              <p className="whitespace-pre-wrap">{chatMessage.content}</p>
                            </div>
                            {isOpening && chatMessages.length === 1 ? (
                              <div className="de-desk-chips" role="group" aria-label="Common questions">
                                {QUICK_CHAT_PROMPTS.map(({ label, ticketChip }) => (
                                  <button
                                    key={label}
                                    type="button"
                                    data-testid={`ask-prompt-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                    onClick={() => {
                                      if (ticketChip) {
                                        selectTab("ticket");
                                        applyTicketChip(ticketChip);
                                        return;
                                      }
                                      void handleSendChat(label);
                                    }}
                                    className="de-desk-chip"
                                  >
                                    {label}
                                  </button>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}

                    {isChatSending && (
                      <div className="flex justify-start">
                        <div className="de-desk-bubble is-bot">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D3126A]" />
                            {agentLive ? "Delivering to specialist…" : "Thinking it through…"}
                          </span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </div>
              )}

              {activeTab === "ticket" && (
                <div className="de-desk-panel" data-testid="panel-support-ticket">
                  <div className="de-desk-scroll">
                    {ticketResult ? (
                      <div className="de-desk-hero de-desk-success">
                        <div className="de-desk-hero-ring">
                          <CheckCircle2 aria-hidden="true" />
                        </div>
                        <h3>Support request received</h3>
                        {ticketResult.ticketNumber && (
                          <p className="de-desk-ticket-ref">{ticketResult.ticketNumber}</p>
                        )}
                        <p>{ticketResult.message}</p>
                        <div className="de-desk-success-actions">
                          <button
                            type="button"
                            onClick={() => {
                              setTicketResult(null);
                              selectTab("chat");
                            }}
                            className="de-desk-row"
                          >
                            <span className="de-desk-row-t">Back to Ask DE</span>
                          </button>
                          <button type="button" onClick={() => setTicketResult(null)} className="de-desk-btn-grad">
                            Create another ticket
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="de-desk-form" ref={ticketDetailsRef}>
                        <div className="de-desk-ticket-lead">
                          <h3>Open a support ticket</h3>
                          <p>Tell us what happened. We&apos;ll route it to the desk.</p>
                        </div>

                        {selectedTicketChip === "security-incident" ? (
                          <p className="de-desk-route-note" data-testid="ticket-chip-security-incident">
                            Routed as a possible security incident.
                          </p>
                        ) : null}

                        <div className="de-desk-field">
                          <label htmlFor="support-name">Name</label>
                          <div className="de-desk-input-wrap">
                            <User aria-hidden="true" />
                            <Input
                              id="support-name"
                              autoComplete="name"
                              placeholder="Your name"
                              value={fullName}
                              onChange={(event) => setFullName(event.target.value)}
                              data-testid="input-support-name"
                              className="de-desk-input"
                            />
                          </div>
                        </div>
                        <div className="de-desk-field">
                          <label htmlFor="support-email">Work email</label>
                          <div className="de-desk-input-wrap">
                            <Mail aria-hidden="true" />
                            <Input
                              id="support-email"
                              type="email"
                              autoComplete="email"
                              placeholder="you@company.com"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              data-testid="input-support-email"
                              className="de-desk-input"
                            />
                          </div>
                        </div>
                        <div className="de-desk-field">
                          <label htmlFor="support-subject">What&apos;s happening?</label>
                          <Input
                            id="support-subject"
                            maxLength={200}
                            placeholder="Short summary"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            data-testid="input-support-subject"
                            className="de-desk-input is-bare"
                          />
                        </div>
                        <div className="de-desk-field">
                          <label htmlFor="support-message">Details</label>
                          <Textarea
                            id="support-message"
                            maxLength={2000}
                            placeholder="What broke, who is affected, and what you already tried."
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            rows={4}
                            className="de-desk-input de-desk-ta is-bare"
                            data-testid="input-support-message"
                          />
                        </div>
                        <div className="de-desk-field">
                          <span className="de-desk-urgency-label" id="support-urgency-label">
                            Urgency
                          </span>
                          <div className="de-desk-urgency" role="group" aria-labelledby="support-urgency-label">
                            {DESK_TICKET_PRIORITIES.map((level) => (
                              <button
                                key={level}
                                type="button"
                                className={priority === level ? "is-on" : undefined}
                                aria-pressed={priority === level}
                                data-testid={`select-support-priority-${level.toLowerCase()}`}
                                onClick={() => setPriority(level)}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                          <select
                            id="support-priority"
                            value={priority}
                            onChange={(event) => setPriority(event.target.value as DeskTicketPriority)}
                            className="sr-only"
                            data-testid="select-support-priority"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            {DESK_TICKET_PRIORITIES.map((level) => (
                              <option key={level} value={level}>
                                {level}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          className="de-desk-more-toggle"
                          aria-expanded={showTicketMore}
                          onClick={() => setShowTicketMore((open) => !open)}
                        >
                          {showTicketMore ? "Hide extra details" : "More details"}
                        </button>
                        {showTicketMore ? (
                          <div className="de-desk-more">
                            <div className="de-desk-field">
                              <label htmlFor="support-company">Company</label>
                              <Input
                                id="support-company"
                                autoComplete="organization"
                                placeholder="Company name"
                                value={company}
                                onChange={(event) => setCompany(event.target.value)}
                                data-testid="input-support-company"
                                className="de-desk-input is-bare"
                              />
                            </div>
                            <div className="de-desk-field">
                              <label htmlFor="support-category">Category</label>
                              <select
                                id="support-category"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                className="de-desk-input de-desk-select is-bare"
                                data-testid="select-support-category"
                              >
                                <option value="">Select a category</option>
                                {DESK_TICKET_CATEGORIES.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <input
                              ref={ticketFileRef}
                              type="file"
                              accept="image/png,image/jpeg,application/pdf,.png,.jpg,.jpeg,.pdf"
                              className="sr-only"
                              onChange={(event) => handleTicketFile(event.target.files?.[0])}
                              data-testid="input-support-attachment"
                            />
                            <button type="button" onClick={() => ticketFileRef.current?.click()} className="de-desk-attach">
                              <Paperclip aria-hidden="true" />
                              <span>
                                <span className="de-desk-attach-t">{attachmentName || "Attach file or screenshot"}</span>
                                <span className="de-desk-attach-h">PNG, JPG, or PDF up to 10MB.</span>
                              </span>
                            </button>
                          </div>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => void handleSubmitTicket()}
                          disabled={isTicketSending}
                          className="de-desk-btn-grad"
                          data-testid="button-submit-support"
                        >
                          {isTicketSending ? "Creating ticket…" : "Create ticket"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div className="de-desk-panel" data-testid="panel-support-resources">
                  <div className="de-desk-scroll">
                    <div className="de-desk-ticket-lead">
                      <h3>Client tools</h3>
                      <p>The two places clients use most.</p>
                    </div>
                    <div className="de-desk-rows">
                      {RESOURCE_LINKS.slice(0, 1).map(({ title, description, href, icon: Icon }) => (
                        <a
                          key={title}
                          href={href}
                          className="de-desk-row"
                          data-testid={`resource-link-${title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <span className="de-desk-row-ic">
                            <Icon aria-hidden="true" />
                          </span>
                          <span className="de-desk-row-body">
                            <span className="de-desk-row-t">{title}</span>
                            <span className="de-desk-row-d">{description}</span>
                          </span>
                          <ChevronRight className="de-desk-row-chev" aria-hidden="true" />
                        </a>
                      ))}
                      <button
                        type="button"
                        className="de-desk-row"
                        data-testid="resource-link-get-support"
                        onClick={() => selectTab("ticket")}
                      >
                        <span className="de-desk-row-ic">
                          <Ticket aria-hidden="true" />
                        </span>
                        <span className="de-desk-row-body">
                          <span className="de-desk-row-t">Get Support</span>
                          <span className="de-desk-row-d">Open a ticket for an outage or incident.</span>
                        </span>
                        <ChevronRight className="de-desk-row-chev" aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="de-desk-more-toggle"
                      aria-expanded={showMoreTools}
                      onClick={() => setShowMoreTools((open) => !open)}
                    >
                      {showMoreTools ? "Hide more tools" : "More tools"}
                    </button>
                    {showMoreTools ? (
                      <div className="de-desk-rows">
                        {RESOURCE_LINKS.slice(1).map(({ title, description, href, icon: Icon, external, guide }) => (
                          <div key={title} className="de-desk-tool-block">
                            <a
                              href={href}
                              {...(external || href.startsWith("http")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                              className="de-desk-row"
                              data-testid={`resource-link-${title.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              <span className="de-desk-row-ic">
                                <Icon aria-hidden="true" />
                              </span>
                              <span className="de-desk-row-body">
                                <span className="de-desk-row-t">{title}</span>
                                <span className="de-desk-row-d">{description}</span>
                              </span>
                              <ChevronRight className="de-desk-row-chev" aria-hidden="true" />
                            </a>
                            {guide ? (
                              <a href={guide.href} className="de-desk-sublink" data-testid="resource-link-remote-support-guide">
                                {guide.title}
                              </a>
                            ) : null}
                          </div>
                        ))}
                        <a
                          href="/book"
                          className="de-desk-row"
                          data-testid="resource-link-cyber-risk-assessment"
                        >
                          <span className="de-desk-row-ic">
                            <Shield aria-hidden="true" />
                          </span>
                          <span className="de-desk-row-body">
                            <span className="de-desk-row-t">Cyber Risk Assessment</span>
                            <span className="de-desk-row-d">Map gaps and get a prioritized next step.</span>
                          </span>
                          <ChevronRight className="de-desk-row-chev" aria-hidden="true" />
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {activeTab === "chat" ? (
              <>
                <div className={`de-desk-composer${headsUp || unreadChatCount ? " is-live" : ""}`}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void handleSendChat();
                      }
                    }}
                    maxLength={2000}
                    placeholder={
                      agentLive
                        ? `Message ${agentName || "the specialist"}…`
                        : "Type the issue — we're ready now"
                    }
                    disabled={isChatSending}
                    data-testid="input-support-chat"
                    aria-label="Ask DE message"
                  />
                  <button
                    type="button"
                    onClick={() => void handleSendChat()}
                    disabled={!chatInput.trim() || isChatSending}
                    className="de-desk-send"
                    data-testid="button-send-support-chat"
                    aria-label="Send chat message"
                  >
                    <Send aria-hidden="true" />
                  </button>
                </div>
                <p className="de-desk-composer-caption">
                  <Lock aria-hidden="true" />
                  {agentLive
                    ? "A Digerati agent is in this thread. Never share passwords or MFA codes."
                    : "Never share passwords, MFA codes, or private keys."}
                </p>
              </>
            ) : null}
            {canDrag ? (
              <>
                {(["n", "s", "e", "w", "ne", "nw", "sw"] as const).map((edge) => (
                  <button
                    key={edge}
                    type="button"
                    className={`de-desk-resize-edge de-desk-resize-${edge}`}
                    data-testid={`desk-resize-${edge}`}
                    aria-label={`Resize DE Desk from the ${edge} edge`}
                    onPointerDown={deskDrag.onResizePointerDown(edge)}
                  />
                ))}
                <button
                  type="button"
                  className={`de-desk-resize de-desk-resize-se${deskDrag.resizing ? " is-active" : ""}`}
                  data-testid="desk-resize-handle"
                  aria-label="Resize DE Desk. Drag any edge or this corner, or use Expand in the header."
                  onPointerDown={deskDrag.onResizePointerDown("se")}
                >
                  <span aria-hidden="true" />
                </button>
              </>
            ) : null}
          </section>
        )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .de-desk-shell {
              --desk-shell: #1a0b33;
              --desk-shell-soft: rgba(0,0,0,0.28);
              --desk-shell-border: rgba(255,255,255,0.10);
              --desk-shell-border-strong: rgba(167,139,250,0.72);
              --desk-shell-text: #ffffff;
              --desk-shell-muted: rgba(247,245,242,0.68);
              --desk-shell-dim: rgba(247,245,242,0.46);
              --desk-paper: #f7f5f2;
              --desk-well: #0b0c10;
              --desk-surface: #0a0a0a;
              --desk-box: #151217;
              --desk-inset: #fcfaf7;
              --desk-border: rgba(255,255,255,0.10);
              --desk-border-strong: rgba(255,255,255,0.16);
              --desk-ink: #17141f;
              --desk-ink-muted: #5c5668;
              --desk-ink-dim: #726c82;
              --desk-pink: #d3126a;
              --desk-violet: #8b5cf6;
              --desk-blue: #3b9eff;
              --desk-teal: #22d3ee;
              --desk-red: #f0455b;
              --desk-green: #22c55e;
              --desk-cta: #d3126a;
              position: relative;
              color-scheme: dark;
              background: #1a0b33;
              border: 2px solid var(--desk-shell-border-strong);
              border-radius: 24px;
              box-shadow: 0 0 0 1px rgba(196,181,253,0.28), 0 28px 80px rgba(20,8,40,0.62);
              color: var(--desk-shell-text);
            }
            .de-desk-shell::before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background:
                radial-gradient(ellipse 80% 50% at 8% 0%, rgba(167,139,250,0.42), transparent 58%),
                radial-gradient(ellipse 70% 46% at 100% 0%, rgba(211,18,106,0.26), transparent 55%);
            }
            .de-desk-shell :is(button, a, input, textarea, select):focus-visible {
              outline: 2px solid var(--desk-pink);
              outline-offset: 2px;
            }
            .de-desk-shell ::selection {
              background: color-mix(in srgb, #D3126A 38%, transparent);
              color: #fff;
              -webkit-text-fill-color: #fff;
            }
            .de-desk-shell nav[aria-label="Support options"] ::selection,
            .de-desk-shell nav[aria-label="Support options"] *::selection {
              background: transparent;
              color: inherit;
              -webkit-text-fill-color: inherit;
            }
            .de-desk-head {
              position: relative;
              z-index: 1;
              display: flex;
              align-items: center;
              gap: 11px;
              padding: 16px 16px 10px;
              flex-shrink: 0;
            }
            .de-desk-id { display: flex; align-items: center; gap: 11px; min-width: 0; flex: 1; }
            .de-desk-avatar {
              position: relative;
              width: 40px; height: 40px;
              border-radius: 50%;
              background: linear-gradient(135deg, #D3126A 0%, #7c3aed 100%);
              color: #fff;
              display: flex; align-items: center; justify-content: center;
              flex: none;
              font-family: "Space Grotesk", sans-serif;
              font-weight: 700;
              font-size: 13px;
            }
            .de-desk-avatar-dot {
              position: absolute; right: -2px; bottom: -2px;
              width: 9px; height: 9px; border-radius: 50%;
              background: var(--desk-green);
              border: 2px solid var(--desk-shell);
            }
            .de-desk-avatar-dot::after,
            .de-desk-status-dot.is-on::after {
              content: "";
              position: absolute; inset: -3px; border-radius: 50%;
              background: var(--desk-green);
              opacity: 0.4;
              animation: de-desk-pulse 2s ease-out infinite;
            }
            @keyframes de-desk-pulse {
              0% { transform: scale(0.6); opacity: 0.5; }
              100% { transform: scale(2.2); opacity: 0; }
            }
            @media (prefers-reduced-motion: reduce) {
              .de-desk-avatar-dot::after,
              .de-desk-status-dot.is-on::after { animation: none; }
            }
            .de-desk-id h2 {
              font-family: "Space Grotesk", sans-serif;
              font-weight: 600;
              font-size: 16px;
              color: var(--desk-shell-text);
              line-height: 1.2;
            }
            .de-desk-id p { font-size: 13px; color: var(--desk-shell-muted); margin-top: 1px; }
            .de-desk-close {
              width: 36px; height: 36px; border-radius: 50%;
              border: 1px solid rgba(255,255,255,0.12);
              background: rgba(0,0,0,0.28);
              color: rgba(255,255,255,0.82);
              display: flex; align-items: center; justify-content: center;
              flex: none;
            }
            .de-desk-close:hover { color: #fff; border-color: rgba(255,255,255,0.28); }
            .de-desk-tabs {
              position: relative;
              z-index: 1;
              display: flex; justify-content: space-between; gap: 12px;
              padding: 0 16px;
              border-bottom: 1px solid rgba(255,255,255,0.12);
              flex-shrink: 0;
            }
            .de-desk-tab {
              background: none; border: none;
              min-height: 44px;
              padding: 12px 0;
              font-family: "Space Grotesk", sans-serif;
              font-weight: 600; font-size: 15px;
              color: var(--desk-shell-dim);
              display: flex; align-items: center; gap: 6px;
              position: relative;
            }
            .de-desk-tab svg { width: 14px; height: 14px; }
            .de-desk-tab.is-active { color: var(--desk-shell-text); }
            .de-desk-tab.is-active::after {
              content: "";
              position: absolute; left: 0; right: 0; bottom: -1px;
              height: 2px; border-radius: 2px;
              background: var(--desk-pink);
            }
            .de-desk-tab-badge {
              min-width: 16px; height: 16px; padding: 0 4px;
              border-radius: 999px;
              background: var(--desk-pink); color: #fff;
              font-size: 9px; font-weight: 700; line-height: 16px;
              letter-spacing: 0; text-align: center;
            }
            .de-desk-tab.has-unread { color: var(--desk-shell-text); }
            .de-desk-status {
              display: flex; align-items: center; justify-content: space-between;
              padding: 9px 17px;
              background: var(--desk-shell);
              border-bottom: 1px solid var(--desk-shell-border);
              font-size: 13px;
              flex-shrink: 0;
            }
            .de-desk-status-l {
              display: flex; align-items: center; gap: 6px;
              color: var(--desk-shell-muted); font-weight: 500;
            }
            .de-desk-status-dot {
              width: 6px; height: 6px; border-radius: 50%;
              background: #c4c0cc; position: relative;
            }
            .de-desk-status-dot.is-on { background: var(--desk-green); }
            .de-desk-status-dot.is-live { background: #3b9eff; }
            .de-desk-status-dot.is-wait { background: #e8a23d; }
            .de-desk-status-r {
              display: flex; align-items: center; gap: 7px;
              color: var(--desk-pink); font-weight: 600;
            }
            .de-desk-status-ic {
              width: 22px; height: 22px; border-radius: 7px;
              border: 1.5px solid var(--desk-pink);
              display: flex; align-items: center; justify-content: center;
              background: rgba(211,18,106,0.10);
            }
            .de-desk-status-ic svg { width: 11px; height: 11px; }
            .de-desk-body {
              position: relative;
              z-index: 1;
              min-height: 0; flex: 1;
              margin: 10px 10px 0;
              padding: 16px 16px 8px;
              display: flex; flex-direction: column;
              background: var(--desk-paper);
              border-radius: 18px 18px 0 0;
              color: var(--desk-ink);
            }
            .de-desk-shell[data-tab="ticket"] .de-desk-body,
            .de-desk-shell[data-tab="resources"] .de-desk-body {
              background: var(--desk-well);
              color: #f7f5f2;
            }
            .de-desk-panel, .de-desk-scroll {
              min-height: 0; flex: 1;
              display: flex; flex-direction: column;
            }
            .de-desk-scroll { overflow-y: auto; gap: 0; }
            .de-desk-hero {
              position: relative; overflow: hidden;
              border-radius: 12px;
              border: 1px solid var(--desk-border);
              background: var(--desk-box);
              padding: 16px 16px;
              display: flex; align-items: center; gap: 12px;
              flex-shrink: 0;
            }
            .de-desk-hero::before {
              content: "";
              position: absolute; inset: 0;
              background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.15px);
              background-size: 7px 7px;
              opacity: 0.35;
              pointer-events: none;
            }
            .de-desk-hero-dots {
              position: absolute; top: 0; right: 0; bottom: 0; width: 42%;
              background: radial-gradient(ellipse at 80% 20%, rgba(91,69,224,0.16), transparent 58%);
              pointer-events: none;
            }
            .de-desk-hero-txt { flex: 1; min-width: 0; position: relative; z-index: 1; }
            .de-desk-hero-ring {
              width: 38px; height: 38px; border-radius: 50%;
              border: 1.5px solid var(--desk-pink);
              display: flex; align-items: center; justify-content: center;
              color: var(--desk-pink);
              margin-bottom: 10px;
              background: rgba(211,18,106,0.10);
            }
            .de-desk-hero-ring svg { width: 17px; height: 17px; }
            .de-desk-hero h3 {
              font-family: "Space Grotesk", sans-serif;
              font-size: 18px; font-weight: 700; color: var(--desk-ink);
              letter-spacing: -0.01em;
            }
            .de-desk-hero p {
              font-size: 14px; color: var(--desk-ink-muted); margin-top: 5px;
              line-height: 1.5; max-width: 210px;
            }
            .de-desk-hero-art { width: 86px; height: 86px; flex: none; position: relative; z-index: 1; }
            .de-desk-rows { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
            .de-desk-rows.is-grid {
              display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
            }
            .de-desk-rows > .de-desk-rows.is-grid { margin-top: 0; }
            .de-desk-row {
              display: flex; align-items: center; gap: 10px;
              min-height: 44px;
              padding: 11px 12px; border-radius: 12px;
              background: var(--desk-box);
              border: 1px solid var(--desk-border);
              color: var(--desk-ink); text-align: left; width: 100%;
              transition: background 0.16s ease, border-color 0.16s ease;
            }
            .de-desk-row:hover {
              background: #1b181e;
              border-color: var(--desk-border-strong);
            }
            .de-desk-row.is-selected {
              border-color: #D3126A;
              background: var(--desk-box);
              box-shadow: inset 0 0 0 1px rgba(211,18,106,0.28);
            }
            .de-desk-row.is-selected .de-desk-row-chev { color: #D3126A; }
            .de-desk-row.is-incident {
              background: var(--desk-box);
              border-color: rgba(211,18,106,0.42);
              box-shadow: inset 3px 0 0 #D3126A;
              align-items: flex-start;
            }
            .de-desk-row.is-incident .de-desk-row-ic {
              border-color: #D3126A;
              color: #D3126A;
              background: rgba(211,18,106,0.12);
            }
            .de-desk-row.is-incident .de-desk-row-t {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              gap: 6px 0;
            }
            .de-desk-row.is-incident:hover {
              background: #1b181e;
              border-color: #D3126A;
            }
            .de-desk-badge-urgent {
              display: inline-block;
              font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em;
              text-transform: uppercase;
              color: #fff; background: #D3126A;
              border-radius: 5px; padding: 2px 6px;
              vertical-align: middle; margin-left: 8px;
            }
            .de-desk-tool-block { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
            .de-desk-sublink {
              align-self: flex-start;
              margin: 0 0 2px 42px;
              padding: 2px 0 4px;
              font-size: 12.5px; font-weight: 600;
              color: #D3126A; text-decoration: none;
            }
            .de-desk-sublink:hover,
            .de-desk-sublink:focus-visible { text-decoration: underline; }
            .de-desk-rows.is-grid .de-desk-row { padding: 9px 10px; align-items: flex-start; }
            .de-desk-rows.is-grid .de-desk-row-t { font-size: 13.5px; line-height: 1.3; }
            .de-desk-rows.is-grid .de-desk-tool-block .de-desk-row-actions { display: none; }
            .de-desk-row[data-tone="violet"] { --c: var(--desk-violet); }
            .de-desk-row[data-tone="blue"] { --c: var(--desk-blue); }
            .de-desk-row[data-tone="teal"] { --c: var(--desk-teal); }
            .de-desk-row[data-tone="red"] { --c: var(--desk-red); }
            .de-desk-row[data-tone="pink"] { --c: var(--desk-pink); }
            .de-desk-row-ic {
              width: 32px; height: 32px; border-radius: 10px;
              background: var(--desk-inset);
              border: 1.5px solid var(--c, var(--desk-pink));
              color: var(--c, var(--desk-pink));
              display: flex; align-items: center; justify-content: center;
              flex: none; position: relative; overflow: hidden;
            }
            .de-desk-row-ic::after {
              content: ""; position: absolute; inset: 0;
              background: linear-gradient(180deg, rgba(255,255,255,0.10), transparent 55%);
            }
            .de-desk-row-ic svg { width: 15px; height: 15px; position: relative; z-index: 1; }
            .de-desk-row.is-lg .de-desk-row-ic { width: 46px; height: 46px; border-radius: 13px; }
            .de-desk-row.is-lg .de-desk-row-ic svg { width: 20px; height: 20px; }
            .de-desk-row-body { flex: 1; min-width: 0; }
            .de-desk-row-t { font-size: 14.5px; font-weight: 600; color: var(--desk-ink); }
            .de-desk-row.is-lg .de-desk-row-t { font-size: 13.5px; }
            .de-desk-row-d { display: block; font-size: 13px; color: var(--desk-ink-muted); margin-top: 2px; line-height: 1.4; }
            .de-desk-badge-rec {
              display: inline-block;
              font-size: 9.5px; font-weight: 700; letter-spacing: 0.03em;
              color: var(--desk-pink);
              background: rgba(211,18,106,0.16);
              border: 1px solid rgba(211,18,106,0.4);
              border-radius: 5px; padding: 2px 6px;
              vertical-align: middle; margin-left: 6px;
              text-transform: uppercase;
            }
            .de-desk-row-chev { width: 14px; height: 14px; color: var(--desk-ink-dim); flex: none; }
            .de-desk-row-actions { display: flex; align-items: center; gap: 6px; flex: none; }
            .de-desk-row-ext {
              width: 27px; height: 27px; border-radius: 8px;
              border: 1px solid var(--desk-border-strong);
              display: flex; align-items: center; justify-content: center;
              color: var(--desk-ink-muted);
            }
            .de-desk-row-ext svg { width: 12px; height: 12px; }
            .de-desk-row:hover .de-desk-row-ext { border-color: var(--c, var(--desk-pink)); color: var(--c, var(--desk-pink)); }
            .de-desk-row.is-highlight {
              background: var(--desk-box);
              border-color: rgba(211,18,106,0.45);
              box-shadow: inset 0 0 0 1px rgba(211,18,106,0.12);
            }
            .de-desk-row.is-alert {
              background: var(--desk-box);
              border-color: rgba(240,69,91,0.45);
              align-items: flex-start;
            }
            .de-desk-row.is-alert .de-desk-row-body { padding-top: 2px; }
            .de-desk-btn-mini {
              background: var(--desk-cta); color: #fff; border: none;
              font-weight: 600; font-size: 12px; padding: 9px 14px;
              border-radius: 9px; flex: none; white-space: nowrap;
              align-self: center;
            }
            .de-desk-section-head {
              display: flex; align-items: center; justify-content: space-between;
              margin: 20px 0 2px;
            }
            .de-desk-section-head h4 {
              font-family: "Space Grotesk", sans-serif;
              font-size: 14.5px; font-weight: 600; color: var(--desk-shell-text);
            }
            .de-desk-section-head a { font-size: 12px; color: var(--desk-pink); font-weight: 600; }
            .de-desk-details-head {
              display: flex; align-items: center; justify-content: space-between;
              margin: 12px 0 8px;
            }
            .de-desk-details-head h4 {
              font-family: "Space Grotesk", sans-serif;
              font-size: 13px; font-weight: 700;
              letter-spacing: 0.06em; text-transform: uppercase;
              color: var(--desk-shell-muted);
            }
            .de-desk-secure {
              display: flex; align-items: center; gap: 5px;
              border: 1px solid rgba(34,197,94,0.45); color: #86efac;
              border-radius: 999px; padding: 3px 9px;
              font-size: 12px; font-weight: 600;
              background: rgba(34,197,94,0.10);
            }
            .de-desk-secure svg { width: 10px; height: 10px; }
            .de-desk-form { display: flex; flex-direction: column; gap: 12px; }
            .de-desk-ticket-lead h3 {
              font-family: "Space Grotesk", sans-serif;
              font-size: 20px; font-weight: 700; color: #fff;
            }
            .de-desk-ticket-lead p {
              margin-top: 6px; font-size: 14px; line-height: 1.45; color: rgba(247,245,242,0.68);
            }
            .de-desk-route-note {
              font-size: 13px; font-weight: 600; color: #F0B4CC;
            }
            .de-desk-msg { display: flex; gap: 10px; align-items: flex-start; }
            .de-desk-msg.is-user { justify-content: flex-end; }
            .de-desk-msg-id {
              position: relative;
              width: 32px; height: 32px; border-radius: 50%;
              background: #151217; color: #fff;
              display: flex; align-items: center; justify-content: center;
              font-size: 9px; font-weight: 700; flex: none;
            }
            .de-desk-msg-id .de-desk-avatar-dot { border-color: #f7f5f2; }
            .de-desk-msg-col { min-width: 0; flex: 1; }
            .de-desk-msg.is-user .de-desk-msg-col { flex: 0 1 auto; }
            .de-desk-msg-who {
              display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px;
            }
            .de-desk-msg-who strong { font-size: 13px; font-weight: 700; color: #17141f; }
            .de-desk-msg-who em { font-style: normal; font-size: 12px; font-weight: 600; color: #15803d; }
            .de-desk-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
            .de-desk-chip {
              border: 1px solid rgba(20,16,30,0.12);
              background: #fff; color: #17141f;
              border-radius: 999px;
              padding: 8px 12px;
              font-size: 13px; font-weight: 600;
            }
            .de-desk-chip:hover { border-color: #D3126A; }
            .de-desk-urgency-label {
              display: block; font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 6px;
            }
            .de-desk-urgency {
              display: grid; grid-template-columns: repeat(4, 1fr);
              gap: 4px; padding: 4px;
              border-radius: 999px;
              background: #12141c;
              border: 1px solid rgba(255,255,255,0.12);
            }
            .de-desk-urgency button {
              min-height: 40px; border: 0; border-radius: 999px;
              background: transparent; color: #fff;
              font-size: 13px; font-weight: 600;
            }
            .de-desk-urgency button.is-on { background: #fff; color: #111; }
            .de-desk-more-toggle {
              align-self: flex-start;
              background: none; border: 0; padding: 8px 0;
              color: #D3126A; font-size: 13px; font-weight: 600;
            }
            .de-desk-more { display: flex; flex-direction: column; gap: 12px; }
            .de-desk-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .de-desk-field label {
              display: block; font-size: 13px; font-weight: 600;
              color: #fff; margin-bottom: 6px;
            }
            .de-desk-input-wrap { position: relative; }
            .de-desk-input-wrap > svg {
              position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
              width: 13px; height: 13px; color: var(--desk-ink-dim); pointer-events: none;
            }
            .de-desk-shell .de-desk-input {
              width: 100%;
              min-height: 44px;
              height: 44px;
              background: #fcfaf7 !important;
              border: 0 !important;
              color: #17141f !important;
              border-radius: 14px;
              padding: 10px 14px 10px 32px;
              font-size: 14px;
              box-shadow: none !important;
            }
            .de-desk-shell .de-desk-input.is-bare { padding-left: 14px; }
            .de-desk-shell .de-desk-input::placeholder { color: var(--desk-ink-dim); }
            .de-desk-shell .de-desk-select { appearance: none; padding-right: 28px; }
            .de-desk-select-chev {
              position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
              width: 12px; height: 12px; color: var(--desk-ink-dim); pointer-events: none;
            }
            .de-desk-ta-wrap { position: relative; }
            .de-desk-shell .de-desk-ta {
              min-height: 80px; height: auto; padding-left: 11px; resize: vertical;
              line-height: 1.5;
            }
            .de-desk-counter {
              position: absolute; right: 10px; bottom: 8px;
              font-size: 10px; color: var(--desk-ink-dim); pointer-events: none;
            }
            .de-desk-attach {
              display: flex; align-items: flex-start; gap: 9px;
              width: 100%; text-align: left;
              margin-top: 2px; padding: 12px;
              border: 1px dashed var(--desk-border-strong);
              border-radius: 11px; background: var(--desk-inset);
            }
            .de-desk-attach:hover { border-color: var(--desk-pink); }
            .de-desk-attach svg { width: 14px; height: 14px; color: var(--desk-ink-dim); flex: none; margin-top: 2px; }
            .de-desk-attach-t { display: block; font-size: 14px; font-weight: 600; color: var(--desk-ink); }
            .de-desk-attach-h { display: block; font-size: 12.5px; color: var(--desk-ink-muted); margin-top: 1px; }
            .de-desk-caption {
              display: flex; align-items: center; gap: 6px;
              font-size: 13px; color: var(--desk-shell-muted);
            }
            .de-desk-caption svg { width: 11px; height: 11px; }
            .de-desk-btn-grad {
              width: 100%; margin-top: 4px;
              min-height: 44px;
              background: var(--desk-cta); border: none; color: #fff;
              font-weight: 600; font-size: 14px; padding: 12px;
              border-radius: 11px;
              display: flex; align-items: center; justify-content: center; gap: 8px;
            }
            .de-desk-btn-grad:hover { filter: brightness(1.08); }
            .de-desk-btn-grad:disabled { opacity: 0.6; }
            .de-desk-btn-grad svg { width: 14px; height: 14px; }
            .de-desk-bubble {
              max-width: 90%;
              padding: 11px 14px;
              font-size: 13.5px; line-height: 1.5;
              border-radius: 14px;
            }
            .de-desk-bubble.is-user {
              background: var(--desk-pink); color: #fff;
              border-bottom-right-radius: 6px;
            }
            .de-desk-bubble.is-bot, .de-desk-bubble.is-agent {
              background: #151217; color: #f7f5f2;
              border: 0;
              border-bottom-left-radius: 6px;
            }
            .de-desk-bubble-meta {
              display: flex; align-items: center; gap: 8px;
              margin-bottom: 6px;
              font-size: 10px; font-weight: 600;
              letter-spacing: 0.14em; text-transform: uppercase;
              color: var(--desk-pink);
            }
            .de-desk-bubble-meta span {
              width: 16px; height: 16px; border-radius: 4px;
              background: var(--desk-pink); color: #fff;
              display: inline-flex; align-items: center; justify-content: center;
              font-size: 8px; letter-spacing: 0;
            }
            .de-desk-success { flex-direction: column; align-items: flex-start; }
            .de-desk-success p { max-width: none; }
            .de-desk-ticket-ref {
              font-family: ui-monospace, monospace;
              font-size: 13px; font-weight: 600; color: var(--desk-pink);
              margin-top: 8px;
            }
            .de-desk-success-actions { display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 14px; }
            .de-desk-heads-up {
              position: absolute;
              left: 10px; right: 10px; bottom: 10px;
              z-index: 6;
              display: flex; align-items: stretch; gap: 4px;
              padding: 8px 8px 8px 8px;
              border-radius: 14px;
              background: var(--desk-box);
              border: 1px solid rgba(211,18,106,0.42);
              box-shadow: 0 16px 36px rgba(0,0,0,0.45);
              animation: de-desk-heads-in 0.28s ease-out;
            }
            .de-desk-heads-up.is-out { border-color: rgba(255,255,255,0.16); }
            .de-desk-heads-up.is-live { border-color: #3b9eff; }
            .de-desk-heads-up-main {
              flex: 1; min-width: 0;
              display: flex; align-items: flex-start; gap: 10px;
              text-align: left; background: none; border: none; color: inherit;
              padding: 2px 4px;
            }
            .de-desk-heads-up-mark {
              width: 28px; height: 28px; border-radius: 9px; flex: none;
              display: inline-flex; align-items: center; justify-content: center;
              background: var(--desk-pink); color: #fff;
              font-size: 9px; font-weight: 700; letter-spacing: 0.04em;
            }
            .de-desk-heads-up.is-out .de-desk-heads-up-mark { background: #3a3644; }
            .de-desk-heads-up.is-live .de-desk-heads-up-mark { background: #3b9eff; }
            .de-desk-heads-up-copy { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
            .de-desk-heads-up-top {
              display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
            }
            .de-desk-heads-up-top strong {
              font-size: 13.5px; font-weight: 700; color: var(--desk-ink);
            }
            .de-desk-heads-up-top em {
              font-style: normal; font-size: 11px; color: var(--desk-ink-dim); flex: none;
            }
            .de-desk-heads-up-preview {
              font-size: 13.5px; line-height: 1.35; color: var(--desk-ink-muted);
              display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
            }
            .de-desk-heads-up-hint {
              font-size: 10.5px; font-weight: 600; color: var(--desk-pink); margin-top: 2px;
            }
            .de-desk-heads-up-x {
              width: 28px; height: 28px; border-radius: 8px; flex: none; align-self: flex-start;
              border: none; background: transparent; color: var(--desk-ink-dim);
              display: flex; align-items: center; justify-content: center;
            }
            .de-desk-heads-up-x:hover { color: var(--desk-ink); background: rgba(255,255,255,0.08); }
            @keyframes de-desk-heads-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @media (prefers-reduced-motion: reduce) {
              .de-desk-heads-up { animation: none; }
            }
            .de-desk-composer {
              position: relative;
              z-index: 1;
              display: flex; gap: 8px;
              margin: 0 10px;
              padding: 8px 16px 8px;
              border-top: 1px solid rgba(20,16,30,0.08);
              background: var(--desk-paper);
              color: #17141f;
              flex-shrink: 0;
            }
            .de-desk-composer.is-live input {
              border-color: rgba(211,18,106,0.55);
              box-shadow: 0 0 0 3px rgba(211,18,106,0.14);
            }
            .de-desk-composer input {
              flex: 1;
              min-height: 48px;
              background: #ece8e3;
              border: 0;
              border-radius: 12px;
              padding: 11px 13px;
              color: #17141f; font-size: 14px;
            }
            .de-desk-shell input:-webkit-autofill,
            .de-desk-shell textarea:-webkit-autofill {
              -webkit-box-shadow: 0 0 0 1000px var(--desk-inset) inset;
              -webkit-text-fill-color: var(--desk-ink);
              caret-color: var(--desk-ink);
            }
            .de-desk-composer input::placeholder { color: var(--desk-ink-dim); }
            .de-desk-composer input:focus {
              outline: none;
              border-color: var(--desk-pink);
              box-shadow: 0 0 0 3px rgba(211,18,106,0.12);
            }
            .de-desk-send {
              width: 44px; height: 44px; border-radius: 11px;
              background: var(--desk-cta); border: none;
              display: flex; align-items: center; justify-content: center;
              flex: none;
            }
            .de-desk-send:disabled { opacity: 0.5; }
            .de-desk-send svg { width: 16px; height: 16px; color: #fff; }
            .de-desk-composer-caption {
              position: relative;
              z-index: 1;
              display: flex; align-items: center; gap: 6px;
              margin: 0 10px 10px;
              padding: 0 16px 12px;
              border-radius: 0 0 18px 18px;
              background: var(--desk-paper);
              font-size: 12.5px; color: #5c5668;
              flex-shrink: 0;
            }
            .de-desk-composer-caption svg { width: 11px; height: 11px; color: #5c5668; }
            .de-desk-shell[data-tab="ticket"] .de-desk-body,
            .de-desk-shell[data-tab="resources"] .de-desk-body {
              margin-bottom: 10px;
              border-radius: 18px;
              padding-bottom: 16px;
            }
            .de-desk-shell[data-tab="resources"] .de-desk-row,
            .de-desk-shell[data-tab="ticket"] .de-desk-row {
              background: #151217;
              color: #f7f5f2;
            }
            .de-desk-shell[data-tab="resources"] .de-desk-row-t,
            .de-desk-shell[data-tab="ticket"] .de-desk-row-t { color: #f7f5f2; }
            .de-desk-shell[data-tab="resources"] .de-desk-row-d { color: rgba(247,245,242,0.62); }
            .de-desk-shell[data-tab="ticket"] .de-desk-heads-up-top strong,
            .de-desk-shell[data-tab="resources"] .de-desk-heads-up-top strong { color: #f7f5f2; }
            .de-desk-foot {
              display: flex; align-items: center; justify-content: space-between;
              padding: 11px 17px;
              border-top: 1px solid var(--desk-shell-border);
              background: var(--desk-shell);
              color: var(--desk-ink-muted);
              flex-shrink: 0;
            }
            .de-desk-foot-nav {
              font-size: 13px; color: var(--desk-ink-muted);
              display: flex; align-items: center; gap: 5px; min-width: 0;
            }
            .de-desk-foot-nav button,
            .de-desk-foot-assist {
              background: none; border: none; padding: 8px 2px;
              min-height: 44px;
              font: inherit; color: inherit; cursor: pointer;
            }
            .de-desk-foot-nav button:hover,
            .de-desk-foot-assist:hover { color: var(--desk-ink); }
            .de-desk-foot-nav .is-active { color: var(--desk-pink); font-weight: 600; }
            .de-desk-foot-assist { text-decoration: underline; text-underline-offset: 2px; }
            .de-desk-foot-cta {
              font-size: 13px; color: var(--desk-pink); font-weight: 600;
              display: flex; align-items: center; gap: 4px; flex: none;
            }
            .de-desk-foot-cta svg { width: 11px; height: 11px; }
            .de-desk-resize-edge {
              position: absolute;
              border: 0;
              padding: 0;
              background: transparent;
              touch-action: none;
              z-index: 4;
            }
            .de-desk-resize-n { top: 0; left: 14px; right: 14px; height: 10px; cursor: ns-resize; }
            .de-desk-resize-s { bottom: 0; left: 14px; right: 14px; height: 10px; cursor: ns-resize; }
            .de-desk-resize-e { right: 0; top: 14px; bottom: 14px; width: 10px; cursor: ew-resize; }
            .de-desk-resize-w { left: 0; top: 14px; bottom: 14px; width: 10px; cursor: ew-resize; }
            .de-desk-resize-nw { top: 0; left: 0; width: 16px; height: 16px; cursor: nwse-resize; }
            .de-desk-resize-ne { top: 0; right: 0; width: 16px; height: 16px; cursor: nesw-resize; }
            .de-desk-resize-sw { bottom: 0; left: 0; width: 16px; height: 16px; cursor: nesw-resize; }
            .de-desk-resize {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 44px;
              height: 44px;
              border: 0;
              background: transparent;
              cursor: nwse-resize;
              touch-action: none;
              z-index: 5;
            }
            .de-desk-resize span {
              position: absolute;
              right: 8px;
              bottom: 8px;
              width: 14px;
              height: 14px;
              background:
                linear-gradient(135deg, transparent 46%, rgba(247,245,242,0.42) 46%, rgba(247,245,242,0.42) 54%, transparent 54%),
                linear-gradient(135deg, transparent 66%, rgba(247,245,242,0.42) 66%, rgba(247,245,242,0.42) 74%, transparent 74%),
                linear-gradient(135deg, transparent 86%, rgba(247,245,242,0.42) 86%, rgba(247,245,242,0.42) 94%, transparent 94%);
            }
            .de-desk-resize:hover span,
            .de-desk-resize.is-active span,
            .de-desk-resize:focus-visible span {
              background:
                linear-gradient(135deg, transparent 46%, #d3126a 46%, #d3126a 54%, transparent 54%),
                linear-gradient(135deg, transparent 66%, #d3126a 66%, #d3126a 74%, transparent 74%),
                linear-gradient(135deg, transparent 86%, #d3126a 86%, #d3126a 94%, transparent 94%);
            }
            .de-desk-resize:focus-visible {
              outline: 2px solid #d3126a;
              outline-offset: -4px;
              border-radius: 10px;
            }
            @media (min-width: 640px) {
              .de-desk-foot { padding-right: 36px; }
            }
            @media (max-width: 480px) {
              .de-desk-foot-cta { display: none; }
            }
            @media (max-width: 420px) {
              .de-desk-grid2 { grid-template-columns: 1fr; }
              .de-desk-hero-art { display: none; }
              .de-desk-tab { font-size: 14px; }
              .de-desk-hero h3 { font-size: 17px; }
            }
          `,
        }}
      />
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
    </>
  );
};
