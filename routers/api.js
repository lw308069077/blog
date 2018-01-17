const express = require('express')
const router = express.Router()
const User = require('../models/User')

let responseData
router.use((req,res,next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next()
})

// 用户注册
router.post('/user/register',(req,res,next) => {
    console.log("123")
    console.log(req.body)
    let username = req.body.username
    let password = req.body.password
    let repassword = req.body.repassword

    if(username == '') {
        responseData.code = 1
        responseData.message = '用户名不能为空'
        res.json(responseData)
        return
    }
    if(password == '') {
        responseData.code = 2
        responseData.message = '密码不能为空'
        res.json(responseData)
        return
    }
    if(password != repassword) {
        responseData.code = 3
        responseData.message = '两次输入的密码不一致'
        res.json(responseData)
        return
    }
    //用户是否已注册
    User.findOne({
        username: username
    }).then((userInfo)=>{
        // console.log(userInfo)
        //如果存在表示数据库中有该记录
        if(userInfo) {
            responseData.code = 4
            responseData.message = '用户名已经被注册了'
            res.json(responseData)
            return
        }
        //保存到数据库
        let user = new User({
            username: username,
            password: password
        })
        return user.save()
    }).then((newUserInfo)=>{
        // console.log(newUserInfo)
        responseData.message = '注册成功'
        res.json(responseData)
    })
})

module.exports = router
