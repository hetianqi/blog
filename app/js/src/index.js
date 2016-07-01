/**
 * index.js 入口文件
 * @author Emmett
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
				url: '/archive'
			})
			.state('tag', {
				url: '/tag'
			})
			.state('about', {
				url: '/about',
				templateUrl: '/static/views/about.html'
			});
	}
]);

// 页面头部控制器
app.controller('headerCtrl', [
	'$scope',
	function ($scope) {
		$scope.showNav = false;

		$scope.toggleNav = function () {
			$scope.showNav = !$scope.showNav;
		};
	}
]);

// 加载各个控制器
require('./controllers/homeController')(app);

// DOM ready
angular.element(document).ready(function () {
	// 启动app模块
	angular.bootstrap(document, ['app']);
});