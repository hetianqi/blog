
module.exports = function (app) {
	app.controller('homeCtrl', [
		'$scope',
		function ($scope) {
			$scope.greettingText = 'Hello, this is home page';
		}
	]);
};