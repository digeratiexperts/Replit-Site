import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes, authMiddleware, requireRole } from "./routes";
import { registerSecureZohoStoreCheckout } from "./secureStoreCheckout";
import { registerPublicSupportChat } from "./publicSupportChat";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import compression from "compression";
import { zohoPayments } from "./zohoPayments";
import { setupCrossServiceHandlers } from "./crossServiceHandler";
import { eventBus, EventTypes } from "./eventBus";

process.on('unhandledRejection', (reason, promise) => {
  const errorStr = String(reason);
  if (errorStr.includes('endpoint has been disabled') || 
      errorStr.includes('Connection terminated') ||
      errorStr.includes('connection to server')) {
    return;
  }
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  const errorStr = String(error.message);
  if (errorStr.includes('endpoint has been disabled') || 
      errorStr.includes('Connection terminated') ||
      errorStr.includes('connection to server')) {
    console.log('⚠️ Database error caught and handled (non-fatal)');
    return;
  }
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

const app = express();
const server = createServer(app);

app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// Initialize cross-service communication
setupCrossServiceHandlers();

// Simple logging utility
const log = (message: string) => {
  const timestamp = new Date().toISOString().split("T")[1].split(".")[0];
  console.log(`[${timestamp}] ${message}`);
};

// --------- Security headers (OWASP recommended) - applied globally before all routes
import { setSecurityHeaders } from "./middleware/security";
app.use(setSecurityHeaders);

// --------- EARLY, LOUD TRACE so we know what URL actually hit Express
app.use((req, _res, next) => {
  log(`→ ${req.method} ${req.originalUrl}`);
  next();
});

// --------- COMPREHENSIVE HEALTH CHECK
app.all("/api/health", async (_req, res) => {
  const port = process.env.REPLIT_SERVER_PORT || process.env.PORT || "unknown";
  let dbAvailable = false;
  try {
    const { pool } = await import("./db");
    if (pool) {
      const client = await pool.connect();
      client.release();
      dbAvailable = true;
    }
  } catch { dbAvailable = false; }
  const openaiConfigured = !!(
    process.env.OPENAI_API_KEY ||
    process.env.OPENAI_API ||
    (process.env.AI_INTEGRATIONS_OPENAI_BASE_URL && process.env.AI_INTEGRATIONS_OPENAI_API_KEY)
  );
  
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    env: app.get("env"),
    port,
    services: {
      database: dbAvailable ? "connected" : "fallback_memory",
      zohoPayments: zohoPayments.isConfigured() ? "configured" : "not_configured",
      openai: openaiConfigured ? "configured" : "not_configured",
    },
    uptime: process.uptime(),
  };
  
  res.status(200).json(health);
});

// Backup simple health for load balancers
app.all("/healthz", (_req, res) => res.status(200).send("ok"));

// Readiness check for deployments
app.all("/ready", (_req, res) => res.status(200).json({ ready: true }));

if (zohoPayments.isConfigured()) {
  log("✅ Zoho Payments configured");
} else {
  log("⚠️ Zoho Payments not configured - set ZOHO_PAYMENTS_ACCOUNT_ID, OAuth refresh credentials, and ZOHO_PAYMENTS_SIGNING_KEY");
}

// --------- Zoho Payments Webhook Route BEFORE JSON middleware (needs raw body for signature verification)
app.post(
  "/api/webhooks/zoho-payments",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-zoho-webhook-signature"] as string;
      if (!signature) {
        console.error("[ZOHO PAYMENTS WEBHOOK] Missing X-Zoho-Webhook-Signature header");
        return res.status(400).json({ error: "Missing webhook signature" });
      }

      const isValid = zohoPayments.verifyWebhookSignature(req.body, signature);
      if (!isValid) {
        console.error("[ZOHO PAYMENTS WEBHOOK] Invalid signature");
        return res.status(401).json({ error: "Invalid webhook signature" });
      }

      const event = JSON.parse(req.body.toString("utf-8"));
      const parsed = zohoPayments.parseWebhookEvent(event);
      const metadata = Object.fromEntries(parsed.metadata.map((item) => [item.key, item.value]));
      let fulfillOrderId: string | null = null;

      if (parsed.eventType === "payment.succeeded") {
        // Persist the durable/idempotent paid state before acknowledging Zoho.
        // Fulfillment itself runs only after the 2xx response so provider retries
        // are about payment-state durability, not slow provisioning work.
        const { db } = await import("./db");
        const { storeOrders } = await import("@shared/schema");
        const { eq } = await import("drizzle-orm");

        const metadataOrderId = metadata.orderId || null;
        const orderNumber = metadata.orderNumber || parsed.referenceNumber || parsed.invoiceNumber || null;
        let existingOrder: any = null;

        if (metadataOrderId) {
          [existingOrder] = await db.select().from(storeOrders)
            .where(eq(storeOrders.id, metadataOrderId)).limit(1);
        }
        if (!existingOrder && orderNumber) {
          [existingOrder] = await db.select().from(storeOrders)
            .where(eq(storeOrders.orderNumber, orderNumber)).limit(1);
        }

        if (existingOrder) {
          const oldStatus = existingOrder.status || "unknown";
          const alreadyPastPaid = ["paid", "processing", "provisioning", "completed"].includes(oldStatus);

          if (!alreadyPastPaid) {
            await db.update(storeOrders)
              .set({
                status: "paid",
                zohoPaymentId: parsed.paymentId || existingOrder.zohoPaymentId || null,
                paidAt: new Date(),
                updatedAt: new Date(),
              })
              .where(eq(storeOrders.id, existingOrder.id));

            console.log("[SECURITY] ORDER_STATUS_CHANGED", {
              orderId: existingOrder.id,
              orderNumber: existingOrder.orderNumber,
              oldStatus,
              newStatus: "paid",
              triggeredBy: "zoho_payments_webhook",
            });
          } else if (!existingOrder.zohoPaymentId && parsed.paymentId) {
            await db.update(storeOrders)
              .set({
                zohoPaymentId: parsed.paymentId,
                paidAt: existingOrder.paidAt || new Date(),
                updatedAt: new Date(),
              })
              .where(eq(storeOrders.id, existingOrder.id));
          }

          console.log("[SECURITY] CHECKOUT_COMPLETED", {
            orderId: existingOrder.id,
            orderNumber: existingOrder.orderNumber,
            paymentMethod: "zoho",
            total: existingOrder.total,
            zohoPaymentId: parsed.paymentId,
          });
          fulfillOrderId = existingOrder.id;
        } else {
          // Portal invoice payments are not StoreOrder records; Zoho remains the billing system of record.
          console.info("[ZOHO PAYMENTS WEBHOOK] Verified payment succeeded with no local store order", {
            paymentId: parsed.paymentId,
            referenceNumber: parsed.referenceNumber,
            invoiceNumber: parsed.invoiceNumber,
          });
        }
      } else if (parsed.eventType === "payment.failed" || parsed.eventType === "payment.pending") {
        // A failed/pending attempt can later succeed. Never fulfill or permanently fail the order here.
        console.info("[ZOHO PAYMENTS WEBHOOK] Payment attempt update", {
          eventType: parsed.eventType,
          paymentId: parsed.paymentId,
          referenceNumber: parsed.referenceNumber,
          status: parsed.status,
        });
      }

      // Acknowledge only after signature parsing and durable payment-state work.
      res.json({ received: true });

      if (fulfillOrderId) {
        const orderId = fulfillOrderId;
        void import("./services/orderFulfillment")
          .then(({ fulfillPaidOrder }) => fulfillPaidOrder(orderId))
          .catch((error) => {
            console.error("[ZOHO PAYMENTS WEBHOOK FULFILLMENT ERROR]", error);
          });
      }
      return;
    } catch (error: any) {
      console.error("[ZOHO PAYMENTS WEBHOOK ERROR]", error);
      return res.status(500).json({ error: "Webhook processing failed" });
    }
  }
);

