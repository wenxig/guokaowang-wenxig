<script setup lang="ts">
import all from "@/assets/json/choose.json";
import { useRoute } from 'vue-router';
import { emit } from '@tauri-apps/api/event'
import { appWindow } from "@tauri-apps/api/window";
const route = useRoute()
const showlist = all[_.toNumber(route.params.id)] as unknown as operateType;
function imgLoad(event: Event): void {
  if (window.innerHeight > getNum($(event.target as HTMLImageElement).css("height"))) {
    $(event.target as HTMLImageElement).css('width', 'auto').css('height', '100vh')
  }
  function getNum(val: string): number {
    return new Number(val.replace(/px/ig, "")) as number
  }
}
function submit() {
  emit("submit").then(() => {
    appWindow.close()
  })
}
appWindow.setTitle('操作题')
</script>

<template>
  <div class="main">
    <div class="backgrunds">
      <img src="/opImg.avif" @load="imgLoad($event)">
      <div class="filter"></div>
    </div>
    <button @click="submit"></button>
    <div class="title">
      {{ showlist.name }}
    </div>
    <div class="paper">
      <p v-for="p in showlist.topic.text" v-html="p"></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100vw;

  .backgrunds {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: -1;

    img {
      width: 100vw;
      height: auto;
      position: fixed;
      top: 0px;
    }

    .filter {
      width: 100vw;
      height: 100vh;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      position: fixed;
      top: 0px;
      background-color: white-rgba(0.8);
    }
  }

  .title {
    width: 95%;
    height: 80px;
    margin: 0 auto;
    margin-top: 30px;
    @include center;
    color: $yanfei-red;
    font-size: 4vh;
    font-weight: bolder;
  }

  .paper {
    padding-left: 8%;
  }
}
</style>