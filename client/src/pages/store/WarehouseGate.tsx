import { lazy, Suspense, useEffect, useState } from "react";
import { PageLoadingSkeleton } from "@/components/LoadingSkeleton";
import NotFound from "@/pages/not-found";

const WarehouseApp = lazy(() => import("./WarehouseApp"));

/**
 * Tiny gate with no catalog imports. WarehouseApp (SKUs, vendors, cart)
 * loads only after the server confirms admin staff.
 */
export default function WarehouseGate() {
  const [state, setState] = useState<"loading" | "ok" | "deny">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/internal/warehouse/session", { credentials: "include" })
      .then((response) => {
        if (!cancelled) setState(response.ok ? "ok" : "deny");
      })
      .catch(() => {
        if (!cancelled) setState("deny");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "loading") return <PageLoadingSkeleton />;
  if (state === "deny") return <NotFound />;

  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <WarehouseApp />
    </Suspense>
  );
}
