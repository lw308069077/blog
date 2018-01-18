<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input type="password" v-model="ruleForm2.repassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="oBtn" type="primary" @click="submitForm('ruleForm2')">注册</el-button>
      </el-form-item>
      <el-form-item>
        <div class="el-form-item__error" v-if="msg">{{msgText}}</div>
      </el-form-item>
    </el-form>
</template>

<script>
import api from './api'

export default {
  mixins: [api],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.repassword !== "") {
          this.$refs.ruleForm2.validateField("repassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      msg: false,
      msgText: '',
      ruleForm2: {
        username: "",
        password: "",
        repassword: ""
      },
      rules2: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],        
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        repassword: [{ required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      let valid = await new Promise(resolve => {
        this.$refs[formName].validate(valid => {
          resolve(valid);
        });
      });

      if (valid) {
        let result = await this.register(this.ruleForm2)
        this.msg = true
        this.msgText = result.message
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.oBtn {
  width:100%;
}
</style>
