<script setup>
import paper from "@/assets/json/choose.json";
import { ref, reactive, watch } from "vue";
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
let truelist = reactive([])
_.each(showlist.topic, (d, i) => {
  truelist[i] = d.true
})
console.log(choose);
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
    <headbar style="position: fixed; top: 0%" :adminder="false" adminder="false">
      <button @click="router.push('/home/train')" class="btn-topbar">
        退出
      </button>
    </headbar>
    <ul class="test">
      <li v-for="(item, index) in showList" :key="item.id"
        class="truePa"
        :class="{ warryPa: choose.sel[index + onPage * 15] != truelist[index + onPage * 15] }">
        <p class="title">{{ item.title }} <span v-if="!choose.sel[index + onPage * 15]">(未选)</span></p>
        <div class="selbox">
          <div v-for="(items, key) in item.chooses"
            :class="{ truethis: truelist[index + onPage * 15] == key, selthis: choose.sel[index + onPage * 15] == key }">
            {{ key }}:{{ items }}</div>
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

<style scoped lang="scss">@import "about.scss";</style>
