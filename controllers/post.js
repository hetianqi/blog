/**
 * 文章控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var fs = require('fs');
var render = require('../libs/render');

// 获取文章列表
exports.getList = function (req, res) {
	fs.readFile('./data/postList.json', function (err, data) {
		if (err) {
			console.log(err);
			res.json({
				code: 500,
				message: 'an erro occured on server side'
			});
			return;
		}

		res.end(JSON.stringify({
			code: 0,
			message: 'ok',
			posts: JSON.parse(data.toString())
		}));
	});
};

// 测试方法
exports.test = function (req, res) {
	fs.readFile('./hello-world.md', function (err, data) {
		if (err) {
			console.log(err);
			res.json({
				code: 500,
				message: 'an erro occured on server side'
			});
			return;
		}

		var post = render(data.toString());

		post._content = post._content.replace(/\"/g, '\\"');
		post.content = post.content.replace(/\"/g, '\\"');
		post.excerpt = post.excerpt.replace(/\"/g, '\\"');
		post.raw = post.raw.replace(/\"/g, '\\"');

		res.json({
			code: 0,
			message: 'ok',
			post: post
		});
	});
};