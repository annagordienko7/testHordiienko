import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import browserSync from 'browser-sync';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import sassCompiler from 'sass';

// Создаем экземпляр BrowserSync
const browserSyncInstance = browserSync.create();

// Настройка gulp-sass с использованием sassCompiler
const compileSass = sass(sassCompiler);

function scssTask() {
    return gulp.src('src/scss/styles.scss')
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSyncInstance.stream());
}

// Задача для JS
function jsTask() {
    return gulp.src('src/js/*.js')
        .pipe(terser())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSyncInstance.stream());
}

// Задача для HTML
function htmlTask() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSyncInstance.stream());
}

// Задача для шрифтов
function fontsTask() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSyncInstance.stream());
}

// Задача для изображений
function imagesTask() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSyncInstance.stream());
}

// Задача для сервера и наблюдения
function serve() {
    browserSyncInstance.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src/scss/**/*.scss', scssTask);
    gulp.watch('src/js/**/*.js', jsTask);
    gulp.watch('src/*.html', htmlTask);
    gulp.watch('src/fonts/*', fontsTask);
    gulp.watch('src/img/**/*', imagesTask); // Наблюдение за изображениями
}

// Экспорт задач
export default gulp.series(
    gulp.parallel(scssTask, jsTask, htmlTask, fontsTask, imagesTask),
    serve
);
