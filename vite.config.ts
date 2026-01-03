import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "path";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const rootDir = import.meta.dirname;

export default defineConfig({
  root: path.resolve(rootDir, "client"),
  plugins: [
    react(),
    tailwindcss(),
    vitePluginManusRuntime(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "client", "src"),
      "@shared": path.resolve(rootDir, "shared"),
      "@assets": path.resolve(rootDir, "attached_assets"),
    },
  },
  envDir: path.resolve(rootDir),
  build: {
    outDir: path.resolve(rootDir, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    https: fs.existsSync(path.join(rootDir, "cert.pem"))
      ? {
          key: fs.readFileSync(path.join(rootDir, "key.pem")),
          cert: fs.readFileSync(path.join(rootDir, "cert.pem")),
        }
      : undefined,
  },
});
