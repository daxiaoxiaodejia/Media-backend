const express = require('express');
const app = express();
app.listen(3000, ()=>{
    console.log('server is ok')
});

global.rootPath = __dirname;


// 托管静态资源
app.use('/assets', express.static('./view/assets'))
app.use('/uploads', express.static('./view/uploads'))
app.use('/upload', express.static('./upload'))

//配置模板引擎
const template =require('express-art-template')
app.engine('html', template)


///加载bodypaser模块,注册为中间件
const bp = require('body-parser')
app.use(bp.urlencoded({extended:false}))

//加载express-session模块
const session = require('express-session');
app.use(session({
    secret: 'JIjoeog',
    resave: false,
    saveUninitialized: false
}))

//将检测session的中间件函数注册
app.use(checkSession)


//加载router模块,注册为中间件
const router_cate = require('./router/router_cate.js')
app.use(router_cate)


const router_front = require('./router/router_front.js')
app.use(router_front)

const router_login = require('./router/router_login.js')
app.use(router_login)

const router_user = require('./router/router_user.js')
app.use(router_user)

const router_center = require('./router/router_center.js')
app.use(router_center)


const router_post = require('./router/router_post.js')
app.use(router_post)

const router_pic = require('./router/router_pic.js')
app.use(router_pic)


//将api.js注册为中间件
const api= require('./api.js');
app.use(api)

const url = require('url')

function checkSession (req, res, next) {
    const urlObj = url.parse(req.url, true);
    // 将允许直接访问的路由设置为一个数组
    const allow_url = ['/admin/login', '/admin/checkLogin', '/index', '/list', '/detail'];
    // 判断当前访问的路由是否存在于该数组中，如果存在则next(), 如果不存在则检测session
    if(allow_url.includes(urlObj.pathname) == true) {
        //当前访问的url地址存在于allow_url数组中，直接next();
        next();
    } else {
        //不存在时，检测session
        if (req.session.isLogin != true) {
            //不等于true时说明没有登录，跳转回登录页 （/admin/login）
            return res.redirect('/admin/login');
        }
        next();
    }
}



