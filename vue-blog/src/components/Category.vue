<template>
    <div>
      <div class="sourceBox">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
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
                    <el-button type="text" size="small">编辑</el-button>
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
    </div>
</template>

<script>
import api from "./api";

export default {
  mixins: [api],
  data() {
    return {
      total: 0,
      pageNo: 1, // 当前页码
      pageSize: 2, // 每页记录数
      datas:{},
      tabaDatas: []
    };
  },
  mounted(){
      this.getUsersList()
  },
  methods: {
    //获取用户列表
    async getUsersList(){
        let param = {
          page: this.pageNo,
          pageSize: this.pageSize
        }
        this.datas = await this.getUsers(param)
    },
    // 分页设置
    handleSizeChange (val) {
      this.pageSize = val
      this.pageNo = 1
      this.getUsersList()
    },
    // 分页设置
    handleCurrentChange (val) {
      this.pageNo = val
      this.getUsersList()
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
}
.tabBox {
  text-align: left;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
