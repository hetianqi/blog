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
				.get('/home/getArticle')
				.success(function (data) {
					$scope.post = data.post;
				});
		}
	]);
};