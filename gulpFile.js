var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('default', function() {
    gulp.watch('src/js/**/*.*',['scripts']);
    gulp.start('scripts');
});

gulp.task('scripts', function() {
    var browserified = transform(function(filename) {
        var b = browserify(filename, {
            debug: true
        });
        return b.bundle();
    });

    return gulp.src(['./src/js/app.js'])
        .pipe(plumber())
        .pipe(browserified)
        .pipe(gulp.dest('./public/'));
});