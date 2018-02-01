<template>
  <div>
      <el-container>
        <el-header>Header</el-header>
        <nav-list v-on:contentList="getContentListById"></nav-list>

        <el-container>
            <el-main>
                <ul>
                    <li v-for="(item,index) in tabaDatas" :key="index">
                        <h3>{{item.title}}</h3>
                        <p class="sx">作者：<span>{{item.user.username}}</span> - 时间：<span>{{item.addTime}}</span> - 阅读量：<span>{{item.views}}</span> - 评论：<span>10</span></p>
                        <p class="left">{{item.description}}</p>
                        <p class="left"><el-button type="primary">阅读全文</el-button></p>
                    </li>
                </ul>
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
import Register from '@/components/Register'
import NavList from '@/components/NavList'
import api from "@/components/api";

export default {
    mixins: [api],
    components:{
        Register,
        NavList
    },
    data() {
        return {
            pageNo: 1, // 当前页码
            pageSize: 999, // 每页记录数
            category:'',
            datas:{},
            tabaDatas: [],
        }
    },
    async mounted(){
        this.getContentList()

        // this.$root.$on('propsId', function(id){
        //     // console.log('我是由组件1传过来的' + id)
        //     this.category = id
        // })
    },
    methods: {
        getContentListById(item){
            this.category = item._id
            this.getContentList()
        },
        // 获取分类列表
        async getContentList(){
            let param = {
                page: this.pageNo,
                pageSize: this.pageSize,
                category: this.category
            }

            this.datas = await this.getContent(param)
        },
    },
    watch: {
        datas: function () {
            this.tabaDatas = this.datas.result
            this.total = this.datas.count
        }
    },
    // destroyed: function () {
    //     console.group('destroyed 销毁完成状态===============》');
    // }
}
</script>

<style>
    .el-container {
        background-color: #E9EEF3;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        color: #333;
        text-align: center;
    }
        .el-main ul {
            margin:0;
            padding:0;
        }
    .el-main ul li {
        list-style-type:none;
        background-color:#fff;
        padding: 20px;
        margin-bottom:20px;
    }
    .el-main ul li .sx span {
        color:#66b1ff;
    }
    .el-main li .left {
        text-align:left;
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
</style>
