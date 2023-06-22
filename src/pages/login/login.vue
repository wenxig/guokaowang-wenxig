<script>
import { useUserTemp } from "@/store/userTemp.js";
import choosePaper from "*/public/json/choose.json";
const userTemp = useUserTemp();

export default {
  name: "login",
  data() {
    return {
      name: "",
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
        sessionStorage.setItem("login", _this.name);
        _this.alertData.show = true;
        _this.alertData.text = "数据库初始化";
        _this.alertData.title = "加载中";
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
                  _this.$router.push("/home/home");

                  _this.alertData.text = "页面组件加载";
                  _this.alertData.title = "加载中";
                }
              );
            });
          } else {
            _this.$router.push("/home/home");

            _this.alertData.text = "页面组件加载";
            _this.alertData.title = "加载中";
          }
        });
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
          placeholder="用户名"
          @keyup.enter="login()"
          v-model="name"
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
