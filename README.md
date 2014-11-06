### This is a work in progress.
#### Goals:
- [x] generate stubbed YAML documentation templates
- [x] build document webpages from JSDoc
- [ ] lint existing documents

A collaboration with [@jasonLaster](https://github.com/jasonLaster)

# Grunt-jsDoccer

**Note** this repo is morphing into a collection of Grunt tasks to auto document your ECMAScript (Java Script) in  [JSDoc 3](https://github.com/jsdoc3/jsdoc3.github.com) using [Esprima](http://esprima.org/) and [ESCodeGen](https://github.com/Constellation/escodegen) as well as lint those docs. It converts your code into YAML templates that (will be) converted to JSDocs. The YAML stage allows you to fill in stubbed examples and other details that cannot be generated from the provided Esprima code meta data.

### Basic Usage

Setup

```
$ npm install grunt-jsdoccer
```

 

1) create stubbed YAML document templates

```
$ grunt jsDoccerYaml
```

**Note:** once you have generated the stubbed YAML templates you will find them in the `yaml/stubbed-dest` directory. You will need to move them to `yaml/doccumented-src` directory before you augment them so you don't accidenly over write them by running the task again.

### Configuration

add this to your `grunt.initConfig` in your `GRUNTFILE.js` (And yes currently it is ugly and I will clean it up when I get a chance.)

```
    'jsDoccer:yaml': {
      doc: {
        options: {
          filesToFilter: [
            '.DS_Store'
          ]
        },
        files: [{
          expand: true,
          src: 'js/*.js',
        }]
      }
    },

    'jsDoccer:json': {
      doc: {
        options: {
          filesToFilter: [
            '.DS_Store'
          ]
        },
      }
    },

    'jsDoccerHtml': {
      doc: {
        options: {
          filesToFilter: [
            '.DS_Store'
          ]
        },
      }
    },
    
    'jsDoccerDoc': {
      doc: {
        options: {
          filesToFilter: [
            '.DS_Store'
          ]
        },
      }
    }
```
**fileFilters**: Files listed here will be ignored by the parser.

**files.src**: Files to document.


2) Generate document HTML

```
grunt jsDoccerHtml'
```

add this to your `grunt.initConfig` in your `GRUNTFILE.js`

```
    'jsDoccer:html': {
      doc: {
        options: {
          handelbarsTemplate: './templates/jsdoc/class.hbs'
        },
        src: 'doc-json/*.json',
        dest: 'jsdoc'
      }
    }
```


2) lint existing documents **(this is not working right now)**

```
$ grunt jsDoccerLint
```


### jsDoccer Documentation

For information on how to configure jsDoccer, add custom syntax matchers and documentation templates please visit this repo [jsDoccer](https://github.com/ChetHarrison/jsdoccer)