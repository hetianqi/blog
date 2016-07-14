/**
 * 文章控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var fs = require('fs');
var render = require('../libs/render');
var utils = require('../libs/utils');

// 获取文章列表
exports.getList = function (req, res) {
	fs.readFile('./data/postList.json', 'utf8', function (err, data) {
		if (err) {
			return utils.handleError(res, err);
		}

		var posts = JSON.parse(data);

		res.end(JSON.stringify({
			totalPage: 10,
			posts: posts
		}));
	});
};

// 测试方法
exports.test = function (req, res) {
	fs.readFile('./hello-world.md', 'utf8', function (err, data) {
		if (err) {
			return utils.handleError(res, err);
		}

		var post = render(data);

		post._content = post._content.replace(/\"/g, '\\"');
		post.content = post.content.replace(/\"/g, '\\"');
		post.excerpt = post.excerpt.replace(/\"/g, '\\"');
		post.raw = post.raw.replace(/\"/g, '\\"');

		res.json({
			post: post
		});
	});
};