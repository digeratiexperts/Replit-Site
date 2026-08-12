import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PortalLayout } from "./PortalLayout";
import {
  Send,
  AlertCircle,
  MessageSquare,
  Ticket,
  X,
  Users,
  Radio,
} from "lucide-react";
import { Link } from "wouter";
import { portalGet } from "@/lib/portalApi";

interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: "client" | "support";
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface DeskSession {
  sessionId: string;
  email: string | null;
  contactName: string | null;
  companyName: string | null;
  pagePath: string | null;
  messageCount: number;
  preview: string | null;
  agentActive?: boolean;
  agentName?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DeskMessage {
  id: string;
  sessionId: string;
  role: "user" | "assistant" | "agent";
  content: string;
  senderName?: string | null;
  createdAt: string;
}

function viewerLabel(s: DeskSession): string {
  if (s.contactName) return s.contactName;
  if (s.email) return s.email;
  if (s.pagePath) return `Visitor · ${s.pagePath}`;
  return `Viewer ${s.sessionId.slice(0, 6)}`;
}

export default function PortalChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(true);
  const [chatAllowed, setChatAllowed] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const [deskSessions, setDeskSessions] = useState<DeskSession[]>([]);
  const [openDeskIds, setOpenDeskIds] = useState<string[]>([]);
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null);
  const [deskThreads, setDeskThreads] = useState<Record<string, DeskMessage[]>>({});
  const [deskLoading, setDeskLoading] = useState(false);
  const [deskReply, setDeskReply] = useState("");
  const [deskSending, setDeskSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const deskEndRef = useRef<HTMLDivElement>(null);
  const liveMessagesRef = useRef<ChatMessage[]>([]);
  const selectedDeskRef = useRef<string | null>(null);
  const openDeskIdsRef = useRef<string[]>([]);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    liveMessagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    selectedDeskRef.current = selectedDesk;
  }, [selectedDesk]);

  useEffect(() => {
    openDeskIdsRef.current = openDeskIds;
  }, [openDeskIds]);

  const loadLiveMessages = useCallback(async (authToken: string, since?: string) => {
    const url = since
      ? `/api/portal/chat/messages?since=${encodeURIComponent(since)}`
      : "/api/portal/chat/messages";
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
      credentials: "include",
    });
    if (res.status === 403) {
      setChatAllowed(false);
      const data = await res.json().catch(() => ({}));
      setStatusMessage(data.error || "Live Chat is limited to your company IT contact.");
      setConnected(false);
      return;
    }
    if (!res.ok) throw new Error("Failed to load chat");
    const data = await res.json();
    if (data.success && Array.isArray(data.messages)) {
      if (since) {
        setMessages((prev) => {
          const known = new Set(prev.map((m) => m.id));
          const incoming = data.messages.filter((m: ChatMessage) => !known.has(m.id));
          return incoming.length ? [...prev, ...incoming] : prev;
        });
      } else {
        setMessages(data.messages);
      }
      setConnected(true);
      setChatAllowed(true);
    }
  }, []);

  const loadDeskSessions = useCallback(async () => {
    try {
      const data = await portalGet<{ success: boolean; sessions: DeskSession[] }>(
        "/api/portal/desk-chats",
      );
      if (data.success) setDeskSessions(data.sessions || []);
    } catch (err) {
      console.error("Failed to load DE Desk chats:", err);
    }
  }, []);

  const refreshDeskThread = useCallback(async (sessionId: string) => {
    try {
      const data = await portalGet<{
        success: boolean;
        messages: DeskMessage[];
        session?: DeskSession;
      }>(`/api/portal/desk-chats/${sessionId}`);
      if (data.success) {
        setDeskThreads((prev) => ({ ...prev, [sessionId]: data.messages || [] }));
        if (data.session) {
          setDeskSessions((prev) => {
            const idx = prev.findIndex((s) => s.sessionId === sessionId);
            if (idx < 0) return [data.session!, ...prev];
            const next = [...prev];
            next[idx] = { ...next[idx], ...data.session! };
            return next;
          });
        }
      }
    } catch (err) {
      console.error("Failed to refresh DE Desk thread:", err);
    }
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("portalToken");
    if (!authToken) return;
    setToken(authToken);

    fetch("/api/portal/chat/status", {
      headers: { Authorization: `Bearer ${authToken}` },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.allowed === false) {
          setChatAllowed(false);
          setConnected(false);
          setStatusMessage(data.message || "Live Chat is limited to IT contacts.");
        }
      })
      .catch(() => {});

    loadLiveMessages(authToken).catch((err) => console.error(err));
    loadDeskSessions();

    pollRef.current = setInterval(() => {
      const live = liveMessagesRef.current;
      const last = live[live.length - 1]?.timestamp;
      loadLiveMessages(authToken, last).catch(() => {});
      loadDeskSessions().catch(() => {});
      const openIds = openDeskIdsRef.current;
      for (const id of openIds) {
        refreshDeskThread(id).catch(() => {});
      }
    }, 4000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [loadLiveMessages, loadDeskSessions, refreshDeskThread]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    deskEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedDesk, deskThreads]);

  const openDeskSession = async (sessionId: string) => {
    setSelectedDesk(sessionId);
    setOpenDeskIds((prev) => (prev.includes(sessionId) ? prev : [...prev, sessionId]));
    if (!deskThreads[sessionId]) setDeskLoading(true);
    try {
      await refreshDeskThread(sessionId);
    } finally {
      setDeskLoading(false);
    }
  };

  const closeDeskTab = (sessionId: string) => {
    setOpenDeskIds((prev) => prev.filter((id) => id !== sessionId));
    setSelectedDesk((cur) => {
      if (cur !== sessionId) return cur;
      const remaining = openDeskIds.filter((id) => id !== sessionId);
      return remaining[remaining.length - 1] || null;
    });
  };

  const handleDeskReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesk || !deskReply.trim() || deskSending || !token) return;
    const content = deskReply.trim();
    setDeskSending(true);
    setDeskReply("");
    const tempId = `temp-agent-${Date.now()}`;
    setDeskThreads((prev) => ({
      ...prev,
      [selectedDesk]: [
        ...(prev[selectedDesk] || []),
        {
          id: tempId,
          sessionId: selectedDesk,
          role: "agent",
          content,
          senderName: "You",
          createdAt: new Date().toISOString(),
        },
      ],
    }));

    try {
      const response = await fetch(`/api/portal/desk-chats/${selectedDesk}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ content }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Failed to send reply");
      setDeskThreads((prev) => {
        const thread = (prev[selectedDesk] || []).filter((m) => m.id !== tempId);
        if (data.message) thread.push(data.message as DeskMessage);
        return { ...prev, [selectedDesk]: thread };
      });
      setDeskSessions((prev) =>
        prev.map((s) =>
          s.sessionId === selectedDesk
            ? { ...s, agentActive: true, agentName: data.agentName || s.agentName, updatedAt: new Date().toISOString() }
            : s,
        ),
      );
    } catch (err) {
      console.error(err);
      setDeskThreads((prev) => ({
        ...prev,
        [selectedDesk]: (prev[selectedDesk] || []).filter((m) => m.id !== tempId),
      }));
      setDeskReply(content);
    } finally {
      setDeskSending(false);
    }
  };

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!messageText.trim() || sending || !chatAllowed) return;

      const currentMessage = messageText;
      setSending(true);
      setMessageText("");

      const tempMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        senderName: "You",
        senderRole: "client",
        content: currentMessage,
        timestamp: new Date().toISOString(),
        isRead: true,
      };
      setMessages((prev) => [...prev, tempMessage]);

      try {
        const response = await fetch("/api/portal/chat/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            senderName: "You",
            content: currentMessage,
          }),
        });

        if (!response.ok) throw new Error("Failed to send message");

        const data = await response.json();
        if (data.success && data.message) {
          setMessages((prev) => {
            const withoutTemp = prev.filter((m) => m.id !== tempMessage.id);
            const next = [...withoutTemp, data.message];
            if (data.reply) next.push(data.reply);
            return next;
          });
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => prev.filter((m) => m.id !== tempMessage.id));
      } finally {
        setSending(false);
      }
    },
    [messageText, sending, token, chatAllowed],
  );

  const activeSession = deskSessions.find((s) => s.sessionId === selectedDesk) || null;
  const activeMessages = selectedDesk ? deskThreads[selectedDesk] || [] : [];

  return (
    <PortalLayout title="Chats / DE Desk">
      <div className="space-y-8 max-w-6xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Chats &amp; DE Desk</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Work multiple website viewers at once — open threads as tabs, reply live into the site
            widget, and keep portal live chat for IT-contact support. Tickets stay under{" "}
            <Link href="/portal/tickets" className="text-[#5034ff] underline-offset-2 hover:underline">
              Support Tickets
            </Link>
            .
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b dark:border-slate-700 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Website viewers
            </CardTitle>
            <CardDescription>
              Live DE Desk sessions from digeratexperts.com. Open several, toggle tabs, and your
              replies appear in the visitor’s chat.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {openDeskIds.length > 0 && (
              <div className="flex gap-1 overflow-x-auto border-b border-gray-200 bg-slate-50 px-2 py-2 dark:border-slate-700 dark:bg-slate-900/60">
                {openDeskIds.map((id) => {
                  const s = deskSessions.find((d) => d.sessionId === id);
                  const label = s ? viewerLabel(s) : id.slice(0, 8);
                  const active = selectedDesk === id;
                  return (
                    <div
                      key={id}
                      className={`group flex max-w-[220px] items-center gap-1 rounded-lg border px-2 py-1.5 text-xs ${
                        active
                          ? "border-[#5034ff] bg-white text-[#5034ff] shadow-sm dark:bg-slate-800"
                          : "border-transparent bg-transparent text-gray-600 hover:bg-white/80 dark:text-gray-300 dark:hover:bg-slate-800/80"
                      }`}
                    >
                      <button
                        type="button"
                        className="min-w-0 flex-1 truncate text-left font-medium"
                        onClick={() => void openDeskSession(id)}
                      >
                        {s?.agentActive && (
                          <Radio className="mr-1 inline h-3 w-3 text-emerald-500" aria-hidden="true" />
                        )}
                        {label}
                      </button>
                      <button
                        type="button"
                        aria-label={`Close ${label}`}
                        className="rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-700"
                        onClick={() => closeDeskTab(id)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="grid min-h-[420px] grid-cols-1 lg:grid-cols-[280px_1fr]">
              <aside className="max-h-[560px] overflow-y-auto border-b border-gray-200 dark:border-slate-700 lg:border-b-0 lg:border-r">
                {deskSessions.length === 0 ? (
                  <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
                    No website conversations yet. When visitors use DE Desk on the site, they show up
                    here so you can jump between them.
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-100 dark:divide-slate-800">
                    {deskSessions.map((s) => {
                      const active = selectedDesk === s.sessionId;
                      const open = openDeskIds.includes(s.sessionId);
                      return (
                        <li key={s.sessionId}>
                          <button
                            type="button"
                            onClick={() => void openDeskSession(s.sessionId)}
                            className={`w-full px-4 py-3 text-left transition ${
                              active
                                ? "bg-[#5034ff]/10"
                                : open
                                  ? "bg-slate-50 dark:bg-slate-900/40"
                                  : "hover:bg-gray-50 dark:hover:bg-slate-900/30"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="truncate text-sm font-semibold">
                                {viewerLabel(s)}
                              </span>
                              <span className="shrink-0 text-[10px] text-gray-500">
                                {new Date(s.updatedAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                              {s.preview || "DE Desk conversation"}
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
                              <span>{s.messageCount} msgs</span>
                              {s.agentActive && (
                                <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 font-semibold text-emerald-700 dark:text-emerald-300">
                                  Live
                                </span>
                              )}
                              {open && !active && (
                                <span className="rounded-full bg-[#5034ff]/15 px-1.5 py-0.5 font-semibold text-[#5034ff]">
                                  Open
                                </span>
                              )}
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </aside>

              <div className="flex min-h-[420px] flex-col">
                {!selectedDesk ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-sm text-gray-500">
                    <MessageSquare className="h-8 w-8 opacity-40" />
                    <p>Select a website viewer to open their DE Desk thread.</p>
                    <p className="text-xs">You can keep multiple viewers open and toggle tabs above.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-slate-700">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {activeSession ? viewerLabel(activeSession) : "Viewer"}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {activeSession?.email || "no email yet"}
                          {activeSession?.pagePath ? ` · ${activeSession.pagePath}` : ""}
                          {activeSession?.agentActive
                            ? ` · ${activeSession.agentName || "Agent"} live`
                            : ""}
                        </p>
                      </div>
                      <Link href="/portal/tickets">
                        <Button variant="outline" size="sm" className="gap-2 shrink-0">
                          <Ticket className="h-4 w-4" />
                          Tickets
                        </Button>
                      </Link>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-900/40 max-h-[360px]">
                      {deskLoading && activeMessages.length === 0 ? (
                        <p className="text-sm text-gray-500">Loading thread…</p>
                      ) : activeMessages.length === 0 ? (
                        <p className="text-sm text-gray-500">No messages in this session.</p>
                      ) : (
                        activeMessages.map((m) => {
                          const isUser = m.role === "user";
                          const isAgent = m.role === "agent";
                          return (
                            <div
                              key={m.id}
                              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                                  isUser
                                    ? "bg-[#5034ff] text-white"
                                    : isAgent
                                      ? "border border-sky-200 bg-sky-50 text-slate-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-50"
                                      : "border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                                }`}
                              >
                                <p className="mb-1 text-xs opacity-70">
                                  {isUser
                                    ? "Visitor"
                                    : isAgent
                                      ? m.senderName || "You (agent)"
                                      : "DE Desk AI"}
                                </p>
                                <p className="whitespace-pre-wrap">{m.content}</p>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={deskEndRef} />
                    </div>

                    <form
                      onSubmit={handleDeskReply}
                      className="flex gap-2 border-t border-gray-200 p-3 dark:border-slate-700"
                    >
                      <Textarea
                        value={deskReply}
                        onChange={(e) => setDeskReply(e.target.value)}
                        placeholder="Reply as agent — visitor sees this in the website chat…"
                        rows={2}
                        className="min-h-[52px] resize-none"
                        disabled={deskSending}
                      />
                      <Button
                        type="submit"
                        disabled={!deskReply.trim() || deskSending}
                        className="h-[52px] shrink-0 bg-[#5034ff] text-white hover:bg-[#5034ff]/90"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {!chatAllowed && statusMessage && (
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 dark:text-amber-200">{statusMessage}</p>
            </div>
          </div>
        )}

        {chatAllowed && (
          <Card className="flex flex-col h-[600px]">
            <CardHeader className="border-b dark:border-slate-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Portal live chat</CardTitle>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {connected ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderRole === "client" ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${message.id}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.senderRole === "client"
                        ? "bg-[#5034ff] text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{message.senderName}</p>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderRole === "client"
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            <div className="border-t dark:border-slate-700 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  disabled={!connected || sending}
                  className="flex-1"
                  data-testid="input-message"
                />
                <Button
                  type="submit"
                  disabled={!messageText.trim() || !connected || sending}
                  className="bg-[#5034ff] hover:bg-[#5034ff]/90 text-white"
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        )}

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Outside hours?</strong> Create a ticket anytime from DE Desk or{" "}
              <Link href="/portal/tickets/create" className="text-[#5034ff] hover:underline">
                /portal/tickets/create
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
