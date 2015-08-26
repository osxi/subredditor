'use strict';

import config from './config';
import del from 'del';
import fs from 'fs';
import gulp from 'gulp';
import _ from 'lodash';
import minifyCss from 'gulp-minify-css';
import request from 'request';
import RSVP from 'rsvp';
import sass from 'gulp-sass';
import server from 'gulp-server-livereload';
import yargs from 'yargs';

gulp.task('default', ['server']);

gulp.task('sass', () => {
  return gulp.src(config.paths.sassGlob)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({
      compatibility: config.css.minifyCompatability
    }))
    .pipe(gulp.dest(config.paths.distDir));
});

gulp.task('sass:watch', () => {
  return gulp.watch(config.paths.sassGlob, ['sass']);
});

gulp.task('server', ['sass'], () => {
  gulp.watch(config.paths.sassGlob, ['sass']);

  return gulp.src([config.paths.srcGlob, config.paths.distDir])
    .pipe(server({
      defaultFile: config.defaultFile,
      livereload: true,
      open: false
    }));
});

gulp.task('download', () => {
  return clean()
    .then(downloadCss.bind(this, paths));
});

function clean() {
  return new RSVP.Promise((resolve, reject) => {
    del(config.cleanPaths , (err, paths) => {
      if (err) {reject(err)}
      resolve(paths);
    });
  });
};

function downloadCss(pathsCleaned) {
  var url = yargs.argv.subreddit;

  console.log('Deleted files/folders:\n', _.values(pathsCleaned).join(', '));

  if (url === undefined) {
    console.log('please specify --subreddit, e.g. --subreddit=node');
    process.exit(1);
  }

  url = `http://reddit.com/r/${url}/stylesheet.css`;

  return request(url)
    .pipe(fs.createWriteStream(config.css.downloadToFile));
}
