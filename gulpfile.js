const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");

// SCSS → 圧縮済み style.css に変換（.mapなし）
function styles() {
  return gulp
    .src("./scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS()) // ← 圧縮
    .pipe(gulp.dest("./public/assets/css"));
}

// 監視タスク
function watchFiles() {
  gulp.watch("./scss/**/*.scss", styles);
}

// タスク登録
exports.default = gulp.series(styles);
exports.watch = gulp.series(styles, watchFiles);
