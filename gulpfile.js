const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Compile SASS
gulp.task('sass', function() {
  return gulp.src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// Add prefixes and minify CSS
gulp.task('css', function() {
  return gulp.src('css/main.css')
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// Watch files for changes
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('sass/**/*.scss', gulp.series('sass', 'css'));
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('sass', 'css', 'serve'));
gulp.task('build-css', gulp.series('sass', 'css'));
