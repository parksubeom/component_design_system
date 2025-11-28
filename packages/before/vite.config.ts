// packages/before/vite.config.ts

import { defineConfig } from "vite";
import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// 🚨 주의: packages/before는 테스트 대상이 아니지만,
// CI에서 테스트가 돌아가기 때문에 localStorage 에러 방지를 위해 JSDOM을 강제합니다.

const base: string =
  process.env.NODE_ENV === "production" ? "/front_7th_chapter3-1/" : "";

export default mergeConfig(
  // 1. 순수 Vite 설정
  defineConfig({
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),
  // 2. Vitest 테스트 환경 설정 (JSDOM 강제 적용)
  defineTestConfig({
    test: {
      // ✅ [Fix] TypeScript 에러 방지 및 Vitest 설정 허용
      // ✅ [Fix] CI localStorage 에러 방지
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/test/setup.ts",
      css: true,
    },
  })
);
