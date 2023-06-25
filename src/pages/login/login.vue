<script setup>
import alertbox from "@/components/alertbox.vue";
import { ref, reactive, onMounted } from "vue";
import { useUserTemp } from "@/store/userTemp.js";
import post from "@/service/axios.js";
import { useRouter } from "vue-router";
const router = useRouter();
const userTemp = useUserTemp();
let name = ref("030204180338");
let password = ref("12866646");
let alertData = reactive({
  show: false,
  text: "",
  title: "",
});
function login() {
//   let data = `
//   <root> 
// 	<courty /> 
// 	<mac>5A-00-E3-F9-7B-A3</mac> 
// 	<ip>192.168.50.111</ip> 
// 	<stu_no>030204180338</stu_no> 
// 	<stu_name>温信果</stu_name> 
// 	<class_no /> 
// 	<exm_no>DX01</exm_no> 
// 	<stu_pnt>4</stu_pnt> 
// 	<exm_pnt>110</exm_pnt> 
// 	<exm_mode /> 
// 	<exm_type>0</exm_type> 
// 	<exm_name>单选练习一</exm_name> 
// 	<exm_pgrade /> 
// 	<exm_ptype /> 
// 	<test_id>1</test_id> 
// 	<qst_info>030204180338^^01010301^^2^^2^^B^^B^^DX01^^1^^0^^DX0103^^1||030204180338^^01010504^^2^^2^^C^^C^^DX01^^1^^0^^DX0105^^1||030204180338^^01010503^^0^^2^^ ^^D^^DX01^^1^^0^^DX0105^^1||030204180338^^01010502^^0^^2^^ ^^A^^DX01^^1^^0^^DX0105^^1||030204180338^^01010501^^0^^2^^ ^^B^^DX01^^1^^0^^DX0105^^1||030204180338^^01010404^^0^^2^^ ^^C^^DX01^^1^^0^^DX0104^^1||030204180338^^01010403^^0^^2^^ ^^A^^DX01^^1^^0^^DX0104^^1||030204180338^^01010402^^0^^2^^ ^^A^^DX01^^1^^0^^DX0104^^1||030204180338^^01010401^^0^^2^^ ^^D^^DX01^^1^^0^^DX0104^^1||030204180338^^01010306^^0^^2^^ ^^B^^DX01^^1^^0^^DX0103^^1||030204180338^^01010305^^0^^2^^ ^^D^^DX01^^1^^0^^DX0103^^1||030204180338^^01010304^^0^^2^^ ^^A^^DX01^^1^^0^^DX0103^^1||030204180338^^01010101^^0^^2^^ ^^C^^DX01^^1^^0^^DX0101^^1||030204180338^^01010302^^0^^2^^ ^^D^^DX01^^1^^0^^DX0103^^1||030204180338^^01010701^^0^^2^^ ^^A^^DX01^^1^^0^^DX0107^^1||030204180338^^01010204^^0^^2^^ ^^D^^DX01^^1^^0^^DX0102^^1||030204180338^^01010203^^0^^2^^ ^^C^^DX01^^1^^0^^DX0102^^1||030204180338^^01010202^^0^^2^^ ^^B^^DX01^^1^^0^^DX0102^^1||030204180338^^01010201^^0^^2^^ ^^B^^DX01^^1^^0^^DX0102^^1||030204180338^^01010108^^0^^2^^ ^^B^^DX01^^1^^0^^DX0101^^1||030204180338^^01010107^^0^^2^^ ^^D^^DX01^^1^^0^^DX0101^^1||030204180338^^01010106^^0^^2^^ ^^A^^DX01^^1^^0^^DX0101^^1||030204180338^^01010105^^0^^2^^ ^^D^^DX01^^1^^0^^DX0101^^1||030204180338^^01010104^^0^^2^^ ^^A^^DX01^^1^^0^^DX0101^^1||030204180338^^01010103^^0^^2^^ ^^D^^DX01^^1^^0^^DX0101^^1||030204180338^^01010102^^0^^2^^ ^^C^^DX01^^1^^0^^DX0101^^1||030204180338^^01010303^^0^^2^^ ^^C^^DX01^^1^^0^^DX0103^^1||030204180338^^01011104^^0^^2^^ ^^A^^DX01^^1^^0^^DX0111^^1||030204180338^^01011501^^0^^2^^ ^^B^^DX01^^1^^0^^DX0115^^1||030204180338^^01011403^^0^^2^^ ^^D^^DX01^^1^^0^^DX0114^^1||030204180338^^01011402^^0^^2^^ ^^C^^DX01^^1^^0^^DX0114^^1||030204180338^^01011401^^0^^2^^ ^^A^^DX01^^1^^0^^DX0114^^1||030204180338^^01011303^^0^^2^^ ^^C^^DX01^^1^^0^^DX0113^^1||030204180338^^01011302^^0^^2^^ ^^B^^DX01^^1^^0^^DX0113^^1||030204180338^^01011301^^0^^2^^ ^^D^^DX01^^1^^0^^DX0113^^1||030204180338^^01011204^^0^^2^^ ^^B^^DX01^^1^^0^^DX0112^^1||030204180338^^01011203^^0^^2^^ ^^D^^DX01^^1^^0^^DX0112^^1||030204180338^^01011202^^0^^2^^ ^^B^^DX01^^1^^0^^DX0112^^1||030204180338^^01011201^^0^^2^^ ^^A^^DX01^^1^^0^^DX0112^^1||030204180338^^01010601^^0^^2^^ ^^A^^DX01^^1^^0^^DX0106^^1||030204180338^^01011105^^0^^2^^ ^^B^^DX01^^1^^0^^DX0111^^1||030204180338^^01010602^^0^^2^^ ^^C^^DX01^^1^^0^^DX0106^^1||030204180338^^01011103^^0^^2^^ ^^D^^DX01^^1^^0^^DX0111^^1||030204180338^^01011102^^0^^2^^ ^^A^^DX01^^1^^0^^DX0111^^1||030204180338^^01011101^^0^^2^^ ^^C^^DX01^^1^^0^^DX0111^^1||030204180338^^01011002^^0^^2^^ ^^A^^DX01^^1^^0^^DX0110^^1||030204180338^^01011001^^0^^2^^ ^^C^^DX01^^1^^0^^DX0110^^1||030204180338^^01010903^^0^^2^^ ^^A^^DX01^^1^^0^^DX0109^^1||030204180338^^01010902^^0^^2^^ ^^B^^DX01^^1^^0^^DX0109^^1||030204180338^^01010901^^0^^2^^ ^^D^^DX01^^1^^0^^DX0109^^1||030204180338^^01010802^^0^^2^^ ^^C^^DX01^^1^^0^^DX0108^^1||030204180338^^01010801^^0^^2^^ ^^B^^DX01^^1^^0^^DX0108^^1||030204180338^^01010702^^0^^2^^ ^^D^^DX01^^1^^0^^DX0107^^1||030204180338^^01011502^^0^^2^^ ^^D^^DX01^^1^^0^^DX0115^^1||030204180338^^01011106^^0^^2^^ ^^D^^DX01^^1^^0^^DX0111^^1</qst_info> 
// 	<proid>hgqxxjs</proid>
// 	<unitno>030204</unitno>
// </root>`;
//   post("/api/InteractData/Xmlresult1.aspx",data,(data,y)=>{
//     console.log(data);
//   })
//   return undefined;
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
  login();
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
        <h1>信果考网登录</h1>
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
  </div>
</template>

<style lang="scss" scoped>
@import "login.scss";
.mimimiimi {
  position: fixed;
  top: 0%;
  left: 0%;
}
</style>
