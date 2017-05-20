const express = require('express');
const webpack = require('webpack')
const path = require('path');
const http = require('http');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const router = require('./api/index');
const expressSession = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
require('dotenv').load();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyparser.json({ limit: '50mb'}));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true}));
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

module.exports = app;
