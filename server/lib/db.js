/**
 * Mongodb 数据库连接
 * @author Emmett <heron1991@163.com>
 * @date 2016-08-03 17:43:39
 */

'use strict';

var mongoose = require('mongoose');
var bluebird = require('bluebird');
var dbConfig = require('./config').db;
var util = require('./util');
var connection = mongoose.connection;

function connect() {
	var uri = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database;
	var opt = {
		user: dbConfig.user,
		pass: dbConfig.pass,
		server: {
			auto_reconnect: true
		}
	};	

	// 替换mongoose自带的Promise，以免控制台发出警告
	mongoose.Promise = bluebird;
	mongoose.connect(uri, opt);
}

connection.on('connected', function (err) {
	util.log('=====db connected=====');

	if (err) {
		util.log('数据库连接失败：' + err, 'error');
	}
});

// 连接断开
connection.on('disconnected', function () {
	util.log('=====db disconnected=====');
});

// 出错时关闭连接，触发自动重连
connection.on('error', function (err) {
	util.log('=====db error=====');
	connection.close();
});

exports.connect = connect;
exports.mongoose = mongoose;