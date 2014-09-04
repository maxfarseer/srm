'use strict';

var gulp = require('gulp'),
    //watch = require('gulp-watch'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    connect = require('gulp-connect'),
    jasmine = require('gulp-jasmine');

var outputDir = 'builds/development',
    env = process.env.NODE_ENV || 'development';

gulp.task('jade', function() {
  return gulp.src('src/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task('jadeAngularTmpl', function() {
  return gulp.src('src/js/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(outputDir+'/js/views/'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  var config = {};

  if (env === 'production') {
    config.outputStyle = 'compressed';
  }

  if (env === 'development') {
      config.onError = function(e) { console.log(e); };
      config.sourceMap = 'sass';
      //config.sourceComments = 'map';
  }

  return gulp.src('src/sass/main.scss')
    .pipe(sass(config))
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(connect.reload());
});

gulp.task('copyToBuild', function() {
  return gulp.src('src/vendor/css/bootstrap.min.css')
    .pipe(gulp.dest(outputDir + '/css'));
});

gulp.task('js', function() {

  function browserifyShare(){

    var b = new browserify({
      entries: './src/js/main.js',
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    });

    b = watchify(b);
    b.on('update', function(){
      bundleShare(b);
    });

    //b.add('./src/js/main.js');

    if (env === 'production') {
      b.plugin('minifyify', {
        map: '/bundle.js.map',
        minify: true,
        output: outputDir+'/bundle.js.map'
      });
    }

    bundleShare(b);
  }

  function bundleShare(b) {
    b.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(outputDir + '/js'))
      .pipe(connect.reload());
  }

  return browserifyShare();
});

gulp.task('lint', function() {
    var files = ['./src/js/**/*.js'];
    files.push('./gulpfile.js');
    return gulp.src(files)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

// Test JS
gulp.task('jasmine', function () {
  return gulp.src('tests/*.js')
      .pipe(jasmine());
});

gulp.task('watch', ['js'], function() {
  gulp.watch('src/templates/**/*.jade', ['jade']);
  gulp.watch('src/js/views/**/*.jade', ['jadeAngularTmpl']);
  gulp.watch('builds/development/js/bundle.js', ['lint']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  //gulp.watch(['src/js/**/*.js','tests/*.js'], ['jasmine']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    port: 8001,
    livereload: true
  });
});

gulp.task('build', ['jade', 'jadeAngularTmpl', 'js', 'lint', 'jasmine', 'sass', 'watch',  'connect', 'copyToBuild']);
gulp.task('default', ['jade', 'jadeAngularTmpl', 'sass', 'watch',  'connect']);
