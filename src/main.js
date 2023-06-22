import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import localForage from 'localforage';
const pinia = createPinia();
const app = createApp(App);
window.localForage = localForage
app.use(router);
app.use(pinia);
app.mount("#app");

document.addEventListener('mousewheel', function(e) { //禁用页面缩放
  e = e || window.event;
  if ((e.wheelDelta && event.ctrlKey) || e.detail) {
    event.preventDefault();
  }
}, {
  capture: false,
  passive: false
});
document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey === true || event.metaKey === true) &&
    (event.keyCode === 61 || event.keyCode === 107 ||
      event.keyCode === 173 || event.keyCode === 109 ||
      event.keyCode === 187 || event.keyCode === 189)) {
    event.preventDefault();
  }
}, false);
document.onkeydown = function HandleTabKey(evt) { //禁用tab选择
  if (evt.keyCode == 9) {
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }
  }
}
document.oncontextmenu = function (e) {
  e.preventDefault()
  return false
}