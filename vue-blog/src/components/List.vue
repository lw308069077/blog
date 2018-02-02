<template>
    <ul>
        <li v-for="(item,index) in tabaDatas" :key="index">
            <h3>{{item.title}}</h3>
            <p class="sx">作者：<span>{{item.user.username}}</span> - 时间：<span>{{item.addTime}}</span> - 阅读量：<span>{{item.views}}</span> - 评论：<span>10</span></p>
            <p class="left">{{item.description}}</p>
            <p class="left"><el-button type="primary" @click="$router.push({path:'/content/view',query:{contentId: item._id}})">阅读全文</el-button></p>
        </li>
    </ul>
</template>

<script>
import api from "@/components/api";

export default {
    mixins: [api],
    data() {
        return {
            category:'',
            datas:{},
            tabaDatas: [],
        }
    },
    async mounted(){
        this.getContentList()
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
    }
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
