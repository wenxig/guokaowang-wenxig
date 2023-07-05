<script setup lang="ts">
import paper from "@/assets/json/choose.json";
import { ref, reactive, watch } from "vue";
import headbar from "@/components/headbar.vue";
import { useRouter } from "vue-router";
import pagination from "@/components/pagination.vue";
const router = useRouter();
const choose = JSON.parse(sessionStorage.sel);
const lastDo = JSON.parse(sessionStorage.last);

const showlist = paper[lastDo.id] as chooseType

let setPage = ref(15);
let allPage = ref(0);
let showList:any = reactive({});
let onPage = ref(0);
let truelist: string[] = reactive([])
_.each(showlist.topic, (d, i) => {
  truelist[i] = d.true
})
watch(
  onPage,
  () => {
    let c = _.chunk(showlist.topic, setPage.value);
    allPage.value = c.length;
    console.log(c[onPage.value]);
    
    showList = c[onPage.value];
  },
  { immediate: true }
);
</script>

<template>
  <div class="main">
    <headbar style="position: fixed; top: 0%" :adminder="false">
      <button @click="router.push('/home/train')" class="btn-topbar">
        退出
      </button>
    </headbar>
    <ul class="test">
      <li v-for="(item, index) in showList" :key="item.id" class="truePa"
        :class="{ warryPa: choose.sel[index + onPage * 15] != truelist[index + onPage * 15] }">
        <p class="title">{{ item.title }} <span v-if="!choose.sel[index + onPage * 15]">(未选)</span></p>
        <div class="selbox">
          <div v-for="(items, key) in item.choose"
            :class="{ truethis: (truelist[index + onPage * 15]) as unknown == key, selthis: choose.sel[index + onPage * 15] == key }">
            {{ key }}:{{ items }}</div>
        </div>
      </li>
    </ul>
    <pagination class="pageChunk" @addPage="onPage++" :allPage="allPage" @subtractPage="onPage--" v-if="allPage > 1">
    </pagination>
  </div>
</template>

<style scoped lang="scss">
@import "about.scss";
</style>
