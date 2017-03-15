/**
 * 文章控制器
 * @author hetianqi <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var fs = require('fs');
var config = require('../lib/config');
var error = require('../lib/error');
var render = require('../lib/render');
var Post = require('../model/Post');
var Promise = require('bluebird');

// 新增文章
exports.add = function (req, res) {
	fs.readFile(req.file.path, 'utf8', function (err, data) {
		if (err) {
			return error.serverError(res, err);
		}

		var post = new Post(render(data));

		post
			.save()
			.then(function (data) {
				res.json({
					post: data
				});
			}, function (err) {
				error.serverError(res, err);
			});
	});
};

// 获取文章列表
exports.getList = function (req, res) {
	var total = 0;
	var posts = [];
	var limit = +req.query.l;
	var skip = limit * (+req.query.p - 1);

	if (isNaN(limit) || isNaN(skip)) {
		return error.paramsError(res, 'p and s must be a number!');
	}

	Promise
		.all([
			Post.count(),
			// Model.find(conditions, [fields], [options], [callback])
			Post.find({}, null, {
				skip: skip,
				limit: limit,
				sort: {
					createTime: -1
				}
			})
		])
		.then(function (data) {
			res.json({
				total: data[0],
				posts: data[1]
			});
		}, function (err) {
			error.serverError(res, err);
		});
};

// 根据postId获取文章
exports.getById = function (req, res) {
	Post
		.findOne({ id: req.params.postId })
		.then(function (post) {
			// 更新阅读次数并保存
			post.times++;
			post.save();
			res.json({
				post: post
			});
		}, function (err) {
			error.serverError(res, err);
		});
};