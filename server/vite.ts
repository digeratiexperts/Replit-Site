import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Vite configuration for Replit + Express hybrid
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "5173", 10),

    // 🧠 Allow Replit proxy hostnames and your custom domain
    allowedHosts: [
      // Your specific Replit proxy (from the error message)
      "9517f736-dc2e-4be4-b5f7-40ad883d6514-00-10j76i28dpb0z.janeway.replit.dev",

      // Dynamic Replit slugs and wildcards
      `${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.replit.app`,
      `${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.id.repl.co`,
      ".replit.app",
      ".repl.co",
      ".janeway.replit.dev", // covers Replit’s internal proxy cluster
    ],

    // Useful for hot reload through Replit
    watch: {
      usePolling: true,
      interval: 100,
    },
  },

  // 🧩 Optional build tweaks for smoother Express static serving
  build: {
    outDir: "public",
    emptyOutDir: true,
  },

  // 🔍 Resolve aliases if your project uses @ paths
  resolve: {
    alias: {
      "@": "/client/src",
    },
  },
});
