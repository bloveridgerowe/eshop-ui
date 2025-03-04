import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  server: {
    watch: {
      usePolling: true, // ✅ Forces Vite to detect changes properly
      interval: 100, // ✅ Check for file changes every 100ms
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})