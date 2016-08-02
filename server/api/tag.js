/**
 * 标签控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-08-01 16:28:42
 */

'use strict';

var fs = require('fs');
var config = require('../lib/config');
var util = require('../lib/util');

// 获取标签列表
exports.getList = function (req, res) {
	fs.readFile(config.path.server + 'data/postList.json', 'utf8', function (err, data) {
		if (err) {
			return util.handleError(res, err);
		}

		var posts = JSON.parse(data);
		var tags = [];
		var total = 0;

		posts.forEach(function (post) {
			if (post.tags) {
				post.tags.forEach(function (tag) {
					var idx = util.indexOf(tags, { name: tag }, 'name');

					if (idx > -1) {
						tags[idx].post_count++;
					} else {
						tags.push({ name: tag, post_count: 1 });
						total++;
					}
				});
			}			
		});

		res.end(JSON.stringify({
			total: total,
			tags: tags
		}));
	});
};

// 获取标签下对应文章列表
exports.getPostsByTag = function (req, res) {
	var tag = req.params.tag;

	fs.readFile(config.path.server + '/data/postList.json', 'utf8', function (err, data) {
		if (err) {
			return util.handleError(res, err);
		}

		data = JSON.parse(data);
		var posts = [];

		data.forEach(function (item) {
			if (item.tags.indexOf(tag) > -1) {
				posts.push(item);
			}
		});

		res.end(JSON.stringify({
			total: posts.length,
			posts: posts
		}));
	});
};