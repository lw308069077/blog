const express = require('express')
const router = express.Router()
const User = require('../models/User')

var responseData
router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next()
})

// 用户注册
router.post('/user/register', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    let repassword = req.body.repassword

    if (username == '') {
        responseData.code = 1
        responseData.message = '用户名不能为空'
        res.json(responseData)
        return
    }
    if (password == '') {
        responseData.code = 2
        responseData.message = '密码不能为空'
        res.json(responseData)
        return
    }
    if (password != repassword) {
        responseData.code = 3
        responseData.message = '两次输入的密码不一致'
        res.json(responseData)
        return
    }
    //用户是否已注册
    User.findOne({
        username: username
    }).then((userInfo) => {
        // console.log(userInfo)
        //如果存在表示数据库中有该记录
        if (userInfo) {
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
    }).then((newUserInfo) => {
        // console.log(newUserInfo)
        responseData.message = '注册成功'
        res.json(responseData)
    })
})

//用户登陆
router.post('/user/login', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    if (username == '' || password == '') {
        responseData.code = 1
        responseData.message = '用户名和密码不能为空'
        res.json(responseData)
        return
    }

    //查询数据库中用户名和密码是否存在
    User.findOne({
        username: username,
        password: password
    }).then(function (userInfo) {
        
        if (!userInfo) {
            responseData.code = 2
            responseData.message = '用户名或密码错误'
            res.json(responseData)
            return
        }
        //用户名和密码是正确的
        responseData.message = '登录成功'
        responseData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username,
            isAdmin: userInfo.isAdmin
        }

        res.cookie('user', {
            id: userInfo._id,
            name: userInfo.username
        }, {
            path: '/',
            maxAge: 1000*60*60
        });

        // req.session.user = userInfo
        res.json(responseData)
    })
})

//用户退出
router.get('/logout',function(req,res,next) {
    res.cookie('user',{},{
        path: '/',
        maxAge: -1
    })

    responseData = {
        code: 0,
        message: ''
    }
    res.json(responseData)
})

//校验登录状态
router.get('/checkLogin',function(req,res,next) {
    if(req.cookies.user){
        User.findById(req.userInfo.id).then(function(userInfo){
            req.userInfo.isAdmin = userInfo.isAdmin
            res.json({
                code: 0,
                message: '',
                result: req.userInfo || {}
            })
        })
    }else{
        res.json({
            code: 1,
            message: '未登录',
            result: ''
        })
    }
})

//获取用户列表
router.get('/user',function(req,res,next){
    let page = parseInt(req.param("page"));
console.log(page+'=======================================')
    // let page = Number(req.query.page || 1)
    let limit = 2
    let pages = 0

    User.count().then(function(count){
        //计算总页数
        pages = Math.ceil(count / limit)
        //取值不能超过pages
        page = Math.min(page, pages)
        //取值不能小于1
        page = Math.max(page, 1)

        let skip = (page - 1) * limit

        User.find().limit(limit).skip(skip).then(function(userInfo){
            res.json({
                code: 0,
                message: '',
                result: userInfo
            })
        })

    })

    
})

module.exports = router