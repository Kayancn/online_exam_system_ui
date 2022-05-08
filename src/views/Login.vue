<template>
  <div class="wrapper">
    <div style="margin: 250px auto; background-color: #fff; width: 350px; height: 340px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <img src="../assets/logo.png" alt="" style="width: 24px; position: relative; top: 5px">
        <b style="margin-left: 5px ">考试与练习平台</b>
      </div>
      <el-form :model="logger" :rules="rules" ref="loggerForm">
        <el-form-item prop="role" label="登录身份：" style="margin-bottom: 15px">
          <el-radio-group v-model="role" style="margin-left: 5px">
            <el-radio :label="'student'">学生</el-radio>
            <el-radio :label="'teacher'">教师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="id" style="padding:0">
          <el-input  size="medium"  prefix-icon="el-icon-user" v-model="logger.id" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item  prop="password" style="padding:0">
          <el-input size="medium"  prefix-icon="el-icon-lock" show-password v-model="logger.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="padding: 0; text-align: right">
          <el-button type="primary" size="medium"  autocomplete="off" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      logger: {},
      role: 'student',
      rules: {
        id: [
          { required: true, message: '请输入学号/工号', trigger: 'blur' },
          { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs['loggerForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          if(this.role === 'student'){
            this.request.post("/student/login", this.logger).then(res => {
              if(res.code === '200') {
                localStorage.setItem("logger",JSON.stringify(res.data)) //存储用户信息到浏览器
                this.$router.push("/exam")
                this.$message.success("登录成功")
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            this.request.post("/teacher/login", this.logger).then(res => {
              if(res.code === '200') {
                localStorage.setItem("logger",JSON.stringify(res.data)) //存储用户信息到浏览器
                this.$router.push("/manage")
                this.$message.success("登录成功")
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);
  overflow: hidden;
}
</style>