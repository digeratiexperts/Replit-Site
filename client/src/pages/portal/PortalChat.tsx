import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PortalLayout } from "./PortalLayout";
import { Send, AlertCircle, MessageSquare, Ticket } from "lucide-react";
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
  createdAt: string;
  updatedAt: string;
}

interface DeskMessage {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
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
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null);
  const [deskMessages, setDeskMessages] = useState<DeskMessage[]>([]);
  const [deskLoading, setDeskLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      const last = messages[messages.length - 1]?.timestamp;
      loadLiveMessages(authToken, last).catch(() => {});
    }, 8000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadLiveMessages, loadDeskSessions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const openDeskSession = async (sessionId: string) => {
    setSelectedDesk(sessionId);
    setDeskLoading(true);
    try {
      const data = await portalGet<{
        success: boolean;
        messages: DeskMessage[];
      }>(`/api/portal/desk-chats/${sessionId}`);
      if (data.success) setDeskMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to load DE Desk thread:", err);
      setDeskMessages([]);
    } finally {
      setDeskLoading(false);
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

  return (
    <PortalLayout title="Chats / DE Desk">
      <div className="space-y-8 max-w-4xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Chats &amp; DE Desk</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Portal live chat plus public-site DE Desk conversations linked to your account.
            Tickets stay under{" "}
            <Link href="/portal/tickets" className="text-[#5034ff] underline-offset-2 hover:underline">
              Support Tickets
            </Link>
            .
          </p>
        </div>

        {/* DE Desk history */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              DE Desk conversations
            </CardTitle>
            <CardDescription>
              Chats from the website DE Desk widget. Sessions appear here once an email is
              attached (ticket or lead), or for admins across all recent activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deskSessions.length === 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No DE Desk conversations yet. Use the site widget or create a ticket from DE Desk
                with your portal email.
              </p>
            ) : (
              <div className="space-y-2">
                {deskSessions.map((s) => (
                  <button
                    key={s.sessionId}
                    type="button"
                    onClick={() => openDeskSession(s.sessionId)}
                    className={`w-full text-left rounded-lg border px-4 py-3 transition ${
                      selectedDesk === s.sessionId
                        ? "border-[#5034ff] bg-[#5034ff]/10"
                        : "border-gray-200 dark:border-slate-700 hover:border-[#5034ff]/50"
                    }`}
                  >
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="font-medium truncate">
                        {s.preview || "DE Desk conversation"}
                      </span>
                      <span className="text-xs text-gray-500 shrink-0">
                        {new Date(s.updatedAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {s.email || "no email yet"} · {s.messageCount} messages
                      {s.pagePath ? ` · ${s.pagePath}` : ""}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedDesk && (
              <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-4 max-h-80 overflow-y-auto space-y-3 bg-gray-50 dark:bg-slate-900/40">
                {deskLoading ? (
                  <p className="text-sm text-gray-500">Loading thread…</p>
                ) : deskMessages.length === 0 ? (
                  <p className="text-sm text-gray-500">No messages in this session.</p>
                ) : (
                  deskMessages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                          m.role === "user"
                            ? "bg-[#5034ff] text-white"
                            : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
                        }`}
                      >
                        <p className="text-xs opacity-70 mb-1">
                          {m.role === "user" ? "Visitor" : "DE Desk"}
                        </p>
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            <div className="flex gap-2">
              <Link href="/portal/tickets">
                <Button variant="outline" size="sm" className="gap-2">
                  <Ticket className="h-4 w-4" />
                  View tickets
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Live chat */}
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
