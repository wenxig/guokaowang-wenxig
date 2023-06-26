<script setup>
import { useRouter } from "vue-router";
import { provide, ref, nextTick } from "vue";
let isRouterAlive = ref(true);
provide("reload", () => {
  isRouterAlive.value = false;
  nextTick(function () {
    isRouterAlive.value = true;
  });
});
const router = useRouter();
router.push("/");
</script>
<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<style scoped></style>
