/**
 * 入口文件
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var angular = require('../../assets/angular');
var uiRouter = require('../../assets/angular-ui-router/release/angular-ui-router.min');
var ngResource = require('../../assets/angular-resource');

var app = angular.module('app', [uiRouter, ngResource]);

// 加载路由
require('./routers/routers')(app);

// 加载过滤器
require('./filters/filters')(app);

// 加载指令集
require('./directives/directives')(app);

// 加载服务
require('./services/services')(app);

// 加载各个控制器
require('./controllers/headerController')(app);
require('./controllers/homeController')(app);

// DOM ready
angular.element(document).ready(function () {
	// 启动app模块
	angular.bootstrap(document, ['app']);
});