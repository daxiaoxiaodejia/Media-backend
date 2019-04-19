const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'alishow',
    multipleStatements: true
});

conn.connect();

//导出模块
module.exports = conn;

