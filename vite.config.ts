import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Mantém o alias com o mesmo caminho do tsconfig
    },
  },
  server: {
    fs: {
      cachedChecks: false,
    },
  },
});
