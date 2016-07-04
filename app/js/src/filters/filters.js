/**
 * 过滤器集合
 * @author Emmett
 */

module.exports = function (app) {
	app.filter('toTrustHtml', [
		'$sce',
		function ($sce) {
			return function (text) {
				return $sce.trustAsHtml(text);
			};
		}
	]);
};