// --------- Basic parsers (after health and webhook so nothing delays them)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Register the hardened checkout route before the legacy routes module so browser-supplied
// prices can never reach the older checkout implementation. The legacy handler remains
// temporarily for a small, reviewable security patch and can be removed in a follow-up cleanup.
registerSecureZohoStoreCheckout(app, authMiddleware as any, requireRole as any);

// Internal DE sales pages were removed from the public site (they now live in
// the Intelligence Hub behind auth). Redirect any old /internal URL to home so
// stale links and crawlers never reach the SPA catch-all.
app.use((req, res, next) => {
  if (req.path === "/internal" || req.path.startsWith("/internal/")) {
    return res.redirect(301, "/");
  }
  next();
});

// Short paths → canonical /portal/* (avoids SPA 404 on /login).
// Apply on any host: portal bookmarks and marketing-domain typos both land correctly.
app.use((req, res, next) => {
  if (req.path === "/login") {
    const q = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    return res.redirect(301, `/portal/login${q}`);
  }
  if (req.path === "/signup") {
    const q = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    return res.redirect(301, `/portal/signup${q}`);
  }
  next();
});

// Legacy WordPress / junk query URLs — do not index or resurrect Ethos demo content.
app.use((req, res, next) => {
  if (req.path === "/" && Object.prototype.hasOwnProperty.call(req.query, "bbp_search")) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    return res
      .status(410)
      .type("text/plain")
      .send("Gone. This legacy WordPress search URL is no longer available.");
  }
  next();
});

