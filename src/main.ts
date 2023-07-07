import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";
import { createPinia } from "pinia";
import './style.scss';
const pinia = createPinia();
const app = createApp(App);
app.use(router);
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));
  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(initialState));
  }
});
app.use(pinia);
app.mount("#app");

document.addEventListener('mousewheel', function (event:any) {//禁用页面缩放
  if (event.wheelDelta || event.detail) {
    event.preventDefault();
  }
}, { capture: false, passive: false });
document.addEventListener('keydown', function (event) {
  if ((event.ctrlKey === true || event.metaKey === true)
    && (event.keyCode === 61 || event.keyCode === 107
      || event.keyCode === 173 || event.keyCode === 109
      || event.keyCode === 187 || event.keyCode === 189)) {
    event.preventDefault();
  }
}, false);
document.addEventListener("click",function(event:MouseEvent){
  if (event.button == 2) {
    return false
  }
})