'use strict';

var angular = require('../../plugins/angular');
var uiRouter = require('../../plugins/angular-ui-router/release/angular-ui-router');

var app = angular.module('app', [uiRouter]);

app.config([
	'$stateProvider', 
	'$urlRouterProvider', 
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.when('', '/index');
		$stateProvider
			.state('index', {
				url: '/index',
				templateUrl: 'views/aside.html'
			});
	}
]);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});