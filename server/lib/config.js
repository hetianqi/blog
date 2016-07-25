/**
 * 系统配置文件
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var path = require('path');

var rootPath = path.join(__dirname, '../../');

module.exports = {
	// 数据库连接
	db: {
		
	},
	// 服务器启动端口
	port: 3456,
	// 路径
	path: {
		root: rootPath,
		client: path.join(rootPath, './client/'),
		server: path.join(rootPath, './server/')
	}
};