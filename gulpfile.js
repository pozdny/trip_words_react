/**
 * Created by user on 24.03.16.
 */


var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var plumber = require("gulp-plumber");
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var babel = require("gulp-babel");
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
/*
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var clean = require('gulp-clean');

var postcss = require('gulp-postcss');
*/
var globalConfig = {
    prodDir: "dist",
    baseDir: "app"

};
var config = {
    pathDevSCSS: globalConfig.baseDir + "/scss/**/*.scss",
    pathDevCSS: globalConfig.baseDir + "/css",
    pathDevJS: globalConfig.baseDir + "/js",
    pathDevWorkJS: globalConfig.baseDir + "/js/dir",
    pathProdCSS: globalConfig.prodDir + "/css",
    pathProdJS: globalConfig.prodDir + "/js"
};

gulp.task('useref', function(){
    return gulp.src(globalConfig.baseDir + '/*.html')
        .pipe(plumber({
            errorHandler: onError
         }))
        .pipe(useref())
        .pipe(gulp.dest(globalConfig.prodDir))
});

gulp.task('minify', ['useref'], function() {
    // Минифицируем только CSS файлы
    gulp.src(config.pathProdCSS + '/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.pathProdCSS));
    // Минифицируем только js файлы
    gulp.src(config.pathProdJS + '/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.pathProdJS));
});

gulp.task('babel', function() {
    return gulp.src(config.pathDevJS + '/*.js')
        .pipe(babel())
        .pipe(gulp.dest(config.pathDevWorkJS))
});

gulp.task('prejs', ['babel'],  function () {
    return gulp.src(config.pathDevWorkJS + '/*.js')
        .pipe(jshint({
            "lookup": true
        }))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(config.pathDevWorkJS))


});

// --------------------------------------------------------------------
// Task: Clean app/js
// --------------------------------------------------------------------
/*gulp.task('clean-tmp', function (cb) {
    del(['app/js/tmp/'], cb);
});
*/
// синхронизация окна браузера и изменения файлов
//gulp.task('watch', ['browserSync', 'sass'], function(){
//    gulp.watch('app/scss/**/*.scss', ['sass']);
//    // Обновляем браузер при любых изменениях в HTML CSS или JS
//    gulp.watch('app/css/*.css', ['css']);
//    gulp.watch('app/js/*.js', ['prejs']);
//    gulp.watch('app/content/*.json', browserSync.reload);
//    gulp.watch('app/*.html', browserSync.reload);
//
//});
gulp.task('watch', ['browserSync', 'sass', 'prejs'], function(){
    gulp.watch(config.pathDevSCSS, ['sass']);
    gulp.watch(globalConfig.baseDir + '/*.html', browserSync.reload);
    gulp.watch(config.pathDevWorkJS + '/*.js', browserSync.reload);
    gulp.watch(config.pathDevJS + '/*.js', ['prejs']);
});
/*
gulp.task('css', function () {
    var cssnext = require('postcss-cssnext');
    var precss = require('precss');
    var processors = [cssnext, precss];
    return gulp.src('app/css/!*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
}); */

gulp.task('sass', function() {
    return gulp.src(config.pathDevSCSS)
        .pipe(sass())
        .pipe(gulp.dest(config.pathDevCSS))
        .pipe(browserSync.reload({
            stream: true
        }))
});


// синхронизация окна браузера и изменения файлов
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: globalConfig.baseDir
        }
    })
});
/*
gulp.task('images', function(){
    return gulp.src('app/images/!**!/!*.+(png|jpg|jpeg|gif|svg)')
        // кэширование изображений, прошедших через imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});
gulp.task('fonts', function() {
    return gulp.src('app/fonts/!**!/!*')
        .pipe(gulp.dest('dist/fonts'))
});
gulp.task('clean:dist', function(callback){
    del(['dist/!**!/!*', '!dist/images', '!dist/images/!**!/!*'], callback)
});
gulp.task('clean:lib', function(callback){
    del(['app/css/lib/!**!/!*'], callback);
    del(['app/js/lib/!**!/!*'], callback);
});
gulp.task('clean', function(callback) {
    del('dist');
    return cache.clearAll(callback);
});
gulp.task('copyjs', function(){
    gulp.src('libraries/framework7/dist/js/framework7.min.js')
        .pipe(gulp.dest('app/js/lib/', {}));
});
gulp.task('copycss', function(){
    gulp.src('libraries/framework7/dist/css/framework7.ios.colors.min.css')
        .pipe(gulp.dest('app/css/lib/', {}));
    gulp.src('libraries/framework7/dist/css/framework7.ios.min.css')
        .pipe(gulp.dest('app/css/lib/', {}));
});
// полная очистка продакшена
gulp.task('clean', function(callback) {
    del('dist');
    return cache.clearAll(callback);
});
// update библиотек фреймворка
gulp.task('update', function () {
    runSequence(['clean:lib', 'copyjs', 'copycss'], function(){ console.log('update libraries'); } )
});
// build готового проекта
gulp.task('build', function (cb){
    runSequence(['clean:dist', 'sass', 'useref', 'minify', 'images', 'fonts'],
        function(){ }
    );
});*/
// запуст рабочего проекта
gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
        function(){ console.log('default'); }
    )
});

// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------

var onError = function (err) {
    console.log(err);
    this.emit('end');
};
