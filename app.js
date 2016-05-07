'use strict';

var express = require('express');
var path = require('path');

var app = express();

//设置视图和模板引擎
app.set('views', './src/views');
app.set('view engine', 'jade');

//设置静态文件请求路径
app.use(express.static(path.join(__dirname, '/src/assets/')));

app.get('/', function (req, res) {
	res.render('home/index');
});

app.listen('3000', function () {
	console.log('app started on port 3000...');
});