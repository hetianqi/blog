/**
 * 工具类库
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-14 14:03:52
 */

exports.handleError = function (res, err) {
	res.status(500).json({
		error: err.toString()
	});
};