<script setup lang="ts">
import { reactive } from "vue";
const store:{sel:string[] } = JSON.parse(sessionStorage.getItem("sel") as string)
const props = defineProps<{
  item: {
    choose:{
      a:string,
      b:string,
      c:string,
      d:string,
    },
    title:string,
    true:string
  },
  answer: boolean,
  id: number,
  page: number
}>();
let choose = reactive({
  a: "",
  b: "",
  c: "",
  d: "",
  now: "",
});
let myPos:number=(props.page*15)+props.id;
const emit = defineEmits(["showAlert"]);
const handleClick = () => {
  emit("showAlert", props.item.true);
};


if(store.sel[myPos]){
  choose[store.sel[myPos]] //="choose"
  choose.now = store.sel[myPos];
}
function selItem(sel) {
  let nowdata=JSON.parse(sessionStorage.getItem("sel") as string)
  nowdata.sel[myPos] = sel;
  store.sel[myPos] = sel;
  sessionStorage.setItem("sel",JSON.stringify({
    sel:nowdata.sel
  }))
  choose[choose.now] //= "";
  choose.now = sel;
  choose[sel] = "choose";
}
</script>

<template>
  <ul :class="{ chooses: store.sel[myPos] }">
    <li>{{ props.item.title }}</li>
    <li
      v-for="(item, index) in props.item.choose"
      :key="item"
      @click="selItem(index)"
      :class="[choose[index]]"
    >
      <!-- index == a/b/c/d-->
      {{ index }}: {{ item }}
    </li>
    <li v-if="props.answer" @click="handleClick">查看答案</li>
  </ul>
</template>

<style scoped lang="scss">
.choose {
      background-color: $yanfei-yellow !important;
    }
.chooses {
  background-color: rgba($color: $yanfei-pink, $alpha: 0.2);
}
ul {
  position: relative;
  margin: 0%;
  padding: 0px;
  padding-left: 2%;
  width: 100%;
  
  & > li + li {
    transition: background 200ms ease-out;
    margin-top: 5px;
    background-color: gray-rgba(0.2);
    border-radius: 5px;
    width: calc(70% - 6%);
    height: 40px;
    @include heightCenter;
    padding-left: 2%;
    &:hover {
      background-color: gray-rgba(0.8);
    }
    &:last-child {
      transition: background 100ms ease-out, color 100ms ease-out;
      position: absolute;
      width: auto;
      padding: 0px 5px;
      background: transparent;
      right: 20px;
      transform: translate(-50%, calc(-100% - 6px));
      border: {
        style: solid;
        width: 2px;
        color: $yanfei-pink;
      }
      &:active {
        color: white-rgba(0.8);
        background-color: $yanfei-pink;
      }
    }
  }
  & > li:first-child {
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    width: 85vw;
  }
}

img {
  width: auto;
  height: 30px;
}
</style>