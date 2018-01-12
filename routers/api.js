const express = require('express')
const router = express.Router()

// 用户注册
router.get('/user/register',(req,res,next) => {
    console.log('register')
    console.log(req.body)
})

module.exports = router
