const express = require('express')
//加载模板处理模块
const swig = require('swig')
//加载数据库模块
const mongoose = require('mongoose')
//加载body-parser,用来处理post提交过来的数据
const bodyParser = require('body-parser')
//加载cookies模块
var cookieParser = require('cookie-parser')

let app = express()

let User = require('./models/User')

//设置静态文件托管
app.use('/public',express.static(__dirname + '/public'))

//设置模板引擎
app.engine('html', swig.renderFile)
//设置文件存放的目录
app.set('views', './views')
//注册使用的模板引擎
app.set('view engine', 'html')
//开发过程中取消模板缓存
swig.setDefaults({cache: false})

//bodyParser设置
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//设置cookie
app.use(cookieParser())

app.use(function(req,res,next) {
    req.userInfo = {}
    if(req.cookies.user){
        req.userInfo = req.cookies.user
        next()
    }else{
        if(req.originalUrl == '/api/user/register' || req.originalUrl == '/api/user/login' || req.originalUrl == '/api/logout' || req.originalUrl == '/api/categoryNav' || req.path == '/api/content') {
            next()        
        }else{
            res.json({
                code: -1,
                message: '当前未登录'
            })
        }
    }
})

//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'))
app.use('/api',require('./routers/api'))
app.use('/',require('./routers/main'))

//监听http请求
mongoose.connect('mongodb://localhost:27017/blog',(err) => {
    if(err) {
        console.log('数据库连接失败！')
    } else {
        console.log('数据库连接成功！')
        app.listen(8080)
    }
})

