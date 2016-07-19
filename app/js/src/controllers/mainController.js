/**
 * 内容控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

module.exports = function (app) {
	app.controller('postCtrl', [
		'$scope',
		'headbar',
		'Post',
		function ($scope, headbar, Post) {
			// 获取文章列表
			$scope.getPostList = function (p, setPageIndex) {
				headbar.show();

				Post.query({ p: p }, function (data) {
					headbar.hide();
					
					$scope.posts = data.posts;
					$scope.totalPage = data.totalPage;

					if (angular.isFunction(setPageIndex)) {
						setPageIndex(true);
					}
				});
			};

			$scope.getPostList(1);
		}
	]);

	app.controller('postDetailCtrl', [
		'$scope',
		'$state',
		'$stateParams',
		'headbar',
		'Post',
		function ($scope, $state, $stateParams, headbar, Post) {
			// 根据文章id获取文章
			$scope.getPostById = function (postId) {
				headbar.show();

				Post.get({ postId: postId }, function (data) {
					headbar.hide();
					
					$scope.post = data.post;
				});
			};

			// 返回前一个页面
			$scope.goback = function () {
				history.back();
			};

			$scope.getPostById($stateParams.postId);

			// 初始化多说评论 start
			window.duoshuoQuery = { short_name: "emmett" };
			var ds = document.createElement('script');
			ds.type = 'text/javascript';
			ds.async = true;
			ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
			ds.charset = 'UTF-8';
			document.querySelector('head').appendChild(ds);
			// 初始化多说评论 end
		}
	]);
};