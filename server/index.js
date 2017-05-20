const express = require('express');
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const router = require('./api/index');
const path = require('path');
const http = require('http');
const  { debugReq, notFound } = require('./utils/index');
const expressSession = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const debug = require('debug')('app:http');
require('dotenv').config();
require('dotenv').load();
const PORT =  8080;



const app = express();
app.use(cors());
app.use(bodyparser.json({ limit: '50mb'}));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true}));
// app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/src')));
// app.set('views', path.join(__dirname, 'client/src' ))
// app.set('view engine', 'html')
// app.use(debugReq);
app.listen(PORT, (err) => {
  if(err){
    console.log('there was an error connecting to Server', err)
  } else {
    console.log('You have connected to the server on PORT: ', PORT)
  }
});


