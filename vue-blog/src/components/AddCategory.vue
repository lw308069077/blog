<template>
    <div>
      <div class="sourceBox">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加分类</el-breadcrumb-item>
        </el-breadcrumb>      
      </div>
      
      <div class="tabBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import api from "./api";

export default {
  mixins: [api],
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
      this.$root.$on('editName', (editObj) => {
        console.log(editObj.name)
        this.ruleForm.name = editObj.name
        console.log(this.ruleForm.name+'=============')
      })
  },
  methods: {

    async submitForm(formName) {//addCategory
        let valid = await new Promise(resolve => {
          this.$refs[formName].validate(valid => {
            resolve(valid);
          });
        });

        if (valid) {
          let result = await this.addCategory(this.ruleForm)
          if(result.code === 0) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$router.push('/admin/category')
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
      }
  },
  beforeDestroy() {

  }
};
</script>

<style>
.sourceBox {
  padding: 24px;
}
.tabBox {
  padding: 0 24px;
}
.tabBox {
  text-align: left;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
