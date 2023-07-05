<template>
  <div class="main">
    <ul>
      <li>
        <p>名称</p>
        <p>满分</p>
        <p>次数</p>
        <p>平均成绩</p>
        <p>最高成绩</p>
        <p>是否合格</p>
        <p>开始练习</p>
      </li>
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.main {
  background-color: transparent !important;
  & ul {
    margin: 0%;
    padding: 0px;
    width: 100%;
  }
  & li {
    margin: 0 auto;
    display: flex;
    width: 95%;
    height: 40px;
    background-color: rgba($color: #979797, $alpha: 0.2);
    margin-top: 10px;
    justify-content: space-around;
    align-items: center;
    & > p {
      font-size: 17px;
      width: 11%;
    }
    & > p:first-child {
      width: 20%;
    }
  }
}
:deep(li) {
  width: 95%;
  height: 40px;
  margin: 0 auto;
}
</style>