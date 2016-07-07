/**
 * 后台路由管理
 * @author Emmett
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