const express = require('express')
const router = express.Router()

router.get('/user',(req,res,next) => {
    res.send('User')
})

router.use(function(req,res,next) {
    if(!req.userInfo.isAdmin) {
        res.send('对不起，只有管理员才可以进入后台管理')
    }
    next()
})

module.exports = router
