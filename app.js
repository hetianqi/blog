'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./app/libs/config');

var app = express();

// 设置视图和模板引擎
// app.set('views', './app/web');
// app.set('view engine', 'html');

// 设置静态文件请求路径
app.use(express.static('./app/web/'));

// 监听客户端请求端口
app.listen(config.port, function () {
	console.log('app started on port ' + config.port + '...');
});

// 注册路由
require('./app/routes/route')(app);