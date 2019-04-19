const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db.js');

//显示个人中心页
router.get('/admin/center/profile', (req, res)=>{
    // console.log(req.session)
    // console.log(req.session.UserInfo)
    res.render(path.join(rootPath, 'view', 'admin/center/profile.html'),req.session.userInfo)
})

//显示修改密码页 
router.get('/admin/center/repassword', (req, res)=>{
    res.render(path.join(rootPath, 'view', 'admin/center/password-reset.html'))
})






module.exports= router;