const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const srcPath  = 'app/src';
const distPath = 'app/public';
const bootstrapPath = 'node_modules/bootstrap/scss/bootstrap.scss';
const fontawesomePath = 'node_modules/font-awesome';


/* Font Awesome */
gulp.task('fontawesome-fonts', function() {
return gulp.src(fontawesomePath+'/fonts/*')
    .pipe(gulp.dest(distPath+'/fonts'))
});
gulp.task('fontawesome-sass', () => {
    return gulp.src(fontawesomePath+'/scss/font-awesome.scss')
    .pipe(sass())
    .pipe(gulp.dest(distPath+'/css'));
});
gulp.task('fontawesome', gulp.parallel('fontawesome-fonts','fontawesome-sass'));

/* Compile Sass */
gulp.task('sass', () => {
return gulp.src([bootstrapPath, fontawesomePath+'/scss/font-awesome.scss', srcPath+'/scss/**/*.scss'])
.pipe(sass())
.pipe(gulp.dest(distPath+'/css'));
});

/* Minify html */
gulp.task('minify', () => {
return gulp.src(srcPath+'/pages/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(distPath));
});

gulp.task('watch', () => {
    gulp.watch(srcPath+'/scss/**/*.scss', gulp.series('sass'));
    gulp.watch(srcPath+'/pages/*.html', gulp.series('minify'));
});