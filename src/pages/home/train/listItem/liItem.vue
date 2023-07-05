<script setup lang="ts">
import { useSelStore } from "@/store/seldata.ts";
import { inject } from "vue";
import {useRouter} from 'vue-router'
const props= defineProps<{
  name: string;
  max: number;
  times: number;
  highest: number;
  nom: number;
  exemid: number;
}>();
const setAd = inject("routerAdminder") as Function;
const store = useSelStore();
const ruoter=useRouter()
function go() {
  setAd(false)
  sessionStorage.setItem("sel", JSON.stringify({ sel: [] }));
  store.exem.name = props.name;
  store.exem.doTime = props.times;
  ruoter.push(`/home/exem/${props.exemid}`);
}
</script>

<template>
  <li class="item">
    <p>{{ name }}</p>
    <p>{{ max }}</p>
    <p>{{ times }}</p>
    <p>{{ nom }}</p>
    <p>{{ highest }}</p>
    <p v-if="(highest as number)>=(max as number)" class="ok">合格</p>
    <p v-else class="nook">未合格</p>
    <p @click="go">开始练习</p>
  </li>
</template>

<style scoped lang="scss">
.item {
  border-bottom: {
    width: 1px;
    style: solid;
    color: rgba($color: #c9c9c9, $alpha: 0.8);
  }
  margin: 0 auto;
  display: flex;
  width: 95%;
  height: 40px;
  justify-content: space-around;
  align-items: center;
  position: relative;
  & > p {
    font-size: 17px;
    width: 11%;
    text-align: left;
    font-weight: normal;
  }
  & > p:first-child {
    width: 20%;
  }
  & > p:last-child {
    transition: background 200ms;
    border: 2px solid $yanfei-pink;
    height: calc(100% - 4px);
    @include center;
    border-radius: 3px;
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
.nook {
  color: $yanfei-red;
}
.ok {
  color: $vue-green;
}
</style>
