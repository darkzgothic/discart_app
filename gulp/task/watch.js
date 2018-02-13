var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){

	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	watch('./app/**/*.html', function(){
		browserSync.reload();
		console.log("Browser Reloaded");
		gulp.start('copyViews');

	});

	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
		gulp.start('copyStyles');
	});

	watch('./app/assets/scripts/**/*.js', function() {
		gulp.start('scriptsRefresh');
		gulp.start('copyAppScript');
		gulp.start('copyVendorScript');
		gulp.start('copyMapScript');
	});
});

gulp.task('copyViews', function(){
	console.log('Views Copied');
	return gulp.src('./app/**/*.html').pipe(gulp.dest('./views'));
});

gulp.task('copyStyles', function(){
	console.log('Styles Copied');
	return gulp.src('./app/temp/styles/styles.css').pipe(gulp.dest('./public/temp/styles'));
});

gulp.task('copyAppScript', function(){
	console.log('Scripts Copied');
	return gulp.src('./app/temp/scripts/App.js').pipe(gulp.dest('./public/temp/scripts'));
});

gulp.task('copyVendorScript', function(){
	console.log('Scripts Copied');
	return gulp.src('./app/temp/scripts/Vendor.js').pipe(gulp.dest('./public/temp/scripts'));
});

gulp.task('copyMapScript', function(){
	console.log('Scripts Copied');
	return gulp.src('./app/temp/scripts/Map.js').pipe(gulp.dest('./public/temp/scripts'));
});

gulp.task('cssInject', ['styles'], function(){
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
	browserSync.reload();
});