/**
 * angular-ui-router路由配置
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-14 17:08:53
 */

'use strict';

module.exports = function (app) {
	app.config([
		'$stateProvider', 
		'$urlRouterProvider', 
		'$locationProvider',
		function ($stateProvider, $urlRouterProvider, $locationProvider) {
			$urlRouterProvider.otherwise('/');

			// 配置html5路由，去掉#
			$locationProvider.html5Mode(true);
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'home.html'
					// controller: 'postCtrl'
				})
				.state('detail', {
					url: '/posts/:postId',
					templateUrl: 'posts.detail.html'
				})
				.state('archive', {
					url: '/archive',
					templateUrl: 'archive.html'
				})
				.state('tags', {
					url: '/tags',
					templateUrl: 'tags.html'
				})
				.state('tags.detail', {
					url: '/:tag',
					views: {
						// 采用绝对路径，在index.html中的ui-view中插入视图
						'@': {
							templateUrl: 'tags.detail.html'
						}
					}
				})
				.state('about', {
					url: '/about',
					templateUrl: 'about.html'
				})
				.state('not-found', {
					url: '',
					templateUrl: 'search.html'			
				});
		}
	]);
};