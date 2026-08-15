import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  AppWindow,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  FileText,
  Flag,
  Headset,
  KeyRound,
  LifeBuoy,
  Lock,
  Mail,
  Monitor,
  MessageCircle,
  Paperclip,
  Scale,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Tag,
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
  tone: "violet" | "blue" | "teal" | "red";
}> = [
  { label: "We need stronger cybersecurity", icon: Shield, tone: "violet" },
  { label: "Compare managed IT options", icon: Scale, tone: "blue" },
  { label: "Microsoft 365 feels messy", icon: Monitor, tone: "teal" },
  { label: "Possible security incident", icon: AlertTriangle, tone: "red" },
];

function DeskHeroArt({ variant }: { variant: "desk" | "ticket" | "resources" }) {
  if (variant === "ticket") {
    return (
      <svg className="de-desk-hero-art" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="deDeskTicketCard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2B2735" />
            <stop offset="1" stopColor="#18151F" />
          </linearGradient>
          <linearGradient id="deDeskTicketShield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3A2E44" />
            <stop offset="1" stopColor="#1C1722" />
          </linearGradient>
        </defs>
        <g transform="rotate(-7 45 55)">
          <rect x="14" y="18" width="66" height="80" rx="12" fill="url(#deDeskTicketCard)" stroke="rgba(255,255,255,0.08)" />
          <rect x="34" y="10" width="26" height="12" rx="5" fill="#332C3D" stroke="rgba(255,255,255,0.1)" />
          <rect x="26" y="40" width="40" height="5" rx="2.5" fill="#D3126A" />
          <rect x="26" y="52" width="34" height="5" rx="2.5" fill="#8B5CF6" />
          <rect x="26" y="64" width="24" height="5" rx="2.5" fill="#413B4C" />
          <circle cx="40" cy="84" r="11" fill="rgba(211,18,106,0.14)" stroke="#D3126A" strokeWidth="1.5" />
          <path d="M35 84l3.5 3.5L46 80" stroke="#D3126A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g transform="rotate(10 90 90)">
          <path d="M90 62c12 0 20 6 20 6v18c0 14-9 22-20 26-11-4-20-12-20-26V68s8-6 20-6z" fill="url(#deDeskTicketShield)" stroke="#D3126A" strokeWidth="1.5" />
          <rect x="82" y="88" width="16" height="12" rx="3" fill="none" stroke="#8B5CF6" strokeWidth="1.6" />
          <path d="M85 88v-5a5 5 0 0 1 10 0v5" fill="none" stroke="#8B5CF6" strokeWidth="1.6" />
        </g>
      </svg>
    );
  }
  if (variant === "resources") {
    return (
      <svg className="de-desk-hero-art" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="deDeskResBook" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2B2735" />
            <stop offset="1" stopColor="#18151F" />
          </linearGradient>
        </defs>
        <g transform="rotate(-6 50 55)">
          <rect x="18" y="22" width="60" height="70" rx="8" fill="#100E16" />
          <rect x="22" y="18" width="60" height="70" rx="8" fill="url(#deDeskResBook)" stroke="rgba(255,255,255,0.08)" />
          <rect x="30" y="30" width="30" height="4" rx="2" fill="#8B5CF6" />
          <rect x="30" y="40" width="24" height="4" rx="2" fill="#3A3444" />
          <rect x="30" y="50" width="26" height="4" rx="2" fill="#3A3444" />
          <path d="M64 14v14l-6-4-6 4V14z" fill="#D3126A" />
        </g>
        <g transform="rotate(8 92 92)">
          <circle cx="88" cy="82" r="16" fill="rgba(139,92,246,0.10)" stroke="#8B5CF6" strokeWidth="2.5" />
          <line x1="99" y1="93" x2="112" y2="106" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    );
  }
  return (
    <svg className="de-desk-hero-art" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="deDeskChatBubble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B2735" />
          <stop offset="1" stopColor="#18151F" />
        </linearGradient>
        <linearGradient id="deDeskChatShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A2E44" />
          <stop offset="1" stopColor="#1C1722" />
        </linearGradient>
      </defs>
      <g transform="rotate(-6 42 50)">
        <path d="M16 24h56a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8H44l-14 12v-12h-14a8 8 0 0 1-8-8V32a8 8 0 0 1 8-8z" fill="url(#deDeskChatBubble)" stroke="rgba(255,255,255,0.08)" />
        <circle cx="34" cy="50" r="3.4" fill="#D3126A" />
        <circle cx="46" cy="50" r="3.4" fill="#8B5CF6" />
        <circle cx="58" cy="50" r="3.4" fill="#413B4C" />
      </g>
      <g transform="rotate(10 90 90)">
        <path d="M90 62c12 0 20 6 20 6v18c0 14-9 22-20 26-11-4-20-12-20-26V68s8-6 20-6z" fill="url(#deDeskChatShield)" stroke="#D3126A" strokeWidth="1.5" />
        <path d="M82 90l5 5 11-11" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function BookMagnifier({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className ?? "h-5 w-5"}`} aria-hidden="true">
      <BookOpen className="h-full w-full" />
      <Search className="absolute -bottom-[12%] -right-[14%] h-[58%] w-[58%]" strokeWidth={2.75} />
    </span>
  );
}

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

const TICKET_QUICK_CHIPS: Array<{
  label: string;
  icon: typeof Shield;
  category: (typeof TICKET_CATEGORIES)[number];
  tone: "red" | "blue" | "violet";
}> = [
  { label: "Something broke", icon: AlertTriangle, category: "Hardware & Devices", tone: "red" },
  { label: "Microsoft 365 help", icon: AppWindow, category: "Collaboration", tone: "blue" },
  { label: "Access or login issue", icon: KeyRound, category: "Access & Security", tone: "violet" },
  { label: "Possible security incident", icon: Shield, category: "Access & Security", tone: "red" },
];

const RESOURCE_LINKS: Array<{
  title: string;
  description: string;
  href: string;
  icon: typeof BookOpen | typeof BookMagnifier;
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
    accent: "text-[#e9d5ff]",
    iconBg:
      "bg-gradient-to-br from-[#a855f7]/45 to-[#7c3aed]/30 ring-[#c084fc]/55 shadow-[0_0_20px_rgba(168,85,247,0.35)]",
  },
  {
    title: "Remote support guide",
    description: "How remote sessions work and what to expect",
    href: "/support/remote-support",
    icon: LifeBuoy,
    tags: ["Support process", "Quick guide"],
    cta: "View guide",
    accent: "text-[#bae6fd]",
    iconBg:
      "bg-gradient-to-br from-[#38bdf8]/40 to-[#0284c7]/25 ring-[#7dd3fc]/50 shadow-[0_0_20px_rgba(56,189,248,0.3)]",
  },
  {
    title: "Knowledge base",
    description: "Setup guides, troubleshooting, and security help",
    href: "/support/knowledge-base",
    icon: BookMagnifier,
    tags: ["Guides", "Troubleshooting"],
    cta: "Browse articles",
    accent: "text-[#bbf7d0]",
    iconBg:
      "bg-gradient-to-br from-[#4ade80]/40 to-[#16a34a]/25 ring-[#86efac]/50 shadow-[0_0_20px_rgba(74,222,128,0.28)]",
  },
  {
    title: "Client portal",
    description: "Tickets, services, billing, approvals, and account tools",
    href: PORTAL_LOGIN,
    icon: ShieldCheck,
    tags: ["Account access", "Self-service"],
    cta: "Open portal",
    accent: "text-[#fed7aa]",
    iconBg:
      "bg-gradient-to-br from-[#fb923c]/45 to-[#ea580c]/25 ring-[#fdba74]/55 shadow-[0_0_20px_rgba(251,146,60,0.3)]",
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
      setFullName("");
      setEmail("");
      setCompany("");
      setSubject("");
      setMessage("");
      setPriority("Medium");
      setCategory("");
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
    ? deskDrag.pos
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
                aria-label={canDrag ? "Move DE Desk window" : undefined}
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
                      : "Answers · Tickets · Assist"}
                  </p>
                </div>
              </div>
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
                    className={`de-desk-tab${isActive ? " is-active" : ""}`}
                    data-testid={`button-tab-${id}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon aria-hidden="true" />
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className="de-desk-status">
              <div className="de-desk-status-l">
                <span
                  className={`de-desk-status-dot${
                    agentLive
                      ? " is-live"
                      : assistantAvailable === false
                        ? " is-wait"
                        : assistantAvailable === true
                          ? " is-on"
                          : ""
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
                onClick={() => setActiveTab(activeTab === "ticket" ? "chat" : "ticket")}
                className="de-desk-status-r"
              >
                Need help now?
                <span className="de-desk-status-ic">
                  <Headset aria-hidden="true" />
                </span>
              </button>
            </div>

            <div className="de-desk-body">
              {activeTab === "chat" && (
                <div className="de-desk-panel" data-testid="panel-support-chat">
                  <div className="de-desk-scroll" aria-live="polite">
                    {chatMessages.length === 1 ? (
                      <>
                        <div className="de-desk-hero">
                          <div className="de-desk-hero-dots" aria-hidden="true" />
                          <div className="de-desk-hero-txt">
                            <div className="de-desk-hero-ring">
                              <MessageCircle aria-hidden="true" />
                            </div>
                            <h3>Talk to DE Desk</h3>
                            <p>
                              Tell me what broke, what you&apos;re evaluating, or what you&apos;re trying to
                              protect — I&apos;ll give you a clear read and the sensible next step.
                            </p>
                          </div>
                          <DeskHeroArt variant="desk" />
                        </div>
                        <div className="de-desk-rows">
                          {QUICK_CHAT_PROMPTS.map(({ label, icon: Icon, tone }) => (
                            <button
                              key={label}
                              type="button"
                              data-tone={tone}
                              onClick={() => void handleSendChat(label)}
                              className="de-desk-row"
                            >
                              <span className="de-desk-row-ic">
                                <Icon aria-hidden="true" />
                              </span>
                              <span className="de-desk-row-t">{label}</span>
                              <ChevronRight className="de-desk-row-chev" aria-hidden="true" />
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      chatMessages.map((chatMessage) => {
                        const isUser = chatMessage.role === "user";
                        const isAgent = chatMessage.role === "agent";
                        return (
                          <div
                            key={chatMessage.id}
                            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`de-desk-bubble ${
                                isUser ? "is-user" : isAgent ? "is-agent" : "is-bot"
                              }`}
                            >
                              {!isUser && (
                                <div className="de-desk-bubble-meta">
                                  <span>{isAgent ? "AG" : "DE"}</span>
                                  {isAgent ? chatMessage.senderName || agentName || "Agent" : "Desk"}
                                </div>
                              )}
                              <p className="whitespace-pre-wrap">{chatMessage.content}</p>
                            </div>
                          </div>
                        );
                      })
                    )}

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
                              setActiveTab("chat");
                            }}
                            className="de-desk-row"
                          >
                            <span className="de-desk-row-t">Back to desk</span>
                          </button>
                          <button type="button" onClick={() => setTicketResult(null)} className="de-desk-btn-grad">
                            Create another ticket
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="de-desk-hero">
                          <div className="de-desk-hero-dots" aria-hidden="true" />
                          <div className="de-desk-hero-txt">
                            <div className="de-desk-hero-ring">
                              <FileText aria-hidden="true" />
                            </div>
                            <h3>Create a support ticket</h3>
                            <p>Tell us what happened and we&apos;ll route it to the right team.</p>
                          </div>
                          <DeskHeroArt variant="ticket" />
                        </div>

                        <div className="de-desk-rows">
                          {TICKET_QUICK_CHIPS.map(({ label, icon: Icon, category: chipCategory, tone }) => (
                            <button
                              key={label}
                              type="button"
                              data-tone={tone}
                              onClick={() => {
                                setSubject(label);
                                setCategory(chipCategory);
                              }}
                              className="de-desk-row"
                            >
                              <span className="de-desk-row-ic">
                                <Icon aria-hidden="true" />
                              </span>
                              <span className="de-desk-row-t">{label}</span>
                              <ChevronRight className="de-desk-row-chev" aria-hidden="true" />
                            </button>
                          ))}
                        </div>

                        <div className="de-desk-details-head">
                          <h4>Tell us the details</h4>
                          <span className="de-desk-secure">
                            <Lock aria-hidden="true" />
                            Secure &amp; private
                          </span>
                        </div>

                          <div className="de-desk-form">
                            <div className="de-desk-grid2">
                              <div className="de-desk-field">
                                <label htmlFor="support-name">Full name</label>
                                <div className="de-desk-input-wrap">
                                  <User aria-hidden="true" />
                                  <Input
                                    id="support-name"
                                    autoComplete="name"
                                    placeholder="Jane Smith"
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
                            </div>

                            <div className="de-desk-grid2">
                              <div className="de-desk-field">
                                <label htmlFor="support-company">Company</label>
                                <div className="de-desk-input-wrap">
                                  <Building2 aria-hidden="true" />
                                  <Input
                                    id="support-company"
                                    autoComplete="organization"
                                    placeholder="Company name"
                                    value={company}
                                    onChange={(event) => setCompany(event.target.value)}
                                    data-testid="input-support-company"
                                    className="de-desk-input"
                                  />
                                </div>
                              </div>
                              <div className="de-desk-field">
                                <label htmlFor="support-priority">Priority</label>
                                <div className="de-desk-input-wrap">
                                  <Flag aria-hidden="true" />
                                  <select
                                    id="support-priority"
                                    value={priority}
                                    onChange={(event) =>
                                      setPriority(event.target.value as "Low" | "Medium" | "High" | "Urgent")
                                    }
                                    className="de-desk-input de-desk-select"
                                    data-testid="select-support-priority"
                                  >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                  </select>
                                  <ChevronDown className="de-desk-select-chev" aria-hidden="true" />
                                </div>
                              </div>
                            </div>

                            <div className="de-desk-grid2">
                              <div className="de-desk-field">
                                <label htmlFor="support-category">Category</label>
                                <div className="de-desk-input-wrap">
                                  <ClipboardList aria-hidden="true" />
                                  <select
                                    id="support-category"
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                    className="de-desk-input de-desk-select"
                                    data-testid="select-support-category"
                                  >
                                    <option value="">Select a category</option>
                                    {TICKET_CATEGORIES.map((item) => (
                                      <option key={item} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="de-desk-select-chev" aria-hidden="true" />
                                </div>
                              </div>
                              <div className="de-desk-field">
                                <label htmlFor="support-subject">Subject</label>
                                <div className="de-desk-input-wrap">
                                  <Tag aria-hidden="true" />
                                  <Input
                                    id="support-subject"
                                    maxLength={200}
                                    placeholder="Brief description"
                                    value={subject}
                                    onChange={(event) => setSubject(event.target.value)}
                                    data-testid="input-support-subject"
                                    className="de-desk-input"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="de-desk-field">
                              <label htmlFor="support-message">What&apos;s happening?</label>
                              <div className="de-desk-ta-wrap">
                                <Textarea
                                  id="support-message"
                                  maxLength={2000}
                                  placeholder="Describe the issue, affected device or service, and what you already tried. No passwords or MFA codes."
                                  value={message}
                                  onChange={(event) => setMessage(event.target.value)}
                                  rows={3}
                                  className="de-desk-input de-desk-ta"
                                  data-testid="input-support-message"
                                />
                                <span className="de-desk-counter">{message.length} / 2000</span>
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
                              <button type="button" onClick={() => ticketFileRef.current?.click()} className="de-desk-attach">
                                <Paperclip aria-hidden="true" />
                                <span>
                                  <span className="de-desk-attach-t">{attachmentName || "Attach file or screenshot"}</span>
                                  <span className="de-desk-attach-h">
                                    PNG, JPG, PDF up to 10MB. We&apos;ll collect the file after the ticket is opened.
                                  </span>
                                </span>
                              </button>
                            </div>

                            <p className="de-desk-caption">
                              <Lock aria-hidden="true" />
                              Never share passwords, MFA codes, or private keys.
                            </p>

                            <button
                              type="button"
                              onClick={() => void handleSubmitTicket()}
                              disabled={isTicketSending}
                              className="de-desk-btn-grad"
                              data-testid="button-submit-support"
                            >
                              {isTicketSending ? "Creating ticket…" : "Create ticket"}
                              {!isTicketSending && <Ticket aria-hidden="true" />}
                            </button>
                          </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div className="de-desk-panel" data-testid="panel-support-resources">
                  <div className="de-desk-scroll">
                    <div className="de-desk-hero">
                      <div className="de-desk-hero-dots" aria-hidden="true" />
                      <div className="de-desk-hero-txt">
                        <div className="de-desk-hero-ring">
                          <BookOpen aria-hidden="true" />
                        </div>
                        <h3>Get where you need to go</h3>
                        <p>Quick access to the most used support tools and resources.</p>
                      </div>
                      <DeskHeroArt variant="resources" />
                    </div>

                    <div className="de-desk-section-head">
                      <h4>Resources</h4>
                      <a href="/support/knowledge-base">Browse all →</a>
                    </div>

                    <div className="de-desk-rows">
                      {RESOURCE_LINKS.map(({ title, description, href, icon: Icon, external }, index) => (
                        <a
                          key={title}
                          href={href}
                          data-tone={index === 0 ? "pink" : "violet"}
                          {...(external || href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="de-desk-row is-lg"
                          data-testid={`resource-link-${title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <span className="de-desk-row-ic">
                            <Icon aria-hidden="true" />
                          </span>
                          <span className="de-desk-row-body">
                            <span className="de-desk-row-t">{title}</span>
                            <span className="de-desk-row-d">{description}</span>
                          </span>
                          <span className="de-desk-row-actions">
                            <span className="de-desk-row-ext">
                              <ExternalLink aria-hidden="true" />
                            </span>
                            <ChevronRight className="de-desk-row-chev" aria-hidden="true" />
                          </span>
                        </a>
                      ))}

                      <a
                        href="/book"
                        data-tone="pink"
                        className="de-desk-row is-lg is-highlight"
                        data-testid="resource-link-cyber-risk-assessment"
                      >
                        <span className="de-desk-row-ic">
                          <Shield aria-hidden="true" />
                        </span>
                        <span className="de-desk-row-body">
                          <span className="de-desk-row-t">Cyber Risk Assessment</span>
                          <span className="de-desk-row-d">Map your gaps and get a prioritized next step.</span>
                        </span>
                        <span className="de-desk-row-actions">
                          <span className="de-desk-row-ext">
                            <ExternalLink aria-hidden="true" />
                          </span>
                          <ChevronRight className="de-desk-row-chev" aria-hidden="true" />
                        </span>
                      </a>

                      <div className="de-desk-row is-alert" data-tone="red">
                        <span className="de-desk-row-ic">
                          <AlertTriangle aria-hidden="true" />
                        </span>
                        <span className="de-desk-row-body">
                          <span className="de-desk-row-t">Security-sensitive issue?</span>
                          <span className="de-desk-row-d">
                            Don&apos;t paste credentials into chat. Open a ticket and we&apos;ll move to a secure
                            channel.
                          </span>
                        </span>
                        <button type="button" onClick={() => setActiveTab("ticket")} className="de-desk-btn-mini">
                          Create ticket
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="de-desk-composer">
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    if (activeTab !== "chat") setActiveTab("chat");
                    void handleSendChat();
                  }
                }}
                maxLength={2000}
                placeholder={
                  agentLive
                    ? `Message ${agentName || "the specialist"}…`
                    : "Ask about risk, stack, pricing, or an outage..."
                }
                disabled={isChatSending}
                data-testid="input-support-chat"
                aria-label="Chat message"
              />
              <button
                type="button"
                onClick={() => {
                  if (activeTab !== "chat") setActiveTab("chat");
                  void handleSendChat();
                }}
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

            <footer className="de-desk-foot">
              <p className="de-desk-foot-nav">
                <span className={activeTab === "chat" ? "is-active" : undefined}>DE Desk</span>
                <span aria-hidden="true">·</span>
                <span className={activeTab === "ticket" ? "is-active" : undefined}>Ticket</span>
                <span aria-hidden="true">·</span>
                <span className={activeTab === "resources" ? "is-active" : undefined}>Resources</span>
                <span aria-hidden="true">·</span>
                Assist
              </p>
              <button type="button" onClick={() => setActiveTab("ticket")} className="de-desk-foot-cta">
                Create ticket
                <ExternalLink aria-hidden="true" />
              </button>
            </footer>
          </section>
        )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .de-desk-shell {
              --desk-shell: #ffffff;
              --desk-shell-soft: #f6f5fa;
              --desk-shell-border: rgba(20,16,30,0.08);
              --desk-shell-border-strong: rgba(20,16,30,0.14);
              --desk-shell-text: #17141f;
              --desk-shell-muted: #68637a;
              --desk-shell-dim: #726c82;
              --desk-box: #1a1820;
              --desk-inset: #0f0e14;
              --desk-border: rgba(255,255,255,0.07);
              --desk-border-strong: rgba(255,255,255,0.14);
              --desk-pink: #d3126a;
              --desk-violet: #8b5cf6;
              --desk-blue: #3b9eff;
              --desk-teal: #22d3ee;
              --desk-red: #f0455b;
              --desk-green: #22c55e;
              --desk-grad: linear-gradient(135deg, #d3126a, #8b5cf6);
              background: var(--desk-shell);
              border: 1px solid var(--desk-shell-border-strong);
              border-radius: 20px;
              box-shadow: 0 34px 90px -22px rgba(0,0,0,0.65), 0 0 0 1px rgba(20,16,30,0.04), 0 0 70px -16px rgba(211,18,106,0.20);
              color: var(--desk-shell-text);
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
              display: flex;
              align-items: center;
              gap: 11px;
              padding: 17px 17px 15px;
              border-bottom: 1px solid var(--desk-shell-border);
              flex-shrink: 0;
            }
            .de-desk-id { display: flex; align-items: center; gap: 11px; min-width: 0; flex: 1; }
            .de-desk-avatar {
              position: relative;
              width: 37px; height: 37px;
              border-radius: 11px;
              background: var(--desk-pink);
              color: #fff;
              display: flex; align-items: center; justify-content: center;
              flex: none;
              font-family: "Space Grotesk", sans-serif;
              font-weight: 700;
              font-size: 13px;
              box-shadow: 0 4px 14px -2px rgba(211,18,106,0.5);
            }
            .de-desk-avatar-dot {
              position: absolute; right: -2px; bottom: -2px;
              width: 9px; height: 9px; border-radius: 50%;
              background: var(--desk-green);
              border: 2px solid var(--desk-shell);
            }
            .de-desk-id h2 {
              font-family: "Space Grotesk", sans-serif;
              font-weight: 600;
              font-size: 14.5px;
              color: var(--desk-shell-text);
              line-height: 1.2;
            }
            .de-desk-id p { font-size: 11.5px; color: var(--desk-shell-muted); margin-top: 1px; }
            .de-desk-close {
              width: 30px; height: 30px; border-radius: 9px;
              border: 1px solid var(--desk-shell-border-strong);
              background: var(--desk-shell-soft);
              color: var(--desk-shell-muted);
              display: flex; align-items: center; justify-content: center;
              flex: none;
            }
            .de-desk-close:hover { color: var(--desk-pink); border-color: var(--desk-pink); }
            .de-desk-tabs {
              display: flex; justify-content: space-between; gap: 12px;
              padding: 0 17px;
              border-bottom: 1px solid var(--desk-shell-border);
              flex-shrink: 0;
            }
            .de-desk-tab {
              background: none; border: none;
              padding: 12px 0;
              font-family: "Space Grotesk", sans-serif;
              font-weight: 600; font-size: 13.5px;
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
              box-shadow: 0 0 8px rgba(211,18,106,0.5);
            }
            .de-desk-status {
              display: flex; align-items: center; justify-content: space-between;
              padding: 9px 17px;
              background: var(--desk-shell-soft);
              border-bottom: 1px solid var(--desk-shell-border);
              font-size: 11.5px;
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
              min-height: 0; flex: 1;
              background: var(--desk-shell);
              padding: 17px;
              display: flex; flex-direction: column;
            }
            .de-desk-panel, .de-desk-scroll {
              min-height: 0; flex: 1;
              display: flex; flex-direction: column;
            }
            .de-desk-scroll { overflow-y: auto; gap: 0; }
            .de-desk-hero {
              position: relative; overflow: hidden;
              border-radius: 13px;
              border: 1px solid rgba(211,18,106,0.20);
              background: linear-gradient(155deg, #2e1d2a 0%, #221c2d 55%, #1a1820 100%);
              padding: 20px 18px;
              display: flex; align-items: center; gap: 14px;
              box-shadow: 0 16px 34px -18px rgba(211,18,106,0.30), inset 0 1px 0 rgba(255,255,255,0.04);
              flex-shrink: 0;
            }
            .de-desk-hero-dots {
              position: absolute; top: 14px; right: 14px;
              width: 56px; height: 34px;
              background-image: radial-gradient(rgba(255,255,255,0.20) 1px, transparent 1.4px);
              background-size: 9px 9px; opacity: 0.5;
            }
            .de-desk-hero-txt { flex: 1; min-width: 0; }
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
              font-size: 18.5px; font-weight: 700; color: #fff;
              letter-spacing: -0.01em;
            }
            .de-desk-hero p {
              font-size: 12px; color: #9c97a8; margin-top: 5px;
              line-height: 1.5; max-width: 210px;
            }
            .de-desk-hero-art { width: 92px; height: 92px; flex: none; }
            .de-desk-rows { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
            .de-desk-row {
              display: flex; align-items: center; gap: 12px;
              padding: 11px 12px; border-radius: 12px;
              background: var(--desk-box);
              border: 1px solid var(--desk-border);
              color: #fff; text-align: left; width: 100%;
              transition: background 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
            }
            .de-desk-row:hover {
              background: #201d28;
              border-color: var(--desk-border-strong);
              transform: translateY(-1px);
            }
            .de-desk-row[data-tone="violet"] { --c: var(--desk-violet); }
            .de-desk-row[data-tone="blue"] { --c: var(--desk-blue); }
            .de-desk-row[data-tone="teal"] { --c: var(--desk-teal); }
            .de-desk-row[data-tone="red"] { --c: var(--desk-red); }
            .de-desk-row[data-tone="pink"] { --c: var(--desk-pink); }
            .de-desk-row-ic {
              width: 32px; height: 32px; border-radius: 10px;
              background: var(--desk-inset);
              border: 1.5px solid var(--c, var(--desk-violet));
              color: var(--c, var(--desk-violet));
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
            .de-desk-row-t { font-size: 13px; font-weight: 600; color: #fff; }
            .de-desk-row.is-lg .de-desk-row-t { font-size: 13.5px; }
            .de-desk-row-d { display: block; font-size: 11.5px; color: #6b6678; margin-top: 2px; line-height: 1.4; }
            .de-desk-row-chev { width: 14px; height: 14px; color: #6b6678; flex: none; }
            .de-desk-row-actions { display: flex; align-items: center; gap: 6px; flex: none; }
            .de-desk-row-ext {
              width: 27px; height: 27px; border-radius: 8px;
              border: 1px solid var(--desk-border-strong);
              display: flex; align-items: center; justify-content: center;
              color: #9c97a8;
            }
            .de-desk-row-ext svg { width: 12px; height: 12px; }
            .de-desk-row:hover .de-desk-row-ext { border-color: var(--c, var(--desk-pink)); color: var(--c, var(--desk-pink)); }
            .de-desk-row.is-highlight { background: #2e1b28; border-color: rgba(211,18,106,0.35); }
            .de-desk-row.is-alert { background: #2e1b22; border-color: rgba(240,69,91,0.35); }
            .de-desk-btn-mini {
              background: var(--desk-grad); color: #fff; border: none;
              font-weight: 600; font-size: 12px; padding: 9px 14px;
              border-radius: 9px; flex: none; white-space: nowrap;
            }
            .de-desk-section-head {
              display: flex; align-items: center; justify-content: space-between;
              margin: 20px 0 2px;
            }
            .de-desk-section-head h4 {
              font-family: "Space Grotesk", sans-serif;
              font-size: 13px; font-weight: 600; color: var(--desk-shell-text);
            }
            .de-desk-section-head a { font-size: 12px; color: var(--desk-pink); font-weight: 600; }
            .de-desk-details-head {
              display: flex; align-items: center; justify-content: space-between;
              margin: 18px 0 12px;
            }
            .de-desk-details-head h4 {
              font-family: "Space Grotesk", sans-serif;
              font-size: 11.5px; font-weight: 700;
              letter-spacing: 0.06em; text-transform: uppercase;
              color: var(--desk-shell-muted);
            }
            .de-desk-secure {
              display: flex; align-items: center; gap: 5px;
              border: 1px solid var(--desk-green); color: #178a4c;
              border-radius: 999px; padding: 3px 9px;
              font-size: 10.5px; font-weight: 600;
              background: rgba(34,197,94,0.08);
            }
            .de-desk-secure svg { width: 10px; height: 10px; }
            .de-desk-form { display: flex; flex-direction: column; gap: 10px; }
            .de-desk-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .de-desk-field label {
              display: block; font-size: 11px; font-weight: 600;
              color: var(--desk-shell-muted); margin-bottom: 6px;
            }
            .de-desk-input-wrap { position: relative; }
            .de-desk-input-wrap > svg {
              position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
              width: 13px; height: 13px; color: #6b6678; pointer-events: none;
            }
            .de-desk-shell .de-desk-input {
              width: 100%;
              height: 40px;
              background: var(--desk-inset) !important;
              border: 1px solid var(--desk-border) !important;
              color: #fff !important;
              border-radius: 10px;
              padding: 10px 11px 10px 32px;
              font-size: 13px;
              box-shadow: none !important;
            }
            .de-desk-shell .de-desk-input::placeholder { color: #6b6678; }
            .de-desk-shell .de-desk-select { appearance: none; padding-right: 28px; }
            .de-desk-select-chev {
              position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
              width: 12px; height: 12px; color: #6b6678; pointer-events: none;
            }
            .de-desk-ta-wrap { position: relative; }
            .de-desk-shell .de-desk-ta {
              min-height: 80px; height: auto; padding-left: 11px; resize: vertical;
              line-height: 1.5;
            }
            .de-desk-counter {
              position: absolute; right: 10px; bottom: 8px;
              font-size: 10px; color: #6b6678; pointer-events: none;
            }
            .de-desk-attach {
              display: flex; align-items: flex-start; gap: 9px;
              width: 100%; text-align: left;
              margin-top: 2px; padding: 12px;
              border: 1px dashed var(--desk-border-strong);
              border-radius: 11px; background: var(--desk-inset);
            }
            .de-desk-attach:hover { border-color: var(--desk-pink); }
            .de-desk-attach svg { width: 14px; height: 14px; color: #6b6678; flex: none; margin-top: 2px; }
            .de-desk-attach-t { display: block; font-size: 12.5px; font-weight: 600; color: #fff; }
            .de-desk-attach-h { display: block; font-size: 10.5px; color: #6b6678; margin-top: 1px; }
            .de-desk-caption {
              display: flex; align-items: center; gap: 6px;
              font-size: 11px; color: var(--desk-shell-muted);
            }
            .de-desk-caption svg { width: 11px; height: 11px; }
            .de-desk-btn-grad {
              width: 100%; margin-top: 4px;
              background: var(--desk-grad); border: none; color: #fff;
              font-weight: 600; font-size: 13.5px; padding: 13px;
              border-radius: 11px;
              display: flex; align-items: center; justify-content: center; gap: 8px;
              box-shadow: 0 14px 30px -10px rgba(211,18,106,0.45);
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
              background: var(--desk-box); color: #fff;
              border: 1px solid var(--desk-border);
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
              font-size: 12px; font-weight: 600; color: #f0b4cc;
              margin-top: 8px;
            }
            .de-desk-success-actions { display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 14px; }
            .de-desk-composer {
              display: flex; gap: 8px;
              padding: 13px 17px;
              border-top: 1px solid var(--desk-border);
              background: #131218;
              flex-shrink: 0;
            }
            .de-desk-composer input {
              flex: 1;
              background: var(--desk-inset);
              border: 1px solid var(--desk-border);
              border-radius: 11px;
              padding: 11px 13px;
              color: #fff; font-size: 13px;
            }
            .de-desk-composer input:focus {
              outline: none;
              border-color: var(--desk-pink);
              box-shadow: 0 0 0 3px rgba(211,18,106,0.12);
            }
            .de-desk-send {
              width: 41px; height: 41px; border-radius: 11px;
              background: var(--desk-grad); border: none;
              display: flex; align-items: center; justify-content: center;
              flex: none;
              box-shadow: 0 12px 26px -8px rgba(211,18,106,0.45);
            }
            .de-desk-send:disabled { opacity: 0.5; }
            .de-desk-send svg { width: 16px; height: 16px; color: #fff; }
            .de-desk-composer-caption {
              display: flex; align-items: center; gap: 6px;
              padding: 0 17px 12px;
              background: #131218;
              font-size: 11px; color: #6b6678;
              flex-shrink: 0;
            }
            .de-desk-composer-caption svg { width: 11px; height: 11px; }
            .de-desk-foot {
              display: flex; align-items: center; justify-content: space-between;
              padding: 11px 17px;
              border-top: 1px solid var(--desk-border);
              background: var(--desk-inset);
              flex-shrink: 0;
            }
            .de-desk-foot-nav {
              font-size: 11px; color: #6b6678;
              display: flex; gap: 5px; min-width: 0;
            }
            .de-desk-foot-nav .is-active { color: var(--desk-pink); font-weight: 600; }
            .de-desk-foot-cta {
              font-size: 11.5px; color: var(--desk-pink); font-weight: 600;
              display: flex; align-items: center; gap: 4px; flex: none;
            }
            .de-desk-foot-cta svg { width: 11px; height: 11px; }
            @media (max-width: 420px) {
              .de-desk-grid2 { grid-template-columns: 1fr; }
              .de-desk-hero-art { display: none; }
              .de-desk-tab { font-size: 12.5px; }
              .de-desk-hero h3 { font-size: 16.5px; }
            }
          `,
        }}
      />
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
    </>
  );
};
