const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Categorie = require('../models/Categorie')

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
    let page = parseInt(req.param("page"))
    let pageSize = parseInt(req.param("pageSize"))
    let skip = (page - 1) * pageSize
    let params = {}

    let userModel = User.find(params).skip(skip).limit(pageSize)

    User.count().then(function(count){
        userModel.exec(function(err,doc){
            res.json({
                code: 0,
                message: '',
                result: doc,
                count: count
            })
        })
    })
})

//添加分类
router.post('/category/add',function(req,res,next){
    let name = req.body.name || ''
    if(name === ''){
        responseData.code = 1
        responseData.message = '分类名称不能为空'
        responseData.url = ''
        res.json(responseData)
        return
    }

    Categorie.findOne({
        name: name
    }).then(function(rs){
        if(rs) {
            //数据库中已经存在该分类
            responseData.code = 1
            responseData.message = '分类名称已存在'
            res.json(responseData)
            return Promise.reject();
        }else{
            //数据库中不存在该分类，可以保存
            return new Categorie({
                name: name
            }).save()
        }
    }).then(function(newCategorie){
        responseData.code = 0
        responseData.message = '保存成功'
        res.json(responseData)
    })
})

//分类列表
router.get('/category',function(req,res,next){
    let page = parseInt(req.param("page"))
    let pageSize = parseInt(req.param("pageSize"))
    let skip = (page - 1) * pageSize
    let params = {}

    let categorieModel = Categorie.find(params).skip(skip).limit(pageSize)

    Categorie.count().then(function(count){
        categorieModel.exec(function(err,doc){
            res.json({
                code: 0,
                message: '',
                result: doc,
                count: count
            })
        })
    })
})

//分类修改
router.get('/category/edit',function(req,res,next){
    let id = req.param('id') || ''

    Categorie.findOne({
        _id:id
    }).then(function(category){
        if(!category){
            responseData.code = 1
            responseData.message = '分类信息不存在'
            res.json(responseData)
            return Promise.reject();
        }else{
            res.json({
                code: 0,
                message: '',
                result: category
            })
        }
    })
})

router.post('/category/edit',function(req,res,next){
    let id = req.param('id') || ''
    let name = req.body.name || ''

    Categorie.findOne({
        _id:id
    }).then(function(category){
        if(!category){
            responseData.code = 1
            responseData.message = '分类信息不存在'
            res.json(responseData)
            return Promise.reject();
        }else{
            if(name === category.name){
                responseData.code = 0
                responseData.message = '修改成功'
                res.json(responseData)
                return Promise.reject();
            }else{
                return Categorie.findOne({
                    _id: {$ne: id},
                    name: name
                })
            }
        }
    }).then(function(sameCategory){
        if(sameCategory){
            responseData.code = 0
            responseData.message = '数据库中已存在该分类'
            res.json(responseData)
            return Promise.reject();
        }else{
            return Categorie.update({
                _id: id
            },{
                name: name
            })
        }
    }).then(function(){
        responseData.code = 0
        responseData.message = '修改成功'
        res.json(responseData)
    })
})

//分类删除

module.exports = router