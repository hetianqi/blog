/**
 * 后台路由配置，采用RESTful API
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var util = require('./lib/util');
var post = require('./api/post');

module.exports = function (app) {
	// 获取文章列表
	app.get('/api/posts', post.getList);
	// 根据id获取文章
	app.get('/api/posts/:postId', post.getById);
	// 测试
	app.get('/api/post/test', post.test);

	// 404返回结果
	app.all('*', util.error404);
};