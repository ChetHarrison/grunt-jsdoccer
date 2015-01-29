### This is a work in progress.
#### Goals:
- [x] generate stubbed YAML documentation templates
- [x] build document webpages from JSDoc
- [ ] lint existing documents

A collaboration with [@jasonLaster](https://github.com/jasonLaster)

# Grunt-jsDoccer

A collection of Grunt tasks to auto document your ECMAScript (Java Script) in  [JSDoc 3](https://github.com/jsdoc3/jsdoc3.github.com) using [Esprima](http://esprima.org/) and [ESCodeGen](https://github.com/Constellation/escodegen) as well as lint those docs. It converts your code into YAML templates that (will be) converted to JSDocs. The YAML stage allows you to fill in stubbed examples and other details that cannot be generated from the provided Esprima code meta data. If Grunt isn't your thing you can get a pure Node.js version [here](https://github.com/ChetHarrison/jsdoccer).

### Basic Usage

Setup

```
$ npm install grunt-jsdoccer --save-dev
```


1) create stubbed YAML document templates

```
$ grunt jsdoccer:stub
```

As your sorce is parsed the tool will generate a sequence of intermediate files and save them to the path listed in the `options.dest` directory of your configuration. These files are usefull for debugging and looking for syntax target signatures in their ASTs. This first phase will ultimately generate YAML documentation stubs. You will need to move them to the `stub.doc` directory listed in your configuration before you augment them so you don't accidentally over write them by running the task again. **If you forget to move them you will not be able to generate the documents!**

2) Generate document HTML

```
grunt jsdoccer:doc
```

Your documents will be saved at `jsdoccer/documentation`.

### Configuration

add this to your `grunt.initConfig` in your `GRUNTFILE.js`.

```
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
            'class': true,  // with resurve words use quotes
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
```

**js/src**: List the JS source files you would like to document.

**documentedYaml/src**: location of your documented YAML.

**html**: no configuration is currently required but we need a target.

**dest**: your documents and all intermediate files will be placed here.

**targets/default**: jsdoccer comes with 6 default syntax targets. You can 
set them to false to disable them. __Curently the tool is wired to document
class style code. The hooks are in place to configure to any custom style
you would like however in need to make another small adjustment to make
the documentation templates extensible.__


and add this to your `GRUNTFILE.js`


```
grunt.loadNpmTasks('jsdoccer');

grunt.registerTask('stub', 'Auto generate YAML JSDoc 3 document stubs.', ['jsdoccer:stub']);
grunt.registerTask('doc', 'Generate documentation HTML from documented YAML.', ['jsdoccer:doc']);
grunt.registerTask('lint', 'lint your docs.', ['jsdoccer:lint']);
```


### jsDoccer Documentation

For information on how to configure jsDoccer, add custom syntax matchers and documentation templates please visit this repo [jsDoccer](https://github.com/ChetHarrison/jsdoccer)