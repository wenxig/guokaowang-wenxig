<script setup lang="ts">
import { reactive, watch, ref, nextTick, onBeforeMount } from "vue";
import fontAwesomeIcon from "@/components/fontAwesomeIcon.vue";
const emit = defineEmits<{
  (e: "change", data: any[]): void; //当目录树改变时出发，返回改变后的内容
}>();
const props = withDefaults(
  defineProps<{
    defineFileTree?: fileTreeType[]; //初始目录树
  }>(),
  //@ts-ignore 为什么会报错呢
  { defineFileTree: new Array<fileTreeType>() } //没有为空数组
);
const lastFilepath: { //撤销回退数据
  path: string[];
  pStr: string[];
} = {
  path: [],
  pStr: []
}
onBeforeMount(() => {
  _.times(path.length, (i) => {
    path[i].sel = false
  })
})
const fileTree: fileTreeType[] = reactive(props.defineFileTree); //主文件树
const pathRouter: string[] = reactive([]); //存储当前路径经过的文件夹名
const filePath: string[] = reactive([]) //存储到达当前目录经过的索引
let path: fileTreeType[] = reactive(fileTree) //存储当前路径下的文件
let topbarButtonSel: boolean[] = reactive([false, false]); //顶部栏按钮选中
let showTopTool = ref<boolean>(false); //展示顶部二级工具栏
let guding = ref<boolean>(true); //顶部二级工具栏是否固定
let pathRouterTest = ref<string>(""); //"窗口"名称(面包屑)
let clickTimes: number = 0; //保存双击时间
let isShowFsView = ref<boolean>(true) //展示文件区(用于刷新)
let isBackFile = ref<boolean>(false) //是否进行返回上一级操作
let selBox = ref<HTMLDivElement | null>(null) //长按框元素

watch(fileTree, (newdata) => {
  emit("change", newdata);
});
watch(
  pathRouter,
  (newdata) => {
    pathRouterTest.value = "root:/";
    _.each(newdata, (v) => {
      if (v) {
        pathRouterTest.value += `${v}/`;
      }
    });
  },
  { immediate: true }
);
function reloadFsView() {
  path = _.get(fileTree, _.join(filePath, "")) as unknown as fileTreeType[] ?? fileTree
  _.times(path.length, (i) => {
    path[i].sel = false
  })
  isShowFsView.value = false
  nextTick(() => {
    isShowFsView.value = true
  })
}
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
    topbarButtonSel[0] = true;
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
function gotoFile(index: number) {
  lastFilepath.path = JSON.parse(JSON.stringify(filePath));
  lastFilepath.pStr = JSON.parse(JSON.stringify(pathRouter));
  pathRouter.push(path[index].name)
  filePath.push(`[${index}].children`)

  reloadFsView()
}
function backFile() {
  if (filePath[0] != undefined) {
    isBackFile.value = true
    lastFilepath.path = JSON.parse(JSON.stringify(filePath));
    lastFilepath.pStr = JSON.parse(JSON.stringify(pathRouter));
    pathRouter.pop()
    filePath.pop()
    reloadFsView()
  }
}
function unbackFile() {
  if (isBackFile.value) {
    isBackFile.value = false
    filePath.splice(0, filePath.length, ...lastFilepath.path)
    pathRouter.splice(0, pathRouter.length, ...lastFilepath.pStr)
    reloadFsView()
  }
}
function setSelThis(index: number) {
  _.times(path.length, (i) => [
    path[i].sel = false
  ])
  path[index].sel = true
}
function clearSelfiles() {
  _.times(path.length, (i) => [
    path[i].sel = false
  ])
}

class selBoxMet {]
  public selFlag = ref(false)
  public selBoxSize = reactive({
    w: 0,
    h: 0,
    sx: 0,
    sy: 0,
    nx: 0,
    ny: 0,
    x: 0,
    y: 0
  })
  io: IntersectionObserver | null = null
  public startSel(event: MouseEvent) {
    let _this = this
    _this.selFlag.value = true
    _this.selBoxSize.w = 0
    _this.selBoxSize.h = 0
    _this.selBoxSize.sx = _this.selBoxSize.x = event.pageX
    _this.selBoxSize.sy = _this.selBoxSize.y = event.pageY

    const options = {
      root: selBox,
      rootMargin: 0,
      thresholds: 1,
    }
    _this.io = new IntersectionObserver(entries => {
      console.log(entries)
      // Do something
    }, options as any)
  }
  public selMove(event: MouseEvent) {
    let _this = this
    if (_this.selFlag.value) {
      _this.selBoxSize.ny = event.pageY
      _this.selBoxSize.h = Math.abs(_this.selBoxSize.sy - _this.selBoxSize.ny)
      _this.selBoxSize.nx = event.pageX
      _this.selBoxSize.w = Math.abs(_this.selBoxSize.sx - _this.selBoxSize.nx)
      if (_this.selBoxSize.sx >= event.pageX) {
        _this.selBoxSize.x = event.pageX
      }
      if (_this.selBoxSize.sy >= event.pageY) {
        _this.selBoxSize.y = event.pageY
      }
    }
  }
  public endSel() {
    let _this = this
    _this.selFlag.value = false
    _this.io=null
  }
}

let selBoxs = new selBoxMet()

</script>

