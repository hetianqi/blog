/**
 * angular过滤器
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

module.exports = function (app) {
	app
		// 将html转换为可信任的字符串输出到页面
		.filter('toTrustHtml', [
			'$sce',
			function ($sce) {
				return function (text) {
					return $sce.trustAsHtml(text);
				};
			}
		])
		// 格式化时间
		.filter('formatDate', [
			function () {
				return function (dateStr, format) {
					format = format || 'YYYY-MM-DD hh:mm:ss';

					var date = new Date(dateStr);
		            var o = {
		            	'Y+': date.getFullYear(),
		                'M+': date.getMonth() + 1,
		                'D+': date.getDate(),
		                'h+': date.getHours(),
		                'm+': date.getMinutes(),
		                's+': date.getSeconds(),
		                'S': date.getMilliseconds()
		            };
		            var s;

		            // 遍历替换每个匹配项
		            for (var k in o) {
		            	s = '' + o[k];

		                if (new RegExp('(' + k + ')').test(format)) {
		                    format = format.replace(RegExp.$1, function (match, index) {
		                    	// 年份特殊处理
		                    	if (k == 'Y+') {
		                    		return s.substr(4 - match.length);
		                    	}

		                    	return match.length == 1 ? s : (s = '00' + s).substr(s.length - match.length);
		                    });
		                }
		            }

		            return format;
				};
			}
		]);
};