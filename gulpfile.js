/**
 * gulpfile.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

const gulp = require('gulp')
    , babel = require('gulp-babel')

gulp.task('default', () =>
  gulp.src([ 'src/**/*.js' ])
      .pipe(babel())
      .pipe(gulp.dest('lib'))
)