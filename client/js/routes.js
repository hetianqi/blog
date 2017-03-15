/**
 * angular-ui-router路由配置
 * @author hetianqi <heron1991@163.com>
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
						// @ 表示绝对路径，@前面代表状态名称，@后面代表ui-view的值
						// 这里表示插入到index.html的ui-view中
						'@': {
							templateUrl: 'tags.detail.html'
						}
					}
				})
				.state('about', {
					url: '/about',
					templateUrl: 'about.html'
				})
				.state('upload', {
					url: '/upload',
					templateUrl: 'upload.html'
				})
				.state('not-found', {
					url: '',
					templateUrl: 'search.html'			
				});
		}
	]);
};