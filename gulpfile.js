var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	jshint = require('gulp-jshint'),
	git = require('gulp-git');

gulp.task('mocha', function () {
	var mochaRun = mocha({
			reporter: 'nyan',
			ui: 'bdd'
		});

	return gulp
		.src('test/**/*.js')
		.pipe(mochaRun);
});

gulp.task('jshint', function(){
	return gulp
		.src(['lib/**/*.js', 'test/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['jshint', 'mocha']);

gulp.task('push', ['test'], function(){
	var commitMessage = gulp.env.message || 'no commit message';
	console.log('Tests passed! Pushing code...');
	return gulp
		.src('./.')
		.pipe(git.add())
		.pipe(git.commit(commitMessage))
		.pipe(git.push());
});

gulp.task('default', function(){
	gulp.run('push');
});