<template>
  <div>
    <el-table :data="paper" border stripe header-cell-class-name="'headerBg'">
      <el-table-column prop="name" label="题目">
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template v-slot="scope">
          <span v-if="scope.row.type === 1">选择题</span>
          <span v-if="scope.row.type === 2">判断题</span>
          <span v-if="scope.row.type === 3">问答题</span>
        </template>
      </el-table-column>
      <el-table-column prop="a" label="选项A">
      </el-table-column>
      <el-table-column prop="b" label="选项B">
      </el-table-column>
      <el-table-column prop="c" label="选项C">
      </el-table-column>
      <el-table-column prop="d" label="选项D">
      </el-table-column>
      <el-table-column prop="score" label="标准分数">
      </el-table-column>
      <el-table-column prop="answer" label="标准答案">
      </el-table-column>
      <el-table-column prop="studentAnswer" label="学生答案">
      </el-table-column>
      <el-table-column prop="detail" label="解析">
      </el-table-column>
      <el-table-column prop="studentScore" label="得分">
        <template v-slot="scope">
          <el-input v-model="scope.row.studentScore"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 0">
      <el-button type="primary" @click="submitScore">提交成绩</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HandlePaper",
  data() {
    return {
      id: this.$route.query.id,
      paper: []
    }
  },
  created() {
    this.request.get("/student-paper/" + this.id).then(res => {
      this.paper = JSON.parse(res.paper)
      if(this.paper && this.paper.length) {
        console.log("开始自动阅卷")
        this.paper.forEach(item => { //自动阅卷
          if(item.answer === item.studentAnswer) {
            item.studentScore = item.score
          }
        })
      }
    })

  },
  methods: {
    submitScore() {
      let sum = 0
      this.paper.forEach(item => {
        if(item.studentScore == null) {
          item.studentScore = 0
        }
        sum += parseInt(item.studentScore)
      })
      this.request.post("/student-paper/",{id: this.id,score: sum}).then(res => {
        this.$message.success("阅卷成功")
        this.$router.push('/manage/studentPaper')
      })
    }
  }
}
</script>

<style scoped>

</style>