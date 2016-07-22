/**
 * angular自定义服务
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

module.exports = function (app) {
	app
		// 头部加载条加载动画
		.factory('headbar', [
			'$timeout',
			function ($timeout) {
				var innerbar = document.querySelector('.headbar .headbar-inner');
				var width = 0;
				var delay = 400;
				var setWidthPromise, resetPromise;

				var d

				// 设置宽度，每个间隔加3%，到达90%时不再加
				function setWidth() {
					setWidthPromise = $timeout(function () {
						width += 3;
						innerbar.style.width = width + '%';

						if (width < 90) {
							setWidth();
						}
					}, delay);
				}

				// 显示加载条，由于要等待reset完成，因此须延迟执行，且时间不能大于请求返回时间，这里设置为0
				function show() {
					reset();

					$timeout(function () {
						innerbar.className = 'headbar-inner is-loading';
						width = 15;
						innerbar.style.width = width + '%';

						setWidth();
					}, 0);				
				}

				// 隐藏加载条
				function hide() {
					$timeout.cancel(setWidthPromise);

					width = 100;
					innerbar.style.width = width + '%';

					resetPromise = $timeout(reset, delay);
				}

				// 重置宽度和隐藏加载条
				function reset() {
					innerbar.className = 'headbar-inner';
					width = 0;
					innerbar.style.width = width + '%';

					$timeout.cancel(setWidthPromise);
					$timeout.cancel(resetPromise);
				}

				return { show: show, hide: hide };
			}
		])
		// 文章资源服务
		.factory('Post', [
			'$resource',
			function ($resource) {
				var Post = $resource('/api/posts/:postId', { postId: '@id' }, {
					query: { isArray: false },
					getCounts: {
						url: 'http://api.duoshuo.com/threads/counts.json',
						method: 'GET',
						params: {
							short_name: 'emmett'
						},
						isArray: false,
						data: false,
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
						} 
					}
				});

				return Post;
			}
		])
		// 工具服务
		.factory('util', [
			function () {

			}
		]);
};