<script setup lang="ts">
import { reactive } from "vue";
import fileSystem from './components/fileSystem.vue'
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
</script>

<template>
  <div class="main">
    <div class="timu">

    </div>
    <fileSystem @change="" :defineFileTree="paper"/>
  </div>
</template>

<style scoped lang="scss">
@import "./operate.scss";
</style>