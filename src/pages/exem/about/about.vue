<script setup>
import paper from "@/assets/json/choose.json";
import { ref, reactive } from 'vue';
import headbar from "@/components/headbar.vue";

let choose = sessionStorage.sel;
</script>

<template>
  <div class="main">
    <headbar style="position: fixed; top: 0%" :adminder="false">
      <button @click="router.push('/home/train')" class="btn-topbar">
        退出
      </button>
    </headbar>
  </div>
</template>

<style scoped lang="scss">
@import "about.scss";
</style>