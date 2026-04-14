import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
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
  const dbAvailable = await testDatabaseConnection().catch(() => false);
  const openaiConfigured = !!(process.env.AI_INTEGRATIONS_OPENAI_BASE_URL && process.env.AI_INTEGRATIONS_OPENAI_API_KEY);
  
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
  log("⚠️ Zoho Payments not configured - set ZOHO_PAYMENTS_API_KEY and ZOHO_PAYMENTS_SIGNING_KEY");
}

// --------- Zoho Payments Webhook Route BEFORE JSON middleware (needs raw body for signature verification)
app.post(
  "/api/webhooks/zoho-payments",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-zoho-webhook-signature"] as string || req.headers["x-webhook-signature"] as string;
      if (!signature) {
        console.error("[ZOHO PAYMENTS WEBHOOK] Missing signature header");
        return res.status(400).json({ error: "Missing webhook signature" });
      }

      const isValid = zohoPayments.verifyWebhookSignature(req.body, signature);
      if (!isValid) {
        console.error("[ZOHO PAYMENTS WEBHOOK] Invalid signature");
        return res.status(401).json({ error: "Invalid webhook signature" });
      }

      const event = JSON.parse(req.body.toString("utf-8"));
      const eventType = event.event_type || event.type;

      if (eventType === "payment.completed" || eventType === "paymentsession.completed" || eventType === "payment_session.success") {
        const sessionId = event.data?.payment_session_id || event.payment_session_id || event.data?.id;
        const paymentId = event.data?.payment_id || event.payment_id;

        if (sessionId) {
          const { db } = await import("./db");
          const { storeOrders } = await import("@shared/schema");
          const { eq } = await import("drizzle-orm");

          const [existingOrder] = await db.select().from(storeOrders)
            .where(eq(storeOrders.zohoPaymentSessionId, sessionId)).limit(1);

          const oldStatus = existingOrder?.status || "unknown";

          await db.update(storeOrders)
            .set({
              status: "paid",
              zohoPaymentId: paymentId || sessionId,
              paidAt: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(storeOrders.zohoPaymentSessionId, sessionId));

          console.log(`[ZOHO PAYMENTS WEBHOOK] Order paid: session=${sessionId}`);
          console.log(`[SECURITY] CHECKOUT_COMPLETED`, {
            orderId: existingOrder?.id,
            orderNumber: existingOrder?.orderNumber,
            paymentMethod: "zoho",
            total: existingOrder?.total,
            zohoPaymentSessionId: sessionId,
            zohoPaymentId: paymentId
          });
          console.log(`[SECURITY] ORDER_STATUS_CHANGED`, {
            orderId: existingOrder?.id,
            orderNumber: existingOrder?.orderNumber,
            oldStatus,
            newStatus: "paid",
            triggeredBy: "zoho_payments_webhook"
          });
        }
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error("[ZOHO PAYMENTS WEBHOOK ERROR]", error);
      res.status(500).json({ error: error.message || "Webhook handler failed" });
    }
  }
);

// --------- Basic parsers (after health and webhook so nothing delays them)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

  // Debug endpoint to see registered routes
  app.get("/__debug/routes", (_req, res) =>
    res.json({ routes: listEndpoints() }),
  );

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
      log(`🔎 Routes: https://${slug}-${owner}.replit.app/__debug/routes`);
    }
  });
})();
