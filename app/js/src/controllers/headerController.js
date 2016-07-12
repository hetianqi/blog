/**
 * header控制器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

module.exports = function (app) {
	app.controller('headerCtrl', [
		'$scope',
		function ($scope) {
			$scope.showNav = false;

			$scope.toggleNav = function () {
				$scope.showNav = !$scope.showNav;
			};
		}
	]);
};