// SEO files (sitemap.xml, robots.txt, llms.txt) live in repo-root public/.
// Serve with short CDN TTL so Cloudflare does not stick old robots for weeks.
const publicDir = path.resolve(process.cwd(), "public");
function sendSeoFile(res: import("express").Response, file: string, contentType: string) {
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
  res.setHeader("CDN-Cache-Control", "max-age=300");
  res.setHeader("Cloudflare-CDN-Cache-Control", "max-age=300");
  return res.sendFile(path.join(publicDir, file));
}
app.get("/robots.txt", (_req, res) => sendSeoFile(res, "robots.txt", "text/plain; charset=utf-8"));
app.get("/sitemap.xml", (_req, res) => sendSeoFile(res, "sitemap.xml", "application/xml; charset=utf-8"));
app.get("/llms.txt", (_req, res) => sendSeoFile(res, "llms.txt", "text/plain; charset=utf-8"));
app.use(
  express.static(publicDir, {
    index: false,
    maxAge: "1h",
  }),
);

/** Utility to list routes for debugging */
function listEndpoints(): Array<{ method: string; path: string }> {
  const routes: Array<{ method: string; path: string }> = [];
  const stack: any[] = (app as any)?._router?.stack || [];
  const dig = (layer: any, prefix = "") => {
    if (layer.route && layer.route.path) {
      const methods = Object.keys(layer.route.methods || {}).map((m) =>
        m.toUpperCase(),
      );
      methods.forEach((m) =>
        routes.push({ method: m, path: prefix + layer.route.path }),
      );
    } else if (layer.name === "router" && layer.handle?.stack) {
      const newPrefix =
        layer.regexp && layer.regexp.fast_star
          ? prefix + "*"
          : prefix + (layer.regexp?.fast_slash ? "" : "");
      layer.handle.stack.forEach((l: any) => dig(l, prefix));
    }
  };
  stack.forEach((l) => dig(l, ""));
  return routes;
}

// --------- Setup async initialization
(async () => {
  // Register your API routes (these should mount under /api)
  await registerRoutes(app);
  registerPublicSupportChat(app);

  // Vite in dev, Static in prod (NEVER touch /api/*)
  if (app.get("env") === "development") {
    // Middleware to fix Host header for Vite compatibility with Replit proxies
    app.use((req, _res, next) => {
      // Rewrite Host header to localhost for Vite's host checking
      if (req.headers.host && req.headers.host.includes('.replit.dev')) {
        req.headers.host = 'localhost:5000';
      }
      next();
    });

    // Set up Vite development server
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server },
      },
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
    });
    
    app.use(vite.middlewares);
    log("✨ Vite development server middleware attached");
  } else {
    // Serve static files in production with caching
    const distPath = path.resolve(process.cwd(), "dist/public");
    const indexPath = path.join(distPath, "index.html");
    
    // Serve static files with aggressive caching for assets
    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true,
      lastModified: true,
      setHeaders: (res, filePath) => {
        // Cache JS/CSS/fonts for 1 year (they have hashes in filenames)
        if (filePath.match(/\.(js|css|woff2?|ttf|eot)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
        // Cache images for 1 month
        else if (filePath.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=2592000');
        }
        // HTML files - no cache (always fresh)
        else if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
      }
    }));
    
    // SPA fallback - send index.html for all non-API routes
    app.get("*", (req, res, next) => {
      // Skip API routes
      if (req.path.startsWith("/api")) {
        return next();
      }
      
      // Check if index.html exists
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        log(`⚠️ Production build not found at ${distPath}`);
        res.status(404).send(`
          <h1>Production Build Not Found</h1>
          <p>Please run <code>npm run build</code> to create a production build.</p>
        `);
      }
    });
    
    log(`📦 Serving static files from ${distPath}`);
  }

  // Debug endpoint — never expose route inventory in production
  if (process.env.NODE_ENV !== "production") {
    app.get("/__debug/routes", (_req, res) =>
      res.json({ routes: listEndpoints() }),
    );
  }

  // --------- JSON 404 so we can see what path failed
  app.use((req, res) => {
    res.status(404).json({
      error: "Not Found",
      path: req.originalUrl,
      knownHealth: ["/api/health", "/healthz"],
    });
  });

  // --------- Central error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    log(`✖ ${status} ${err.message || "Internal Server Error"}`);
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  // --------- Port + listen
  const port = parseInt(
    process.env.REPLIT_SERVER_PORT || process.env.PORT || "8080",
    10,
  );
  const host = "0.0.0.0";

  log(
    `🌐 Using port: ${port} (PORT=${process.env.PORT || "unset"}, REPLIT_SERVER_PORT=${process.env.REPLIT_SERVER_PORT || "unset"})`,
  );

  server.listen(port, host, () => {
    log(`🚀 Running on http://${host}:${port}`);
    const slug = process.env.REPL_SLUG;
    const owner = process.env.REPL_OWNER;
    if (slug && owner) {
      log(`🌍 Try: https://${slug}-${owner}.replit.app/api/health`);
      if (process.env.NODE_ENV !== "production") {
        log(`🔎 Routes: https://${slug}-${owner}.replit.app/__debug/routes`);
      }
    }
  });
})();