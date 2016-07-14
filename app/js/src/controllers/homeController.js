/**
 * 首页控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

module.exports = function (app) {
	app.controller('homeCtrl', [
		'$scope',
		'$http',
		'$q',
		'headbar',
		'Post',
		function ($scope, $http, $q, headbar, Post) {
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
};