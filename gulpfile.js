var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {

  nodemon({
    script: 'server/app.js',
    ignore: [
      'node_modules',
      'package.json',
      'gulpfile.js',
    ],
  });

});
