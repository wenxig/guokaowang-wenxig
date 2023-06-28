import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
let firstRun=true
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.afterEach((to, from) => {
  const _title = to.meta.title;
  if (!firstRun) {
    if (to.meta.name=="login") {
      firstRun=false
      return false
    }
  }
  if (_title) {
    window.document.title = _title;
  }
});

// 导出默认值
export default router;