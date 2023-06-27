<script setup>
import paper from "@/assets/json/choose.json";
import { ref, watch } from "vue";
import headbar from "@/components/headbar.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const choose = JSON.parse(sessionStorage.sel);
const lastDo = JSON.parse(sessionStorage.last);
const showlist = _.find(paper, (o) => {
  return o.id == lastDo.id;
});
let setPage = ref(15);
let allPage = ref(0);
let showList = ref(showlist);
let onPage = ref(0);
watch(
  onPage,
  () => {
    let c = _.chunk(showlist.topic, setPage.value);
    allPage.value = c.length;
    showList.value = c[onPage.value];
  },
  { immediate: true }
);
</script>

<template>
  <div class="main">
    <headbar
      style="position: fixed; top: 0%"
      :adminder="false"
      adminder="false"
    >
      <button @click="router.push('/home/train')" class="btn-topbar">
        退出
      </button>
    </headbar>
    <ul class="test">
      <li v-for="item in showList" :key="item.id">
        <p class="title">{{ item.title }}</p>
        <div class="selbox">
          <div v-for="items in item.chooses">{{ items }}</div>
        </div>
      </li>
    </ul>
    <div class="pageChunk" v-if="allPage > 1">
      <div class="sanjiao" @click="onPage > 0 ? onPage-- : onPage"></div>
      {{ onPage + 1 }}/{{ allPage }}
      <div class="sanjiao" @click="onPage < allPage ? onPage++ : onPage"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "about.scss";
</style>
