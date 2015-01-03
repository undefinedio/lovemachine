var gulp = require('gulp');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');

gulp.task('default', function() {
    gulp.watch('src/js/**/*.js',['scripts']);
});

// Basic usage
gulp.task('scripts', function() {
    gulp.src('src/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(gulp.dest('./public/'))
});