const express = require('express')
const router = express.Router();
const path = require('path')
const db = require('../db.js'); 
const moment = require('moment')




//监听路由

//显示栏目列表页 admin/cate/cate.html
router.get('/admin/cate/cate', (req, res)=>{
    // console.log(req.session.isLogin);
    // console.log(req.session.UserInfo);
    // if(req.session.isLogin != true){
    //     return res.redirect('/admin/login')
    // }

    res.render(path.join(rootPath, 'view/admin/cate/cate.html'))
})



//获取栏目列表数据
//result = [
//    {cate_id: 1, cate_name:'潮科技',cate_icon: 'fa-leaf', cate_addtime:'2018-05-08'}
//]

router.get('/admin/cate/getCate', (req, res)=>{
    const sql ='select * from ali_cate';
    db.query(sql, (err, result)=>{
        //将执行结果返回给前端(cate.html)
        if(err) {
            console.log(err);
            return res.send({code: 201, message: "查询栏目列表信息失败"})
        };
        res.send({code: 200, message: "查询栏目列表信息成功",list:result})
    })
})






//显示添加新栏目页面 --admin/cate/addcate.html
router.get('/admin/cate/addcate', (req, res)=>{
    res.render(path.join(rootPath, 'view/admin/cate/addcate.html'))
})

//添加新栏目处理
router.post('/admin/cate/addCateDeal',(req, res)=>{
    //接收数据,栏目提交的name和icon
    const data ={
        cate_name: req.body.name,
        cate_icon: req.body.icon,
        cate_addtime: moment().format('YYYY-MM-DD')
    }

    const sql = 'insert into ali_cate set ?';

    db.query(sql, data, (err, result)=>{
        if(err){
            console.log(err);
            return res.send({code:201,message:'添加新栏目失败'})
        }
        res.send({code:200,message:'添加新栏目成功'})
    })


})

//删除栏目处理
router.post('/admin/cate/delcate', (req, res)=>{
    //接收数据
    const id = req.body.id;
    // 编写sql语句
    const sql = 'delete from ali_cate where cate_id = ?';
    db.query(sql, id, (err, result)=>{
        if(err || result.affectedRows !=1) {
            console.log(err);
            return res.send({code: 201, message: "删除栏目列表信息失败"})
        };
        res.send({code: 200, message: "删除栏目列表信息成功"})
    })
})

//显示栏目编辑页
router.get('/admin/cate/editcate', (req, res)=>{
    //接收数据 cate_id
    const id = req.query.id;
    const sql = "select * from ali_cate where cate_id = ?"
    db.query(sql, id, (err, result)=>{
        console.log(result) //数组形式[{}]
        res.render(path.join(rootPath, 'view/admin/cate/editcate.html'), result[0]);

    })
})

//修改栏目信息
router.post('/admin/cate/modifycate', (req, res)=>{
    // console.log(req.body)
    const data = {
        cate_name: req.body.name,
        cate_icon: req.body.icon
    }
    const id = req.body.id;
    console.log(id)
    const sql = "update ali_cate set ? where cate_id=?";
    db.query(sql, [data, id], (err, result)=>{
        if(err || result.affectedRows != 1){
            console.log(err);
            return res.send({code:201,message:'修改栏目失败'})
        }
        res.send({code:200,message:'修改栏目成功'})

    })
})


module.exports= router;
