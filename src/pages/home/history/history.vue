<script setup>
import post from "@/service/axios.js";
function danxuan() {
  let datapost = {
    root: {
      courty: null,
      mac: "11-45-14-19-19-81",
      ip: sessionStorage.getItem("login_ip"),
      stu_no: sessionStorage.getItem("login_stuno"),
      stu_name: sessionStorage.getItem("login_name"),
      class_no: null,
      exm_no: "DX10",
      stu_pnt: "52",
      exm_pnt: "52",
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

// function caozuo() {
//   // let ca=[]
//   _.times(10, (j)=>{
//     let num=fix(j+4,2)
//     _.times(15, (i) => {
//     let datapost = {
//       root: {
//         courty: null,
//         mac: "11-45-14-19-19-81",
//         ip: sessionStorage.getItem("login_ip"),
//         stu_no: sessionStorage.getItem("login_stuno"),
//         stu_name: sessionStorage.getItem("login_name"),
//         class_no: null,
//         exm_no: `KG${num}${i<10?`0${i}`:i}`,
//         stu_pnt: "32767",
//         exm_pnt: "32767",
//         exm_mode: null,
//         exm_type: "0",
//         exm_name: `Word${i<10?`0${i}`:i}`,
//         exm_pgrade: null,
//         exm_ptype: null,
//         test_id: "1",
//         qst_info: null,
//         proid: "hgqxxjs",
//         unitno: "030204",
//       },
//     };
//     post("/api/InteractData/Xmlresult2.aspx", datapost, (d) => {
//       console.log(d);
//     });
//   });
//   })
// }
// function fix(num, length) {
//   return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
// }
</script>

<template>
  <div>
    <p>没有</p>
    <!-- <button @click="danxuan()">danxuan</button>
    <button @click="caozuo()">caozuo</button> -->
  </div>
</template>

<style scoped lang="scss"></style>
