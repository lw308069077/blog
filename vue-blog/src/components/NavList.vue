<template>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item v-for="(item, key) in navList" :index="(key+2)+''" :key="key">{{item.name}}</el-menu-item>
      </el-menu>
      
    </div>
</template>

<script>
import api from "./api";

export default {
  mixins: [api],
  data() {
    return {
      activeIndex: '1',
      datas:{},
      navList: []
    }
  },
  async created(){
    this.datas = await this.getCategoryNav()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch:{
    datas: function () {
      this.navList = this.datas.result
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
.el-menu {
  margin: 0 auto;
}
</style>
