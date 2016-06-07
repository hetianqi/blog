'use strict';

var config = require('./app/libs/config');

module.exports = function (grunt) {
	// 配置任务
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},
		watch: {
			files: ['*.js', 'app/**/*.{js, html}'],
			tasks: ['eslint'/*, 'uglify'*/]
		},
		eslint: {
			files: ['*.js', 'app/**/*.js']
		},
		uglify: {
			options: {
			    // 此处定义的banner注释将插入到输出文件的顶部
			    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
			    	src: 'app/web/assets/**/*.js',
			    	dest: 'app/web/dist/'
			    }
			}
		},
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					ignore: ['*.md', 'node_modules/**', '.DS_Store'],
					ext: 'js',
					watch: ['**/**', '!app/web/**/*'],
					delayTime: 500,
					env: {
						PORT: config.port
					},
					cwd: __dirname
				}
			}
		}
	});

	// 加载任务包
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-nodemon');

	// 注册任务，default任务用grunt启动，其他任务用grunt taskName启动
	grunt.registerTask('default', ['concurrent']);
};