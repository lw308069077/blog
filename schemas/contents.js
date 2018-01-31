const mongoose = require('mongoose')
const moment = require('moment')

//文章的表结构
module.exports = new mongoose.Schema({
    //关联字段 - 文章分类的id
    category: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Category'
    },
    //文章标题
    title: String,
    //关联字段 - 用户id
    user: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },
    //添加时间
    addTime: {
        type:Date,
        default: new Date()
    },
    //阅读量
    views: {
        type: Number,
        default: 0
    },
    //文章简介
    description: {
        type: String,
        default: ''
    },
    //文章内容
    content: {
        type: String,
        default: ''
    }
})


