const express = require('express');
const router = express.Router();
const path= require('path');
const db = require('../db.js');
const moment = require('moment')


//显示users.html页面 ---admin/user.users.html
router.get('/admin/user/users', (req, res)=>{
    res.render(path.join(rootPath, 'view', 'admin/user/users.html'))
});


//获取后台管理员数据
router.get('/admin/user/getUsers', (req, res)=>{
    const sql = "select * from ali_admin";
    db.query(sql, (err, result)=>{
        if(err){           
            return res.send({code: 201, message:"查询管理员列表失败"})
        }
        res.send({code: 200, message:"查询管理员列表成功", data: result})
        console.log({data: result})
    }) 
})

//显示添加新管理员页面---admin/user/adduser.html
router.get('/admin/user/adduser', (req, res)=>{
    res.render(path.join(rootPath, 'view', 'admin/user/adduser.html'))
})


//添加新管理员
router.post('/admin/user/addUserDeal', (req, res)=>{
    // console.log(req.body)
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_pwd: req.body.password,
        admin_state: req.body.state,
        admin_addtime: moment().format('YYYY-MM-DD')
    }
    const sql = "insert into ali_admin set ?"
    db.query(sql, data, (err, result)=>{
        if(err || result.affectedRows != 1){
            console.log(err)
            return res.send({code: 201, message:"添加新管理员失败"})
        }
        res.send({code: 200, message:"添加新管理员成功"})

    })
})



//批量删除管理员
router.post('/admin/user/delusers', (req, res)=>{
    const ids = req.body.ids;  //1,3,5
    const sql = `delete from ali_admin where admin_id in (${ids})`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            return res.send({code: 201, message:"批量删除管理员失败"})
        }
        res.send({code:200, message:"批量删除管理员成功"})
    })

})


//显示弹出层编辑管理员页面
router.get('/admin/user/edituser', (req, res)=>{
    const admin_id= req.query.id;
    const sql = "select *from ali_admin where admin_id = ?"
    db.query(sql, admin_id, (err, result)=>{
        res.render(path.join(rootPath, "view/admin/user/edituser.html"), result[0])
    })
    
})

//修改管理员信息
router.post('/admin/user/modifyuser', (req, res)=>{
    // console.log(req.body)
    const data ={
        admin_email:req.body.email,
        admin_nickname:req.body.nickname,
        admin_tel:req.body.tel,
        admin_state: req.body.state
    }
    const admin_id = req.body.id;
    const sql = "update ali_admin set ? where admin_id = ?";
    db.query(sql, [data, admin_id], (err, result)=>{
        if(err || result.affectedRows !=1){
            console.log(err);
            return res.send({code: 201, message:"修改管理员信息失败"})
        }
        res.send({code: 200, message:"修改管理员信息成功"})
    })
})

module.exports = router;