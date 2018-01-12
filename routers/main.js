const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    // res.send('首页')
    res.render('main/index')
})

module.exports = router
