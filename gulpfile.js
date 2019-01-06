const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');
const env = require('gulp-env');
const supertest = require('supertest');
const eslint = require('gulp-eslint');

gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000,
      ENV: 'development',
    },
    ignore: ['./node_modules'],
  })
    .on('restart', () => {
      console.log('restarting server...')
    });
});

gulp.task('debug', () => {
  env({ vars: { ENV: 'DEBUG' } });
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000,
      ENV: 'DEBUG',
    },
    ignore: ['./node_modules'],
  })
    .on('restart', () => {
      console.log('restarting server...')
    });
});

gulp.task('test', () => {
  env({
    vars: { ENV: 'Test' }
  });
  gulp.src('tests/*.js', { read: false })
    .pipe(gulpMocha({ reporter: 'nyan' }))
});

gulp.task('lint', () => {
  return gulp.src('**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});