/**
 * 工具类库
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-14 14:03:52
 */

'use strict';

var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var config = require('./config');

// 渲染页面，测试环境
exports.renderPage = function (req, res) {
	try {
		// 将页面和模板载入到index.html页面一同发送到浏览器
		var $ = cheerio.load(fs.readFileSync(config.path.client + 'index.html', 'utf8'));
		var viewPath = config.path.client + 'views/';
		var templatePath = config.path.client + 'views/templates/';
		var viewFiles = fs.readdirSync(viewPath);
		var templateFiles = fs.readdirSync(templatePath);
		var templates = [];
		var tpl;

		viewFiles.forEach(function (item) {
			if (fs.statSync(viewPath + item).isFile()) {
				tpl = '<script type="text/ng-template" id="' + item + '">\n' + fs.readFileSync(viewPath + item, 'utf8') + '\n</script>';

				templates.push(tpl);
			}
		});

		templateFiles.forEach(function (item) {
			if (fs.statSync(templatePath + item).isFile()) {
				tpl = '<script type="text/ng-template" id="' + item + '">\n' + fs.readFileSync(templatePath + item, 'utf8') + '\n</script>';

				templates.push(tpl);
			}
		});

		$('#ng-templates').html(templates.join('\n'));
		res.send($.html());
	} catch (err) {
		res.status(500).end(err.toString());
	}
};

// 返回404
exports.error404 = function (req, res) {
	res.status(404).end('Not Fount');
};

// 服务器报错返还
exports.handleError = function (res, err) {
	res.status(500).json({
		error: err.toString()
	});
};