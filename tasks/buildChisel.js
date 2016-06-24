// Preprocesses JS for development and production
'use strict'
module.exports = function(gulp, config, plugins){


	// Distribution files
	var info
	gulp.task('chiselscriptmin', function(){

		return gulp.src(config.src + '/' + config.script + '/**/*.js')
			.pipe(concat('chisel.js'))
			.pipe(wrapJs("/*! " + info.title + " v" + info.version + " | " + info.license + " License | " + info.author.url + " */\n!function(w,d,u){'use strict';w.c={};%= body %}(window,document)"))
			.pipe(uglify({preserveComments:'some'}))
			.pipe(rename('chisel.min.js'))
			.pipe(gulp.dest(config.dist))
			.pipe(notify('Library scripts processed'))
	})
	gulp.task('chiselscriptdev', function(){

		return gulp.src(config.src + '/' + config.script + '/**/*.js')
			.pipe(sourcemaps.init())
			.pipe(concat('chisel.js'))
			.pipe(wrapJs("/*! " + info.title + " v" + info.version + " | " + info.license + " License | " + info.author.url + " */\n!function(w,d,u){'use strict';w.c={};%= body %}(window,document)"))
			.pipe(sourcemaps.write('/'))
			.pipe(gulp.dest(config.dist))
			.pipe(notify('Library scripts processed'))
	})
	gulp.task('chiselscript', ['chiselscriptmin', 'chiselscriptdev'])


	gulp.task('chiselstyle', function(){

		var full = gulp.src(config.src + '/' + config.style + '/chisel.scss')
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: config.browsers
			}))
			.pipe(sourcemaps.write('/'))
			.pipe(gulp.dest(config.dist))

		var min = gulp.src(config.src + '/' + config.style + '/chisel.scss')
			.pipe(sass({outputStyle: 'compressed'}))
			.pipe(autoprefixer({
				browsers: config.browsers
			}))
			.pipe(csso())
			.pipe(rename('chisel.min.css'))
			.pipe(gulp.dest(config.dist))

		return merge(full, min)
			.pipe(plugins.browserSync.stream())
			.pipe(notify('Library styles processed'))

	})

	// Prepend info to dist files
	gulp.task('chiselcssinfo', function(){
		info = JSON.parse(fs.readFileSync('./package.json'))
		return gulp.src(config.src + '/' + config.style + '/info.scss')
			.pipe(insert.transform(function(contents, file){
				return "/*! " + info.title + " v" + info.version + " | " + info.license + " License | " + info.author.url + " */\n"
			}))
			.pipe(gulp.dest(config.src + '/' + config.style))
	})


	// Testing files
	gulp.task('chiseltestpug', function(){
		return gulp.src(config.src + '/test/**/*.pug')
			.pipe(pug())
			.pipe(gulp.dest('test'))
			.pipe(notify('Test HTML processed'))
	})
	gulp.task('chiseltestscript', function(){
		return gulp.src(config.src + '/test/**/*.js')
			.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('test'))
			.pipe(notify('Test scripts processed'))
	})
	gulp.task('chiselteststyle', function(){
		console.log(0)
		return gulp.src(config.src + '/test/**/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('test'))
			// Inject into browser
			.pipe(plugins.browserSync.stream())
			.pipe(notify('Test scripts processed'))
	})


	gulp.task('build', function(){
		return runSequence(['chiselcssinfo'],[
			'chiselscript',
			'chiselstyle',
			'chiseltestpug',
			'chiseltestscript',
			'chiselteststyle'
		])
		
	})






}