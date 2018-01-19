const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    console.log('================================+++++++++++++'+req.userInfo._id)
    
    // res.send('首页')
    res.render('main/index',{
        userInfo: req.userInfo
    })
})

module.exports = router
