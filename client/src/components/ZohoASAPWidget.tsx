import { useEffect, useRef, useState } from "react";
import {
  Bot,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  LifeBuoy,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ZohoASAPWidgetProps {
  isEnabled?: boolean;
  accountId?: string;
  portalId?: string;
  customCSS?: string;
}

type ActiveTab = "chat" | "ticket" | "resources";
type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type TicketResult = {
  ticketNumber?: string;
  message: string;
};

const CHAT_WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I’m the Digerati Support Assistant. I can help troubleshoot an issue, answer service questions, or point you to the right next step.",
};

const QUICK_CHAT_PROMPTS = [
  "I can’t sign in",
  "I have an email or Microsoft 365 issue",
  "I have a security concern",
  "What services do you offer?",
];

const RESOURCE_LINKS = [
  {
    title: "Knowledge Base",
    description: "Setup guides, troubleshooting, and security help",
    href: "/support/knowledge-base",
    icon: BookOpen,
  },
  {
    title: "Remote Support",
    description: "Start a remote support session with our team",
    href: "/support/remote-support",
    icon: LifeBuoy,
  },
  {
    title: "Client Portal",
    description: "Tickets, services, billing, approvals, and account tools",
    href: "/portal/login",
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

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([CHAT_WELCOME]);
  const [chatInput, setChatInput] = useState("");
  const [isChatSending, setIsChatSending] = useState(false);
  const [assistantAvailable, setAssistantAvailable] = useState<boolean | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

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

    let cancelled = false;
    void fetch("/api/portal/zoho/chat/status")
      .then(async (response) => {
        if (!response.ok) throw new Error("Status unavailable");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setAssistantAvailable(Boolean(data.assistantAvailable));
      })
      .catch(() => {
        if (!cancelled) setAssistantAvailable(null);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (activeTab !== "chat") return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeTab, chatMessages]);

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
    };

    const conversationHistory = chatMessages
      .filter((item) => item.id !== CHAT_WELCOME.id)
      .slice(-10)
      .map(({ role, content: historyContent }) => ({
        role,
        content: historyContent,
      }));

    setChatMessages((current) => [...current, userMessage]);
    setChatInput("");
    setIsChatSending(true);

    try {
      const response = await fetch("/api/portal/zoho/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          conversationHistory,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "The support assistant could not answer right now.");
      }

      const replyContent = data.message?.content;
      if (!replyContent || typeof replyContent !== "string") {
        throw new Error("The support assistant returned an invalid response.");
      }

      setAssistantAvailable(true);
      setChatMessages((current) => [
        ...current,
        {
          id: data.message.id || `assistant-${Date.now()}`,
          role: "assistant",
          content: replyContent,
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
      <div
        className={`fixed right-4 sm:right-6 ${cookieBannerClear ? "bottom-4 sm:bottom-6" : "bottom-28"} z-[100]`}
        data-testid="widget-zoho-asap-container"
      >
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex h-14 items-center gap-2 rounded-full border border-white/10 bg-slate-950 px-4 text-white shadow-xl shadow-slate-950/25 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            data-testid="button-open-asap-widget"
            aria-label="Open Digerati help and chat"
            aria-expanded={isOpen}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-violet-600">
              <MessageCircle size={20} aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold leading-4">Help & Chat</span>
              <span className="block text-[11px] leading-4 text-slate-300">Answers now, team follow-up</span>
            </span>
          </button>
        )}

        {isOpen && (
          <section
            className="absolute bottom-0 right-0 flex h-[680px] max-h-[80vh] w-[460px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
            role="dialog"
            aria-modal="false"
            aria-label="Digerati Experts help and chat"
          >
            <header className="flex flex-shrink-0 items-start justify-between gap-4 bg-slate-950 px-5 py-4 text-white">
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="truncate text-base font-semibold" data-testid="text-widget-title">
                    Digerati Experts
                  </h2>
                </div>
                <p className="text-xs text-slate-300" data-testid="text-widget-status">
                  Support, answers, and next steps in one place
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                data-testid="button-close-widget"
                aria-label="Close help and chat"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <nav className="grid flex-shrink-0 grid-cols-3 border-b border-slate-200 bg-slate-50" aria-label="Support options">
              {(
                [
                  { id: "chat" as const, label: "Chat", icon: Bot },
                  { id: "ticket" as const, label: "Ticket", icon: FileText },
                  { id: "resources" as const, label: "Resources", icon: BookOpen },
                ]
              ).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`relative flex min-h-14 items-center justify-center gap-1.5 px-2 text-xs font-semibold transition ${
                    activeTab === id
                      ? "bg-white text-violet-700"
                      : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
                  }`}
                  data-testid={`button-tab-${id}`}
                  aria-current={activeTab === id ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{label}</span>
                  {activeTab === id && (
                    <span className="absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-violet-600" />
                  )}
                </button>
              ))}
            </nav>

            <div className="min-h-0 flex-1">
              {activeTab === "chat" && (
                <div className="flex h-full min-h-0 flex-col" data-testid="panel-support-chat">
                  <div className="border-b border-slate-100 bg-white px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            assistantAvailable === true
                              ? "bg-emerald-500"
                              : assistantAvailable === false
                                ? "bg-amber-400"
                                : "bg-slate-300"
                          }`}
                        />
                        {assistantAvailable === true
                          ? "Support assistant available"
                          : assistantAvailable === false
                            ? "Ticket support available"
                            : "Checking assistant…"}
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("ticket")}
                        className="text-xs font-semibold text-violet-700 hover:text-violet-900"
                      >
                        Need a person?
                      </button>
                    </div>
                  </div>

                  <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50/70 px-4 py-4" aria-live="polite">
                    {chatMessages.map((chatMessage) => (
                      <div
                        key={chatMessage.id}
                        className={`flex ${chatMessage.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-5 ${
                            chatMessage.role === "user"
                              ? "rounded-br-md bg-violet-600 text-white"
                              : "rounded-bl-md border border-slate-200 bg-white text-slate-800 shadow-sm"
                          }`}
                        >
                          {chatMessage.role === "assistant" && (
                            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-violet-700">
                              <Bot className="h-3.5 w-3.5" aria-hidden="true" />
                              Digerati Assistant
                            </div>
                          )}
                          <p className="whitespace-pre-wrap">{chatMessage.content}</p>
                        </div>
                      </div>
                    ))}

                    {chatMessages.length === 1 && (
                      <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                        {QUICK_CHAT_PROMPTS.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => void handleSendChat(prompt)}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}

                    {isChatSending && (
                      <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-500 shadow-sm">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
                            Digerati Assistant is responding…
                          </span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="flex-shrink-0 border-t border-slate-200 bg-white p-3">
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
                        placeholder="Ask a question or describe the issue…"
                        className="min-h-[52px] resize-none rounded-xl text-sm"
                        disabled={isChatSending}
                        data-testid="input-support-chat"
                        aria-label="Chat message"
                      />
                      <Button
                        type="button"
                        onClick={() => void handleSendChat()}
                        disabled={!chatInput.trim() || isChatSending}
                        className="h-[52px] w-[52px] flex-shrink-0 rounded-xl bg-violet-600 p-0 text-white hover:bg-violet-700"
                        data-testid="button-send-support-chat"
                        aria-label="Send chat message"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                    <p className="mt-2 text-[11px] leading-4 text-slate-500">
                      AI-assisted. Don’t share passwords, MFA codes, recovery codes, or private keys.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "ticket" && (
                <div className="h-full overflow-y-auto p-4" data-testid="panel-support-ticket">
                  {ticketResult ? (
                    <div className="flex h-full flex-col items-center justify-center px-2 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900">Support request received</h3>
                      {ticketResult.ticketNumber && (
                        <p className="mt-2 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-xs font-semibold text-slate-700">
                          {ticketResult.ticketNumber}
                        </p>
                      )}
                      <p className="mt-3 max-w-sm text-sm leading-5 text-slate-600">{ticketResult.message}</p>
                      <div className="mt-5 flex flex-wrap justify-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setTicketResult(null);
                            setActiveTab("chat");
                          }}
                        >
                          Back to chat
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setTicketResult(null)}
                          className="bg-violet-600 text-white hover:bg-violet-700"
                        >
                          Create another ticket
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">Create a support ticket</h3>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Use this when you need team follow-up, account changes, or work performed on your systems.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="support-email" className="mb-1.5 block text-xs font-semibold text-slate-700">
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
                          className="h-10 rounded-xl text-sm"
                        />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-[1fr_130px]">
                        <div>
                          <label htmlFor="support-subject" className="mb-1.5 block text-xs font-semibold text-slate-700">
                            Subject
                          </label>
                          <Input
                            id="support-subject"
                            maxLength={200}
                            placeholder="Brief description"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            data-testid="input-support-subject"
                            className="h-10 rounded-xl text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="support-priority" className="mb-1.5 block text-xs font-semibold text-slate-700">
                            Priority
                          </label>
                          <select
                            id="support-priority"
                            value={priority}
                            onChange={(event) =>
                              setPriority(event.target.value as "Low" | "Medium" | "High" | "Urgent")
                            }
                            className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                        <label htmlFor="support-message" className="mb-1.5 block text-xs font-semibold text-slate-700">
                          What’s happening?
                        </label>
                        <Textarea
                          id="support-message"
                          maxLength={5000}
                          placeholder="Include the device, service, error message, and what you already tried. Please do not include passwords or security codes."
                          value={message}
                          onChange={(event) => setMessage(event.target.value)}
                          rows={5}
                          className="min-h-[118px] resize-none rounded-xl text-sm"
                          data-testid="input-support-message"
                        />
                      </div>

                      <Button
                        type="button"
                        onClick={() => void handleSubmitTicket()}
                        disabled={isTicketSending}
                        className="h-11 w-full rounded-xl bg-violet-600 text-white hover:bg-violet-700"
                        data-testid="button-submit-support"
                      >
                        {isTicketSending ? "Creating ticket…" : "Create support ticket"}
                        {!isTicketSending && <Send size={15} className="ml-2" aria-hidden="true" />}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "resources" && (
                <div className="h-full overflow-y-auto p-4" data-testid="panel-support-resources">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-900">Get where you need to go</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Direct links to the support tools clients use most.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {RESOURCE_LINKS.map(({ title, description, href, icon: Icon }) => (
                      <a
                        key={title}
                        href={href}
                        className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-violet-300 hover:bg-violet-50/60"
                      >
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-violet-100 group-hover:text-violet-700">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-slate-900">{title}</span>
                          <span className="mt-0.5 block text-xs leading-4 text-slate-500">{description}</span>
                        </span>
                        <ExternalLink className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-hover:text-violet-600" aria-hidden="true" />
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 p-3">
                    <div className="flex gap-2.5">
                      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-700" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-violet-950">Security-sensitive issue?</p>
                        <p className="mt-1 text-xs leading-4 text-violet-800">
                          Don’t paste credentials or secret keys into chat. Create a ticket with the minimum details needed and the team can move the conversation to an appropriate secure channel.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <footer className="flex flex-shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-2.5 text-[11px] text-slate-500">
              <span>Support powered by Digerati + Zoho Desk</span>
              <button
                type="button"
                onClick={() => setActiveTab("ticket")}
                className="font-semibold text-violet-700 hover:text-violet-900"
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
