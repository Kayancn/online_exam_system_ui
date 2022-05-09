<template>
  <div>
    <div style="margin: 0 0 10px 0">
      <el-input style="width: 200px" placeholder="请输入题目" suffix-icon="el-icon-search" v-model="name"></el-input>
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
      <el-table-column prop="id" label="编号">
      </el-table-column>
      <el-table-column prop="name" label="题目">
      </el-table-column>
      <el-table-column prop="courseName" label="所属课程">
        <template v-slot="scope">
          <span>{{courses.find(v => v.id === scope.row.courseId).name}}</span>
        </template>
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
      <el-table-column prop="score" label="分数">
      </el-table-column>
      <el-table-column prop="answer" label="答案">
      </el-table-column>
      <el-table-column prop="detail" label="解析">
      </el-table-column>

      <el-table-column label="操作" width="162">
        <template slot-scope="scope">
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

    <el-dialog title="题目信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="120px" size="small">
        <el-form-item label="类型">
          <el-select clearable v-model="form.type" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in [{name:'选择题',value: 1},{name:'判断题',value: 2},{name:'问答题',value: 3}]"
                       :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属课程">
          <el-select clearable v-model="form.courseId" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in courses"
                       :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项A" v-if="form.type === 1">
          <el-input v-model="form.a" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项B" v-if="form.type === 1">
          <el-input v-model="form.b" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项C" v-if="form.type === 1">
          <el-input v-model="form.c" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项D" v-if="form.type === 1">
          <el-input v-model="form.d" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分数">
          <el-input v-model="form.score" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="答案" v-if="form.type === 1">
          <el-radio v-model="form.answer" label="A">A</el-radio>
          <el-radio v-model="form.answer" label="B">B</el-radio>
          <el-radio v-model="form.answer" label="C">C</el-radio>
          <el-radio v-model="form.answer" label="D">D</el-radio>
        </el-form-item>
        <el-form-item label="答案" v-if="form.type === 2">
          <el-radio v-model="form.answer" label="正确">正确</el-radio>
          <el-radio v-model="form.answer" label="错误">错误</el-radio>
        </el-form-item>
        <el-form-item label="答案" v-if="form.type === 3">
          <el-input type="textarea" v-model="form.answer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="解析">
          <el-input v-model="form.detail" autocomplete="off"></el-input>
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
  name: "Student",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      name: "",

      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      courses: []
    }
  },
  created() {
    this.load()
    this.request.get("/course").then(res => {
      this.courses = res
    })
  },
  methods: {
    load() {
      this.request.get("/question/page",{
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
      this.request.post("/question",this.form).then(res => {
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
      this.name = ""
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
      this.request.post("/question/del/batch", ids).then(res => {
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
      this.request.delete("/question/" + id).then(res => {
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