<script setup lang="ts">
import { ref, watch } from "vue";
defineProps<{
  allPage: number,
}>();
let onPage = ref<number>(0);
const emit = defineEmits<{
  addPage: [page?: number] // 具名元组语法
  subtractPage: [page?: number]
}>()
watch(onPage, (newValue, oldValue) => {
  if (newValue > oldValue) {
    emit("addPage", newValue);
  } else {
    emit("subtractPage", newValue);
  }
});
</script>

<template>
  <div class="pageChunk">
    <div class="sanjiao" @click="onPage > 0 ? onPage-- : onPage"></div>
    {{ onPage + 1 }}/{{ allPage }}
    <div class="sanjiao" @click="onPage < allPage ? onPage++ : onPage"></div>
  </div>
</template>

<style scoped lang="scss">
.pageChunk {
    @include heightCenter;
    .sanjiao {
      transition: background 300ms;
      $size: 15px;
      clip-path: polygon(0 0, 0% 100%, 100% 50%);
      background-color: gray-rgba(0.5);
      width: $size;
      height: $size;
      margin: 0 10px;
      &:first-child {
        transform: rotate(180deg);
      }
    }
  }
</style>
