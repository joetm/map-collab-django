var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    //batch = require('gulp-batch'),
    //sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    //less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    //clean = require('gulp-clean'), //deprecated in favor of del
    //del = require('del'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    //plumber = require('gulp-plumber'),
    cssprefix = require('gulp-css-prefix'),
    jslint = require('gulp-jslint-simple'),
    //jshint = require('gulp-jshint');
    //jslint = require('gulp-jslint');
    coveralls = require('gulp-coveralls');


gulp.task('jslint', function () {
    gulp.src([
        'js/*.js',          //include
        '!js/**/*.min.js',  //exclude
        '!node_modules/**/*.js' //exclude
    ])
    //.pipe(plumber())
    .pipe(jslint.run({
        nomen: true,
        vars: true,
        unparam: true,
        errorsOnly: false
    }))
    .pipe(jslint.report({
        reporter: require('jshint-stylish').reporter
    }));
});


gulp.task('coveralls', function() {
    gulp.src('./test/coverage/**/lcov.info')
      .pipe(coveralls());
});


//uglify
gulp.task('compressjs', function() {
    gulp.src(
        [
            'js/*.js',
            '!js/*.min.js'
        ]
    )
    //.pipe(plumber())
    .pipe(uglify())
    //.pipe(rename({
    //    extname: '.min.js'
    //}))
    .pipe(gulp.dest('js/min'));
});

//concatjs
/*
gulp.task('concatjs', function() {
    return gulp.src([
        'frontend/js/jquery/jquery-2.1.4.min.js',
        'frontend/js/jquery-ui-1.11.4.custom/jquery-ui.min.js',
        'frontend/js/underscore/underscore-min.js',
        'frontend/js/backbone/backbone-min.js',
        'frontend/js/knockout/knockout-3.3.0.js',
        'frontend/js/mustache/mustache.min.js',
        'frontend/js/app.min.js'
    ])
    //.pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('frontend/js'));
});
*/

//css
/*
gulp.task('scss', function () {
  gulp.src('frontend/css/*.scss')
    //.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('frontend/css'));
});
*/

//concatcss
/*
gulp.task('concatcss', function() {
  return gulp.src([
        'frontend/css/style.css',
        'frontend/css/semantic-ui/semantic.min.css'
    ])
    .pipe(concat('style-all.css'))
    .pipe(gulp.dest('frontend/css/'));
});
*/

/**********tasks***********/

//gulp.task('css', ['scss', 'concatcss']);
gulp.task('js', ['compressjs']); //'concatjs'

//gulp.task('build', ['css', 'js']);
gulp.task('build', ['js']);

//watch
gulp.task('watch', ['js'], function () {
    //css
    //gulp.watch([
    //    "./css/**/*.css",
    //    "./css/**/*.scss",
    //    "./css/**/*.less"
    //], ['css']);
    //js
    gulp.watch(["./js/*.js"], ['js', 'jslint']);
    //coveralls code coverage reporting
    //gulp.watch(["./test/coverage/**/lcov.info"], ['coveralls']);
});//gulp.task('watch'
