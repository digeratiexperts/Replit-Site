import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const ts = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${ts} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    appType: "custom",
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
  });

  // NEVER intercept /api/*
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/api")) return next();
    vite.middlewares(req, res, next);
  });

  // Serve index.html for non-API GETs
  app.get("*", async (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) return next();
    try {
      const clientIndex = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let html = await fs.promises.readFile(clientIndex, "utf-8");
      html = html.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(req.originalUrl, html);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "..", "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(`Missing build directory: ${distPath}`);
  }

  // Static assets
  app.use(express.static(distPath));

  // SPA fallback for non-API routes
  app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"));
  });
}
