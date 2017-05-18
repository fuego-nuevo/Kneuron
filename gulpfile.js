const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const gutil = require('gulp-util');
const Promise = require('bluebird');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');
const WebpackDevServer = require('webpack-dev-server');

env({
  file: './.env',
  type: 'ini'
});

const db = require('./db/models/schema');

