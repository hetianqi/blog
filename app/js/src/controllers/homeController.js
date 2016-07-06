/**
 * 首页控制器
 * @author Emmett
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
					$scope.posts = data.posts;
				});
		}
	]);
};