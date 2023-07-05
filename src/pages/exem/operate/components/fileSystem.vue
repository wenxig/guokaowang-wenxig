<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import fontAwesomeIcon from "@/components/fontAwesomeIcon.vue";
const emit = defineEmits<{
  (e: "change", data: any[]): void;
}>();
const props = withDefaults(
  defineProps<{
    defineFileTree: any[];
  }>(),
  //@ts-ignore
  { defineFileTree: new Array<any>() }
);
//@ts-ignore
const fileTree: any[] = reactive(props);
const daohang: string[] = reactive([]);
let topbarButtonSel: boolean[] = reactive([true, false]);
let showTopTool = ref<boolean>(false);
let guding = ref<boolean>(true);
let daohangTest = ref<string>("");
let clickTimes: number = 0;
watch(fileTree, (newdata) => {
  emit("change", newdata);
});
watch(
  daohang,
  (newdata) => {
    daohangTest.value = "root:/";
    _.each(newdata, (v) => {
      if (v) {
        daohangTest.value += `${v}/`;
      }
    });
  },
  { immediate: true }
);
function setTopbarButtonSel(index: number) {
  _.each(topbarButtonSel, (_v, i) => {
    topbarButtonSel[i] = false;
    if (index == i) {
      topbarButtonSel[i] = true;
      showTopTool.value = true;
      showTopTool.value = true;
    }
  });
}
function toggleTopbarButtonSel() {
  if (showTopTool.value) {
    showTopTool.value = false;
    topbarButtonSel[topbarButtonSel.indexOf(true)] = false;
  } else {
    showTopTool.value = true;
    topbarButtonSel[1] = true;
  }
}

function clickOrdb(id: number) {
  clickTimes++;
  if (clickTimes === 2) {
    clickTimes = 0;
    if (topbarButtonSel[id]) {
      //保证已经选中
      showTopTool.value = topbarButtonSel[id] = false;
    }
  }
  setTimeout(function () {
    if (clickTimes === 1) {
      clickTimes = 0;
      setTopbarButtonSel(id);
    }
  }, 250);
}
</script>

<template>
  <div class="main">
    <div class="topestbar">
      <div class="mianbaoxie">
        <font-awesome-icon icon="fa-regular fa-folder" /> | {{ daohangTest }}
      </div>
      <div class="button">
        <button
          :class="{ sel: topbarButtonSel[0] }"
          @click="setTopbarButtonSel(0)"
        >
          文件
        </button>
        <button :class="{ sel: topbarButtonSel[1] }" @click="clickOrdb(1)">
          主页
        </button>
        <div
          class="toRight"
          :class="{ down: showTopTool }"
          @click="toggleTopbarButtonSel"
        >
          <font-awesome-icon icon="fa-solid fa-chevron-up" />
        </div>
      </div>
    </div>
    <div class="topTool" v-if="showTopTool" :class="{ guding }"></div>
  </div>
</template>

<style scoped lang="scss">
.main {
  $fs-blue: #0066b4;
  width: 100vw;
  height: 100vh;
  background-color: $yanfei-white;
  display: block !important;
  & * {
    font-size: calc(1vw + 1px);
  }
  .topestbar {
    width: 100%;
    height: 6%;
    border-bottom: 1px gray-rgba(1) solid;
    .mianbaoxie,
    .button {
      height: 50%;
      width: 100%;
    }
    .mianbaoxie {
      padding-left: 1%;
    }
    .button {
      @include heightCenter;
      & button {
        transition: border 300ms;
        background-color: transparent;
        height: 100%;
        width: 5%;
        border: 1px transparent solid;
        border-radius: 0;
        &:not(.sel):hover {
          border: 1px gray-rgba(1) solid;
        }
        &:first-child {
          background-color: $fs-blue;
          color: $yanfei-white;
        }
        &.sel:not(:first-child) {
          background-color: mix($yanfei-white, gray-rgba(0.4), 10%);
        }
      }
      & > div {
        position: absolute;
        right: 1%;
        &.down {
          rotate: 180deg;
        }
      }
    }
  }
  .topTool {
    background-color: mix($yanfei-white, gray-rgba(0.4), 10%);
    height: 10%;
    width: 100%;
    position: absolute;
    z-index: 100;
    &.guding {
      position: relative;
    }
  }
}
</style>
