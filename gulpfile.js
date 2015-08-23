'use strict';

var gulp = require('gulp');
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
