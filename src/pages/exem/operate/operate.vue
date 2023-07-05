<script setup lang="ts">
import fileSystem from './components/fileSystem.vue'
</script>

<template>
  <div class="main">
    <div class="timu">

    </div>
    <fileSystem @change=""/>
  </div>
</template>

<style scoped lang="scss">
@import "./operate.scss";
</style>