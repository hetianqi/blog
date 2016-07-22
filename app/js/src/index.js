/**
 * 入口文件
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var angular = require('../../assets/angular');
var uiRouter = require('../../assets/angular-ui-router/release/angular-ui-router.min');
var ngResource = require('../../assets/angular-resource');
var UAParser = require('../../assets/ua-parser-js');

var app = angular.module('app', [uiRouter, ngResource]);
var ua = new UAParser();

// 设置常量
// 首页每页条目数
app.constant('homeLimit', 10);
// 归档页每页条目数
app.constant('archiveLimit', 20);

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
require('./controllers/contentController')(app);

// 初始化
app.run([
	'$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
	    $rootScope.catelogs = [];
	    $rootScope.showAsideNav = false;
		$rootScope.isCatelogActive = false;
		$rootScope.isAsideFixed = false;

		// 移动端顶部导航切换
		$rootScope.toggleAsideNav = function (active) {
			$rootScope.isCatelogActive = active;
		};

		// 页面改变时，判断是否需要显示侧边导航栏
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
			if (!$state.is('detail')) {
			    $rootScope.catelogs = [];
			    $rootScope.showAsideNav = false;
				$rootScope.isCatelogActive = false;
			}
		});
    }
]);

// DOM ready
angular.element(document).ready(function () {
	// 启动app模块
	var injector = angular.bootstrap(document, ['app']);
	var device = ua.getDevice();
	var asideTop = parseInt(window.getComputedStyle(document.querySelector('.aside'), null)['marginTop']);

	// 移动端和PC端特殊处理
	if (device.type != 'mobile') {
		// PC端窗口滚动时固定侧边导航栏
		angular.element(window).on('scroll', function (e) {
			injector.invoke(['$rootScope', function ($rootScope) {
				if ($rootScope.showAsideNav) {
					var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

					// 在angular框架外（如事件，setTimeout, XHR等）操作scope需要用$apply，否则视图不会刷新
					$rootScope.$apply(function () {
						if (scrollTop > asideTop) {
							$rootScope.isAsideFixed = true;
						} else {
							$rootScope.isAsideFixed = false;
						}
					});
				}
			}]);
		});
	} else {
		// 移动端a标签打开窗口方式为当前窗口
		angular.element(document).on('click', function (e) {
			if (e.srcElement.tagName.toLowerCase() == 'a') {
				e.srcElement.removeAttribute('target');
			}
		});
	}
});