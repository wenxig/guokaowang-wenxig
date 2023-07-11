<script setup lang="ts">
import { provide, ref, nextTick, reactive, onMounted} from "vue";
import { invoke } from '@tauri-apps/api'

let isRouterAlive = ref<boolean>(true);
provide("reload", () => {
  isRouterAlive.value = false;
  nextTick(function () {
    isRouterAlive.value = true;
  });
});
let backgrundImg = ref<HTMLImageElement | null>(null)
let screenSize = reactive({
  w: $('.backgrund').innerWidth(),
  h: $('.backgrund').innerHeight()
});
let isHeightFirst = ref(false);

function imgLoad(){
  screenSize.w = innerWidth
  screenSize.h = innerHeight
  isHeightFirst.value = (backgrundImg.value?.width as number) < (screenSize.w as number)
}

onMounted(()=>{
  invoke('close_splashscreen')
})


</script>
<template>
  <div @click.right.prevent.stop>
    <div class="backgrund" >
      <img src="/login.avif" ref="backgrundImg" :class="{ he: isHeightFirst }" @load="imgLoad">
    </div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<style lang="scss">
body {
  margin: 0px;
}

.backgrund {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
z-index: -1;
  &>img {
    width: 100vw;
    height: auto;

    &.he {
      height: 100vh !important;
      width: auto !important;
    }
  }
}
</style>
