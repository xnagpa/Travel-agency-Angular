var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
gulp.task('browser-sync', function(){
	browserSync.init({
    server:{
      baseDir: "./src",
      middleware: [historyApiFallback()]
    }
  });
});