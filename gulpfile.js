var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var del = require("del");
var plumber = require('gulp-plumber'); // отлавливает ошибки в себя

// html
gulp.task('html', function() {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

// css
gulp.task('css', function() {
  return gulp.src('src/scss/style.scss')
<<<<<<< HEAD
    .pipe(plumber())
=======
>>>>>>> 7950e89eb92b27d5258923f8a473064562dad874
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

// img
gulp.task("img", function(){
  return gulp.src('src/img/*')
  .pipe(newer('build/img'))
  .pipe(gulp.dest('build/img'))
  .pipe(browserSync.stream());
});

gulp.task("imgmin", ["img"], function(){
  return gulp.src('src/img/*')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.stream());
});

//fonts
gulp.task("fonts", function(){
  return gulp.src('src/fonts/*')
  .pipe(newer('build/fonts'))
  .pipe(gulp.dest('build/fonts'))
  .pipe(browserSync.stream());
});

// server
gulp.task('serve', function() {
  browserSync.init({
    server: "build"
  });
  gulp.watch('src/scss/**/*.scss', ['css'])
  gulp.watch('src/pug/*.pug', ['html'])
  gulp.watch('src/img/*', ['imgmin'])
  gulp.watch('src/fonts/*', ['fonts'])
});

gulp.task("clean", function(){
  return del(["build/**/*.*"], {read: false});
});

// default
<<<<<<< HEAD
gulp.task('default', [ 'clean', 'html', 'css', 'img', 'imgmin', 'fonts', 'serve' ]);
=======
gulp.task('default', [ 'html', 'css', 'watch', 'server' ]);
>>>>>>> 7950e89eb92b27d5258923f8a473064562dad874
