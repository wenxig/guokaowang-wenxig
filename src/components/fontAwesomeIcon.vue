<script setup lang="ts">
defineProps<{
  icon:string
}>()

</script>

<template>
  <i :class="icon"></i>
</template>

<style scoped lang="scss">
@import "@/assets/lib/fontawesome.min.css";

</style>