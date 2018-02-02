<template>
    <div>
      <h3>{{item.title}}</h3>
      <p class="sx">作者：<span>{{item.user.username}}</span> - 时间：<span>{{item.addTime}}</span> - 阅读量：<span>{{item.views}}</span> - 评论：<span>10</span></p>
      <p class="left">{{item.description}}</p>
      <p class="left"><el-button type="primary">阅读全文</el-button></p>
    </div>
</template>

<script>
import api from "./api";

export default {
  mixins: [api],
  data() {
    return {
      datas: {},
      navList: []
    };
  },
  async created() {
    console.log(1111111111111)
    console.log(this.$route.query.contentId)
    this.datas = await this.viewContent(this.$route.query.contentId);
  },
  methods: {},
  watch: {
    datas: function() {
      this.navList = this.datas.result;
    }
  }
};
</script>

<style>

</style>
