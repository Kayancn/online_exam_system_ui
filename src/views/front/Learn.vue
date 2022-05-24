<template>
  <div class="wrapper">
    <div style="margin: 250px auto; background-color: #fff; width: 350px; height: 340px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <img src="../../assets/logo.png" alt="" style="width: 24px; position: relative; top: 5px">
        <b style="margin-left: 5px ">考试与练习平台</b>
      </div>
      <b>{{logger.name}}同学，你好！</b><el-button size="mini" style="margin-left: 120px" @click="logout">退出</el-button>
      <el-button type="primary" style="width: 310px; margin: 10px 0">参加练习</el-button>
      <el-button type="primary" style="width: 310px; margin: 10px 0" @click="handleExam">参加考试</el-button>
      <el-button type="primary" style="width: 310px; margin: 10px 0" @click="handleScore">查询考试成绩</el-button>
    </div>
<!--    参加练习弹窗-->
<!--    参加考试弹窗-->
    <el-dialog title="考试信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form  size="small">
        <el-form-item label="考试ID">
          <el-input v-model="exam.id" prefix-icon="el-icon-edit" autocomplete="off" placeholder="请输入考试ID"></el-input>
        </el-form-item>
        <el-form-item label="考试密码">
          <el-input v-model="exam.password" prefix-icon="el-icon-lock" show-password autocomplete="off" placeholder="请输入考试密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="beginExam">参加考试</el-button>
      </div>
    </el-dialog>
<!--    查询成绩弹窗-->
    <el-dialog title="考试成绩信息" :visible.sync="dialogFormVisible1" width="50%">
      <el-table :data="tableData" border stripe header-cell-class-name="'headerBg'">
        <el-table-column prop="examId" label="考试ID">
        </el-table-column>
        <el-table-column prop="courseName" label="考试名称">
          <template v-slot="scope">
            <span>{{exams.find(v => v.id === scope.row.examId).name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="提交时间">
        </el-table-column>
        <el-table-column prop="score" label="考试成绩">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>


</template>

<script>
export default {
  name: "Learn",
  data() {
    return {
      logger: localStorage.getItem("logger") ? JSON.parse(localStorage.getItem("logger")) : {},
      dialogFormVisible: false,
      dialogFormVisible1: false,
      exam: {},
      exams: [],
      tableData: [],
    }
  },
  created() {
    this.request.get("/exam").then(res => {
      this.exams = res
    })
  },

  methods: {
    logout() {
      this.$router.push("/")
      localStorage.removeItem("logger")
      this.$message.success("退出成功")
    },
    handleExam() {
      this.exam = {}
      this.dialogFormVisible = true
    },
    beginExam() {
      this.request.post("/exam/begin", this.exam).then(res => {
        if(res.code === '200') {
          if(res.data.paperId){
            this.$router.push('/learn/paper?paperId=' + res.data.paperId + '&name=' + res.data.name + '&time='
                + res.data.time + '&duration=' + res.data.duration + '&examId=' + this.exam.id)
          } else {
            this.$message.error("考试尚未出卷，请联系老师")
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleScore() {
      this.request.get("/student-paper/score",{
        params: {
          studentId: this.logger.id
        }
      }).then(res => {
        this.tableData = res
      })
      this.dialogFormVisible1 = true
    }
  }
}
</script>

<style scoped>

</style>