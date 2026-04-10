import { useEffect, useRef, useCallback } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  theme?: "dark" | "light" | "auto";
}

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export default function TurnstileWidget({ onVerify, onError, theme = "dark" }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  const onErrorRef = useRef(onError);

  onVerifyRef.current = onVerify;
  onErrorRef.current = onError;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !(window as any).turnstile) return;
    if (widgetIdRef.current !== null) {
      (window as any).turnstile.remove(widgetIdRef.current);
    }
    widgetIdRef.current = (window as any).turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme,
      callback: (token: string) => onVerifyRef.current(token),
      "error-callback": () => onErrorRef.current?.(),
    });
  }, [theme]);

  useEffect(() => {
    if ((window as any).turnstile) {
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => renderWidget();
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current !== null && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  return <div ref={containerRef} data-testid="turnstile-widget" className="flex justify-center" />;
}
