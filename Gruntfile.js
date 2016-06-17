'use strict';

var config = require('./app/libs/config');

module.exports = function (grunt) {
	// 配置任务
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		eslint: {
			files: ['./*.js', 'app/controllers/*.js', 'app/libs/*.js', 'app/routes/*.js', 'app/web/js/src/*.js']
		},
		webpack: {
			build: {
				entry: './app/web/js/src/index.js',
				output: {
					path: './app/web/js/dist',
					filename: 'bundle.js'
				}
			}
		},
		uglify: {
			options: {
			    // 此处定义的banner注释将插入到输出文件的顶部
			    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
			    	'app/web/js/dist/bundle.min.js': 'app/web/js/dist/bundle.js'
			    }
			}
		},
		compass: {
			dist: {
				options: {
			     	sassDir: 'app/web/css/base/',
			     	cssDir: 'app/web/css/',
			        outputStyle: 'expanded',	//生产环境改为compact或compressed
			        noLineComments: true
			    }
			}
		},
		watch: {
			front: {
				files: ['app/web/js/src/*.js'],
				tasks: ['eslint', 'webpack', 'uglify']
			},
			back: {
				files: ['*.js', 'app/controllers/*.js', 'app/libs/*.js', 'app/routes/*.js'],
				tasks: ['eslint']
			},
			compass: {
				files: ['app/web/css/base/*.scss'],
				tasks: ['compass:dist']
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
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch:front', 'watch:back', 'watch:compass'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	// 加载任务包
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// 注册任务，default任务用grunt启动，其他任务用grunt taskName启动
	grunt.registerTask('default', ['concurrent']);
};