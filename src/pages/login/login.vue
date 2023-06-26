<script setup>
import alertbox from "@/components/alertbox.vue";
import { ref, reactive, onMounted } from "vue";
import { useUserTemp } from "@/store/userTemp.js";
import post from "@/service/axios.js";
import { useRouter } from "vue-router";
import chilunSvg from './svgOfChilun.vue';
const router = useRouter();
const userTemp = useUserTemp();
let name = ref("");
let password = ref("");
let alertData = reactive({
  show: false,
  text: "",
  title: "",
});
let chilun_size=ref("30vh")
function login() {
  if (name != "") {
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
    post("/api/InteractData/XmlCheckStuLogin.aspx", postdata, function (data) {
      //{"root":{"cardcheckRes":"1","stuname":"温信果","stuunitno":"030204","stuS":"0","stuStatus":"1","serverLong":"3"}}
      if (data.root.cardcheckRes == 1) {
        userTemp.init(function () {
          sessionStorage.setItem("login_stuno", name.value);
          sessionStorage.setItem("login_name", data.root.stuname);
          sessionStorage.setItem("login_id", password.value);
          sessionStorage.setItem("login_unitno", data.root.stuunitno);
          router.push("/home/home");
          alertData.text = "页面组件加载";
          alertData.title = "加载中";
        });
      } else {
        alertData.show = true;
        alertData.text = "请重试";
        alertData.title = "服务器错误";
      }
    });
  } else {
    alertData.show = true;
    alertData.text = "快点填写";
    alertData.title = "请填写用户名";
    setTimeout(() => {
      alertData.show = false;
    }, 2000);
  }
}
onMounted(() => {
  sessionStorage.setItem("login_ip", `192.168.50.${_.random(0, 255)}`);
  try {
    const win = nw.Window.get();
    win.width = 960;
    win.height = 540;
  } catch (error) {}
});
</script>
<template>
  <div class="mimimiimi">
    <ul class="page">
      <li>
        <h1>果考网实训考试云平台-wenxig端</h1>
      </li>
      <li>
        <input
          type="text"
          placeholder="学号"
          @keyup.enter="login()"
          v-model="name"
          class="inp inps"
        />
      </li>
      <li>
        <input
          type="text"
          placeholder="密码"
          @keyup.enter="login()"
          v-model="password"
        />
      </li>
      <li><input type="button" value="授权进入" @click="login()" /></li>
    </ul>
    <Teleport to="body">
      <alertbox
        :show="alertData.show"
        :text="alertData.text"
        :title="alertData.title"
      />
    </Teleport>
    <a id="img" href="https://www.pixiv.net/artworks/99327195">画师: フィラ</a>
    <div class="memu">
      <chilunSvg class="chilun" :size="chilun_size"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "login.scss";

</style>
