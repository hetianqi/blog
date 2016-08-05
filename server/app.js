/**
 * 后台启动文件
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var config = require('./lib/config');
var util = require('./lib/util');
var db = require('./lib/db');

var app = express();

// 连接数据库
db.connect();

//格式化提交表单，extended为true表示将post过来的字符串转化为json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 设置静态文件请求路径
app.use('/static', express.static(config.path.client));
// 设置网站图标
app.use(favicon(config.path.client + 'img/favicon.ico'));
// 配置路由中间件，前端路由由angularjs处理，路径带/api的由nodejs处理
app.use(function (req, res, next) {
	if (req.path.substring(0, 4).toLowerCase() == '/api') {
		next();
	} else {
		util.renderPage(req, res);
	}
});

// 注册路由
require('./routes')(app);

// 启动服务器，监听客户端请求端口
app.listen(config.port, function () {
	console.log('app started on port ' + config.port + '...');
});