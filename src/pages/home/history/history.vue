<script setup>
import post from "@/service/axios.ts";
function danxuan() {
  let datapost = {
    root: {
      courty: null,
      mac: "11-45-14-19-19-81",
      ip: sessionStorage.getItem("login_ip"),
      stu_no: sessionStorage.getItem("login_stuno"),
      stu_name: sessionStorage.getItem("login_name"),
      class_no: null,
      exm_no: "KG1115",
      stu_pnt: "32767",
      exm_pnt: "32767",
      exm_mode: null,
      exm_type: "0",
      exm_name: "单选练习十",
      exm_pgrade: null,
      exm_ptype: null,
      test_id: "1",
      qst_info: null,
      proid: "hgqxxjs",
      unitno: "030204",
    },
  };
  post("/api/InteractData/Xmlresult2.aspx", datapost, (d) => {
    console.log(d);
  });
}
// function fix(num, length) {
//   return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
// }
</script>

<template>
  <div>
    <p>没有</p>
  </div>
</template>

<style scoped lang="scss"></style>
