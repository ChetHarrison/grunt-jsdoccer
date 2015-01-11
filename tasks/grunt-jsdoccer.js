'use strict';

var jsDoccer = require('jsdoccer');

module.exports = function (grunt) {
	grunt.registerMultiTask('jsdoccer', 'jsdoccer:stub Auto generate YAML JSDoc 3 templates, jsdoccer:doc generate HTML documentation, and jsdoccer:lint lint JS.', function () {
		var count;
		
		jsDoccer.init(this.options());
		
		switch (this.target) {
			// Generate stubbed yaml document templates from your js source.
			case 'stub':
				// this.requiresConfig(this.options.js.src);
				count = jsDoccer.stub(this.filesSrc);
				grunt.log.ok(count + ' ' + grunt.util.pluralize(count, 'file/files') + ' stubbed.');
			    break;

			// Generates the html documentaion from the json.
			case 'doc':
				// this.requiresConfig('documentedYaml.src');
				count = jsDoccer.doc(this.filesSrc);
				grunt.log.ok(count + ' ' + grunt.util.pluralize(count, 'file/files') + ' documented.');				break;

			// Lints existing documentation (Not implimented at the moment).
			case 'lint':
				grunt.log.warn('The lint target has not been implemented yet.');
			    break;
		}	
	});
};