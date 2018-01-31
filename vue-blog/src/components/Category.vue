<template>
    <div>
      <div class="sourceBox">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        </el-breadcrumb>      
      </div>

      <div class="tabBox">
        <el-button type="primary" class="addCategory" @click="add">添加分类</el-button>
        <el-table :data="tabaDatas" stripe border show-overflow-tooltip min-width="200">
            <el-table-column prop="_id" label="ID" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column prop="name" label="分类名称" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="delt(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[2, 6, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>

      <el-dialog :title="ruleForm.tit" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import api from "./api";

export default {
  mixins: [api],
  data() {
    return {
      ruleForm: {
        tit: '添加分类',
        name: '',
        type: 'isAdd',
        id: ''
      },
      formLabelWidth: '80px',
      dialogFormVisible: false,
      total: 0,
      pageNo: 1, // 当前页码
      pageSize: 2, // 每页记录数
      datas:{},
      tabaDatas: [],
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
    this.getCategoryList()
  },
  methods: {
    // 添加/修改分类
    async submitForm(formName) {
      let valid = await new Promise(resolve => {
        this.$refs[formName].validate(valid => {
          resolve(valid);
        });
      });

      if (valid) {
        let result
        if(this.ruleForm.type === 'isAdd') {
          result = await this.addCategory(this.ruleForm)
        }else{
          result = await this.editCategorySave(this.ruleForm)
        }
        if(result.code === 0) {
          this.$message({
            message: result.message,
            type: 'success'
          });
          this.dialogFormVisible = false
          this.getCategoryList()
        }else{
          this.$message({
            message: result.message,
            type: 'error'
          });
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    // 获取分类列表
    async getCategoryList(){
        let param = {
          page: this.pageNo,
          pageSize: this.pageSize
        }
        this.datas = await this.getCategory(param)
    },
    // 分页设置
    handleSizeChange (val) {
      this.pageSize = val
      this.pageNo = 1
      this.getCategoryList()
    },
    // 分页设置
    handleCurrentChange (val) {
      this.pageNo = val
      this.getCategoryList()
    },
    // 添加
    add() {
      this.ruleForm = {
        tit: '添加分类',
        name: '',
        type: 'isAdd',
        id: ''
      }
      this.dialogFormVisible = true
    },
    // 编辑
    async edit(row) {
      let result = await this.editCategory(row._id)
      this.ruleForm = {
        tit: '编辑分类',
        name: result.result.name,
        type: 'isEdit',
        id: result.result._id
      }
      this.dialogFormVisible = true
    },
    // 删除
    delt(row) {
      this.$confirm('是否删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCategory(row._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getCategoryList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  watch: {
    datas: function () {
      this.tabaDatas = this.datas.result
      this.total = this.datas.count
    }
  }
};
</script>

<style>
.sourceBox {
  padding: 24px;
}
.tabBox {
  padding: 0 24px;
  text-align: left;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
.addCategory {
  margin-bottom:20px;
}
</style>
