import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // Basic configuration
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",

    // Test file patterns
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".next"],

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "lcov"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/*.d.ts",
        "**/*.config.ts",
        "**/*.stories.tsx",
        "src/types/**",
      ],
    },

    // Watch mode configuration
    watch: false,

    // Benchmark configuration (optional)
    benchmark: {
      include: ["**/*.{bench,benchmark}.{ts,tsx}"],
    },

    // Aliases (match your tsconfig.json)
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
