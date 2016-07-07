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

		                    	// 补足4位，然后截取需要的位数
		                    	s = '00' + s;

		                    	return s.substr(s.length - match.length);
		                    });
		                }
		            }

		            return format;
				}
			}
		]);
};