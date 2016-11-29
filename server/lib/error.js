/**
 * 错误处理集合
 * @author Emmett <heron1991@163.com>
 * @date 2016-08-05 09:48:52
 */

'use strict';

// 404错误
exports.error404 = function (req, res) {
	res.status(404).json({
		error: 'Not found!'
	});
};

// 参数错误
exports.paramsError = function (res, errorMsg) {
	res.status(500).json({
		error: 'Params error! ' + errorMsg
	});
};

// 通用服务器错误
exports.serverError = function (res, err) {
	res.status(500).json({
		error: 'Server error! ' + err.toString()
	});
};