import { defineConfig } from "vite";
import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config"; // ✅ Import 추가
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const base: string =
  process.env.NODE_ENV === "production" ? "/front_7th_chapter3-1/" : "";

// https://vite.dev/config/
export default mergeConfig(
  // ✅ mergeConfig로 두 설정을 합칩니다.
  defineConfig({
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),
  defineTestConfig({
    // ✅ Vitest 전용 설정 블록
    test: {
      // 🚨 테스트 실패의 주요 원인:
      // 1. globals: true (describe, it 등을 전역에서 사용 가능)
      globals: true,
      // 2. environment: "jsdom" (React 컴포넌트 렌더링을 위한 브라우저 환경 제공)
      environment: "jsdom",
      // 3. setupFiles: "./src/test/setup.ts" (Jest-dom 및 CSS Mocking 파일 로드)
      setupFiles: "./src/test/setup.ts",
      // 4. css: true (CSS/Tailwind 모듈 처리를 위한 설정)
      css: true,
    },
  })
);
