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

			$stateProvider
				.state('home', {
					url: '/',
					// templateUrl: 'home.html',
					controller: 'postCtrl'
				})
				.state('archive', {
					url: '/archive',
					templateUrl: 'archive.html'
				})
				.state('tag', {
					url: '/tag',
					templateUrl: 'tag.html'
				})
				.state('about', {
					url: '/about',
					templateUrl: 'about.html'
				})
				.state('detail', {
					url: '/posts/:postId',
					templateUrl: 'posts.detail.html'
				})
				.state('not-found', {
					url: '',
					templateUrl: 'search.html'			
				});
			// 配置html5路由，去掉#
			$locationProvider.html5Mode(true);
		}
	]);
};