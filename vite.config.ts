import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import inject from "@rollup/plugin-inject";
import postCssPxToRem from "postcss-pxtorem";
import autoprefixer from "autoprefixer";
import viteCompression from 'vite-plugin-compression'
import resolve from "@rollup/plugin-node-resolve";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    resolve(),
    inject({
      $: "jquery", // 这里会自动载入 node_modules 中的 jquery   jquery全局变量
      jQuery: "jquery",
      "windows.jQuery": "jquery",
      _: "lodash-es",
      "windows._": "lodash-es",
    }),
    viteCompression({
      //生成压缩包gz
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
  }),
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
        additionalData: '@import "@/assets/style/global.scss";',
      },
    },
    postcss: {
      // ⚠️关键代码
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 16, // 1rem的大小
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
        }),
        autoprefixer({
          // 自动添加前缀
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
          ],
          grid: true,
        }),
      ],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://121.22.72.189:8081/hgqlx",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    terserOptions: {
      //打包后移除console和注释
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  base: "./",
});
