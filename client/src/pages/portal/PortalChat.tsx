import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PortalLayout } from "./PortalLayout";
import { Send, AlertCircle } from "lucide-react";

interface ChatMessage {
  id: string;
  author: string;
  role: "client" | "support";
  content: string;
  timestamp: string;
  isRead: boolean;
}

export default function PortalChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      author: "Support Team",
      role: "support",
      content: "Hello! Welcome to our live chat support. How can we help you today?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isRead: true,
    },
  ]);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || sending) return;

    setSending(true);
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      author: "You",
      role: "client",
      content: messageText,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");

    // Simulate API call and support response
    setTimeout(() => {
      const supportResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        author: "Support Agent",
        role: "support",
        content:
          "Thanks for your message. Our support team has received it and will respond shortly. For urgent issues, please call (480) 519-5892.",
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      setMessages((prev) => [...prev, supportResponse]);
      setSending(false);
    }, 1500);
  };

  return (
    <PortalLayout title="Live Chat Support">
      <div className="space-y-6 max-w-2xl">
        {!connected && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-300">
                Connection lost. Please check your internet connection.
              </p>
            </div>
          </div>
        )}

        <Card className="flex flex-col h-[600px]">
          <CardHeader className="border-b dark:border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Live Chat Support</CardTitle>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {connected ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "client" ? "justify-end" : "justify-start"}`}
                data-testid={`message-${message.id}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.role === "client"
                      ? "bg-[#5034ff] text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm font-medium mb-1">{message.author}</p>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === "client" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
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

          {/* Input */}
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

        {/* Info Box */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <strong>Response Time:</strong> Average 5-10 minutes during business hours
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
