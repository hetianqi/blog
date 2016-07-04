/**
 * home.js 
 */

'use strict';

var fs = require('fs');
var render = require('../libs/render');

// 设置markd选项
render.setOptions({
	gfm: true,
	pedantic: false,
	sanitize: false,
	tables: true,
	breaks: true,
	smartLists: true,
	smartypants: true
});

// 首页
exports.getArticle = function (req, res) {
	fs.readFile('./test.md', function (err, data) {
		if (err) {
			res.json({
				code: 500,
				message: 'an erro occured on server side'
			});
			return;
		}

		res.json({
			code: 0,
			message: 'ok',
			post: render(data.toString('utf8'))
		});
	});
};