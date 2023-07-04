<script setup lang="ts">
import { Router, useRouter } from "vue-router";
import { provide, ref, nextTick } from "vue";
let isRouterAlive = ref<boolean>(true);
provide("reload", () => {
  isRouterAlive.value = false;
  nextTick(function () {
    isRouterAlive.value = true;
  });
});
const router: Router = useRouter();
router.push("/");
</script>
<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<style>
body{
  margin: 0px;
}
</style>
