const express = require('express');
const webpack = require('webpack')
const path = require('path');
const http = require('http');
var logger = require("morgan");



require('dotenv').config();
require('dotenv').load();

const PORT = process.env.PORT || 8080;
const app = express();
const debug = require("debug")("app:http");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const router = require('./api/index');
const expressSession = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(logger("dev"));
app.use(cors());
app.use(bodyparser.json({ limit: '50mb'}));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true}));
app.use(debugReq);
app.use('/api', router);
app.use(express.static(path.join(__dirname, '../client/src')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/src/index.html')));

app.listen(PORT, (err) => {
  if(err){
    console.log('there was an error connecting to Server', err)
  } else {
    console.log('You have connected to the server on PORT: ', PORT)
  }
});

// Catches all 404 routes.
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

function debugReq(req, res, next) {
  debug("params:", req.params);
  debug("query:", req.query);
  debug("body:", req.body);
  next();
}


module.exports = app;
