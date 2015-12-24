/* Gulp Plugins */

var gulp 		= require('gulp'),
	concat 		= require('gulp-concat'),
	rename 		= require('gulp-rename'),
	uglify 		= require('gulp-uglify'),
	minifyCss   = require('gulp-minify-css'),
	app 		= express(),
	port 		= 3000;




/* ***************** */

/* Define Gulp Tasks */

/* ***************** */



//Javascript scripts

gulp.task('scripts', function(){

	return gulp.src([

				'src/js/app/application.js',
				'src/js/app/run.js',
				'src/js/app/routes.js',
				'src/js/app/**/*.js'
			 ])
			.pipe(concat('app.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('build/js'));
});


//CSS sheets

gulp.task('styles', function(){

	return gulp.src('src/css/*.css')
			.pipe(concat('styles.min.css'))
			.pipe(minifyCss())
			.pipe(gulp.dest('build/css'));

});



/* ***************** */

/* Define Watch Tasks */

/* ***************** */

//Javascript files
gulp.task('watchScripts', function(){

	return gulp.watch('src/js/app/**/*.js', ['scripts']);

})


//CSS files
gulp.task('watchStyles', function(){
	
	return gulp.watch('styles/*.css', ['styles']);

});




//RUN IN SEQUENCE
gulp.task('default', ['watchScripts', 'watchStyles']);


