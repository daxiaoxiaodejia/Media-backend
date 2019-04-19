const express =require('express')
const router = express();
const path = require('path');
const db = require('../db.js')

router.get('/admin/post/addpost', (req, res)=>{
    res.render(path.join(rootPath, 'view', 'admin/post/addpost.html'))
})

router.get('/admin/post/posts', (req, res)=>{
    // console.log(111)
    res.render(path.join(rootPath, 'view', 'admin/post/posts.html'))
})


module.exports = router