/**
 * 后台路由配置，采用RESTful API
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var fs = require('fs');
var multer = require('multer');
var error = require('./lib/error');
var config = require('./lib/config');
var util = require('./lib/util');
var post = require('./api/post');
var tag = require('./api/tag');
var attachment = require('./api/attachment');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		var uploadPath = config.path.upload;
		var now = new Date();

		uploadPath += now.getFullYear() + '/' + (now.getMonth() + 1);

		if (util.mkdirsSync(uploadPath)) {
			cb(null, uploadPath);
		} else {
			util.log('创建文件夹失败');
		}
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});
var uploader = multer({
	storage: storage
});

module.exports = function (app) {
	// 新增文章
	app.post('/api/posts', uploader.single('post'), post.add);
	// 获取文章列表
	app.get('/api/posts', post.getList);
	// 根据postId获取文章
	app.get('/api/posts/:postId', post.getById);
	
	// 获取标签列表
	app.get('/api/tags', tag.getList);
	// 获取标签下对应文章列表
	app.get('/api/tags/:tag', tag.getPostsByTag);

	// 上传附件
	app.post('/api/attachment', uploader.array('attachments'), attachment.upload);

	// 未配置的路由返回404
	app.all('*', error.error404);
};