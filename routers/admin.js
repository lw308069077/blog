const express = require('express')
const router = express.Router()
const User = require('../models/Categorie')

var responseData
router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next()
})

router.get('/user',(req,res,next) => {
    res.send('User')
})

router.use(function(req,res,next) {
    if(!req.userInfo.isAdmin) {
        res.send('对不起，只有管理员才可以进入后台管理')
    }
    next()
})

//获取用户列表
// router.get('/user',function(req,res,next){
//     let page = parseInt(req.param("page"))
//     let pageSize = parseInt(req.param("pageSize"))
//     let skip = (page - 1) * pageSize
//     let params = {}

//     let userModel = User.find(params).skip(skip).limit(pageSize)

//     User.count().then(function(count){
//         userModel.exec(function(err,doc){
//             res.json({
//                 code: 0,
//                 message: '',
//                 result: doc,
//                 count: count
//             })
//         })
//     })
// })

module.exports = router
