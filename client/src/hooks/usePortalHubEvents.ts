import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

function shouldInvalidate(queryKey: readonly unknown[]): boolean {
  const first = String(queryKey[0] ?? "");
  return first.includes("/api/portal") || first.includes("/api/store");
}

export function usePortalHubEvents(): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.pathname.startsWith("/portal")) return;

    const source = new EventSource("/api/portal/events/stream");
    source.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as { eventType?: string; entityId?: string };
        if (!payload.eventType || payload.eventType === "stream.ready") return;
        void queryClient.invalidateQueries({
          predicate: (query) => shouldInvalidate(query.queryKey),
        });
      } catch {
        /* ignore malformed SSE */
      }
    };
    return () => source.close();
  }, [queryClient]);
}
