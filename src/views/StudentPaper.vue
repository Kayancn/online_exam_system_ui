<template>
  <div>
    <div style="margin: 0 0 10px 0">
      <el-input style="width: 200px" placeholder="请输入考试ID" suffix-icon="el-icon-search" v-model="id" ></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
      <el-button style="margin-left: 5px" type="warning" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
<!--      <el-button type="primary" size="medium" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>-->
      <el-popconfirm
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm = "delBatch"
      >
        <el-button type="danger" size="medium" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
    </div>
    <el-table :data="tableData" border stripe header-cell-class-name="'headerBg'" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="examId" label="考试ID">
      </el-table-column>
      <el-table-column prop="studentId" label="学生ID">
      </el-table-column>
      <el-table-column prop="time" label="提交时间">
      </el-table-column>
      <el-table-column prop="score" label="考试成绩">
      </el-table-column>

      <el-table-column label="操作" width="162">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="$router.push('/manage/handlePaper?id=' + scope.row.id)">阅卷<i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              style="margin-left: 5px"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm = "handleDelete(scope.row.id)"
          >
            <el-button type="danger" size="mini" slot="reference">删除<i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50,100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  name: "Course",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 20,
      id: null,

      form: {},
      multipleSelection: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/student-paper/page",{
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          examId: this.id
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.records
        this.total = res.total
      })

    },
    save() {
      this.request.post("student-paper",this.form).then(res => {
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    reset() {
      this.id= ""
      this.load()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delBatch() {
      let ids = this.multipleSelection.map(v => v.id) //把对象数组转换为纯id的数组
      this.request.post("/student-paper/del/batch", ids).then(res => {
        if(res){
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    handleDelete(id) {
      this.request.delete("/student-paper/" + id).then(res => {
        if(res){
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    }
  }
}
</script>

<style>
.headerBg{
  background-color: #eee !important;
}
</style>