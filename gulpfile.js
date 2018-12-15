var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');
var eslint = require('gulp-eslint');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000,
            NODE_ENV: 'development' 
        },
        ignore: ['./node_modules'],
    })
        .on('restart', function () {
            console.log('restarting server...')
        });
});

gulp.task('debug', function () {
  nodemon({
      script: 'app.js',
      ext: 'js',
      env: {
          PORT: 8000,
          NODE_ENV: 'DEBUG' 
      },
      ignore: ['./node_modules'],
  })
      .on('restart', function () {
          console.log('restarting server...')
      });
});

gulp.task('test', function () {
    env({ vars: { ENV: 'Test' } });
    gulp.src('tests/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'nyan' }))
});

gulp.task('lint', function () {
  return gulp.src('**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
 });