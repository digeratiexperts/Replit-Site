import { useEffect, useRef, useState } from "react";
import { Loader2, Calendar, ExternalLink } from "lucide-react";

declare global {
  interface Window {
    Bookings?: {
      inlineEmbed: (options: { url: string; parent: string; height?: string }) => void;
    };
  }
}

const EMBED_SCRIPT = "https://bookings.nimbuspop.com/assets/embed.js";
const BOOKING_URL = "https://meet.digerati-experts.com/portal-embed#/digeratexperts";
const FALLBACK_URL = "https://meet.digerati-experts.com/";

let scriptLoaded = false;
let scriptLoading = false;
const scriptCallbacks: Array<() => void> = [];

function loadBookingScript(onLoad: () => void) {
  if (scriptLoaded) {
    onLoad();
    return;
  }
  scriptCallbacks.push(onLoad);
  if (scriptLoading) return;
  scriptLoading = true;

  const script = document.createElement("script");
  script.src = EMBED_SCRIPT;
  script.async = true;
  script.onload = () => {
    scriptLoaded = true;
    scriptLoading = false;
    scriptCallbacks.forEach((cb) => cb());
    scriptCallbacks.length = 0;
  };
  script.onerror = () => {
    scriptLoading = false;
    scriptCallbacks.forEach((cb) => cb());
    scriptCallbacks.length = 0;
  };
  document.head.appendChild(script);
}

interface ZohoBookingWidgetProps {
  instanceId?: string;
  className?: string;
  height?: string;
}

export function ZohoBookingWidget({ instanceId = "default", className = "", height = "600px" }: ZohoBookingWidgetProps) {
  const containerId = `zoho-booking-widget-${instanceId}`;
  const initialized = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (initialized.current) return;

    loadBookingScript(() => {
      if (initialized.current) return;
      initialized.current = true;

      requestAnimationFrame(() => {
        try {
          if (window.Bookings?.inlineEmbed) {
            window.Bookings.inlineEmbed({
              url: BOOKING_URL,
              parent: `#${containerId}`,
              height,
            });
            setStatus("ready");
          } else {
            setStatus("error");
          }
        } catch {
          setStatus("error");
        }
      });
    });

    return () => {
      initialized.current = false;
    };
  }, [containerId, height]);

  if (status === "error") {
    return <BookingFallback className={className} />;
  }

  return (
    <div className={`relative ${className}`}>
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0d0d1a] z-10">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          <p className="text-gray-400 text-sm">Loading scheduler…</p>
        </div>
      )}
      <div
        id={containerId}
        className="w-full"
        style={{ minHeight: height }}
        data-testid="zoho-booking-widget"
        onLoad={() => setStatus("ready")}
      />
    </div>
  );
}

function BookingFallback({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 bg-[#0d0d1a] rounded-2xl p-10 border border-violet-500/20 min-h-[400px] ${className}`}
      data-testid="booking-fallback"
    >
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
    </div>
  );
}
