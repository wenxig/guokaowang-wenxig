<script setup>
import listBox from "@/components/listbox.vue";
import listItem from "@/components/liItem.vue";
import alertBox from "@/components/alertbox.vue";
import choosePaper from "*/public/json/choose.json";
import { onBeforeRouteLeave } from "vue-router";
import { ref } from "vue";
let show = ref(false);
onBeforeRouteLeave((to, from) => {
  show.value = true;
});
</script>
<script>
export default {
  data() {
    return {
      b: false,
      kemu: "所有",
      leixing: "所有",
      onLeft: false,
      menu: {
        leixing_all: ["所有", "普通", '"我都不会"'],
        kemu_all: ["所有", "单项选择题", "上机选择题"],
        listheight: "0px",
        show: false,
      },
      menu_closetime: undefined,
      showList: choosePaper,
      onPage: 0,
      setPage: 5,
      allPage: 0,
    };
  },
  methods: {
    showSel(ev) {
      let t = this;
      let info = ev;
      switch (info) {
        case "科目": {
          this.onLeft = true;
          this.menu.show = true;
          this.menu.listheight = `${this.menu.kemu_all.length * 30}px`;
          break;
        }
        case "类型": {
          this.onLeft = false;
          this.menu.show = true;
          this.menu.listheight = `${this.menu.leixing_all.length * 30}px`;
          break;
        }
      }
    },
    closeSel() {
      this.menu.show = false;
    },
    chooseSel(text) {
      this[this.onLeft ? "kemu" : "leixing"] = text;
      this.closeSel();
    },
    changeShowList() {
      let _this = this;
      _this.onPage = 0;
      _this.showList = _.filter(choosePaper, function (o) {
        return _this.kemu == "所有" || o.type == _this.kemu;
      });
      _this.showList = _.filter(_this.showList, function (o) {
        return _this.leixing == "所有" || o.level == _this.leixing;
      });
      let c=_.chunk(_this.showList, _this.setPage)
      console.log(c.length);
      _this.allPage = c.length;
      _this.showList = c[_this.onPage];
    },
    changeShowPage() {
      let _this=this
      _this.showList = _.filter(choosePaper, function (o) {
        return _this.kemu == "所有" || o.type == _this.kemu;
      });
      _this.showList = _.filter(_this.showList, function (o) {
        return _this.leixing == "所有" || o.level == _this.leixing;
      });
      let c=_.chunk(_this.showList, _this.setPage)
      console.log(c.length);
      _this.allPage = c.length;
      _this.showList = c[_this.onPage];
    },
  },
  watch: {
    onPage() {
      this.changeShowPage();
    },
    setPage(){
      this.changeShowList();
    },
    "menu.show"(d) {
      if (d) {
        $("header").css("z-index", "1");
        if (this.onLeft) {
          $(".memuClick[data-do=selKemu]").addClass("show");
        } else {
          $(".memuClick[data-do=selLeixing]").addClass("show");
        }
      } else {
        $(".memuClick").removeClass("show");
        $("header").css("z-index", "2");
      }
    },
    kemu() {
      this.changeShowList();
    },
    leixing() {
      this.changeShowList();
    },
  },
  mounted() {
    this.changeShowList();
  },
  computed: {
    lastRead() {
      if (sessionStorage.getItem("lastRead") ?? false) {
        return JSON.parse(sessionStorage.getItem("lastRead"));
      } else {
        return false;
      }
    },
  },
};
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
        <input class="memuClick" type="number" v-model="setPage" max="15" min="1"/>
      </div>
      <div
        class="memu"
        :class="{ onleft: onLeft, show: menu.show }"
        :style="{ '--i-height': menu.listheight }"
      >
        <div class="pop" v-if="menu.show" @click="closeSel()"></div>
        <div
          class="memuBtn"
          v-for="(text, index) in onLeft ? menu.kemu_all : menu.leixing_all"
          :key="index"
          @click="chooseSel(text)"
        >
          {{ text }}
        </div>
      </div>
      <div class="lastRead" v-if="lastRead">
        上次练习：<router-link :to="lastRead.url">{{
          lastRead.text
        }}</router-link>
      </div>
    </div>
    <listBox>
      <TransitionGroup name="list" tag="ul">
        <listItem
          v-for="item in showList"
          :key="item.id"
          :name="item.name"
          :max="item.fullcount"
          :times="114514"
          :highest="0"
          :nom="0"
          :isok="false"
          :exemid="item.id"
        ></listItem>
      </TransitionGroup>
      <li class="pageChunk" v-if="allPage > 1">
        <div class="sanjiao" @click="onPage>0?onPage--:onPage"></div>
        {{ onPage + 1 }}/{{ allPage }}
        <div class="sanjiao" @click="onPage<allPage?onPage++:onPage"></div>
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
