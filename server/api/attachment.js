/**
 * 附件控制器
 * @author hetianqi <heron1991@163.com>
 * @date 2016-11-28 15:56:30
 */

'use strict';

var config = require('../lib/config');

// 上传附件
exports.upload = function (req, res) {
	var attachments = [];
	var uploadPathLen = config.path.upload.length;

	req.files.forEach(function (file) {
		attachments.push({
			filename: file.filename,
			filepath: '/static/upload/' + file.path.substring(uploadPathLen).replace(/\\/g, '/')
		});
	});

	res.json({
		attachments: attachments
	});
};