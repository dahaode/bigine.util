var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $smap = require('gulp-sourcemaps'),
    $tsc = require('gulp-typescript'),
    $replace = require('gulp-replace'),
    $insert = require('gulp-insert'),
    pkg = require('./package.json'),
    ns = 'Util';

$gulp.task('lint', function () {
    return $gulp.src('lib/**/*.ts')
        .pipe($lint())
        .pipe($lint.report('prose'));
});

$gulp.task('dist', function () {
    var ts = $gulp.src('lib/' + ns + '/@module.ts')
            .pipe($smap.init())
            .pipe($tsc($tsc.createProject('tsconfig.json', {
                outFile: pkg.name + '.js'
            })));
    return ts.js
        .pipe($replace(/\$\{BIGINE_MODULE_VERSION\}/, pkg.version))
        .pipe($insert.append('module.exports=' + ns + ';'))
        .pipe($smap.write('.'))
        .pipe($gulp.dest('var/build'));
});

$gulp.task('tsd', ['lint'], function () {
    var ts = $gulp.src('lib/' + ns + '/@module.ts')
            .pipe($tsc($tsc.createProject('tsconfig.json', {
                declaration: true,
                removeComments: true
            })));
    return ts.dts
        .pipe($replace('}\ndeclare namespace ' + ns + ' {\n', ''))
        .pipe($replace(/^.*\n.*\ndeclare/m, 'declare'))
        .pipe($replace('declare namespace ' + ns + ' {\n', 'declare namespace __Bigine_' + ns + ' {\n'))
        .pipe($insert.append('\ndeclare module "bigine.' + ns.toLowerCase() + '" {\n    export = __Bigine_' + ns + ';\n}\n'))
        .pipe($gulp.dest('.'));
});

$gulp.task('watch', function () {
    return $gulp.watch('lib/**/*.ts', ['tsd', 'dist']);
});

$gulp.task('default', ['tsd', 'dist']);
