/**
 * 标签控制器
 * @author hetianqi <heron1991@163.com>
 * @date 2016-08-01 16:28:42
 */

'use strict';

var fs = require('fs');
var util = require('../lib/util');
var Post = require('../model/Post');
var Promise = require('bluebird');

// 获取标签列表
exports.getList = function (req, res) {
	Post
		.find({}, 'tags')
		.then(function (posts) {
			var tags = [];

			if (posts && posts.length) {
				posts.forEach(function (post) {
					if (post.tags && post.tags.length) {
						post.tags.forEach(function (tag) {
							var idx = util.indexOf(tags, { name: tag }, 'name');

							if (idx == -1) {
								tags.push({ name: tag, post_count: 1 });
							} else {
								tags[idx].post_count++;
							}
						});
					}					
				});
			}

			res.json({
				tags: tags
			});		
		});
};

// 获取标签下对应文章列表
exports.getPostsByTag = function (req, res) {
	var tag = req.params.tag;
	var limit = +req.query.l;
	var skip = limit * (+req.query.p - 1);

	Promise.all([
			Post.count({ tags: { $in: [tag] } }),
			Post.find({ tags: { $in: [tag] } }, null, { 
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
		});
};