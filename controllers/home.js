'use strict';

var fs = require('fs');
var marked = require('marked');
var highlight = require('highlight.js');

// 设置markd选项
marked.setOptions({
	// 代码高亮设置
	highlight: function (code) {
		return highlight.highlightAuto(code).value;
	}
});

// 首页
exports.getArticle = function (req, res) {
	fs.readFile('./hello-world.md', function (err, data) {
		if (err) {
			console.log(err);
			res.json({
				code: 500,
				message: 'an erro occured on server side'
			});
			return;
		}

		res.json({
			code: 0,
			message: 'ok',
			data: marked(data.toString('utf8'))
		});
	});
};