const gulp = require ('gulp');

const sass = require ('gulp-sass')(require('sass')); //конвертує SASS в CSS
const cssnano = require ("gulp-cssnano"); //мінімізація CSS
const autoprefixer = require ('gulp-autoprefixer'); //додавання префіксів в
const concat = require ("gulp-concat"); //об'єднання файлів - конкатенація
const uglify = require ("gulp-uglify"); //мінімізація javascript
const rename = require ("gulp-rename"); //перейменування файлів
const imagemin = require('gulp-imagemin')
const { series, watch , src} = require('gulp');
const sync = require('browser-sync').create()


function html()
{
    console.log ('This is a html task!');
    return gulp.src ("app/**.html")
    .pipe (gulp.dest ("dist"))
}

//об'єднання, компіляція Sass в CSS, додавання префіксів і подальша

function scss()
{
    console.log ('This is a scss task!');
    return gulp.src ( "app/sass/*.sass")
    .pipe (concat ( 'styles.sass'))
    .pipe (sass())
    .pipe (autoprefixer ({
    browsers: [ 'last 2 versions'],
    cascade: false
    }))
    .pipe (cssnano ())
    .pipe (rename ({suffix: '.min'}))
    .pipe (gulp.dest ( "dist / css"))
}

function css() {
    return src("app/css/**.css")           // Беремо файли з розширенням css із папки app/css/
          .pipe(gulp.dest("dist/css"))           // Переміщуємо у папку build/
}

function image()
{
    return src('app/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
}

function scripts()
{
    console.log ('This is a scripts task!');
    return gulp.src ( "app/js/*.js") //вихідна директорія файлів
    .pipe (concat ( 'scripts.js')) // конкатенація js-файлів в один
    .pipe (uglify ()) //стиснення коду
    .pipe (rename ({suffix: '.min'})) //перейменування файлу з
    //приставкою .min
    .pipe (gulp.dest ( "dist/js")) // директорія продакшена
}

function serve()
{
    console.log ('This is a watch task!');
    sync.init({
        server: './dist'
    })

    watch ('app/*.html', series(html)).on('change',sync.reload)
    watch ('app/js/*.js').on('change',sync.reload)
    watch('app/css/*.css', series(css)).on('change', sync.reload)
    watch ('app/sass/*.sass', series(scss)).on('change', sync.reload)
    watch('app/img/*.png').on('change', sync.reload)
    
}

exports.build = series(html, css, scripts, image, serve)
exports.html = html
exports.scss = scss
exports.scripts = scripts
exports.serve = serve
exports.image = image