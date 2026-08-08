import { useEffect, useState } from "react";
import { MessageCircle, X, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ZohoASAPWidgetProps {
  isEnabled?: boolean;
  accountId?: string;
  portalId?: string;
  customCSS?: string;
}

export const ZohoASAPWidget = ({
  isEnabled = true,
  accountId,
  portalId,
  customCSS,
}: ZohoASAPWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"support" | "kb" | "status">("support");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        /* ignore */
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
    // Lazy-load Zoho ASAP after idle / first interaction so it doesn't compete with LCP.
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

    const idle =
      "requestIdleCallback" in window
        ? (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(load, {
            timeout: 4000,
          })
        : window.setTimeout(load, 2500);

    const onInteract = () => load();
    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      if ("cancelIdleCallback" in window && typeof idle === "number") {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle as number);
      }
    };
  }, [isEnabled, accountId, portalId]);

  const handleSubmitTicket = async () => {
    if (!email || !subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/portal/zoho/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subject,
          description: message,
          priority: "Medium",
        }),
      });

      if (!response.ok) throw new Error("Failed to create ticket");

      toast({
        title: "Success",
        description: "Support ticket created. We'll be in touch shortly!",
      });

      setEmail("");
      setSubject("");
      setMessage("");
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEnabled) return null;

  return (
    <>
      {/* Floating Widget Launcher — sit above cookie banner until consent is stored */}
      <div
        className={`fixed right-6 ${cookieBannerClear ? "bottom-6" : "bottom-28"} z-[100]`}
        data-testid="widget-zoho-asap-container"
      >
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-600 via-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/35 hover:shadow-xl hover:shadow-pink-500/45 transform transition-all duration-300 hover:scale-110 flex items-center justify-center"
            data-testid="button-open-asap-widget"
            title="Open Support"
          >
            <MessageCircle size={24} />
            <span
              className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-black text-xs rounded-full flex items-center justify-center font-bold"
              data-testid="badge-support-indicator"
            >
              ?
            </span>
          </button>
        )}

        {/* Widget Panel */}
        {isOpen && (
          <div className="absolute bottom-0 right-0 w-[420px] max-w-[90vw] max-h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all border border-gray-200 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-900 text-white p-4 flex justify-between items-center flex-shrink-0">
              <div>
                <h3
                  className="font-bold text-lg"
                  data-testid="text-widget-title"
                >
                  Digerati Experts Support
                </h3>
                <p
                  className="text-sm text-purple-100"
                  data-testid="text-widget-status"
                >
                  We typically reply in minutes
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded"
                data-testid="button-close-widget"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b flex bg-gray-50 flex-shrink-0">
              {(
                ["support", "kb", "status"] as const
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-2 text-[13px] font-semibold transition-all flex flex-col items-center gap-1 ${
                    activeTab === tab
                      ? "text-purple-600 bg-white"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
                  data-testid={`button-tab-${tab}`}
                >
                  <span>
                    {tab === "support"
                      ? "Support"
                      : tab === "kb"
                        ? "Knowledge Base"
                        : "Status"}
                  </span>
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="h-0.5 w-12 bg-purple-600 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto flex-1">
              {activeTab === "support" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-support-email"
                      className="text-sm h-9"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Subject
                    </label>
                    <Input
                      placeholder="Brief description"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      data-testid="input-support-subject"
                      className="text-sm h-9"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Message
                    </label>
                    <Textarea
                      placeholder="How can we help?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      data-testid="input-support-message"
                      rows={3}
                      className="text-sm resize-none min-h-[80px]"
                    />
                  </div>

                  <Button
                    onClick={handleSubmitTicket}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-10 mt-2"
                    data-testid="button-submit-support"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                    <Send size={16} className="ml-2" />
                  </Button>
                </div>
              )}

              {activeTab === "kb" && (
                <div className="space-y-3">
                  <p
                    className="text-sm text-gray-600 mb-3"
                    data-testid="text-kb-intro"
                  >
                    Browse our knowledge base:
                  </p>
                  <div className="space-y-2">
                    {[
                      { title: "Getting Started", url: "/support/knowledge-base" },
                      { title: "Security Best Practices", url: "/resources/security-checklist" },
                      { title: "Troubleshooting", url: "/support/knowledge-base" },
                      { title: "Account Management", url: "/portal/settings" },
                    ].map((article) => (
                      <a
                        key={article.title}
                        href={article.url}
                        className="block p-2 text-sm text-purple-600 hover:bg-purple-50 rounded transition-colors"
                        data-testid={`link-kb-${article.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        → {article.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "status" && (
                <div className="space-y-3">
                  <div
                    className="flex items-start space-x-2 p-2 bg-green-50 rounded"
                    data-testid="status-all-systems"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        All Systems Operational
                      </p>
                      <p className="text-xs text-green-700">
                        Last updated 2 minutes ago
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    {[
                      { service: "Support Portal", status: "Operational" },
                      { service: "Portal API", status: "Operational" },
                      { service: "Desktop Agents", status: "Operational" },
                    ].map((item) => (
                      <div
                        key={item.service}
                        className="flex justify-between p-2 border rounded text-gray-600"
                        data-testid={`status-item-${item.service.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <span>{item.service}</span>
                        <span className="text-green-600 font-medium">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-3 border-t text-center">
              <p className="text-xs text-gray-500">
                Powered by{" "}
                <a
                  href="https://www.zoho.com/desk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                  data-testid="link-zoho-powered"
                >
                  Zoho Desk & Flow
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      {customCSS && (
        <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      )}
    </>
  );
};
