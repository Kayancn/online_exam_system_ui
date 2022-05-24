<template>
  <div style="margin: 0 100px">
    <div style="margin: 20px 0">
      <span style="font-size: 20px; color: #333">{{name}}</span>
      <span style="font-size: 14px; color: #333; margin-left: 20px">开始时间：{{time}}</span>
      <span style="font-size: 14px; color: #333; margin-left: 20px">考试时长：{{duration}}分钟</span>

    </div>
    <div style="margin: 10px 0">
      <el-card>
        <div v-for="(item, index) in questions" :key="item.id" style="margin: 20px 0">
          <div style="margin: 10px 0; font-size: 20px"><span>{{index + 1}}. </span>{{item.name}}
            <span style="font-size: 14px" v-if="item.type === 1">（选择题）</span>
            <span style="font-size: 14px" v-if="item.type === 2">（判断题）</span>
            <span style="font-size: 14px" v-if="item.type === 3">（问答题）</span>
          </div>

          <div v-if="item.type === 1" style="margin: 10px 0">
            <span style="margin-right: 20px"><el-radio v-model="item['studentAnswer']" label="A">A. {{item.a}}</el-radio></span>
            <span style="margin-right: 20px"><el-radio v-model="item['studentAnswer']" label="B">B. {{item.b}}</el-radio></span>
            <span style="margin-right: 20px"><el-radio v-model="item['studentAnswer']" label="C">C. {{item.c}}</el-radio></span>
            <span><el-radio v-model="item['studentAnswer']" label="D">D. {{item.d}}</el-radio></span>
          </div>

          <div v-if="item.type === 2" style="margin: 10px 0">
            <span style="margin-right: 20px"><el-radio v-model="item['studentAnswer']" label="正确">正确</el-radio></span>
            <span><el-radio v-model="item['studentAnswer']" label="错误">错误</el-radio></span>
          </div>

          <div v-if="item.type === 3" style="margin: 10px 0">
            <el-input type="textarea" v-model="item['studentAnswer']"></el-input>
          </div>
<!--          <div style="margin: 10px">-->
<!--            答案： {{item.answer}}-->
<!--          </div>-->
<!--          <div style="margin: 10px">-->
<!--            解析： {{item.detail}}-->
<!--          </div>-->
        </div>
      </el-card>

      <div style="margin: 20px; text-align: center">
        <el-button size="medium" type="primary" @click="submitPaper">交卷</el-button>
        <el-button size="medium" type="warning" @click="$router.push('/learn')">退出考试</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Paper",
  data() {
    return {
      logger: localStorage.getItem("logger") ? JSON.parse(localStorage.getItem("logger")) : {},
      questions: [],
      examId: this.$route.query.examId,
      paperId: this.$route.query.paperId,
      name: this.$route.query.name,
      time: this.$route.query.time,
      duration: this.$route.query.duration
    }
  },
  created() {
    this.request.get("/paper/view/" + this.paperId).then(res => {
      this.questions = res.data
    })
  },
  methods: {
    submitPaper() {
      this.request.post("/student-paper",{examId:this.examId, paper: JSON.stringify(this.questions),studentId: this.logger.id}).then(res => {
        if(res.code === '200') {
          this.$message.success("交卷成功")
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>