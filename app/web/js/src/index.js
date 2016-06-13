'use strict';

var angular = require('../../plugins/angular');
var app = angular.module('app', []);

app.filter('money', function () {
	return function (input, unit) {
		var output = '';

		return unit + input;
	};
});

app.controller('cartCtrl', [
	'$scope', 
	function ($scope) {
		$scope.discount = 0;
		$scope.items = [
			{ title: 'Paint pots', quantity: 0, price: 4.99 },
			{ title: 'Polka dots', quantity: 0, price: 12.99 },
			{ title: 'Pebbles', quantity: 0, price: 9.99 }
		];

		$scope.totalCart = function () {
			var total = 0;
			
			for (var i = 0, l = $scope.items.length; i < l; i++) {
				total += $scope.items[i].quantity * $scope.items[i].price;
			}

			return total;
		};

		function calculateDiscount(oldValue, newValue, scope) {
			$scope.discount = newValue > 100 ? 10 : 0;
		};

		$scope.subtotalCart = function () {
			return $scope.totalCart() - $scope.discount;
		};

		$scope.$watch($scope.totalCart, calculateDiscount);
	}
]);

angular.bootstrap(document, ['app']);