const mongoose = require('mongoose')

//文章的表结构
module.exports = new mongoose.Schema({
    //关联字段 - 文章分类的id
    category: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Content'
    },
    //文章标题
    title: String,
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
