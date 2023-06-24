<script setup>
import alertBox from "@/components/alertbox.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSelStore } from "@/store/seldata.js";
import all from "*/public/json/choose.json";
import exemItem from "@/components/exemItem.vue";
import headbar from "@/components/headbar.vue";
import { useUserTemp } from "@/store/userTemp.js";
import leftBar from "@/components/leftBar.vue";
import routerBarButton from "@/components/routerBarButton.vue";
const userTemp = useUserTemp();
const store = storeToRefs(useSelStore());
const route = useRoute();
const router = useRouter();
const showlist = _.find(all, (o) => {
  return o.id == route.params.id;
});
let title = ref("答案是");
let show = ref(false);
let text = ref("");
let start = ref(0);
let grade = ref(0);
let onPage = ref(0);
let setPage = ref(15);
let allPage = ref(0);
let submit_v = true;
let showList = ref(showlist);
let yida = ref(0)

watch(
  onPage,
  () => {
    let c = _.chunk(showlist.topic, setPage.value);
    allPage.value = c.length;
    showList.value = c[onPage.value];
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
function startE() {
  start.value = 1;
  sessionStorage.setItem(
    "last",
    JSON.stringify({ id: route.params.id, name: store.exem.name })
  );
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
  let selObj=JSON.parse(sessionStorage.getItem("sel"))
  store.trueList = [];
  let trueList=[]
  _.each(selObj.sel, function (v, i) {
    i = _.toNumber(i);
    if (i || i == 0) {
      let isRight = showlist.topic[i].true == v;
      trueList[i]=isRight
      if (isRight) grade.value = grade.value + 2;
      if(!_.isNull(v)) yida.value++
    }
  });
  let thisLib=userTemp.get(route.params.id);
  thisLib.all.push(grade.value)
  thisLib.times++
  let thisobj={
    all:JSON.parse(JSON.stringify(thisLib.all)),
    name:thisLib.name,
    ok:grade.value==showlist.fullcount,
    times:thisLib.times
  }
  thisobj=JSON.parse(JSON.stringify(thisobj))
  title.value = "开始评分";
    text.value = "将分数上传到数据库";
  userTemp.set(thisobj,route.params.id,function(){
    start.value = 2;
  })
}
</script>

<template>
  <div class="main" :class="{ center: start != 1 }">
    <headbar style="position: fixed; top: 0%"  :adminder="false">
      <template v-if="start == 1">
        <button class="btn-topbar" @click="submit()">提交</button>
        <button @click="router.push('/home/train')" class="btn-topbar">
          退出
        </button>
      </template>
    </headbar>
    <leftBar class="leftbar" v-if="start == 0||start == 2"  :adminder="false">
      <routerBarButton text="首页" to="/home/home" />
      <routerBarButton text="单元练习" to="/home/train" />
      <routerBarButton text="我的考试" to="/home/exem" />
      <routerBarButton text="学习档案" to="/home/history" />
    </leftBar>
    <div v-if="start == 0" class="about">
      <table cellspacing="0">
        <tr>
          <th>编号</th>
          <th>{{ new Number(route.params.id) + 1 }}</th>
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
        <button @click="startE">开始练习</button>
      </div>
    </div>
    <div v-else-if="start == 1" class="statrExem">
      <div class="header"></div>
      <exemItem
        @showAlert="showAlert"
        v-for="(item, index) in showList"
        :key="`${item.title}${Math.random() + Math.random() + Math.random()}`"
        :item="item"
        :answer="true"
        :id="index"
        :page="onPage"
      />

      <div class="pageChunk" v-if="allPage > 1">
        <div class="sanjiao" @click="onPage > 0 ? onPage-- : onPage"></div>
        {{ onPage + 1 }}/{{ allPage }}
        <div
          class="sanjiao"
          @click="onPage < allPage ? onPage++ : onPage"
        ></div>
      </div>
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
          <th>{{ showlist.topic.length - yida}}</th>
          <th>{{ yida }}</th>
          <th>{{ showlist.fullcount }}</th>
          <th>{{ grade }}</th>
        </tr>
      </table>
      <div>
        <router-link to="/home/train">返回列表</router-link>
        <router-link to="/exemAbout">查看详细评分信息</router-link>
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