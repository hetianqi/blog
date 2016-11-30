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
			'expandLimit',
			function ($scope, headbar, Post, expandLimit) {
				// 获取文章列表
				$scope.getPostList = function (p, setPageIndex) {
					headbar.show();

					Post.query({ p: p, l: expandLimit })
						.$promise
						.then(function (data) {
							headbar.hide();
							
							$scope.limit = expandLimit;
							$scope.total = data.total;
							$scope.posts = data.posts || [];

							// 更新页码
							if (angular.isFunction(setPageIndex)) {
								setPageIndex();
							}
						})
						.then(function () {
							$scope.posts.forEach(function (post) {
								Post.getCounts({ threads: post.id }, function (counts) {
									post.comments = counts.response[post.id].comments;
								});
							});
						});
				};
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

					Post.get({ postId: postId })
						.$promise
						.then(function (data) {
							headbar.hide();
							
							$scope.post = data.post;
							$rootScope.catelogs = [];
							$rootScope.showAsideNav = true;
							$rootScope.isCatelogActive = true;

							(data.post.content || '').replace(/\<h2\s+id=\"([^\"]+)\"\>/g, function (match, val) {
								$rootScope.catelogs.push(val);
							});
						})
						.then(function () {
							Post.getCounts({ threads: $scope.post.id }, function (counts) {
								$scope.post.comments = counts.response[$scope.post.id].comments;
							});
							loadDuoshuo();
						});
				};

				// 返回前一个页面
				$scope.goback = function () {
					history.back();
				};

				// 初始化多说评论
				function loadDuoshuo() {
					var ds = document.getElementById('duoshuo_script');
					window.duoshuoQuery = { short_name: "emmett" };

					if (ds) {
						document.querySelector('head').removeChild(ds);
					}
					
					ds = document.createElement('script');
					ds.id = 'duoshuo_script';
					ds.async = true;
					ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
					ds.charset = 'utf-8';
					document.querySelector('head').appendChild(ds);
				}

				$scope.getPostById($stateParams.postId);
			}
		])
		.controller('archiveCtrl', [
			'$scope',
			'$filter',
			'headbar',
			'Post',
			'collapseLimit',
			function ($scope, $filter, headbar, Post, collapseLimit) {
				$scope.getArchivePostList = function (p, setPageIndex) {
					headbar.show();

					Post.query({ p: p, l: collapseLimit })
						.$promise
						.then(function (data) {
							headbar.hide();
							
							$scope.limit = collapseLimit;
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
							
							// 更新页码
							if (angular.isFunction(setPageIndex)) {
								setPageIndex();
							}
						});
				};	
			}
		])
		.controller('tagsCtrl', [
			'$scope',
			'$filter',
			'headbar',
			'Tag',
			function ($scope, $filter, headbar, Tag) {
				headbar.show();

				Tag.query()
					.$promise
					.then(function (data) {
						headbar.hide();
						$scope.tags = data.tags;
					});
			}
		])
		.controller('tagDetailCtrl', [
			'$scope',
			'$stateParams',
			'headbar',
			'Tag',
			'collapseLimit',
			function ($scope, $stateParams, headbar, Tag, collapseLimit) {
				$scope.getPostListByTagName = function (p, setPageIndex) {
					$scope.tag = $stateParams.tag;
					headbar.show();

					Tag.get({ tag: $stateParams.tag, p: p, l: collapseLimit })
						.$promise
						.then(function (data) {
							headbar.hide();
							$scope.limit = collapseLimit;
							$scope.total = data.total;
							$scope.posts = data.posts;

							// 更新页码
							if (angular.isFunction(setPageIndex)) {
								setPageIndex();
							}
						});
				};		
			}
		])
		.controller('aboutCtrl', [
			'$scope',
			function ($scope) {
				var birth = new Date('1991-02-10');
				var now = new Date();
				var age = now.getFullYear() - birth.getFullYear();

				if (now.getMonth() < birth.getMonth()) {
					age--;
				} else if (now.getMonth() == birth.getMonth() && now.getDate() < birth.getDate()) {
					age--;
				}

				$scope.age = age;
			}
		])
		.controller('uploadCtrl', [
			'$scope',
			'Post',
			'Attachment',
			function ($scope, Post, Attachment) {
				$scope.type = 'post';
				$scope.selectPost = null;
				$scope.selectAttachments = null;

				$scope.submitUpload = function () {
					if ($scope.type == 'post') {
						uploadPost();
					} else {
						uploadAttachment();
					}
				};

				function uploadPost() {
					var formData = new FormData();
					formData.append('post', $scope.selectPost);

					Post.upload(formData, function (data) {
						if (data.code) {
							alert(data.error);
						} else {
							alert('上传成功');
						}
					});
				}

				function uploadAttachment() {
					var formData = new FormData();

					angular.forEach($scope.selectAttachments, function (attach) {
						formData.append('attachments', attach);
					});

					Attachment.upload(formData, function (data) {
						$scope.attachments = data.attachments;
					});
				}
			}
		]);
};