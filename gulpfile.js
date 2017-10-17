'use stric';

const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

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
    gulp.watch("./index.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>{
    return gulp.src("./assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream());
});

// Default Task
gulp.task('default', ['server', 'sass', 'watch']);
