import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PortalLayout } from "./PortalLayout";
import { Send, AlertCircle } from "lucide-react";

interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: "client" | "support";
  content: string;
  timestamp: string;
  isRead: boolean;
}

const POLL_MS = 2500;
const FAIL_THRESHOLD = 3;

export default function PortalChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const [statusNote, setStatusNote] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const failCountRef = useRef(0);
  const lastTimestampRef = useRef<string | null>(null);
  const knownIdsRef = useRef<Set<string>>(new Set());

  const mergeMessages = useCallback((incoming: ChatMessage[]) => {
    if (!incoming.length) return;
    setMessages((prev) => {
      const next = [...prev];
      let changed = false;
      for (const msg of incoming) {
        if (knownIdsRef.current.has(msg.id)) continue;
        // Drop optimistic temp duplicates with same content/time window
        const tempIdx = next.findIndex(
          (m) =>
            m.id.startsWith("temp-") &&
            m.content === msg.content &&
            m.senderRole === msg.senderRole
        );
        if (tempIdx >= 0) {
          next[tempIdx] = msg;
        } else {
          next.push(msg);
        }
        knownIdsRef.current.add(msg.id);
        changed = true;
        if (!lastTimestampRef.current || msg.timestamp > lastTimestampRef.current) {
          lastTimestampRef.current = msg.timestamp;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  const authHeaders = useCallback(
    (authToken: string) => ({
      Authorization: `Bearer ${authToken}`,
    }),
    []
  );

  // Initial load + HTTP polling (works behind Cloudflare/OLS; no WebSocket)
  useEffect(() => {
    const authToken = localStorage.getItem("portalToken");
    if (!authToken) {
      setConnected(false);
      setStatusNote("Sign in to use Live Chat.");
      return;
    }
    setToken(authToken);

    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    const markOk = () => {
      failCountRef.current = 0;
      if (!cancelled) setConnected(true);
    };

    const markFail = () => {
      failCountRef.current += 1;
      if (!cancelled && failCountRef.current >= FAIL_THRESHOLD) {
        setConnected(false);
      }
    };

    const loadStatus = async () => {
      try {
        const res = await fetch("/api/portal/chat/status", {
          headers: authHeaders(authToken),
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.connected) markOk();
        if (data.assistantAvailable) {
          setStatusNote("Assistant online — team monitors Mon–Fri, 9 AM–6 PM EST.");
        } else {
          setStatusNote("Chat connected. Messages are saved; team replies during business hours.");
        }
      } catch {
        markFail();
      }
    };

    const pollMessages = async (incremental: boolean) => {
      try {
        const params = new URLSearchParams();
        if (incremental && lastTimestampRef.current) {
          params.set("since", lastTimestampRef.current);
        }
        const qs = params.toString();
        const res = await fetch(`/api/portal/chat/messages${qs ? `?${qs}` : ""}`, {
          headers: authHeaders(authToken),
        });
        if (!res.ok) throw new Error(`messages ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        markOk();
        if (Array.isArray(data.messages)) {
          if (!incremental) {
            knownIdsRef.current = new Set(data.messages.map((m: ChatMessage) => m.id));
            setMessages(data.messages);
            const last = data.messages[data.messages.length - 1];
            lastTimestampRef.current = last?.timestamp || null;
          } else {
            mergeMessages(data.messages);
          }
        }
      } catch {
        markFail();
      }
    };

    void loadStatus();
    void pollMessages(false);
    timer = setInterval(() => {
      void pollMessages(true);
    }, POLL_MS);

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [authHeaders, mergeMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!messageText.trim() || sending || !token) return;

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
          body: JSON.stringify({
            content: currentMessage,
            senderName: "You",
            senderRole: "client",
          }),
        });

        if (!response.ok) throw new Error("Failed to send message");

        const data = await response.json();
        failCountRef.current = 0;
        setConnected(true);

        if (data.success && data.message) {
          knownIdsRef.current.add(data.message.id);
          setMessages((prev) =>
            prev.map((m) => (m.id === tempMessage.id ? data.message : m))
          );
          if (
            !lastTimestampRef.current ||
            data.message.timestamp > lastTimestampRef.current
          ) {
            lastTimestampRef.current = data.message.timestamp;
          }
        }
        if (data.reply) {
          mergeMessages([data.reply]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => prev.filter((m) => m.id !== tempMessage.id));
        setMessageText(currentMessage);
        failCountRef.current += 1;
        if (failCountRef.current >= FAIL_THRESHOLD) setConnected(false);
      } finally {
        setSending(false);
      }
    },
    [messageText, sending, token, mergeMessages]
  );

  return (
    <PortalLayout title="Live Chat Support">
      <div className="space-y-6 max-w-2xl">
        {!connected && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-300">
                {statusNote ||
                  "Unable to reach chat service. Check your connection and refresh — if the site is up, try signing in again."}
              </p>
            </div>
          </div>
        )}

        <Card className="flex flex-col h-[600px]">
          <CardHeader className="border-b dark:border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Live Chat Support</CardTitle>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {connected ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            {connected && statusNote && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{statusNote}</p>
            )}
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.length === 0 && connected && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                Starting conversation…
              </p>
            )}
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
                disabled={!token || sending}
                className="flex-1"
                data-testid="input-message"
              />
              <Button
                type="submit"
                disabled={!messageText.trim() || !token || sending}
                className="bg-[#5034ff] hover:bg-[#5034ff]/90 text-white"
                data-testid="button-send-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <strong>Response Time:</strong> Assistant replies immediately; team follow-up during business hours
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Outside hours?</strong> Create a ticket at any time and we'll respond within 24 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
