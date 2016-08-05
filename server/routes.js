/**
 * 后台路由配置，采用RESTful API
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var error = require('./lib/error');
var post = require('./api/post');
var tag = require('./api/tag');

module.exports = function (app) {
	// 新增文章
	app.post('/api/posts', post.add);
	app.get('/api/posts/add', post.add);
	// 获取文章列表
	app.get('/api/posts', post.getList);
	// 根据postId获取文章
	app.get('/api/posts/:postId', post.getById);
	
	// 获取标签列表
	app.get('/api/tags', tag.getList);
	// 获取标签下对应文章列表
	app.get('/api/tags/:tag', tag.getPostsByTag);

	// 未配置的路由返回404
	app.all('*', error.error404);
};