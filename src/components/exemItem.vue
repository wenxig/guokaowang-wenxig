<script setup>
import { ref } from "vue";
const store = JSON.parse(sessionStorage.getItem("sel"))
const props = defineProps({
  item: Array | Object,
  answer: Boolean,
  id: Number,
  page: Number
});
let choose = ref({
  a: "",
  b: "",
  c: "",
  d: "",
  now: "",
});
let myPos=(props.page*15)+props.id;
const emit = defineEmits(["showAlert"]);
const handleClick = () => {
  emit("showAlert", props.item.true);
};


if(store.sel[myPos]){
  choose.value[store.sel[myPos]]="choose"
  choose.value.now = store.sel[myPos];
}
function selItem(sel) {
  let nowdata=JSON.parse(sessionStorage.getItem("sel"))
  nowdata.sel[myPos] = sel;
  store.sel[myPos] = sel;
  sessionStorage.setItem("sel",JSON.stringify({
    sel:nowdata.sel
  }))
  choose.value[choose.value.now] = "";
  choose.value.now = sel;
  choose.value[sel] = "choose";
  console.log(sessionStorage.getItem("sel"));
}
</script>

<template>
  <ul :class="{ chooses: store.sel[myPos] }">
    <li>{{ props.item.title }}</li>
    <li
      v-for="(item, index) in props.item.chooses"
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
  }
}

img {
  width: auto;
  height: 30px;
}
</style>