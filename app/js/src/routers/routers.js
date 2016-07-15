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
		function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'home.html'
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
					templateUrl: 'posts.detail.html',
				});
		}
	]);
};