'use strict';

var path = require('path');
var fs = require('fs');
var config = require('../libs/config');

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
				route[action](req, res, next);
			}
		}
	});
};