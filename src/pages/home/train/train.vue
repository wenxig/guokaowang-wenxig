<script setup>
import listBox from "@/components/listbox.vue";
import listItem from "@/components/liItem.vue";
import alertBox from "@/components/alertbox.vue";
import { onBeforeRouteLeave } from "vue-router";
import { ref, computed, watch, onMounted, reactive } from "vue";
import choosePaper from "*/public/json/choose.json";
import { useUserTemp } from "@/store/userTemp.js";
const userTemp = useUserTemp();
let show = ref(false);
let onPage = ref(0);
let setPage = ref(5);
let allPage = ref(0);
let showList = ref(choosePaper);
let onLeft = ref(false);
let menu = {
  leixing_all: ["所有", "普通", '"我都不会"'],
  kemu_all: ["所有", "单项选择题", "上机选择题"]
}
let m_listheight=ref("0px")
let m_show=ref(false)

let kemu = ref("所有");
let leixing = ref("所有");
onBeforeRouteLeave(() => {
  show.value = true; // 等待中提示
});

onMounted(() => {
  changeShowList();
});

function meanCount(index){

}

function chooseSel(text) {
  console.log("chooseSel");
  if (onLeft.value) {
    kemu.value = text;
  } else {
    leixing.value = text;
  }
  closeSel();
}
function myindex(index) {
  return onPage.value * setPage.value + index;
}

function closeSel() {
  m_show.value = false;
}

function showSel(ev) {
  let info = ev;
  switch (info) {
    case "科目": {
      onLeft.value = true;
      m_show.value = true;
      m_listheight.value = `${menu.kemu_all.length * 30}px`;
      break;
    }
    case "类型": {
      onLeft.value = false;
      m_show.value = true;
      m_listheight.value = `${menu.leixing_all.length * 30}px`;
      break;
    }
  }
}

function changeShowList() {
  onPage.value = 0;
  console.log("changeShowList");
  changeShowPage();
}

function changeShowPage() {
  console.log("CHANGESHOWPAGE");
  showList.value = _.filter(choosePaper, function (o) {
    return kemu.value == "所有" || o.type == kemu.value;
  });
  showList.value = _.filter(showList.value, function (o) {
    return leixing.value == "所有" || o.level == leixing.value;
  });
  let c = _.chunk(showList.value, setPage.value);
  allPage.value = c.length;
  showList.value = c[onPage.value];
}

const lastdo = computed(() => {
  if (
    sessionStorage.getItem("last") != "undefined" &&
    sessionStorage.getItem("last") != undefined
  ) {
    let data = JSON.parse(sessionStorage.getItem("last"));
    return {
      id: data.id,
      name: data.name,
    };
  } else {
    return false;
  }
});

watch(setPage, () => {
  console.log("setPage_watch");
  changeShowList();
});

watch(onPage, () => {
  console.log("onPage_watch");
  changeShowPage();
});

watch(showList,()=>{
  console.log("SHOWLIST_WATCH");
})

watch(m_show, (d) => {
  if (d) {
    $("header").css("z-index", "1");
    if (onLeft.value) {
      $(".memuClick[data-do=selKemu]").addClass("show");
    } else {
      $(".memuClick[data-do=selLeixing]").addClass("show");
    }
  } else {
    $(".memuClick").removeClass("show");
    $("header").css("z-index", "2");
  }
});

watch(kemu, () => {
  console.log("kemu_watch");
  changeShowList();
});

watch(leixing, () => {
  console.log("leixing_watch");
  changeShowList();
});
</script>

<template>
  <div class="main">
    <div class="topbar">
      <div class="selTest">
        <div class="memuClick" @click="showSel('科目')" data-do="selKemu">
          科目：{{ kemu }}
          <span></span>
        </div>
        <div class="memuClick" @click="showSel('类型')" data-do="selLeixing">
          类型：{{ leixing }}
          <span></span>
        </div>
        <input
          class="memuClick"
          type="number"
          v-model="setPage"
          max="15"
          min="1"
        />
      </div>
      <div
        class="memu"
        :class="{ onleft: onLeft, show: m_show }"
        :style="{ '--i-height': m_listheight.value }"
      >
        <div class="pop" v-if="m_show" @click="closeSel()"></div>
        <div
          class="memuBtn"
          v-for="(text, index) in onLeft ? menu.kemu_all : menu.leixing_all"
          :key="index"
          @click="chooseSel(text)"
        >
          {{ text }}
        </div>
      </div>
      <div class="lastRead" v-if="lastdo">
        上次练习：<router-link :to="`/exem/${lastdo.id}`">
          {{ lastdo.name }}
        </router-link>
      </div>
    </div>
    <listBox>
      <TransitionGroup name="list" tag="ul">
        <!-- <listItem
          v-for="(item, index) in showList"
          :key="item.id"
          
        ></listItem> -->
        <!-- 
          
          
          :highest="userDataT[onPage * setPage + index].max??0"
          :nom="userDataT[onPage * setPage + index].mean??0"
          :isok="userDataT[onPage * setPage + index].ok"
          :exemid="item.id"
          :name="item.name"
          :max="item.fullcount"
          @click="aalert(index)"
          :times="userTemp.get(myindex(1)).times"
          :idb="userDataT[onPage * setPage + index]"
         -->
      </TransitionGroup>
      <li class="pageChunk" v-if="allPage > 1">
        <div class="sanjiao" @click="onPage > 0 ? onPage-- : onPage"></div>
        {{ onPage + 1 }}/{{ allPage }}
        <div
          class="sanjiao"
          @click="onPage < allPage ? onPage++ : onPage"
        ></div>
      </li>
    </listBox>
    <Teleport to="body">
      <alertBox :show="show" text="请等待" title="加载中" />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@import "@/pages/home/train/train.scss";
</style>
