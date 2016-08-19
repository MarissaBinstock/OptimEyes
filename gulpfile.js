var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');

var plumberErrorHandler = {
   errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
   })
};

gulp.task('sass', function() {
   gulp.src('./sass/**/*.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(uglify()) 
      // .pipe(rename({extname:".min.css"}))
      .pipe(gulp.dest('./build/t/'))
      console.log("worked")
});


gulp.task('scripts', function(){
    gulp.src('./js/**/*.js')
    .pipe(uglify()) 
    .pipe(rename({extname:".min.js"}))
    .pipe(gulp.dest('./build/js'))

});

gulp.task('browser-sync', function() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });

   gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
   gulp.watch('sass/*.scss', ['sass']);
   gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['watch', 'browser-sync']);
