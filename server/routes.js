/**
 * 后台路由配置，采用RESTful API
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var util = require('./lib/util');
var post = require('./api/post');
var tag = require('./api/tag');
var test = require('./api/test');

module.exports = function (app) {
	// 获取文章列表
	app.get('/api/posts', post.getList);
	// 根据postId获取文章
	app.get('/api/posts/:postId', post.getById);
	// 获取标签列表
	app.get('/api/tags', tag.getList);
	// 获取标签下对应文章列表
	app.get('/api/tags/:tag', tag.getPostsByTag);

	// 测试md文件转换为文章数据
	app.get('/api/test/md', test.md);

	// 未配置的路由返回404
	app.all('*', util.error404);
};