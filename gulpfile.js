const { parallel, src, dest } = require('gulp')
const uglify = require('gulp-uglify-es').default
const ts = require('gulp-typescript')

function build() {
  return src('src/**/*.ts')
    .pipe(ts({declaration: true}))
    .pipe(dest('dist'))
}

function minify() {
  return src('dist/**/*.js')
  .pipe(uglify())
    .pipe(dest('dist'))
}



function copyPack() {
  return src('package.json')
    .pipe(dest('dist'))
}

exports.default = parallel(build, copyPack, minify)
