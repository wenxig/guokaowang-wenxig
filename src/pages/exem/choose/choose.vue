<script setup lang="ts">
import alertBox from "@/components/alertbox.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, watch, reactive } from "vue";
import { useSelStore } from "@/store/seldata.ts";
import all from "@/assets/json/choose.json";
import exemItem from "./exemItem.vue";
import headbar from "@/components/headbar.vue";
import { useUserTemp } from "@/store/userTemp.ts";
import leftBar from "@/components/leftBar.vue";
import routerBarButton from "@/components/routerBarButton.vue";
import pagination from "@/components/pagination.vue";
const userTemp = useUserTemp();
const store = useSelStore()
const route = useRoute();
const router = useRouter();
//@ts-ignore
const showlist: { id: number; name: string; fullcount: number; topic: { title: string; choose: { a: string; b: string; c: string; d: string; }; true: string; }[]; type: string; level: string; } = all[_.toNumber(route.params.id)];
let title = ref("答案是");
let show = ref(false);
let text = ref("");
let start = ref(1);
let grade = ref(0);
let onPage = ref(0);
let setPage = ref(15);
let allPage = ref(0);
let submit_v = true;
let showList = reactive<any[]>([]);
let yida = ref(0)

watch(
  onPage,
  () => {
    let c = _.chunk(showlist.topic, setPage.value);
    allPage.value = c.length;
    showList = c[onPage.value];
  },
  { immediate: true }
);
function showAlert(msg) {
  title.value = "答案是";
  text.value = msg;
  if (!show.value) {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 2000);
  }
}
function back() {
  router.push("/home/train");
}
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
    title.value = "开始评分";
    text.value = "请等待";
    show.value = true;
    mathToGrade();
    // 提交
  }
}
function mathToGrade() {
  let selObj = JSON.parse(sessionStorage.getItem("sel") as string)
  store.trueList = []
  let trueList = []
  _.each(selObj.sel, function (v, i) {
    i = _.toNumber(i);
    if (i || i == 0) {
      let isRight = showlist.topic[i].true == v;
      trueList[i] = isRight
      if (isRight) grade.value = grade.value + 2;
      if (!_.isNull(v)) yida.value++
    }
  });
  let thisLib = userTemp.get(route.params.id);
  thisLib.all.push(grade.value)
  thisLib.times++
  let thisobj = {
    all: JSON.parse(JSON.stringify(thisLib.all)),
    name: thisLib.name,
    ok: grade.value == showlist.fullcount,
    times: thisLib.times
  }
  thisobj = JSON.parse(JSON.stringify(thisobj))
  title.value = "开始评分";
  text.value = "将分数上传到数据库";
  userTemp.set(thisobj, route.params.id, function () {
    start.value = 2;
    show.value = false
  })
}
</script>

<template>
  <div class="main" :class="{ center: start != 1 }">
    <headbar style="position: fixed; top: 0%" :adminder="false">
      <template v-if="start == 1">
        <button class="btn-topbar" @click="submit()">提交</button>
        <button @click="router.push('/home/train')" class="btn-topbar">
          退出
        </button>
      </template>
    </headbar>
    <leftBar :adminder="false" style="position: fixed; top: 70px;" v-if="start == 2">
      <routerBarButton text="首页" to="/home/home" />
      <routerBarButton text="单元练习" to="/home/train" />
      <routerBarButton text="我的考试" to="/home/exem" />
      <routerBarButton text="学习档案" to="/home/history" />
    </leftBar>
    <div v-if="start == 1" class="statrExem">
      <div class="header"></div>
      <exemItem @showAlert="showAlert" v-for="(item, index) in showList"
        :key="`${item.title}${Math.random() + Math.random() + Math.random()}`" :item="item" :answer="true" :id="index"
        :page="onPage" />

      <pagination @addPage="onPage++" :allPage="allPage" @subtractPage="onPage--" v-if="allPage > 1"> </pagination>
    </div>
    <div class="over" v-else-if="start == 2">
      <div class="head">本次答题情况</div>
      <table cellspacing="0">
        <tr>
          <th>试题总数</th>
          <th>未答题数</th>
          <th>已答题数</th>
          <th>满分</th>
          <th>得分</th>
        </tr>
        <tr>
          <th>{{ showlist.topic.length }}</th>
          <th>{{ showlist.topic.length - yida }}</th>
          <th>{{ yida }}</th>
          <th>{{ showlist.fullcount }}</th>
          <th>{{ grade }}</th>
        </tr>
      </table>
      <div>
        <router-link to="/home/train">返回列表</router-link>
        <router-link to="/exem/about">查看详细评分信息</router-link>
      </div>
    </div>
    <Teleport to="body">
      <alertBox :show="show" :text="text" :title="title" />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@import "exem.scss";
</style>