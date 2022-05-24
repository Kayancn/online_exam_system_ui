<template>
  <div>
    <div style="margin: 0 0 10px 0">
      <el-input style="width: 200px" placeholder="请输入考试名称" suffix-icon="el-icon-search" v-model="name" ></el-input>
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
      <el-table-column prop="id" label="考试ID">
      </el-table-column>
      <el-table-column prop="name" label="考试名称">
      </el-table-column>
      <el-table-column prop="time" label="考试时间">
      </el-table-column>
      <el-table-column prop="duration" label="考试时长（分）">
      </el-table-column>
      <el-table-column prop="password" label="考试密码">
      </el-table-column>
      <el-table-column prop="teacherId" label="负责人ID">
      </el-table-column>
      <el-table-column prop="courseName" label="所属课程">
        <template v-slot="scope">
          <span>{{courses.find(v => v.id === scope.row.courseId).name ? courses.find(v => v.id === scope.row.courseId).name : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paperId" label="试卷Id">
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

    <el-dialog title="考试信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="考试名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-date-picker v-model="form.time" type="datetime"  format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="考试时长（分）">
          <el-input v-model="form.duration" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人ID">
          <el-input v-model="form.teacherId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属课程">
          <el-select clearable v-model="form.courseId" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in courses"
                       :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="考试状态">-->
<!--          <el-input v-model="form.state" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="试卷ID">
          <el-input v-model="form.paperId" autocomplete="off"></el-input>
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
  name: "Exam",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",

      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      courses: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/exam/page",{
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
      this.request.get("/course").then(res => {
        this.courses = res
      })

    },
    save() {
      this.request.post("/exam",this.form).then(res => {
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
      this.request.post("/exam/del/batch", ids).then(res => {
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
      this.request.delete("/exam/" + id).then(res => {
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