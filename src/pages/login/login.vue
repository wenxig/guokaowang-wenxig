<script>
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
      if (this.name != "") {
        let _this = this;
        sessionStorage.setItem("login", this.name);
        this.$router.push("/home/home");
        this.alertData.show = true;
        this.alertData.text = "加载中";
        this.alertData.title = "加载中";
      } else {
        this.alertData.show = true;
        this.alertData.text = "快点填写";
        this.alertData.title = "请填写用户名";
        setTimeout(() => {
          this.alertData.show = false;
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
      <li><h1>信果考网登录</h1></li>
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
