/**
 * angular自定义指令集
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

module.exports = function (app) {
	// 分页
	app.directive('pagination', [
		function () {
			function link(scope, element, attributes) {
				scope.start = 1;
				scope.end = 1;
				scope.current = 1;
				scope.limit = 5;

				// 改变页码
				scope.changePage = function (pageIndex) {
					scope.onPageChange(pageIndex, function (isGotoTop) {
						scope.current = pageIndex;

						if (isGotoTop) {
							document.querySelector('body').scrollTop = 0;
						}
					});
				};

				// 监视页码变化
				scope.$watch('totalPage', setPage);
				scope.$watch('current', setPage);

				// 设置页码
				function setPage() {
					calcPage();

					var pages = [];

					for (var i = scope.start; i <= scope.end; i++) {
						pages.push(i);
					}

					scope.pages = pages;
				}

				// 计算起始页
				function calcPage() {
					if (scope.current <= scope.start || scope.current == scope.totalPage) {
			            scope.start = Math.max(1, scope.current - scope.limit + 1);
			        } else if (scope.current >= scope.end) {
			            scope.start = Math.min(scope.current, scope.totalPage - scope.limit + 1);
			        }

			        scope.end = Math.min(scope.start + scope.limit - 1, scope.totalPage);
				}
			}

			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'pagination.tpl.html',
				scope: {
					totalPage: '=',		// 入参，总页码
					onPageChange: '=',	// 入参，页码改变回调
				},
				link: link
			};
		}
	]);
};