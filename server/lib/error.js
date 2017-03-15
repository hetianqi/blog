/**
 * 错误处理集合
 * @author hetianqi <heron1991@163.com>
 * @date 2016-08-05 09:48:52
 */

'use strict';

// 404错误
exports.error404 = function (req, res) {
	res.json({
		code: 404,
		error: 'Not found!'
	});
};

// 参数错误
exports.paramsError = function (res, errorMsg) {
	res.json({
		code: 500,
		error: 'Params error! ' + errorMsg
	});
};

// 通用服务器错误
exports.serverError = function (res, err) {
	res.json({
		code: 500,
		error: 'Server error! ' + err.toString()
	});
};