/**
 * 首页控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

module.exports = function (app) {
	app.controller('homeCtrl', [
		'$scope',
		'$http',
		'$sce',
		function ($scope, $http, $sce) {
			$http
				.get('/post/list')
				.success(function (data) {
					$scope.total = 10;
					$scope.posts = data.posts;
				});

			$scope.getPostList = function (p) {
				$http
					.get('/post/list?p=' + p)
					.success(function (data) {
						$scope.posts = data.posts;
					});
			}
		}
	]);
};