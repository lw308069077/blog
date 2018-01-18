<template>
  <div>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="16">
                    123123
                </el-col>
                <el-col class="loginBox" :span="8">
                    <el-tabs type="border-card">
                        <el-tab-pane label="用户登录"><login></login></el-tab-pane>
                        <el-tab-pane label="用户注册"><register></register></el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
    components:{
        Login,
        Register
    },
    data() {
        return {

        }
    }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

</style>
