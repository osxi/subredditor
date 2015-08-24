'use strict';

var argv = require('yargs').argv;
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var request = require('request');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');

var defaultFile = 'subreddit.html';

var paths = {
  distDir: './dist',
  srcGlob: './src/**',
  sassGlob: './src/**/*.scss'
};

gulp.task('default', ['server']);

gulp.task('sass', function() {
  gulp.src(paths.sassGlob)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.distDir));
});

gulp.task('sass:watch', function() {
  gulp.watch(paths.sassGlob, ['sass']);
});

gulp.task('server', ['sass'], function() {
  gulp.watch(paths.sassGlob, ['sass']);

  gulp.src([paths.srcGlob, paths.distDir])
    .pipe(server({
      defaultFile: defaultFile,
      livereload: true,
      open: true
    }));
});

gulp.task('clean', function() {
  del(['src/custom.scss', './dist/**'] , function(err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

gulp.task('download', ['clean'], function() {
  var url = argv.subreddit;

  if (url === undefined) {
    console.log('please specify --subreddit, e.g. --subreddit=node');
    process.exit(1);
  }

  url = 'http://reddit.com/r/' + url + '/stylesheet.css';

  return request(url)
    .pipe(fs.createWriteStream('./src/custom.scss'));
});
