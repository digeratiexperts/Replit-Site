import { useEffect, useRef, useState } from "react";
import { Loader2, Calendar, ExternalLink, Phone } from "lucide-react";

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
const PHONE_DISPLAY = "325-480-9870";
const PHONE_HREF = "tel:+13254809870";

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
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#050312]">
          <Loader2 className="h-7 w-7 animate-spin text-[#D3126A]" />
          <p className="text-sm font-medium text-white/70">Loading the calendar…</p>
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
      className={`flex h-full min-h-[22rem] flex-col justify-center rounded-xl border border-de-hairline bg-de-raised p-6 md:p-8 ${className}`}
      data-testid="booking-fallback"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D3126A]">
        Next step
      </p>
      <h3 className="mt-2 font-heading text-xl font-semibold tracking-[-0.02em] text-white md:text-2xl">
        Open the calendar
      </h3>
      <p className="mt-3 text-base font-medium leading-relaxed text-white/80">
        Pick a time on our scheduling page. Thirty minutes, no obligation — we look at the
        environment before recommending a package.
      </p>
      <a
        href={FALLBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#D3126A] px-5 text-base font-semibold text-white transition-colors hover:bg-[#f0187a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151217]"
        data-testid="link-open-booking"
      >
        <Calendar className="h-4 w-4" aria-hidden="true" />
        Open scheduling calendar
        <ExternalLink className="h-4 w-4 opacity-80" aria-hidden="true" />
      </a>
      <a
        href={PHONE_HREF}
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 text-base font-semibold text-white hover:text-[#D3126A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]"
      >
        <Phone className="h-4 w-4 text-[#D3126A]" aria-hidden="true" />
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}
