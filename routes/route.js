/**
 * 后台路由配置
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var path = require('path');
var post = require('../controllers/post');

module.exports = function (app) {
	// 页面渲染	
	app.get('/', function (req, res, next) {
		res.sendFile(path.join(__dirname, '../app/index.html'));
	});

	// 获取文章列表
	app.get('/post/list', post.getList);
	app.get('/post/test', post.test);
};