const gulp = require("gulp"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  browserSync = require("browser-sync").create(), // перезагрузка страницы после изменения файлов
  imagemin = require("gulp-imagemin"), // оптимизация изображений
  newer = require("gulp-newer"), // добавляет только новые файлы
  rename = require("gulp-rename"), // переименовывает файлы
  svgstore = require("gulp-svgstore"), // создает svg спрайт
  svgmin = require("gulp-svgmin"), // минифицирует svg
  del = require("del"), // удаляет файлы и папки
  plumber = require("gulp-plumber"), // отлавливает ошибки в себя
  run = require("run-sequence"), // для последовательного запуска задач
  autoprefixer = require("gulp-autoprefixer"); // добавляет автопрефиксеры


const path = {
  root: "build/",
  src: {
    pug: "src/pug/*.pug",
    scss: "src/scss/style.scss",
    js: "src/js/*.js",
    img: "src/img/*",
    spritesvg: "src/img/icons/*.svg",
    fonts: "src/fonts/**/*.{woff,woff2}"
  },
  build: {
    pug: "build/",
    scss: "build/css/",
    js: "build/js/",
    img: "build/img/",
    fonts: "build/fonts"
  },
  watch: {
    pug: "src/pug/*.pug",
    scss: "src/scss/**/*.scss",
    js: "src/js/*.js",
    img: ["!src/img/icons/*", "src/img/*"],
    spritesvg: "src/img/icons/*.svg",
    fonts: "src/fonts/*.{woff,woff2}"
  },
  clean: ["build/**/*.*"]
};


// html
gulp.task("html", function () {
  return gulp.src(path.src.pug)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(path.root))
    .pipe(browserSync.stream());
});


// css
gulp.task("css", function () {
  return gulp.src(path.src.scss)
    .pipe(plumber())
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ["last 2 versions"]
    }))
    .pipe(gulp.dest(path.build.scss))
    .pipe(browserSync.stream());
});


//js
gulp.task("js", function () {
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});


// img
gulp.task("img", function () {
  return gulp.src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
});

gulp.task("imgmin", ["img"], function () {
  return gulp.src("build/img/**/*{jpg,png}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true })
    ]))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
});


// svg-sprite
gulp.task("spritesvg", function () {
  return gulp.src(path.src.spritesvg)
    .pipe(svgmin())
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("spritesvg.svg"))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
});


// fonts
gulp.task("fonts", function () {
  return gulp.src(path.src.fonts)
    .pipe(newer(path.build.fonts))
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.stream());
});


// clean
gulp.task("clean", function () {
  return del(path.clean, { read: false });
});


// build
gulp.task("build", function (fn) {
  run("clean", "html", "css", "js", "imgmin", "spritesvg", "fonts", fn);
});


// server
gulp.task("serve", function () {
  browserSync.init({
    server: "build"
  });
  gulp.watch(path.watch.pug, ["html"]);
  gulp.watch(path.watch.scss, ["css"]);
  gulp.watch(path.watch.js, ["js"]);
  gulp.watch(path.watch.img, ["imgmin"]);
  gulp.watch(path.watch.spritesvg, ["spritesvg"]);
  gulp.watch(path.watch.fonts, ["fonts"]);
});


// default
gulp.task("default", function (fn) {
  run("build", "serve", fn);
});



