/**
 * 文章控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var fs = require('fs');
var config = require('../lib/config');
var util = require('../lib/util');

// 获取文章列表
exports.getList = function (req, res) {
	fs.readFile(config.path.server + 'data/postList.json', 'utf8', function (err, data) {
		if (err) {
			return util.handleError(res, err);
		}

		var posts = JSON.parse(data);

		res.end(JSON.stringify({
			total: 10,
			posts: posts
		}));
	});
};

// 根据postId获取文章
exports.getById = function (req, res) {
	fs.readFile(config.path.server + '/data/postList.json', 'utf8', function (err, data) {
		if (err) {
			return util.handleError(res, err);
		}

		var posts = JSON.parse(data);
		var post;

		posts.forEach(function (item) {
			if (item.id == req.params.postId) {
				post = item;
			}
		});

		res.end(JSON.stringify({
			post: post
		}));
	});
};