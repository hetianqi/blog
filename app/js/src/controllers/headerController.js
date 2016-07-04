/**
 * header控制器
 * @author Emmett
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