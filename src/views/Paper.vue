<template>
  <div>
    <div style="margin: 0 0 10px 0">
      <el-input style="width: 200px" placeholder="请输入试卷名称" suffix-icon="el-icon-search" v-model="name" ></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
      <el-button style="margin-left: 5px" type="warning" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" size="medium" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      <el-popconfirm
          style="margin-left: 5px"
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
      <el-table-column prop="id" label="试卷ID">
      </el-table-column>
      <el-table-column prop="name" label="试卷名称">
      </el-table-column>
      <el-table-column prop="courseName" label="所属课程">
        <template v-slot="scope">
          <span>{{courses.find(v => v.id === scope.row.courseId).name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="试卷总分">
      </el-table-column>
      <el-table-column prop="duration" label="时长(分)">
      </el-table-column>

      <el-table-column label="操作" width="380">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="takePaper(scope.row.id,scope.row.courseId)">组卷<i class="el-icon-document"></i></el-button>
          <el-button type="primary" size="mini" @click="viewPaper(scope.row.id)">查看试卷<i class="el-icon-document"></i></el-button>
          <el-button type="success" size="mini" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
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
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="题目信息" :visible.sync="dialogFormVisible2" width="60%">
      <el-card>
        <div v-for="(item, index) in questions" :key="item.id" style="margin: 20px 0">
          <div style="margin: 10px 0; font-size: 20px"><span>{{index + 1}}. </span>{{item.name}}
            <span style="font-size: 14px" v-if="item.type === 1">（选择题）</span>
            <span style="font-size: 14px" v-if="item.type === 2">（判断题）</span>
            <span style="font-size: 14px" v-if="item.type === 3">（问答题）</span>
          </div>

          <div v-if="item.type === 1" style="margin: 10px 0">
            <span style="margin-right: 20px">A. {{item.a}}</span>
            <span style="margin-right: 20px">B. {{item.b}}</span>
            <span style="margin-right: 20px">C. {{item.c}}</span>
            <span>D. {{item.d}}</span>
          </div>
          <div style="margin: 10px">
            答案： {{item.answer}}
          </div>
          <div style="margin: 10px">
            解析： {{item.detail}}
          </div>
        </div>
      </el-card>
    </el-dialog>

    <el-dialog title="组卷信息" :visible.sync="dialogFormVisible1" width="20%">
      <el-form label-width="100px" size="small">
        <el-form-item label="选择题数量">
          <el-input v-model="form1.type1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="判断题数量">
          <el-input v-model="form1.type2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="问答题题数量">
          <el-input v-model="form1.type3" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="generatePaper">生 成 试 卷</el-button>
      </div>
    </el-dialog>

    <el-dialog title="试卷信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="试卷名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属课程">
          <el-select clearable v-model="form.courseId" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in courses"
                       :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="试卷总分">-->
<!--          <el-input v-model="form.score" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="时长(分)">
          <el-input v-model="form.duration" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Paper",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",

      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form: {},
      form1: {},
      multipleSelection: [],
      courses: [],
      questions: []
    }
  },
  created() {
    this.load()
    this.request.get("/course").then(res => {
      this.courses = res
    })
  },
  methods: {
    takePaper(paperId,courseId) {
      this.form1 = {type1: 4, type2: 4, type3: 2, paperId: paperId, courseId: courseId}
      this.dialogFormVisible1 = true
    },
    generatePaper() {
      this.request.post("/paper/takePaper", this.form1).then(res => {
        if(res.code === '200'){
          this.$message.success("组卷成功")
          this.dialogFormVisible1 = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    viewPaper(paperId) {
      this.request.get("/paper/view/" + paperId).then(res => {
        this.questions = res.data
        this.dialogFormVisible2 = true
      })
    },
    load() {
      this.request.get("/paper/page",{
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.records
        this.total = res.total
      })

    },
    save() {
      this.request.post("/paper",this.form).then(res => {
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
      this.name= ""
      this.load()
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delBatch() {
      let ids = this.multipleSelection.map(v => v.id) //把对象数组转换为纯id的数组
      this.request.post("/paper/del/batch", ids).then(res => {
        if(res){
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    handleEdit(row) {
      this.form = Object.assign({},row)
      this.dialogFormVisible = true
    },
    handleDelete(id) {
      this.request.delete("/paper/" + id).then(res => {
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