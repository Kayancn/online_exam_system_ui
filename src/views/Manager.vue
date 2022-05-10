<template>
  <el-card style="width: 500px">
    <el-form label-width="80px" size="small">
      <el-form-item label="学工号">
        <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "Manager",
  data() {
    return {
      form: {},
      logger: localStorage.getItem("logger") ? JSON.parse(localStorage.getItem("logger")) : {}
    }
  },
  created() {
    this.request.get("/teacher/" + this.logger.id).then(res => {
      if(res.code === '200'){
        this.form = res.data
      }
    })
  },
  methods: {
    save() {
      this.request.post("/teacher",this.form).then(res => {
        if(res){
          this.$message.success("保存成功")
        } else {
          this.$message.error("保存失败")
        }
      })
    }
  }

}
</script>

<style scoped>

</style>