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
    <el-dropdown style="width:150px; cursor:pointer; text-align: right" >
      <span>{{logger.name}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/manage/manager" style="color: black; text-decoration:none">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <span style="text-decoration: none" @click="logout">退出</span>
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
  },
  data() {
    return {
      logger: localStorage.getItem("logger") ? JSON.parse(localStorage.getItem("logger")) : {}
    }
  },
  methods: {
    logout() {
      this.$router.push("/")
      localStorage.removeItem("logger")
      this.$message.success("退出成功")
    }
  }
}
</script>

<style scoped>

</style>