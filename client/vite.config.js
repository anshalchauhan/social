import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // To fix cors errors
    proxy: {
      "/api": {
        // target: "http://localhost:8000",
        // For container config
        target: "http://api:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
