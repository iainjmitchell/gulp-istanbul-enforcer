gulp-istanbul-enforcer
======================
[![Build Status](https://travis-ci.org/iainjmitchell/gulp-istanbul-enforcer.png)](https://travis-ci.org/iainjmitchell/gulp-istanbul-enforcer)

Plugin for [gulp](https://github.com/wearefractal/gulp) that enforces coverage thresholds from [Istanbul](http://gotwarlost.github.io/istanbul/).

Based on [grunt-istanbul-coverage](https://github.com/daniellmb/grunt-istanbul-coverage), which enforces istanbul coverage in grunt.

Installation
---------------

```shell
npm install --save-dev gulp-istanbul-enforcer
```

Example
---------------

Then, add it to your `gulpfile.js`:

```javascript
var coverageEnforcer = require("gulp-istanbul-enforcer");

gulp.task('enforce-coverage', function () {
  var options = {
        thresholds : {
          statements : 100,
          branches : 100,
          lines : 100,
          functions : 100
        },
        coverageDirectory : 'coverage',
        rootDirectory : ''
      };
  return gulp
    .src('.')
    .pipe(coverageEnforcer(options));
});
```

Options
---------------

###thresholds
Set the required percentage levels for each of the coverage measurements (statements, branches, lines, functions).

###coverageDirectory
The directory that istanbul has outputted the coverage results to.

###rootDirectory
The root directory of the project, in most cases this can be set to blank.
