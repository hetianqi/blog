/**
 * Gulp配置文件
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var config = require('./server/lib/config');

// 定义文件路径
var filePath = {
	clientJs: config.path.client + 'js/*.js',
	serverJs: config.path.server + '*/*.js',
	clientEntryJs: config.path.client + 'js/app.js',
	serverEntryJs: config.path.server + 'app.js',
	clientDestJs: config.path.client + 'js/',
	scssDir: config.path.client + 'css/base',
	scssFile: config.path.client + 'css/base/*.scss',
	destCss: config.path.client + 'css'
};

// 重启node
gulp.task('nodemon', function () {
	return nodemon({
			script: filePath.serverEntryJs,
			watch: filePath.serverJs
		});
});

// 校验js文件
gulp.task('eslint', function () {
	var eslintPath = [filePath.clientJs].concat([filePath.serverJs, '!'+ config.path.client + 'js/all.js']);

	gulp.watch(eslintPath, eslintJs);
	return eslintJs();

	function eslintJs() {
		return gulp.src(eslintPath)
			.pipe(eslint())
			.pipe(eslint.format());
	}
});

// 编译前端js
gulp.task('compileJs', function () {
	return gulp.src(filePath.clientJs)
		.pipe(webpack({
			watch: true,
			entry: {
				index: filePath.clientEntryJs
			},
			output: {
				filename: 'all.js'
			}
		}))
		.pipe(uglify())
		.pipe(gulp.dest(filePath.clientDestJs));
});

// 编译css
gulp.task('compileCss', function () {
	gulp.watch(filePath.scssFile, compileCss);
	return compileCss();

	function compileCss() {
		return gulp.src(filePath.scssFile)
			.pipe(compass({
		    	css: filePath.destCss,
		    	sass: filePath.scssDir,
		    	style: 'compact'
		    }))
		    .pipe(autoprefixer({
				browsers: ['last 5 versions', 'ie 9']
		    }))
			.pipe(gulp.dest(filePath.destCss));
	}
});

// 默认任务
gulp.task('default', ['nodemon', 'eslint', 'compileJs', 'compileCss']);