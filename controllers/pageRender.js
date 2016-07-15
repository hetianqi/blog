/**
 * 页面渲染控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-14 23:27:38
 */

'use strict';

var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

exports.index = function (req, res) {
	try {
		// 将页面和模板载入到index.html页面一同发送到浏览器
		var $ = cheerio.load(fs.readFileSync('./app/index.html', 'utf8'));
		var viewPath = './app/views/';
		var templatePath = './app/views/templates/';
		var viewFiles = fs.readdirSync(viewPath);
		var templateFiles = fs.readdirSync(templatePath);
		var templates = [];

		viewFiles.forEach(function (item) {
			if (fs.statSync(viewPath + item).isFile()) {
				templates.push(fs.readFileSync(viewPath + item, 'utf8'));
			}
		});

		templateFiles.forEach(function (item) {
			if (fs.statSync(templatePath + item).isFile()) {
				templates.push(fs.readFileSync(templatePath + item, 'utf8'));
			}
		});

		$('#ng-templates').html(templates.join('\n'));

		res.send($.html());
	} catch (err) {
		res.status(500).end(err.toString());
	}
};

exports.error404 = function (req, res) {
	res.status(404).end('Not Fount');
};