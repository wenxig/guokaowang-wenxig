<script setup lang="ts">
import alertbox from "@/components/alertbox.vue";
import { ref, reactive, onMounted, inject, watch } from "vue";
import { useUserTemp } from "@/store/userTemp";
import post, { callback } from "@/service/axios.ts";
import { Router, useRouter } from "vue-router";
import chilunSvg from "./svgOfChilun.vue";
import serverList from "@/assets/json/server.json";
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from "@tauri-apps/api";
if (localStorage.server == undefined) {
  localStorage.server = "http://121.22.72.189:8081/hgqlx";
}
const router: Router = useRouter();
const userTemp = useUserTemp();
let showPop = ref<boolean>(false);
let name = ref<string>("030204180338");
let password = ref<string>("12866646");
let alertData = reactive<{
  show: boolean;
  text: string;
  title: string;
}>({
  show: false,
  text: "",
  title: "",
});
let chilun_size = ref<string>("20vh");
let reload = inject("reload") as Function;
let showMeun = ref<boolean>(false);
watch(showPop, (data: boolean) => {
  if (data) {
    setTimeout(() => {
      showMeun.value = true;
    }, 10);
  }
});
watch(showMeun, (data: boolean) => {
  if (!data) {
    setTimeout(() => {
      showPop.value = false;
    }, 300);
  }
});
interface serverType {
  host: string;
  name: string;
  type: string;
  pwd?: string;
  user?: string;
}
function isthis(t: serverType): string {
  if (t.host == localStorage.server) {
    return "isthis";
  }
  return "";
}
function selServer(selObj: serverType): void {
  if (selObj.type == "tiny") {
    localStorage.server = selObj.host;
    localStorage.serverUser = selObj.user;
    localStorage.serverPwd = selObj.pwd;
    reload();
  } else {
    localStorage.server = selObj.host;
    localStorage.serverUser = "";
    localStorage.serverPwd = "";
    reload();
  }
}
function login(): void {
  alertData.show = true;
  alertData.text = "数据库初始化";
  alertData.title = "加载中";
  let postdata = {
    root: {
      stuno: name.value,
      stupwd: password.value,
      lcmacinfo: "89A05A71",
      IP: sessionStorage.getItem("login_ip"),
      proid: "hgqxxjs",
      unitno: "030204",
    },
  };
  post(
    "/api/InteractData/XmlCheckStuLogin.aspx",
    postdata,
    function (data: callback) {
      if (data.root.cardcheckRes == 1) {
        sessionStorage.setItem("login_stuno", name.value);
        sessionStorage.setItem("login_name", data.root.stuname);
        sessionStorage.setItem("login_id", password.value);
        sessionStorage.setItem("login_unitno", data.root.stuunitno);
        userTemp.init(function () {
          router.push("/home/home");
          alertData.text = "页面组件加载";
          alertData.title = "加载中";
        });
      } else {
        alertData.show = true;
        alertData.text = "请检查填写信息";
        alertData.title = "登陆失败";
        setTimeout(() => {
          alertData.show = false;
        }, 2000);
      }
    }
  );
}
onMounted(() => {
  invoke('close_splashscreen')
  appWindow.maximize()
  sessionStorage.setItem("login_ip", `192.168.50.${_.random(0, 255)}`);
});
</script>
<template>
  <div class="mimimiimi">
    <ul class="page">
      <li>
        <h1>果考网实训考试云平台-wenxig端</h1>
      </li>
      <li>
        <input type="text" placeholder="学号" @keyup.enter="login()" v-model="name" class="inp inps" />
      </li>
      <li>
        <input type="text" placeholder="密码" @keyup.enter="login()" v-model="password" />
      </li>
      <li><input type="button" value="授权进入" @click="login()" /></li>
    </ul>
    <Teleport to="body">
      <alertbox :show="alertData.show" :text="alertData.text" :title="alertData.title" />
    </Teleport>
    <a id="img" href="https://www.pixiv.net/artworks/99327195">画师: フィラ</a>
    <div class="memu" @click="showPop = true">
      <chilunSvg class="chilun" :size="chilun_size" :class="{ r: showMeun }" />
      <Teleport to="body">
        <div class="pop" @click.self="showMeun = false" :class="{ showPop }">
          <div class="rightbar" :class="{ showMeun }">
            <div class="title">服务器选择</div>
            <div v-for="server in serverList" :class="isthis(server)" @click.stop="selServer(server)">
              {{ server.name }}
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "login.scss";
</style>
