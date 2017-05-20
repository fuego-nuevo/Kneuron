const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const gutil = require('gulp-util');
const Promise = require('bluebird');
const SequelizeFixtures = require('sequelize-fixtures');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');

env({
  file: './.env',
  type: 'ini'
});

const db = require('./server/db/models/schema');

const models = {
  'School' : db.School,
  'Teacher' : db.Teacher,
  'Student' : db.Student,
  'StudentQuestion' : db.StudentQuestion,
  'Class' : db.Class,
  'Lecture' : db.Lecture,
  'Topic' : db.Topic,
  'Quiz' : db.Quiz,
  'Question' : db.Question,
  'Answer' : db.Answer,
  'ClassStudent' : db.ClassStudent
}


// .then(() => {
//       Promise.all([db.Teacher.sync({ force: true }), db.Student.sync({ force: true }),
//       db.StudentQuestion.sync({ force: true }), db.Class.sync({ force: true }),
//       db.Lecture.sync({ force: true }), db.Topic.sync({ force: true }),
//       db.Quiz.sync({ force: true }), db.Question.sync({ force: true }),
//       db.Answer.sync({ force: true })])
//     })

gulp.task('seed:wipe', (cb) => {
  db.School.sync({ force: true })
    .then(() => Promise.all([db.Teacher.sync({ force: true }), db.Student.sync({ force: true }), db.Class.sync({ force: true }), db.Topic.sync({ force: true }), db.StudentQuestion.sync({ force: true }), db.ClassStudent.sync({ force: true}), db.Lecture.sync({ force: true }), db.Quiz.sync({ force: true }), db.Question.sync({ force: true }), db.Answer.sync({ force: true }), () => { cb() }]))
    // .then(() => Promise.all([db.Student.sync({ force: true })]))
    // .then(() => Promise.all([db.Topic.sync({ force: true })]))
    // .then(() => Promise.all([db.StudentQuestion.sync({ force: true })]))
    // .then(() => Promise.all([db.Class.sync({ force: true })]))
    // .then(() => Promise.all([db.ClassStudent.sync({ force: true})]))
    // .then(() => Promise.all([db.Lecture.sync({ force: true })]))
    // .then(() => Promise.all([db.Quiz.sync({ force: true })]))
    // .then(() => Promise.all([db.Question.sync({ force: true })]))
    // .then(() => Promise.all([db.Answer.sync({ force: true })]))
    // .then(() => { cb() })
    .catch((err) => { cb(err) })
})

gulp.task('seed:seed', ['seed:wipe'], (cb) => {
  SequelizeFixtures.loadFile('./server/db/models/seedData/data.json', models)
    .then(() => {
      cb();
    })
    .catch((err) => {
      cb(err);
    });
})

gulp.task('seed', ['seed:wipe', 'seed:seed']);

gulp.task('nodemon', () => {
  const stream = nodemon({
    script: 'server/index.js',
    watch: ['server/'],
    ignore: ['client/**']
  });
});

gulp.task('default', ['nodemon'])
