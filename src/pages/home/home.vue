<script setup>
import leftBar from "@/components/leftBar.vue";
import routerBarButton from "@/components/routerBarButton.vue";
import headbar from "@/components/headbar.vue";
try {
  const win = nw.Window.get();
  win.maximize();
} catch (error) {}
</script>
<template>
  <div>
    <headbar></headbar>
    <leftBar>
      <routerBarButton text="首页" to="/home/home" />
      <routerBarButton text="单元练习" to="/home/train" />
      <routerBarButton text="我的考试" to="/home/exem" />
      <routerBarButton text="学习档案" to="/home/history" />
    </leftBar>
    <router-view v-slot="{ Component }">
      <transition name="fandin">
        <component :is="Component" class="main" style="overflow-y: auto" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
@import "home.scss";

.fandin-enter-active,
.fandin-leave-active {
  transition: top 0.5s ease;
}
.fandin-enter-from,
.fandin-leave-to {
  top: -100%;
}
</style>
