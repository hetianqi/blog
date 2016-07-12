/**
 * 入口文件
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var angular = require('../../assets/angular');
var uiRouter = require('../../assets/angular-ui-router/release/angular-ui-router');

var app = angular.module('app', [uiRouter]);

// 配置路由
app.config([
	'$stateProvider', 
	'$urlRouterProvider', 
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/static/views/home.html'
			})
			.state('archive', {
				url: '/archive',
				templateUrl: '/static/views/archive.html'
			})
			.state('tag', {
				url: '/tag',
				templateUrl: '/static/views/tag.html'
			})
			.state('about', {
				url: '/about',
				templateUrl: '/static/views/about.html'
			});
	}
]);

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