'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');

// 定义文件路径
var filePath = {
	frontJs: 'app/web/js/src/*.js',
	backJs: ['app.js', 'app/controllers/*.js', 'app/libs/*.js', 'app/routes/*.js'],
	entryJs: './app/web/js/src/index.js',
	destJs: 'app/web/js/dist',
	scssDir: 'app/web/css/base',
	scss: 'app/web/css/base/*.scss',
	destCss: 'app/web/css'
};

// 重启node
gulp.task('nodemon', function () {
	nodemon({
		script: 'app.js',
		watch: filePath.backJs
	});
});

// 校验js文件
gulp.task('eslint', function () {
	return gulp.src([filePath.frontJs].concat(filePath.backJs))
		.pipe(eslint())
		.pipe(eslint.format());
});

// 编译前端js
gulp.task('compileJs', function () {
	return gulp.src(filePath.frontJs)
		.pipe(webpack({
			entry: {
				index: filePath.entryJs
			},
			output: {
				filename: 'bundle.js'
			}
		}))
		//.pipe(uglify())
		.pipe(gulp.dest(filePath.destJs));
});

// 编译css
gulp.task('compileCss', function () {
	gulp.watch(filePath.scss, compileCss);
	return compileCss();

	function compileCss() {
		return gulp.src(filePath.scss)
			.pipe(compass({
		    	css: filePath.destCss,
		    	sass: filePath.scssDir,
		    	style: 'compact'
		    }))
		    .pipe(autoprefixer({
				browsers: ['last 5 versions', 'ie 8', 'ie 9']
		    }))
			.pipe(gulp.dest(filePath.destCss));
	}
});

// 默认任务
gulp.task('default', ['nodemon', 'eslint']);