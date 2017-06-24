const gulp = require('gulp');
const plumber = require('gulp-plumber');
const htmlhint = require('gulp-htmlhint');
const del = require('del');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const webpackConfig = require('./webpack.config.js');

gulp.task('build', ['ts_build', 'sass_build', 'html_copy']);

gulp.task('ts_build', () => {
  return plumber({
      errorHandler: (e) => {
        console.error(e.message)
      }
    })
    .pipe(webpackStream(webpackConfig.ts, webpack))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

gulp.task('sass_build', () => {
  return plumber({
      errorHandler: (e) => {
        console.error(e.message)
      }
    })
    .pipe(webpackStream(webpackConfig.sass, webpack))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

gulp.task('html_copy', () => {
  return gulp.src('./src/html/**/*.html')
    .pipe(plumber({
      errorHandler: (e) => {
        console.error(e.message)
      }
    }))
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch('./src/ts/**/*.ts', ['ts_build']);
  gulp.watch('./src/sass/**/*.scss', ['sass_build']);
  gulp.watch('./src/html/**/*.html', ['html_copy']);
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
});

gulp.task('clean', () => {
  return del('./build/*');
})