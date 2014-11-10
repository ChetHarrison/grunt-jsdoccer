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
$ npm install grunt-jsdoccer
```

 

1) create stubbed YAML document templates

```
$ grunt jsDoccerYaml
```

The first time you run this command the tool will search for a `jsdoccer/syntaxMatchers.js` file at the root of your project directory. if it is not found it will copy the `setup` directory into a `jsdoccer` directory at the project root containing the default syntax matchers and templates. You can then custimize them to suit your style of code. **Note:** currently, if you delete the `syntaxMatchers.js` file it will generate a new `jsdoccer` folder with all the defaults and you will loose any custom augmentations you have made to your YAML templates. Once you have generated the stubbed YAML templates you will find them in the `jsdoccer/generated-files/yaml/stubbed` directory. You will need to move them to `jsdoccer/generated-files/yaml/documented` directory before you augment them so you don't accidenly over write them by running the task again. **If you forget to move them you will not be able to generate the documents!**

2) Generate document HTML

```
grunt jsDoccerHtml
```

Your documentes will be saved at `jsdoccer/documentation`.

### Configuration

add this to your `grunt.initConfig` in your `GRUNTFILE.js` (And yes currently it is ugly and I will clean it up when I get a chance.)

```
    'jsDoccerYaml': {
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

    'jsDoccerJson': {
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

and add this to your `GRUNTFILE.js`


```
grunt.loadNpmTasks('jsDoccerYaml');
grunt.loadNpmTasks('jsDoccerDoc');
```


### jsDoccer Documentation

For information on how to configure jsDoccer, add custom syntax matchers and documentation templates please visit this repo [jsDoccer](https://github.com/ChetHarrison/jsdoccer)