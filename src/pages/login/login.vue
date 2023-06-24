<script>
import { useUserTemp } from "@/store/userTemp.js";
import choosePaper from "*/public/json/choose.json";
import post from "@/service/axios.js";
const userTemp = useUserTemp();

export default {
  name: "login",
  data() {
    return {
      name: "",
      password: "",
      alertData: {
        show: false,
        text: "",
        title: "",
      },
    };
  },
  methods: {
    login() {
      let _this = this;
      if (_this.name != "") {
        _this.alertData.show = true;
        _this.alertData.text = "数据库初始化";
        _this.alertData.title = "加载中";
        post(
          "/api/InteractData/XmlCheckStuLogin.aspx",
          `
              <root> 
	              <stuno>030204180338</stuno> 
	              <stupwd>12866646</stupwd> 
	              <lcmacinfo>89A05A71</lcmacinfo> 
	              <IP>192.168.50.${_.random(0, 255)}</IP> 
	              <proid>hgqxxjs</proid>
                <unitno>030204</unitno>
              </root>
              `,
          function (data) {
            //{"root":{"cardcheckRes":"1","stuname":"温信果","stuunitno":"030204","stuS":"0","stuStatus":"1","serverLong":"3"}}
            if (data.root.cardcheckRes == 1) {
              userTemp.init(function (state) {
                if (state == 0) {
                  _.each(choosePaper, function (d) {
                    userTemp.set(
                      {
                        name: d.name,
                        times: 0,
                        all: [],
                        ok: false,
                      },
                      d.id,
                      function () {
                        ok()
                      }
                    );
                  });
                } else {
                  ok()
                }
                function ok(){
                  sessionStorage.setItem("login_stuno", _this.name)
                  sessionStorage.setItem("login_name", data.root.stuname);
                  sessionStorage.setItem("login_id", _this.password);
                  sessionStorage.setItem("login_unitno",data.root.stuunitno)
                  _this.$router.push("/home/home");
                  _this.alertData.text = "页面组件加载";
                  _this.alertData.title = "加载中";
                }
              });
            }else{

            }
          }
        );
      } else {
        _this.alertData.show = true;
        _this.alertData.text = "快点填写";
        _this.alertData.title = "请填写用户名";
        setTimeout(() => {
          _this.alertData.show = false;
        }, 2000);
      }
    },
  },
  mounted() {
    try {
      const win = nw.Window.get();
      win.width = 960;
      win.height = 540;
    } catch (error) {}
  },
};
</script>
<script setup>
import alertbox from "@/components/alertbox.vue";
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
