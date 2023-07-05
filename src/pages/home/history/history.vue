<script setup lang="ts">
import post from "@/service/axios.ts";
function update():void {
  let datapost = {
    root: {
      courty: null,
      mac: "11-45-14-19-19-81",
      ip: sessionStorage.getItem("login_ip"),
      stu_no: sessionStorage.getItem("login_stuno"),
      stu_name: sessionStorage.getItem("login_name"),
      class_no: null,
      exm_no: `DX01`,
      stu_pnt: 80,
      exm_pnt: 110,
      exm_mode: 1,
      exm_type: "1",
      exm_name: '单选练习一',
      exm_pgrade: 1,
      exm_ptype: 1,
      test_id: 1,
      qst_info: 1,
      proid: "hgqxxjs",
      unitno: "030204",
    },
  };
  post("/api/InteractData/Xmlresult2.aspx", datapost, (d) => {console.log(d);
  });
}
</script>

<template>
  <div>
    <p>没有</p>
    <button @click="update()">提交</button>
  </div>
</template>

<style scoped lang="scss"></style>
