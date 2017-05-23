const express = require('express');
const webpack = require('webpack');
const path = require('path');
const http = require('http');
const logger = require('morgan');

const app = express();
const server = require('http').Server(app);

require('dotenv').config();
require('dotenv').load();

const debug = require("debug")("app:http");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const router = require('./api/index');
const expressSession = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(logger('dev'));
app.use(cors());
app.use(bodyparser.json({ limit: '50mb'}));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

const debugReq = (req, res, next) => {
  debug('params: ', req.params);
  debug('query: ', req.query);
  debug('body: ', req.body);
  next();
};

// app.use(debugReq);
app.use('/', express.static(path.join(__dirname, '../static/')));
app.use('/api', router);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../static/index.html'));
});

app.use(express.static(path.join(__dirname, '../static')));

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('there was an error connecting to Server', err);
  } else {
    console.log('You have connected to the server on PORT: ', process.env.PORT);
  }
});

// // Catches all 404 routes.
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = app;
