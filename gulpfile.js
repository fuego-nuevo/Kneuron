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
  type: 'ini',
});

const db = require('./server/db/models');

const models = {
  'School' : db.School,
  'User': db.User,
  'StudentQuestion' : db.StudentQuestion,
  'Cohort' : db.Cohort,
  'Lecture' : db.Lecture,
  'Topic' : db.Topic,
  'Quiz' : db.Quiz,
  'Question' : db.Question,
  'Answer' : db.Answer,
};

const relationship = new Promise((resolve, reject) => {
  if (db.defineRelationship) {
    resolve(db.defineRelationship());
  } else {
    reject(404);
  }
});

gulp.task('seed:wipe', (cb) => {
  relationship
  .then(() => db.School.sync({ force: true }))
  .then(() => db.User.sync({ force: true }))
  .then(() => db.Attendance.sync({ force: true }))
  .then(() => db.Cohort.sync({ force: true }))
  .then(() => db.Lecture.sync({ force: true }))
  .then(() => db.Topic.sync({ force: true }))
  .then(() => db.StudentQuestion.sync({ force: true }))
  .then(() => db.Quiz.sync({ force: true }))
  .then(() => db.Question.sync({ force: true }))
  .then(() => db.Answer.sync({ force: true }))
  .then(() => { cb(); })
  .catch((err) => { cb(err); });
});

gulp.task('seed:seed', ['seed:wipe'], (cb) => {
  SequelizeFixtures.loadFile('./server/db/models/seedData/data.json', models)
    .then(() => {
      cb();
    })
    .catch((err) => {
      cb(err);
    });
});

gulp.task('seed', ['seed:wipe']);

gulp.task('nodemon', () => {
  const stream = nodemon({
    script: 'server/index.js',
    watch: ['server/'],
    ignore: ['client/**'],
  });
});

gulp.task('webpack-dev-server', () => {
  const compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    contentBase: './static',
    publicPath: '/static',
    hot: true,
    inline: true,
    stats: true,
    clientLogLevel: 'info',
    proxy: [
      {
        context:['/api', '/'],
        target: `http://localhost:${process.env.PORT}`,
      },
    ],
  }).listen(8080, 'localhost', (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server ', err);
    }
    gutil.log('[webpack-dev-server]', 'WPDS - Listening in on http://localhost:8080');
  });
});

gulp.task('default', ['nodemon', 'webpack-dev-server']);
