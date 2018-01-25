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
  methods: {
    async submitForm(formName) {//addCategory
        let valid = await new Promise(resolve => {
          this.$refs[formName].validate(valid => {
            resolve(valid);
          });
        });

        if (valid) {
          console.log(this.ruleForm)
          let result = await this.addCategory(this.ruleForm)
console.log(result)

          // let result = {};
          // if (this.isLogin) {
          //   result = await this.login(this.ruleForm2)
          //   if (result.code === 0) {
          //     setTimeout(() => {
          //       this.loging = true
          //       this.user = result.userInfo.username
          //       result.userInfo.isAdmin === 'false' ? this.isAdmin = false : this.isAdmin=true
          //     }, 500);
          //   }
          // } else {
          //   result = await this.register(this.ruleForm2)
          //   if (result.code === 0) {
          //     setTimeout(() => {
          //       this.isLogin = true;
          //     }, 500);
          //   }
          // }

          // this.msgText = result.message;
          // this.msg = true;

          // setTimeout(() => {
          //   this.msg = false;
          // }, 500);
        } else {
          console.log("error submit!!");
          return false;
        }
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
}
.tabBox {
  text-align: left;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
