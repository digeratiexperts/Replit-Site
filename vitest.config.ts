import { defineConfig, configDefaults } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["client/src/**/*.test.ts", "server/**/*.test.ts", "scripts/**/*.test.ts"],
    // Pre-existing config correction: this suite uses node:test via `npm run test:advisor`
    // (tsx --test), not Vitest. Including it made CI fail with "No test suite found".
    exclude: [...configDefaults.exclude, "server/services/msp-advisor/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
