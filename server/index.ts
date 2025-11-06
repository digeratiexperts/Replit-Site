import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

const app = express();
const server = createServer(app);

// Simple logging utility
const log = (message: string) => {
  const timestamp = new Date().toISOString().split("T")[1].split(".")[0];
  console.log(`[${timestamp}] ${message}`);
};

// --------- EARLY, LOUD TRACE so we know what URL actually hit Express
app.use((req, _res, next) => {
  log(`→ ${req.method} ${req.originalUrl}`);
  next();
});

// --------- HEALTH MUST WIN (placed before everything else)
app.all("/api/health", (_req, res) => {
  const port = process.env.REPLIT_SERVER_PORT || process.env.PORT || "unknown";
  res.status(200).json({ status: "ok", env: app.get("env"), port });
});

// Backup simple health
app.all("/healthz", (_req, res) => res.status(200).send("ok"));

// --------- Basic parsers (after health so nothing delays it)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    // Serve static files in production
    const distPath = path.resolve(process.cwd(), "dist/public");
    const indexPath = path.join(distPath, "index.html");
    
    // Serve static files
    app.use(express.static(distPath));
    
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
