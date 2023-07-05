<script setup lang="ts">
import alertBox from "@/components/alertbox.vue";
import { RouteLocationRaw, onBeforeRouteLeave, useRouter } from "vue-router";
import { ref } from "vue";
const show = ref(false);
onBeforeRouteLeave(() => {
  show.value = true;
});
let router = useRouter();
function go(to: RouteLocationRaw) {
  router.push(to);
}
</script>
<template>
  <div id="main">
    <div class="card">
      <p>单元练习</p>
      <p>
        参考教材分章节命题，考生根据报考类别、报考级别选择。上机操作题输出详细评分步骤。
      </p>
      <a @click="go('/home/train')" class="gosee">前往查看</a>
    </div>
    <div class="card">
      <p>我的考试</p>
      <p>
        依据考试大纲制定抽题模板，根据抽题模板从各个单元练习题库中随机抽题组卷。
      </p>
      <a @click="go('/home/exem')" class="gosee">前往查看</a>
    </div>
    <div class="card">
      <p>学习档案</p>
      <p>查看个人历次单元练习和模拟考试记录。</p>
      <a @click="go('/home/history')" class="gosee">前往查看</a>
    </div>
    <div class="card">
      <p>作者的个人网</p>
      <p>作者wenxig的个人网站</p>
      <a href="https://wenxig.surge.sh" target="_blank" class="gosee"
        >前往查看</a
      >
    </div>
    <div class="card" id="last">
      <p>技术支持</p>
      <p>
        本系统运行过程中需要保持与互联网的连接，具不具备上网条件都请盲目购买。每个ID能在无数台电脑上安装，重复认证则前次认证仍然保存。数据不会共享。
      </p>
      <p></p>
    </div>
    <Teleport to="body">
      <alertBox :show="show" text="页面组件加载" title="加载中" />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@import "index.scss";
</style>
