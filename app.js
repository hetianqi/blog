'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = 3456;

// 设置视图和模板引擎
app.set('views', './src/views');
app.set('view engine', 'jade');

// 设置静态文件请求路径
app.use(express.static('./src/assets/'));

// 监听客户端请求端口
app.listen(port, function () {
	console.log('app started on port ' + port + '...');
});

// 注册路由
require('./src/routes/route')(app);