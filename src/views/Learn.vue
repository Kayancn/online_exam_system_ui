<template>
  <div class="wrapper">
    <div style="margin: 250px auto; background-color: #fff; width: 350px; height: 340px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <img src="../assets/logo.png" alt="" style="width: 24px; position: relative; top: 5px">
        <b style="margin-left: 5px ">考试与练习平台</b>
      </div>
      <b>{{logger.name}}同学，你好！</b>
      <el-button type="primary" style="width: 310px; margin: 10px 0">参加练习</el-button>
      <el-button type="primary" style="width: 310px; margin: 10px 0">参加考试</el-button>
      <el-button type="primary" style="width: 310px; margin: 10px 0">查询考试成绩</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Learn",
  data() {
    return {
      logger: localStorage.getItem("logger") ? JSON.parse(localStorage.getItem("logger")) : {}
    }
  }
}
</script>

<style scoped>

</style>