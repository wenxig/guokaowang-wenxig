<script setup lang="ts">
defineProps<{
  text: string,
  to: string,
}>();
</script>

<script>
</script>

<template>
  <li>
    <router-link :to="to" class="routerBarButton">{{ text }}</router-link>
  </li>
</template>

<style scoped lang="scss">
.routerBarButton {
  width: 100%;
  height: 50px;
  @include center;
  color: black;
  text-decoration: none;
  font-size: 20px;
  font-weight: bolder;
}
</style>
