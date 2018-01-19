<template>
  <div>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="18">
                    123123
                </el-col>
                <el-col class="loginBox" :span="6">
                    <register></register>
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
