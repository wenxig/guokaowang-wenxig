import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    inject({
      $: "jquery", // 这里会自动载入 node_modules 中的 jquery   jquery全局变量
      jQuery: "jquery",
      "windows.jQuery": "jquery",
      _: "lodash-es",
      "windows._": "lodash-es",
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "*": path.resolve(__dirname, "./"),
    },
  },
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/mixin.scss";'
      }
    }
  },
  base:"./"
});
