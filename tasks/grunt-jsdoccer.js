'use strict';

var jsDoccer = require('jsdoccer');

module.exports = function (grunt) {
	grunt.registerMultiTask('jsdoccer', 'Auto doccument and lint JS.', function () {
		var target, data, options;
		
		this.requiresConfig(this.name + '.options.filesToFilter');
		target = this.target;
		data = this.data;
		options = this.options;
			
		jsDoccer.init({ config: options });
		
		switch (target) {
			// Generate stubbed yaml document templates from your js source.
			case 'yaml':
				this.requiresConfig(this.name + '.' + this.target + '.src');
				grunt.log.ok(jsDoccer.generateStubbedDocYamlFiles(this.filesSrc) + ' ' + grunt.util.pluralize(this.filesSrc.length, 'file/files') + ' documented.');
			    break;
			// Intermdiate step that generates json from your documented yaml.
			// Exists for convenience.
			case 'json':
				var fileCount = jsDoccer.prepareYaml();
				if (fileCount > 0) {
					grunt.log.ok(fileCount + ' ' + grunt.util.pluralize(this.filesSrc.length, 'file/files') + ' documented.');
				}
				else {
					grunt.log.warn('No files were found in "jsdoccer/generated-files/yaml/documented".');
					grunt.log.warn('Did you remember to copy the generated yaml from "jsdoccer/generated-files/yaml/stubbed"?');
				}
				break;
			// Generates the html documentaion from the json.
			case 'html':
				grunt.log.ok(jsDoccer.generateDoc() + ' ' + grunt.util.pluralize(this.filesSrc.length, 'file/files') + ' documented.');
				break;
			// Combines chains the last 2 steps.
			case 'doc':
				grunt.task.run(['jsdoccer:json', 'jsdoccer:html']);
				break;
			// Lints existing documentation (Not implimented at the moment).
			case 'lint':
				grunt.log.warn('The lint target has not been implemented yet.');
			    break;
		}	
	});
};