import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";
import { registerRoutes } from "./routes";

const app = express();
const server = createServer(app);

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

// --------- Register your API routes (these should mount under /api)
await registerRoutes(app);

// --------- Vite in dev, Static in prod (NEVER touch /api/*)
if (app.get("env") === "development") {
  await setupVite(app, server);
} else {
  serveStatic(app);
}

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
