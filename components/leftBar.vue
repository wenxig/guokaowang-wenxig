<script setup>
const props=defineProps({
  adminder:Boolean
})
</script>

<template>
<div class="leftbar" :class="{ad:adminder}">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.ad{
  animation: inputAd-top 400ms;
  animation-fill-mode : forwards;
}
.leftbar:not(.ad){
  opacity: 1;
}
.leftbar{
  background-color: white-rgba(0.8);
  position: relative;
  width: 15vw;
  overflow: auto;
  height: calc(100vh - 70px);
}
.leftbar>ul{
  margin: 0%;
  padding: 0%;
}
@keyframes inputAd-top {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>