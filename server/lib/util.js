/**
 * 工具类库
 * @author hetianqi <heron1991@163.com>
 * @date 2016-07-14 14:03:52
 */

'use strict';

var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var config = require('./config');

// 渲染页面，测试环境
exports.renderPage = function (req, res) {
	try {
		// 将页面和模板载入到index.html页面一同发送到浏览器
		var $ = cheerio.load(fs.readFileSync(config.path.client + 'index.html', 'utf8'));
		var viewPath = config.path.client + 'views/';
		var templatePath = config.path.client + 'views/templates/';
		var viewFiles = fs.readdirSync(viewPath);
		var templateFiles = fs.readdirSync(templatePath);
		var templates = [];
		var tpl;

		viewFiles.forEach(function (item) {
			if (fs.statSync(viewPath + item).isFile()) {
				tpl = '<script type="text/ng-template" id="' + item + '">\n' + fs.readFileSync(viewPath + item, 'utf8') + '\n</script>';

				templates.push(tpl);
			}
		});

		templateFiles.forEach(function (item) {
			if (fs.statSync(templatePath + item).isFile()) {
				tpl = '<script type="text/ng-template" id="' + item + '">\n' + fs.readFileSync(templatePath + item, 'utf8') + '\n</script>';

				templates.push(tpl);
			}
		});

		$('#ng-templates').html(templates.join('\n'));
		res.send($.html());
	} catch (err) {
		res.status(500).end(err.toString());
	}
};

// 在数组中查找项的位置，兼容按对象关键字查找数组
exports.indexOf = function (arr, value, key) {
    var index = -1;

    arr.forEach(function (item, idx) {
        if (typeof item == 'object' && typeof key != 'undefined') {
            if (item[key] == value[key]) {
                index = idx;
            }
        } else {
            if (item == value) {
                index = idx;
            }
        }
    });

    return index;
};

// 格式化时间
exports.formatDate = function (date, format) {
	format = format || 'YYYY/MM/DD hh:mm:ss';

	if (!date instanceof Date) {
		date = new Date(date);
	}

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

// 日志记录到本地文件
exports.log = function (msg, type) {
	var logPath = config.path.log;
	var logName = '';
	var now = new Date();

	switch (type) {
		case 'log':
			logName = 'log.log';
			break;
		case 'error':
			logName = 'error.log';
			break;
		default:
			logName = 'log.log';
	}

	msg = exports.formatDate(now) + '    ' + msg;

	fs.stat(logPath, function (err, stats) {
		// 如果目录不存在则创建目录
		if (err && err.code == 'ENOENT') {
			fs.mkdirSync(logPath);
		}

		fs.appendFile(logPath + logName, msg + '\r\n');
	});	
};

// 同步创建多级目录
exports.mkdirsSync = function (dirpath, mode) {
	try {
		dirpath = dirpath.trim();

		// 统一目录分隔符
		if (path.sep == '/') {
			dirpath = dirpath.replace(/\\/g, path.sep);
		} else {
			dirpath = dirpath.replace(/\//g, path.sep);
		}

		// 如果目录不存
		if (!existsSync(dirpath)) {
			var pathtmp;
			var pathArr = dirpath.split(path.sep);

			// 特殊处理*nix路径
			if (path.sep == '/') {
				pathArr[0] = '/';
			}

			for (var i in pathArr) {
				if (pathtmp) {
	                pathtmp = path.join(pathtmp, pathArr[i]);
	            } else {
	                pathtmp = pathArr[i];
	            }

	            if (!existsSync(pathtmp)) {
	            	fs.mkdirSync(pathtmp, mode);
	            }			
			}
		}

		return true;
	} catch (e) {
		return false;
	}
};

// 判断目录是否存在
var existsSync = exports.existsSync = function (path) {
	try {
		fs.statSync(path);
		return true;
	} catch (e) {
		return false;
	}
};