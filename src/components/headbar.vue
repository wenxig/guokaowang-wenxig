<script setup>
const loginName = sessionStorage.login_name;
const stuno = sessionStorage.login_stuno
const props = defineProps({
  adminder: Boolean,
});
</script>

<template>
  <header :class="{ ad: adminder }">
    <h2><span>信果考网</span>信息技术课教学云平台</h2>
    <div class="user-info">
      <p class="user-name">姓名:{{ loginName }}&nbsp;&nbsp;学号:{{ stuno }}</p>
      <slot></slot>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  $barheight: 70px;
  @include heightCenter;
  height: $barheight;
  width: 100vw;
  background-color: rgba($color: #d9d9d9, $alpha: 0.8);
  z-index: 2;

  h2 {
    margin: 0%;
    margin-left: 2%;
    color: $yanfei-pink;
    font-style: oblique;
  }

  h2 > span {
    color: $yanfei-red;
    font-size: 30px;
    font-style: normal;
  }
  & .user-info {
    position: absolute;
    right: 10%;
    @include heightCenter;
    * {
      font-size: 15px;
    }
  }
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
.ad{
  animation: inputAd-top 300ms;
  animation-fill-mode : forwards;
}
header:not(.ad){
  opacity: 1;
}
</style>
