'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jasmine_node: {
			coverage: {},
			options: {
				forceExit: true,
				match: '.',
				matchall: false,
				extensions: 'js',
				specNameMatcher: 'spec',
				jUnit: {
					report: true,
					savePath: './build/reports/jasmine/',
					useDotNotation: true,
					consolidate: true
				}
			},
			all: ['tests/specs/']
		},
		
		jsdoccer: {
			options: {
				filesToFilter: [
					'.DS_Store'
				]
			},
			yaml: {
				src: ['js/*.js']
			},
			json: {},
			html: {},
			doc: {},
			lint: {}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-jasmine-node');
	
	grunt.registerTask('default', 'Run test suite.', ['jasmine_node']);
};
