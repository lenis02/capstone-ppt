import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 등 서브경로 배포 시: 빌드 전에 VITE_BASE_PATH 설정
// 예: cross-env VITE_BASE_PATH=/repo-name/ npm run build
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
});
