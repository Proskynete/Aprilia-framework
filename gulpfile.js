'use stric';

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const minify        = require('gulp-minify');
const browserSync   = require('browser-sync').create();
const reload        = browserSync.reload;

// Static server
gulp.task('server', () =>{
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Watch html and scss files
gulp.task('watch', () => {
    gulp.watch("./assets/scss/*.scss", ['sass']);
    gulp.watch("./index.html").on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>{
    return gulp.src("./assets/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({browsers: ["last 2 version", "> 5% in US", "ie 8", "ie 7"], cascade: false}))
        .pipe(sass())
        .pipe(minify({ext:{src:'-min.css', min:'.css'}}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream());
});

// Default Task
gulp.task('default', ['server', 'sass', 'watch']);
