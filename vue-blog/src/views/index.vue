<template>
  <div>
      <el-container>
        <el-header>Header</el-header>
        <nav-list v-on:contentList="getContentListById"></nav-list>

        <el-container>
            <el-main>
                <ul v-if="isContent">
                    <li v-for="(item,index) in tabaDatas" :key="index">
                        <h3>{{item.title}}</h3>
                        <p class="sx">作者：<span>{{item.user.username}}</span> - 时间：<span>{{item.addTime}}</span> - 阅读量：<span>{{item.views}}</span> - 评论：<span>10</span></p>
                        <p class="left">{{item.description}}</p>
                        <p class="left"><el-button type="primary" @click="readMore(item._id)">阅读全文</el-button></p>
                    </li>
                </ul>
                
                <div v-if="!isContent">
                    <div class="contentBox">
                        <h3>{{contentDatas.title}}</h3>
                        <p class="sx">作者：<span>{{contentDatas.user}}</span> - 时间：<span>{{contentDatas.addTime}}</span> - 阅读量：<span>{{contentDatas.views}}</span> - 评论：<span>10</span></p>
                        <p class="left">{{contentDatas.description}}</p>
                        <p class="left">{{contentDatas.content}}</p>
                    </div>
                    <div class="contentBox">
                        <h3 class="title">评论<span class="commentNum">一共有10条评论</span></h3>
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="">
                                <el-input type="textarea" v-model="form.comment"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="subComment">提交评论</el-button>
                            </el-form-item>
                        </el-form>
                        <ul class="commentBox">
                          <li>
                            <div class="user">
                              123：
                            </div>
                            <div class="comment">
                              这是我的评论第一条！~
                            </div>
                          </li>    
                        </ul>
                    </div>
                </div>
            </el-main>
            <el-aside width="400px">
                <register></register>
            </el-aside>
        </el-container>
  
        <el-footer>Footer</el-footer>
      </el-container>
  </div>
</template>

<script>
import Register from "@/components/Register";
import NavList from "@/components/NavList";
import api from "@/components/api";

export default {
  mixins: [api],
  components: {
    Register,
    NavList
  },
  data() {
    return {
      isContent: true,
      contentDatas: {},
      pageNo: 1, // 当前页码
      pageSize: 999, // 每页记录数
      category: "",
      datas: {},
      tabaDatas: [],
      form: {
        comment: '',
        contentId: '',
      }
    };
  },
  async mounted() {
    this.getContentList();
  },
  methods: {
    // 阅读全文
    async readMore(id) {
      let res = await this.viewContent(id);
      this.form.contentId = id
      if (res.code === 0) {
        this.contentDatas = res.result;
        this.isContent = false;
      }else{
          this.$message({
          showClose: true,
          message: '登录后可阅读全文',
          type: 'warning'
        });
      }
    },
    // 分类筛选
    getContentListById(item) {
      this.category = item._id;
      this.getContentList();
    },
    // 获取分类列表
    async getContentList() {
      let param = {
        page: this.pageNo,
        pageSize: this.pageSize,
        category: this.category
      };
      this.datas = await this.getContent(param);
      this.isContent = true;
    },
    // 提交评论
    async subComment() {
      let param = {
        contentId: this.form.contentId,
        content: this.form.comment,
      }
      console.log(param)
      let res = await this.postComment(param)
      console.log(res,'============================')
    }
  },
  watch: {
    datas: function() {
      this.tabaDatas = this.datas.result;
      this.total = this.datas.count;
    }
  }
};
</script>

<style>
.el-container {
  background-color: #e9eef3;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  color: #333;
  text-align: center;
}
.el-main ul {
  margin: 0;
  padding: 0;
}
.el-main ul li {
  list-style-type: none;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
.el-main ul li .sx span {
  color: #66b1ff;
}
.el-main li .left {
  text-align: left;
}
.el-aside {
  padding: 20px 20px 20px 0;
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.contentBox {
    background-color:#fff;
    padding:20px;
    margin-bottom: 20px;
}
.contentBox .left {
    text-align: left;
}
.el-textarea__inner {
    resize: none;
}
.el-form-item__content {
    text-align: right;
}
.contentBox .title {
    text-align: left;
}
.title .commentNum {
    font-size:12px;
    font-weight: 500;
    float:right;
}
.author {
  text-align: left;
}
.el-main .contentBox .commentBox li {
  padding: 0;
  text-align: left;
  margin-bottom: 20px;
}
.commentBox li .user {
  width: 80px;
  float: left;
  
}
.commentBox li .comment {
  margin-left: 80px;
  margin-right: 200px;
}
</style>
