'use strict';

var yamlTaskName	= 'jsDoccerYaml',
	jsonTaskName 	= 'jsDoccerJson',
	htmlTaskName 	= 'jsDoccerHtml',
	
	jsDoccer 		= require('../src/jsdoccer.js');

module.exports = function (grunt) {
	grunt.registerMultiTask(yamlTaskName, 'Generate a stubbed YAML doc template.', function () {
		jsDoccer.init({
			config: grunt.config.get(yamlTaskName).doc.options
		});
		jsDoccer.generateStubbedDocYamlFiles(this.filesSrc);
		grunt.log.ok(this.filesSrc.length + ' ' + grunt.util.pluralize(this.filesSrc.length, 'file/files') + ' documented.');
	});
	
	
	grunt.registerMultiTask(jsonTaskName, 'Compile jsdoc YAML files to json', function () {
		jsDoccer.init({
			config: grunt.config.get(jsonTaskName).doc.options
		});
		grunt.log.ok(jsDoccer.prepareYaml() + ' ' + grunt.util.pluralize(this.filesSrc.length, 'file/files') + ' documented.');
	});
	
	
	grunt.registerMultiTask(htmlTaskName, 'Compile jsdoc JSON files to HTML documentation', function () {
		jsDoccer.init({
			config: grunt.config.get(htmlTaskName).doc.options
		});
		grunt.log.ok(jsDoccer.generateDoc() + ' ' + grunt.util.pluralize(this.filesSrc.length, 'file/files') + ' documented.');
	});
	
	
	grunt.registerMultiTask('jsDoccerDoc', 'Compile jsdoc YAML files to HTML documentation', function () {
		grunt.task.run([jsonTaskName, htmlTaskName]);	
	});
};


