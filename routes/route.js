/**
 * 后台路由配置，采用RESTful API
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var common = require('../controllers/common');
var post = require('../controllers/post');

module.exports = function (app) {
	// 页面渲染	
	app.get('/', common.renderPage);

	// 获取文章列表
	app.get('/posts', post.getList);
	app.get('/posts/:postId', post.getById);
	app.get('/post/test', post.test);

	// 404返回结果
	app.all('*', common.error404);
};