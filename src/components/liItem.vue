<script>
// import {storeToRefs} from 'pinia';
// import { useSelStore } from "@/store/seldata.js";
// const store = storeToRefs(useSelStore());
// export default {
//   props: {
//     name: String,
//     max: Number,
//     times: Number,
//     highest: Number,
//     nom: Number,
//     isok: Boolean,
//     exemid: Number,
//     idb:Object
//   },
//    methods:{
//     go(){
//       alert(JSON.stringify(this.$props.idb))
//       store.sel=[]
//       store.exem.name=this.$props.name
//       store.exem.doTime=this.$props.times
//       this.$router.push({
//         name:`exem`,
//         params:{
//           id:this.$props.exemid
//         }
//       })
//     }
//   }
// };
</script>
<script setup>

</script>

<template>
  <li class="item">
    123
      <!-- <p>{{ name }}</p>
      <p>{{ max }}</p>
      <p>{{ times }}</p>
      <p>{{ highest }}</p>
      <p>{{ nom }}</p>
      <p v-if="isok" class="ok">合格</p>
      <p v-else class="nook">未合格</p>
      <p @click="go">开始练习</p> -->
    </li>
</template>

<style scoped lang="scss">
// .item {
//   border-bottom: {
//     width: 1px;
//     style: solid;
//     color: rgba($color: #c9c9c9, $alpha: 0.8);
//   }
//   margin: 0 auto;
//   display: flex;
//   width: 95%;
//   height: 40px;
//   justify-content: space-around;
//   align-items: center;
//   position: relative;
//   & > p {
//     font-size: 17px;
//     width: 11%;
//     text-align: left;
//     font-weight: normal;
//   }
//   & > p:first-child {
//     width: 20%;
//   }
//   & > p:last-child {
//     transition: background 200ms;
//     border: 2px solid $yanfei-pink;
//     height: calc(100% - 4px);
//     @include center;
//     border-radius: 3px;
//     &:hover {
//       background-color: #f5f5f5;
//     }
//   }
// }
// .nook {
//   color: $yanfei-red;
// }
// .ok {
//   color: $vue-green;
// }
</style>
