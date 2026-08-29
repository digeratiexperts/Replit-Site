import type { Express, NextFunction, Request, Response } from "express";
import { MARKETPLACE_ELIGIBILITY } from "@shared/checkoutEligibility";

type AuthedRequest = Request & {
  user?: { role?: string; clientId?: string | null };
};

export function registerPortalMarketplaceRoutes(
  app: Express,
  authMiddleware: (req: AuthedRequest, res: Response, next: NextFunction) => unknown,
): void {
  app.get(
    "/api/portal/marketplace",
    authMiddleware,
    (req: AuthedRequest, res: Response) => {
      const clientId = req.user?.clientId ?? null;
      res.setHeader("Cache-Control", "no-store");
      res.json({
        eligibility: MARKETPLACE_ELIGIBILITY,
        items: [],
        status: clientId ? "unavailable" : "unmapped",
        reason: clientId
          ? "Tenant catalog is not available from Hub yet."
          : "This account is not mapped to a client tenant.",
      });
    },
  );
}
