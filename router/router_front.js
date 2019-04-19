const express = require('express')
const router = express.Router();
const path = require('path')
const db = require('../db.js'); 
const moment = require('moment')


//显示前台首页
router.get('/index',(req, res)=>{
    const sql = `select * from ali_cate;
                select * from ali_article order by rand() limit 0,5;
                select *from ali_pic;
                select * from ali_article where article_focus=1 order by article_addtime desc limit 0,5;
                select * from ali_article 
                join ali_admin on article_adminid=admin_id
                join ali_cate on article_cateid = cate_id
                order by article_addtime desc
                limit 0,3`;
    db.query(sql, (err, result)=>{
    
        const data = {
            cate: result[0],
            rand: result[1],
            pic: result[2],
            focus: result[3],
            news: result[4]
        }
        res.render(path.join(rootPath, 'view', 'index.html'),data)
    })
})

//显示前台列表页
router.get('/list',(req, res)=>{  
    const cate_id = req.query.id;
    const sql = `select * from ali_cate;
                 select * from ali_article order by rand() limit 0,5;
                 select * from ali_cate where cate_id=${cate_id};
                 select ali_article.*, ali_admin.admin_nickname from ali_article join ali_admin on article_adminid=admin_id where article_cateid=${cate_id}`;

    db.query(sql,(err, result)=>{
        // console.log(err)
        const data = {
            cate: result[0],
            rand: result[1],
            name: result[2][0],
            list: result[3]
        }        
        res.render(path.join(rootPath, 'view', 'list.html'),data)
    })
})


//显示前台详情页
router.get('/detail',(req, res)=>{
    const article_id= req.query.id;

    const sql = `select * from ali_cate;
                 select * from ali_article order by rand() limit 0,5;
                 select ali_article.*,ali_admin.admin_nickname,
                     ali_cate.cate_id,ali_cate.cate_name from ali_article
                     join ali_admin on ali_article.article_adminid=ali_admin.admin_id
                     join ali_cate on ali_article.article_cateid=ali_cate.cate_id
                     where ali_article.article_id=${article_id}`;
    db.query(sql, (err, result)=>{
        const data = {
            cate: result[0],
            rand: result[1],
            article: result[2][0]
        }
        res.render(path.join(rootPath, 'view', 'detail.html'),data)
    })

})


module.exports= router;
