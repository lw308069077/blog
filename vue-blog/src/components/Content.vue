<template>
    <div>
      <div class="sourceBox">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>      
      </div>

      <div class="tabBox">
        <el-button type="primary" class="addArticle" @click="add">文章添加</el-button>
        <el-table :data="tabaDatas" stripe border show-overflow-tooltip min-width="200">
            <el-table-column prop="_id" label="ID" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column prop="category.name" label="文章分类" show-overflow-tooltip min-width="80"></el-table-column>
            <el-table-column prop="title" label="文章标题" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column prop="user.username" label="文章作者" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column prop="addTime" label="添加时间" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column prop="views" label="阅读量" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column prop="description" label="文章简介" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column prop="content" label="文章内容" show-overflow-tooltip min-width="150"></el-table-column>
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
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="formLabelWidth" class="demo-ruleForm">
            <el-form-item label="文章分类">
                <el-select class="slct" v-model="ruleForm.category" placeholder="请选择文章分类" @change="changeCategory">
                    <el-option v-for="(option,index) in navList" :label="option.name" :key="index" :value="option._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input v-model="ruleForm.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章简介">
                <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入文章简介"></el-input>
            </el-form-item>
            <el-form-item label="文章内容">
                <el-input type="textarea" v-model="ruleForm.content" placeholder="请输入文章内容"></el-input>
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
        tit: '添加文章',
        title: '',
        type: 'isAdd',
        id: '',
        category:'',
        description: '',
        content: ''
      },
      formLabelWidth: '80px',
      dialogFormVisible: false,
      total: 0,
      pageNo: 1, // 当前页码
      pageSize: 2, // 每页记录数
      datas:{},
      tabaDatas: [],
      Categorys:{},
      navList:[],
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  async mounted(){
    this.Categorys = await this.getCategoryNav()
    this.getContentList()
  },
  methods: {
    // 添加/修改分类
    async submitForm(formName) {
      let valid = await new Promise(resolve => {
        this.$refs[formName].validate(valid => {
          resolve(valid);
        });
      });
      this.navList.forEach((item) => {
        if(this.ruleForm.category === item.name) {
          this.ruleForm.category = item._id
        }
      })

      if (valid) {
        let result
        if(this.ruleForm.type === 'isAdd') {
          result = await this.addContent(this.ruleForm)
        }else{
          result = await this.editContentSave(this.ruleForm)
        }
        if(result.code === 0) {
          this.$message({
            message: result.message,
            type: 'success'
          });
          this.dialogFormVisible = false
          this.getContentList()
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
    async getContentList(){
        let param = {
          page: this.pageNo,
          pageSize: this.pageSize
        }
        this.datas = await this.getContent(param)
    },
    // 分页设置
    handleSizeChange (val) {
      this.pageSize = val
      this.pageNo = 1
      this.getContentList()
    },
    // 分页设置
    handleCurrentChange (val) {
      this.pageNo = val
      this.getContentList()
    },
    // 添加
    add() {
      this.ruleForm = {
        tit: '添加文章',
        title: '',
        type: 'isAdd',
        id: '',
        category:'',
        description: '',
        content: ''
      }
      this.dialogFormVisible = true
    },
    // 编辑
    async edit(row) {
      let result = await this.editContent(row._id)
      this.ruleForm = {
        tit: '编辑文章',
        title: result.result.title,
        type: 'isEdit',
        id: result.result._id,
        category:result.result.category.name,
        description: result.result.description,
        content: result.result.content
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
        this.deleteContent(row._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getContentList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 切换列表
    changeCategory(val){
      this.ruleForm.category = val
    }
  },
  watch: {
    datas: function () {
      this.tabaDatas = this.datas.result
      this.total = this.datas.count
    },
    Categorys: function() {
      this.navList = this.Categorys.result
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
.addArticle {
  margin-bottom:20px;
}
.slct {
    width: 100%;
}
</style>
