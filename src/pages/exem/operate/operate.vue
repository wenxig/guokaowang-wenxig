<script setup lang="ts">
import { reactive } from "vue";
import {useRoute} from 'vue-router';
import fileSystem from './fsp/fileSystem.vue';
import { WebviewWindow,appWindow, LogicalSize , LogicalPosition } from '@tauri-apps/api/window';
const route= useRoute()
const paper: fileTreeType[] = reactive([
  {
    name:"computer0",
    type:"dir",
    children:[
      {
        name: "computer1",
        type: "dir",
        children:[
          {
            name: "computer2",
            type: "dir",
            children: []
          }
        ]
      },
      {
        name: "computer1",
        type: "dir",
        children: []
      }
    ]
  },
  {
    name: "computer0",
    type: "dir",
    children: []
  }
])
appWindow.setSize(new LogicalSize(screen.width / 1.5, screen.height / 1.2))
appWindow.setPosition(new LogicalPosition((screen.width / 2- ((screen.width / 1.5 )/2))+ screen.width / 6.5, (screen.height- screen.height / 1.2)/2))
const papers = new WebviewWindow('paper', {
  url: `/exem/operate/${route.params.id}/paper`,
  x:0,
  y:0,
  height:screen.height,
  width:screen.width/3.5
})
papers.once('fs',()=>{

})
</script>

<template>
  <div class="main">
    <fileSystem @change="" :defineFileTree="paper"/>
  </div>
</template>

<style scoped lang="scss">
@import "./operate.scss";
</style>