<script setup lang="ts">
import leftBar from "@/components/leftBar.vue";
import routerBarButton from "@/components/routerBarButton.vue";
import headbar from "@/components/headbar.vue";
import { provide } from 'vue';
provide("toggleRouterAdminder",()=>{
  
})
try {
  //@ts-ignore
  const win = nw.Window.get();
  win.maximize();
} catch (error) {}
</script>
<template>
  <div>
    <headbar :adminder="true"></headbar>
    <leftBar :adminder="true">
      <routerBarButton text="首页" to="/home/home" />
      <routerBarButton text="单元练习" to="/home/train" />
      <routerBarButton text="我的考试" to="/home/exem" />
      <routerBarButton text="学习档案" to="/home/history" />
    </leftBar>
    <router-view v-slot="{ Component }">
      <transition name="fandin" v-if="!$route.meta.ad">
        <component :is="Component" class="main" style="overflow-y: auto" />
      </transition>
      <component :is="Component" class="main" v-else style="overflow-y: auto" />
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
