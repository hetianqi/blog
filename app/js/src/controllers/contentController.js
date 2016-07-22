/**
 * 内容控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

module.exports = function (app) {
	app
		.controller('postCtrl', [
			'$scope',
			'headbar',
			'Post',
			'homeLimit',
			function ($scope, headbar, Post, homeLimit) {
				// 获取文章列表
				$scope.getPostList = function (p, setPageIndex) {
					headbar.show();

					Post.query({ p: p, s: homeLimit })
						.$promise
						.then(function (data) {
							headbar.hide();
							
							$scope.limit = homeLimit;
							$scope.total = data.total;
							$scope.posts = data.posts || [];

							if (angular.isFunction(setPageIndex)) {
								setPageIndex(true);
							}
						})
						.then(function () {
							$scope.posts.forEach(function (post) {
								Post.getCounts({ threads: post.id }, function (counts) {
									post.comment_count = counts.response[post.id].comments;
								});
							});
						});
				};

				$scope.getPostList(1);
			}
		])
		.controller('postDetailCtrl', [
			'$scope',
			'$state',
			'$stateParams',
			'$rootScope',
			'headbar',
			'Post',
			function ($scope, $state, $stateParams, $rootScope, headbar, Post) {
				// 根据文章id获取文章
				$scope.getPostById = function (postId) {
					headbar.show();

					Post.get({ postId: postId }, function (data) {
						headbar.hide();
						
						$scope.post = data.post;
						$rootScope.catelogs = [];
						$rootScope.showAsideNav = true;
						$rootScope.isCatelogActive = true;

						(data.post.content || '').replace(/\<h2\s+id=\"([^\"]+)\"\>/g, function (match, val) {
							$rootScope.catelogs.push(val);
						});
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
		])
		.controller('archiveCtrl', [
			'$scope',
			'$filter',
			'headbar',
			'Post',
			'archiveLimit',
			function ($scope, $filter, headbar, Post, archiveLimit) {
				$scope.getArchivePostList = function (p, setPageIndex) {
					headbar.show();

					Post.query({ p: p, s: archiveLimit }, function (data) {
						headbar.hide();
						
						$scope.limit = archiveLimit;
						$scope.total = data.total;

						var archives = $scope.archives = {};
						var k;
						
						(data.posts || []).forEach(function (item) {
							k = $filter('formatDate')(item.createTime, 'YYYY');

							if (!archives[k]) {
								archives[k] = [];
							}

							archives[k].push(item);
						});

						if (angular.isFunction(setPageIndex)) {
							setPageIndex(true);
						}
					});
				};

				$scope.getArchivePostList(1);		
			}
		]);
};