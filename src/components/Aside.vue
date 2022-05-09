<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x:hidden"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px">
      <b style="color:white; margin-left: 5px" v-show="logoTextShow">考试与练习平台</b>
    </div>
    <el-menu-item index="/manage/home">
      <i class="el-icon-house"></i>
      <span slot="title">主页</span>
    </el-menu-item>

    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">考试管理</span>
    </el-menu-item>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">资源管理</span>
      </template>
      <el-menu-item index="/manage/course">课程管理</el-menu-item>
      <el-menu-item index="3-1">试卷管理</el-menu-item>
      <el-menu-item index="/manage/question">题目管理</el-menu-item>
    </el-submenu>

    <el-menu-item index="/manage/student">
      <i class="el-icon-s-custom"></i>
      <span slot="title">学生管理</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: "Aside.vue",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  }
}
</script>

<style scoped>

</style>