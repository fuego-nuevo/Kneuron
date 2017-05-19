const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const gutil = require('gulp-util');
const Promise = require('bluebird');
const SequelizeFixtures = require('sequelize-fixtures');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');
const WebpackDevServer = require('webpack-dev-server');

env({
  file: './.env',
  type: 'ini'
});

const db = require('./server/db/models');

const models = {
  // 'School' : db.School,
  // 'Teacher' : db.Teacher
  // 'Student' : db.Student
  // 'StudentQuestion' : db.StudentQuestion,
  // 'Class' : db.Class,
  // 'Lecture' : db.Lecture,
  // 'Topic' : db.Topic,
  // 'Quiz' : db.Quiz,
  // 'Question' : db.Question,
  // 'Answer' : db.Answer,
}

gulp.task('seed:wipe', (cb) => {
  db.School.sync({ force: true })
    .then(db.Teacher.sync({ force: true }))
    .then(db.Student.sync({ force: true }))
    .then(db.StudentQuestion.sync({ force: true }))
    // .then(db.Class.sync({ force: true }))
    // .then(db.Lecture.sync({ force: true }))
    // .then(db.Topic.sync({ force: true }))
    // .then(db.Quiz.sync({ force: true }))
    // .then(db.Question.sync({ force: true }))
    // .then(db.Answer.sync({ force: true }))
    .then(() => { cb() })
    .catch((err) => { cb(err) })
})

// gulp.task('seed:seed', ['seed:wipe'], (cb) => {
//   SequelizeFixtures.loadFile('./server/db/models/seedData/data.json', models)
//     .then(() => {
//       cb();
//     })
//     .catch((err) => {
//       cb(err);
//     });
// })

gulp.task('seed', ['seed:wipe']);

gulp.task('nodemon', () => {
  const stream = nodemon({
    script: 'server/index.js',
    watch: ['server/'],
    ignore: ['client/**']
  });
});

gulp.task('default', ['nodemon'])
