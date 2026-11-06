import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// brief/fixtures.ts をそのまま読み込むため、1 つ上のディレクトリの読み取りを許可する
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true, fs: { allow: [".."] } },
  preview: { port: 5173, strictPort: true },
});
