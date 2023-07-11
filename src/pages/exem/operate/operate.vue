<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from 'vue-router';
import fileSystem from './fsp/fileSystem.vue';
import { listen } from '@tauri-apps/api/event'
import { WebviewWindow, appWindow, LogicalSize, LogicalPosition } from '@tauri-apps/api/window';
import paper from './fsp/index.filetree.json';
// import { useUserTemp } from '@/store/userTemp.ts';
// const userTemp = useUserTemp()

const route = useRoute()

let isunSub = ref(true)
appWindow.setSize(new LogicalSize(screen.width / 1.5, screen.height / 1.2))
appWindow.setPosition(new LogicalPosition((screen.width / 2 - ((screen.width / 1.5) / 2)) + screen.width / 6.5, (screen.height - screen.height / 1.2) / 2))
const papers = new WebviewWindow('paper', {
  url: `/exem/operate/${route.params.id}/paper`,
  x: 0,
  y: 0,
  height: screen.height,
  width: screen.width / 3.5
})
papers.once('fs', () => { })
listen('submit', () => {
  isunSub.value = false
  appWindow.maximize()
})
function fsChange(data: fileTreeType[]) {
  console.log(JSON.stringify(data) == JSON.stringify(paper));
}
</script>

<template>
  <div class="main">
    <fileSystem @change="fsChange" :defineFileTree="paper" v-if="isunSub" />
  </div>
</template>

<style scoped lang="scss">
@import "./operate.scss";
</style>