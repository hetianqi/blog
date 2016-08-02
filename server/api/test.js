/**
 * 测试文件
 * @author Emmett <heron1991@163.com>
 * @date 2016-08-01 16:34:18
 */

'use strict';

var fs = require('fs');
var config = require('../lib/config');
var util = require('../lib/util');
var render = require('../lib/render');

// 测试方法
exports.md = function (req, res) {
	fs.readFile(config.path.root + 'hello-world.md', 'utf8', function (err, data) {
		if (err) {
			return util.handleError(res, err);
		}

		var post = render(data);

		res.json({
			post: post
		});
	});
};