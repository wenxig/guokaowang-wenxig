<script setup lang="ts">
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from "vue-router";
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useSelStore } from "@/store/seldata.ts";
const store = storeToRefs(useSelStore());
const route: RouteLocationNormalizedLoaded = useRoute();
const router: Router = useRouter();
let isChoose = ref<boolean>(true)

function back() {
  router.push("/home/train");
}
function startE() {
  sessionStorage.setItem(
    "last",
    JSON.stringify({ id: route.params.id, name: store.exem.value.name })
  );
  if (isChoose.value) {
    router.push("/exem/choose/" + route.params.id)
  }
}
</script>

<template>
  <div class="main">
    <div class="about">
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
  </div>
</template>

<style scoped lang="scss">
.main{
  @include center;
  overflow-x: hidden;
  overflow-y: auto;
  .about {
    position: relative;
    width: 45vw;
    height: 35vw;
    background-color: white-rgba(0.8);
    border-radius: 6px;
    & table {
      width: 60%;
      height: 50%;
      margin-top: 5%;
      margin-left: 5%;
      & th {
        border-bottom: {
          width: 1px;
          style: solid;
          color: black;
        }
        text-align: left;
        vertical-align: bottom;
      }

      & * {
        font: {
          size: 17px;
          weight: normal;
        }
      }
    }
  }
}
.btn-goto {
  margin: 0 auto;
  position: absolute;
  display: flex;
  bottom: 12px;
  left: 5%;
  button {
    transition: background 200ms cubic-bezier(0, 0.78, 0.65, 0.76);
    width: 20vw;
    border: 0px;
    height: 30px;
    background-color: white-rgba(1);
    border-radius: 3px;
    &:active {
      background-color: gray-rgba(0.8);
    }
    font-size: 19px;
  }
  @include widthCenter;
  button + button {
    margin-left: 10%;
  }
}
</style>