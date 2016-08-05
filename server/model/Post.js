/**
 * Post model
 * @author Emmett <heron1991@163.com>
 * @date 2016-08-04 16:53:24
 */

'use strict';

var mongoose = require('../lib/db').mongoose;
var autoIncrement = require('mongoose-auto-increment');

// 定义模式
var PostSchema = mongoose.Schema({
	id: {
		type: Number,
		unique: true
	},
	title: {
		type: String,
		required: '{PATH} is required!'
	},
	raw: String,
	_content: String,
	content: String,
	excerpt: String,
	createTime: {
		type: Date,
		default: Date.now()
	},
	updateTime: {
		type: Date,
		default: Date.now()
	},
	published: Boolean,
	tags: [String],
	times: {
		type: Number,
		default: 0
	}
});

// 定义自增字段
autoIncrement.initialize(mongoose.connection);
PostSchema.plugin(autoIncrement.plugin, {
	model: 'Post',
	field: 'id',
	startAt: 1,
	incrementBy: 1
});

// 导出模型
module.exports = mongoose.model('Post', PostSchema);