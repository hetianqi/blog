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
				// 开始页码
				scope.start = 1;
				// 结束页码
				scope.end = 1;
				// 当前页码
				scope.current = 1;
				// 显示的页码条数
				scope.size = 5;

				// 改变页码
				scope.changePage = function (pageIndex) {
					scope.onPageChange(pageIndex, function (isGotoTop) {
						scope.current = pageIndex;

						if (isGotoTop === undefined || isGotoTop) {
							document.querySelector('body').scrollTop = 0;
						}
					});
				};

				// 监视页码变化
				scope.$watch('total', setPage);
				scope.$watch('current', setPage);

				// 设置页码
				function setPage() {
					// 防止参数未初始化完成导致后续计算错误
					if (!scope.limit || !scope.total) {
						return;
					}

					calcPage();

					var pages = [];

					for (var i = scope.start; i <= scope.end; i++) {
						pages.push(i);
					}

					scope.pages = pages;
				}

				// 计算起始页
				function calcPage() {
					scope.totalPage = Math.ceil(scope.total / scope.limit);

					if (scope.current <= scope.start || scope.current == scope.totalPage) {
			            scope.start = Math.max(1, scope.current - scope.size + 1);
			        } else if (scope.current >= scope.end) {
			            scope.start = Math.min(scope.current, scope.totalPage - scope.size + 1);
			        }

			        scope.end = Math.min(scope.start + scope.size - 1, scope.totalPage);
				}

				// 请求第一页
				scope.changePage(1);
			}

			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'pagination.tpl.html',
				scope: {
					limit: '=',			// 入参，每页条目数
					total: '=',			// 入参，条目总数
					onPageChange: '='	// 入参，页码改变回调
				},
				link: link
			};
		}
	]);
};