<template>
    <div>
      <el-card class="box-card" v-if="!loging">
        <div slot="header" class="clearfix">
          <span>用户登录</span>
          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
        <div class="text item">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密　码" prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="repassword" v-if="!isLogin">
                <el-input type="password" v-model="ruleForm2.repassword" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="el-form-item__error" v-show="msg">{{msgText}}</div>
                <div class="aText" v-if="isLogin">
                  <a class="registBtn" href="javascript:;" @click="isLogin=false">没有账号？去注册</a>
                </div>
                <div class="aText" v-if="!isLogin">
                  <a class="registBtn" href="javascript:;" @click="isLogin=true">已有账号？去登录</a>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button class="oBtn" type="primary" @click="submitForm('ruleForm2')">{{ isLogin ? '登录' : '注册' }}</el-button>
              </el-form-item>
            </el-form>
        </div>
      </el-card>

      <el-card class="box-card" v-if="loging">
        <div slot="header" class="clearfix">
          <span>用户信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="logOuting">退出登录</el-button>
        </div>
        <div class="text item">
          <p>用户名:{{user}}</p>
          <p>您好,欢迎光临我的博客!</p>
        </div>
      </el-card>
    </div>
</template>

<script>
import api from "./api";

export default {
  mixins: [api],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!this.isLogin) {
          if (this.ruleForm2.repassword !== "") {
            this.$refs.ruleForm2.validateField("repassword");
          }
          callback();
        } else {
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!this.isLogin) {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      user:'',
      id:null,
      loging: false,
      isLogin: true,
      msg: false,
      msgText: "",
      ruleForm2: {
        username: "",
        password: "",
        repassword: ""
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.checkLogining()
  },
  methods: {
    async submitForm(formName) {
      let valid = await new Promise(resolve => {
        this.$refs[formName].validate(valid => {
          resolve(valid);
        });
      });

      if (valid) {
        let result = {};
        if (this.isLogin) {
          result = await this.login(this.ruleForm2)
          if (result.code === 0) {
            setTimeout(() => {
              this.loging = true
              this.user = result.userInfo.username
            }, 500);
          }
        } else {
          result = await this.register(this.ruleForm2)
          if (result.code === 0) {
            setTimeout(() => {
              this.isLogin = true;
            }, 500);
          }
        }

        this.msgText = result.message;
        this.msg = true;

        setTimeout(() => {
          this.msg = false;
        }, 500);
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    async logOuting(){
        let result = await this.logOut()
        if(result.code === 0){
          this.user = ''
          this.loging = false
        }
    },
    async checkLogining(){
      let res = await this.checkLogin()
      if(res.code === 0){
        this.user = res.result.name
        this.loging = true
      }
    }
  }
};
</script>

<style>
.oBtn {
  width: 100%;
}
.registBtn {
  font-size: 12px;
  color: #409eff;
}
.aText {
  text-align: right;
}
.box-card {
  text-align: left;
}
.box-card .text p {
  font-size: 14px;
}
</style>
