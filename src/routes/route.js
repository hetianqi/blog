'use strict';

var path = require('path');
var fs = require('fs');
var config = require('../lib/config');

module.exports = function (app) {
	//路由入口，分发给各个控制器
	app.all('*', function (req, res, next) {
		var reqPath = req.path.split('/');
		var controller = reqPath[1] || config.route.controller;
		var action = reqPath[2] || config.route.action;
		var ctrlPath = path.join(__dirname, '../controllers/');

		if (fs.existsSync(ctrlPath + controller + '.js')) {
			var route = require(ctrlPath + controller);
			
			if (typeof route[action] == 'function') {
				//扩展渲染视图的方法
				res.view = function(name, options, callback) {
					if (typeof name == 'object') {
						callback = options;
						options = name;
						name = controller + '/' + action;
					} else if (typeof name == 'function') {
						callback = name;
						name = controller + '/' + action;
					} else if (typeof name == 'undefined') {
						name = controller + '/' + action;
					}

					res.render(name, options, callback);
				}

				route[action](req, res, next);
			} else {
				res.render('_error', {
					type: '404',
					msg: '对不起，您请求的页面不存在'
				});
			}
		} else {
			res.render('_error', {
				type: '404',
				msg: '对不起，您请求的页面不存在'
			});
		}
	});
}