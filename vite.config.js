import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // server: {
  //   port: 5173,
  //   proxy: {
  //     "/api": {
  //       target: "https://backend-learning-diiq.onrender.com/api/v1",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
