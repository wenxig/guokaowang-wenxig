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
const showlist:chooseType = all[_.toNumber(route.params.id)];
let title = ref<string>("答案是");
let show = ref<boolean>(false);
let text = ref<string>("");
let start = ref<number>(1);
let grade = ref<number>(0);
let onPage = ref<number>(0);
let setPage = ref<number>(15);
let allPage = ref<number>(0);
let submit_v:boolean = true;
let showList:any[] = reactive([]);
let yida = ref<number>(0)
watch(
  onPage,
  () => {
    let c = _.chunk(showlist.topic, setPage.value);
    allPage.value = c.length;
    showList = c[onPage.value];
  },
  { immediate: true }
);
function showAlert(msg: string) {
  title.value = "答案是";
  text.value = msg;
  if (!show.value) {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 2000);
  }
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
import post from "@/service/axios.ts";
function update(id:number):void {
  let datapost = {
    root: {
      courty: null,
      mac: "11-45-14-19-19-81",
      ip: sessionStorage.getItem("login_ip"),
      stu_no: sessionStorage.getItem("login_stuno"),
      stu_name: sessionStorage.getItem("login_name"),
      class_no: null,
      exm_no: `DX${fix(id+1,2)}`,
      exm_pnt: showlist.fullcount,
      stu_pnt: grade.value,
      exm_mode: null,
      exm_type: "0",
      exm_name: showlist.name,
      exm_pgrade: null,
      exm_ptype: null,
      test_id: id+1,
      qst_info: null,
      proid: "hgqxxjs",
      unitno: "030204",
    },
  };
  
  post("/api/InteractData/Xmlresult2.aspx", datapost, () => {});
}

function fix(num: string | number, length: number) {
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num
}
function mathToGrade() {
  let selObj = JSON.parse(sessionStorage.getItem("sel") as string)
  store.trueList = []
  let trueList:boolean[] = []
  _.each(selObj.sel, function (v, i:number) {
    i = _.toNumber(i);
    if (i || i == 0) {
      let isRight = showlist.topic[i].true == v;
      trueList[i] = isRight
      if (isRight) grade.value = grade.value + 2;
      if (!_.isNull(v)) yida.value++
    }
  });
  let thisLib = userTemp.get(route.params.id as string);
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
  update(showlist.id)
  userTemp.set(thisobj, route.params.id as string, function () {
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