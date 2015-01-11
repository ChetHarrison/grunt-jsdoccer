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
			// if null the project name will be pulled from the root dir name
			projectName: null,

			stub: {
				// glob paths to the js you want to document
				src: ['js/*.js']
			},

			doc: {
				// Glob paths to your documented yaml.
				src: ['./doccer/intermediate/yaml-documented/*.yaml']
			},

			options: {
				projectName: null,
				
				// All generated intermediate files will be placed under this path.
				dest: './doccer/',
				
				// Syntax targets
				targets: {
					default: {
						name: true,
						'class': true,
						'constructor': true,
						events: true,
						properties: true,
						functions: true
					},
					custom: {
						// Add custom targets here. Example:
						// customTarget1: true,
						// customTarget2: true
					},
					customTargetsPath: './customSyntaxTargets/'
				}
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-jasmine-node');

	grunt.registerTask('default', 'Run test suite.', ['jasmine_node']);
	grunt.registerTask('stub', 'Auto generate YAML JSDoc 3 document stubs.', ['jsdoccer:stub']);
	grunt.registerTask('doc', 'Generate documentation HTML from documented YAML.', ['jsdoccer:doc']);
	grunt.registerTask('lint', 'lint your docs.', ['jsdoccer:lint']);
};
