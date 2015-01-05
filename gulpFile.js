var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var neat = require('node-neat');

gulp.task('default', function() {
    gulp.watch('src/js/**/*.*',['scripts']);
    gulp.watch('src/sass/**/*.scss',['sass']);

    gulp.start('scripts');
    gulp.start('sass');
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
        .pipe(browserified);
});

gulp.task('scripts', function() {
    gulp.src('src/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(gulp.dest('./public/'))
});

gulp.task('sass', function () {
    gulp.src('src/sass/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-neat').includePaths

        }))
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/'));
});