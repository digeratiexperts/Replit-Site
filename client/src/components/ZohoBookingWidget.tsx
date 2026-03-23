import { useEffect, useRef, useState } from "react";
import { Loader2, Calendar, ExternalLink } from "lucide-react";

declare global {
  interface Window {
    ZBWidget?: {
      init: (type: string, options: Record<string, unknown>) => void;
    };
  }
}

const ZOHO_EMBED_SCRIPT = "https://static.zohocdn.com/bookings/embed/v1/zbembed.js";
const WIDGET_CODE = import.meta.env.VITE_ZOHO_BOOKING_WIDGET_CODE as string | undefined;
const FALLBACK_URL = "https://meet.digerati-experts.com/#/4323170000000025779";

let scriptLoaded = false;
let scriptLoading = false;
const scriptCallbacks: Array<() => void> = [];

function loadZohoScript(onLoad: () => void) {
  if (scriptLoaded) {
    onLoad();
    return;
  }
  scriptCallbacks.push(onLoad);
  if (scriptLoading) return;
  scriptLoading = true;

  const script = document.createElement("script");
  script.src = ZOHO_EMBED_SCRIPT;
  script.async = true;
  script.onload = () => {
    scriptLoaded = true;
    scriptLoading = false;
    scriptCallbacks.forEach((cb) => cb());
    scriptCallbacks.length = 0;
  };
  script.onerror = () => {
    scriptLoading = false;
  };
  document.head.appendChild(script);
}

interface ZohoBookingWidgetProps {
  instanceId?: string;
  className?: string;
}

export function ZohoBookingWidget({ instanceId = "default", className = "" }: ZohoBookingWidgetProps) {
  const containerId = `zoho-booking-widget-${instanceId}`;
  const initialized = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "no-widget-code">(
    WIDGET_CODE ? "loading" : "no-widget-code"
  );

  useEffect(() => {
    if (!WIDGET_CODE) {
      setStatus("no-widget-code");
      return;
    }
    if (initialized.current) return;

    loadZohoScript(() => {
      if (initialized.current) return;
      initialized.current = true;

      requestAnimationFrame(() => {
        try {
          if (window.ZBWidget) {
            window.ZBWidget.init("bookForm", {
              widgetCode: WIDGET_CODE,
              targetEl: containerId,
            });
            setStatus("ready");
          } else {
            setStatus("no-widget-code");
          }
        } catch {
          setStatus("no-widget-code");
        }
      });
    });

    return () => {
      initialized.current = false;
    };
  }, [containerId]);

  if (status === "no-widget-code") {
    return (
      <NoWidgetCodeFallback className={className} />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0d0d1a]">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          <p className="text-gray-400 text-sm">Loading scheduler…</p>
        </div>
      )}
      <div
        id={containerId}
        className="w-full h-full min-h-[600px]"
        data-testid="zoho-booking-widget"
      />
    </div>
  );
}

function NoWidgetCodeFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-6 bg-[#0d0d1a] rounded-2xl p-10 border border-violet-500/20 min-h-[400px] ${className}`} data-testid="booking-fallback">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
        <Calendar className="w-8 h-8 text-white" />
      </div>
      <div className="text-center max-w-sm">
        <h3 className="text-white font-semibold text-xl mb-2 font-['Space_Grotesk']">
          Ready to Schedule?
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Click below to open our scheduling tool and pick a time that works for you.
          The call is free with no obligation.
        </p>
      </div>
      <a
        href={FALLBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/20"
        data-testid="link-open-booking"
      >
        <Calendar className="w-4 h-4" />
        Open Scheduling Calendar
        <ExternalLink className="w-4 h-4 opacity-70" />
      </a>
      <p className="text-xs text-gray-600 text-center max-w-xs">
        To embed the calendar directly on this page, add your{" "}
        <code className="text-violet-400 bg-white/5 px-1 rounded">VITE_ZOHO_BOOKING_WIDGET_CODE</code>{" "}
        environment variable from Zoho Bookings → Settings → Embed.
      </p>
    </div>
  );
}