<template>
  <div class="main-fs" @mouseup="selBoxs.endSel()" @mousemove="selBoxs.selMove($event)">
    <div class="topestbar">
      <div class="mianbaoxie">
        <font-awesome-icon icon="fa-regular fa-folder" /> | {{ pathRouterTest }}
      </div>
      <div class="button">
        <button>文件</button>
        <button :class="{ sel: topbarButtonSel[0] }" @click="clickOrdb(0)">
          主页
        </button>
        <button :class="{ sel: topbarButtonSel[1] }" @click="clickOrdb(1)">
          查看
        </button>
        <div class="toRight" :class="{ down: showTopTool }" @click="toggleTopbarButtonSel">
          <font-awesome-icon icon="fa-solid fa-chevron-up" />
        </div>
      </div>
    </div>
    <div class="topTool" v-if="showTopTool" :class="{ guding }"></div>
    <div class="path">
      <div class="pathDo">
        <font-awesome-icon icon="fa-solid fa-arrow-left" @click="backFile()" />
        <font-awesome-icon icon="fa-solid fa-arrow-right" @click="unbackFile()" />
      </div>
      <div class="pathWhere">
        <font-awesome-icon icon="fa-regular fa-database" class="rooticon" />
        <div v-for="(pathItem, index) in pathRouter" :key="index"><span>></span> {{ pathItem }}</div>
        <font-awesome-icon icon="fa-solid fa-chevron-down" class="pathBack" />
      </div>
      <div class="search">
        <input type="search" placeholder="在这里搜索">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </div>
    </div>
    <div class="mouseSelBox" :style="{
      width: selBoxs.selBoxSize.w + 'px',
      height: selBoxs.selBoxSize.h + 'px',
      left: selBoxs.selBoxSize.x + 'px',
      top: selBoxs.selBoxSize.y + 'px'
    }" v-if="selBoxs.selFlag.value" ref="selBox"></div>
    <div class="fsView" v-if="isShowFsView" @click="clearSelfiles" @mousedown.left="selBoxs.startSel($event)">

      <div v-for="(file, index) in path" :key="index" @dblclick="gotoFile(index)" @click.stop="setSelThis(index)"
        :class="{ selthis: file.sel }">
        <font-awesome-icon icon="fa-regular fa-folder" class="icon" />
        {{ file.name }}
      </div>

    </div>
    <div class="bottomBar">
      {{ path.length }}个条目
    </div>
  </div>
</template>

<style scoped lang="scss">
$fs-blue: #0066b4;

.main-fs {
  width: 100vw;
  height: 100vh;
  background-color: $yanfei-white;
  display: block !important;
  position: relative;

  & * {
    font-size: calc(1vw + 1px);
  }

  .topestbar {
    width: 100%;
    min-height: 6%;
    border-bottom: 1px gray-rgba(1) solid;

    .mianbaoxie,
    .button {
      height: 3vh;
    }

    .mianbaoxie {
      padding-left: 1%;
      width: 99%;
      @include heightCenter;
    }

    .button {
      @include heightCenter;
      width: 100%;

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

      &>div {
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

  .path {
    height: 5%;
    @include heightCenter;
    padding-top: 3px;
    padding-left: 3px;
    margin-bottom: 1%;

    .pathDo {
      @include heightCenter;
      height: 100%;
      width: 80px;

      &>* {
        width: 40px;
        @include center;
        height: 100%;
        font-size: 1.5vw;

        &:active {
          background-color: mix($yanfei-white, gray-rgba(0.4), 10%);
        }
      }

      margin-right: 3px;
    }

    .pathWhere {
      width: 80%;
      height: 90%;
      border: 1px gray-rgba(1) solid;
      @include heightCenter;
      position: relative;

      & * {
        font-size: 1.5vw;

        span {
          margin-left: 5px;
          margin-right: 5px;
        }

        @include heightCenter;
        height: 100%;
      }

      .pathBack {
        position: absolute;
        right: 10px;
        font-size: 1.1vw;
      }
    }

    .search {
      border: 1px gray-rgba(1) solid;
      height: 90%;
      width: 13%;
      margin-left: 6px;
      @include heightCenter;
      position: relative;

      input {
        height: 100%;
        width: 100%;
        background-color: transparent;
        border: 0px;
      }

      :not(input) {
        position: absolute;
        right: 3%;
      }
    }
  }

  .fsView {
    height: 89%;
    width: 100%;
    position: relative;

    &>div {
      @include heightCenter;
      width: 89%;
      height: 32px;
      padding-left: 1%;
      font-size: 17px;
      border: 2px solid transparent;
      position: relative;
      z-index: 100;

      &>.icon {
        font-size: 20px;
        margin-right: 10px
      }

      &.selthis {
        background-color: rgba($color: $fs-blue, $alpha: 0.1);
        border: 2px solid rgba($color: $fs-blue, $alpha: 0.2);
      }
    }
  }

  .bottomBar {
    @include heightCenter;
    position: absolute;
    bottom: 0px;
    width: 98%;
    height: 30px;
    border-top: 1px gray-rgba(1) solid;
    padding-left: 2%;
  }
}

.mouseSelBox {
  position: fixed;
  z-index: 100;
  background-color: rgba($color: $fs-blue, $alpha: 0.2);
  border: 2px solid rgba($color: $fs-blue, $alpha: 0.25);
}
</style>
