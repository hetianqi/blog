'use strict';

var path = require('path');
var fs = require('fs');
var config = require('../libs/config');

module.exports = function (app) {
	// 页面渲染	
	app.get('/', function (req, res, next) {
		res.sendFile(path.join(__dirname, '../app/index.html'));
	});

	// 路由入口，分发给各个控制器
	app.all('*', function (req, res, next) {
		var reqPath = req.path.split('/');
		var controller = reqPath[1];
		var action = reqPath[2];
		var ctrlPath = path.join(__dirname, '../controllers/');

		if (fs.existsSync(ctrlPath + controller + '.js')) {
			var route = require(ctrlPath + controller);
			
			if (typeof route[action] == 'function') {
				route[action](req, res, next);
				return;
			}
		}

		res.json({
			code: 404,
			message: 'not found'
		});
	});
};