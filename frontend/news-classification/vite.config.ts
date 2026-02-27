import { defineConfig } from "vite";
import path from "path";

import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        cookieDomainRewrite: {
          "*": "localhost",
        },
        cookiePathRewrite: {
          "*": "/",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
