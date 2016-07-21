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
var config = require('./libs/config');
var common = require('./controllers/common');

var app = express();

// 设置静态文件请求路径
app.use('/static', express.static('./app/'));
// 设置网站图标
app.use(favicon('./app/img/favicon.ico'));

// 配置通用路由，前端路由由angularjs处理，路径带/api的由nodejs处理
app.use(function (req, res, next) {
	if (req.path.indexOf('/api') < 0) {
		common.renderPage(req, res);
	} else {
		next();
	}
});

// 注册路由
require('./routes/route')(app);

// 启动服务器，监听客户端请求端口
app.listen(config.port, function () {
	console.log('app started on port ' + config.port + '...');
});