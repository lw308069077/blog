<template>
  <div>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <div class="logo">
            <router-link to="/admin">后台管理</router-link>
        </div>
        <el-menu-item index="1">
            用户管理
        </el-menu-item>
        <el-submenu class="rtBox" index="3">
            <template slot="title">admin</template>
            <el-menu-item index="3-1" @click="logOuting">退出</el-menu-item>
        </el-submenu>
      </el-menu>
        
      <div class="sourceBox">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>      
      </div>

      <div class="tabBox">
          <h3>用户列表</h3>
          <el-table :data="tabaDatas" stripe border show-overflow-tooltip min-width="200">
            <el-table-column prop="_id" label="ID" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column prop="username" label="用户名" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column prop="password" label="密码" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column prop="isAdmin" label="是否管理员" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import api from "@/components/api.js";

export default {
  mixins: [api],
  data() {
    return {
      currentPage4: 4,
      tabaDatas: [],
      activeIndex2: "1",
    };
  },
  mounted(){
      this.getUsersList()
  },
  methods: {
    async getUsersList(){
        this.tabaDatas = await this.getUsers()
    },
    logOuting(){
        this.$confirm('是否退出后台管理?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let result = this.logOut()
          console.log('退出：'+ JSON.stringify(result))
        
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.logo {
  width: 120px;
  height: 60px;
  line-height: 60px;
  float: left;
}
.logo a {
  color: #fff;
  font-size: 20px;
  text-decoration: none;
}
.el-menu--horizontal .el-submenu {
  float: right;
}
.el-submenu .el-menu-item {
  min-width: 100px;
}
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
    margin-top:20px;
    text-align: right;
}
</style>
