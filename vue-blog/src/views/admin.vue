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

        <el-menu-item @click="$router.push('/admin/UsersList')" index="1">
          用户管理
        </el-menu-item>

        <el-submenu index="2">
            <template slot="title">分类管理</template>
            <el-menu-item index="2-1" @click="$router.push('/admin/category')">分类首页</el-menu-item>
            <el-menu-item index="2-2" @click="$router.push('/admin/category/add')">分类添加</el-menu-item>
        </el-submenu>

        <el-submenu class="rtBox" index="x">
            <template slot="title">admin</template>
            <el-menu-item index="x-1" @click="logOuting">退出</el-menu-item>
        </el-submenu>
      </el-menu>
      
      <router-view></router-view>
  </div>
</template>

<script>
import api from "@/components/api.js";

export default {
  mixins: [api],
  data() {
    return {
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //退出
    logOuting() {
      this.$confirm("是否退出后台管理?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let result = this.logOut();
        this.$message({
          type: "success",
          message: "退出成功!"
        });        
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消退出"
        })
      })
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
.rtBox.el-submenu {
  float: right;
}
.el-submenu .el-menu-item {
  min-width: 100px;
}
</style>
