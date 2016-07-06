/**
 * 过滤器集合
 * @author Emmett
 */

module.exports = function (app) {
	app
		.filter('toTrustHtml', [
			'$sce',
			function ($sce) {
				return function (text) {
					return $sce.trustAsHtml(text);
				};
			}
		])
		.filter('toDate', [
			function () {
				return function (dateStr, format) {
					format = format || 'YYYY-MM-DD hh:mm:ss';

					var date = new Date(dateStr);
		            var o = {
		                'M+': date.getMonth() + 1,
		                'D+': date.getDate(),
		                'h+': date.getHours(),
		                'm+': date.getMinutes(),
		                's+': date.getSeconds(),
		                'S': date.getMilliseconds()
		            }

		            // 格式化年份
		            if (/(Y+)/.test(format)) {
		                format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		            }

		            for (var k in o) {
		                if (new RegExp('(' + k + ')').test(format)) {
		                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(("" + o[k]).length));
		                }
		            }

		            return format;
				}
			}
		]);
};