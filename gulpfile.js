var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();

// css
gulp.task('css', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

// html
gulp.task('html', function() {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('build'))
});

// watch
gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', ['css'])
  gulp.watch('src/pug/*.pug', ['html'])
})

// server
gulp.task('server', function() {
  browserSync.init({
    server: "build"
  });
  browserSync.watch('build', browserSync.reload);
});

// default
gulp.task('default', [ 'html', 'css', 'watch', 'server' ]);