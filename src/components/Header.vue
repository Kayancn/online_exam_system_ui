<template>
  <div style="font-size: 12px; line-height: 60px; display: flex">
    <div style="font-size:20px" >
      <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
    </div>
    <div style="flex: 1;margin-left:20px">
      <el-breadcrumb separator="/" style="font-size:20px; line-height: 60px">
        <el-breadcrumb-item :to="'/'">主页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width:70px; cursor:pointer" >
      <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/" style="text-decoration: none">退出</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: ''
  }
}
</script>

<style scoped>

</style>