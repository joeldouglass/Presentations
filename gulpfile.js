var gulp = require('gulp'),
  browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {

  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3001,
	open: false
  });

  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("js-source/**/*.js", ['js-watch']);
  gulp.watch(["*.html", "dist/js/**/*.js"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("scss/**/*.scss")
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// process JS files and return the stream.
gulp.task('js', function() {
  return gulp.src('js-source/**/*.js')
    .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('default', ['serve']);
