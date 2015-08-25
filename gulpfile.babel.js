'use strict';

import argv from 'yargs';
import del from 'del';
import fs from 'fs';
import gulp from 'gulp';
import minifyCss from 'gulp-minify-css';
import request from 'request';
import sass from 'gulp-sass';
import server from 'gulp-server-livereload';

var defaultFile = 'subreddit.html';

var paths = {
  distDir: './dist',
  srcGlob: './src/**',
  sassGlob: './src/**/*.scss'
};

gulp.task('default', ['server']);

gulp.task('sass', () => {
  gulp.src(paths.sassGlob)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.distDir));
});

gulp.task('sass:watch', () => {
  gulp.watch(paths.sassGlob, ['sass']);
});

gulp.task('server', ['sass'], () => {
  gulp.watch(paths.sassGlob, ['sass']);

  gulp.src([paths.srcGlob, paths.distDir])
    .pipe(server({
      defaultFile: defaultFile,
      livereload: true,
      open: true
    }));
});

gulp.task('clean', () => {
  del(['src/custom.scss', './dist/**'] , (err, paths) => {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

gulp.task('download', ['clean'], () => {
  var url = argv.subreddit;

  if (url === undefined) {
    console.log('please specify --subreddit, e.g. --subreddit=node');
    process.exit(1);
  }

  url = `http://reddit.com/r/${url}/stylesheet.css`;

  return request(url)
    .pipe(fs.createWriteStream('./src/custom.scss'));
});
