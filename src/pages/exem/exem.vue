<script setup>
import alertBox from "@/components/alertbox.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSelStore } from "@/store/seldata.js";
import all from "*/public/json/choose.json";
import exemItem from "@/components/exemItem.vue";
import headbar from "@/components/headbar.vue";
const store = storeToRefs(useSelStore());
let title = ref("答案是");
let show = ref(false);
let text = ref("");
const route = useRoute();
const router = useRouter();
let start = ref(0);

const showAlert = (msg) => {
  title = "答案是";
  text = msg;
  if (!show.value) {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 2000);
  }
};
function back() {
  router.push("/home/train");
}
const showlist = _.find(all, (o) => {
  return o.id == route.params.id;
});
let submit_v = true;
function submit() {
  if (submit_v) {
    title.value = "确定?";
    text.value = "再点击一次按钮";
    submit_v = false;
    show.value = true;
    setTimeout(function () {
      submit_v = true;
    }, 2000);
    setTimeout(() => {
      show.value = false;
    }, 800);
  } else {
    start.value=2
    // 提交
  }
}
</script>

<template>
  <div class="main" :class="{center:start!=1}">
    <headbar style="position: fixed; top: 0%">
      <template v-if="start == 1">
        <button class="btn-topbar" @click="submit">提交</button>
        <button @click="router.push('/home/train')" class="btn-topbar">
          退出
        </button>
      </template>
    </headbar>
    <div v-if="start == 0" class="about">
      <table cellspacing="0">
        <tr>
          <th>编号</th>
          <th>{{ route.params.id }}</th>
        </tr>
        <tr>
          <th>名称</th>
          <th>{{ store.exem.name }}</th>
        </tr>
        <tr>
          <th>练习次数</th>
          <th>{{ store.exem.doTime }}</th>
        </tr>
      </table>
      <div class="btn-goto">
        <button @click="back">返回列表</button>
        <button @click="start = 1">开始练习</button>
      </div>
    </div>
    <div v-else-if="start == 1" class="statrExem">
      <div class="header"></div>
      <exemItem
        @showAlert="showAlert"
        v-for="(item, index) in showlist.topic"
        :key="item.title"
        :item="item"
        :answer="true"
        :id="index"
      />
    </div>
    <div class="over" v-else-if="start==2">

    </div>
    <Teleport to="body">
      <alertBox :show="show" :text="text" :title="title" />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@import "exem.scss";
</style>