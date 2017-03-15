/**
 * header控制器
 * @author hetianqi <heron1991@163.com>
 * @date 2016-07-03 11:20:35
 */

'use strict';

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