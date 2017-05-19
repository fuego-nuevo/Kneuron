const express = require('express');
const router = require('./api/index');
const path = require('path');
const http = require('http');
const expressSession = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

require('dotenv').config();
require('dotenv').load();

const app = express();
app.use(cors());
app.use(bodyparser.json({ limit: '50mb'}));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'client/src')));
app.set('views', path.join(__dirname, '/client/src'))
app.set('view engine', 'html')
app.use('/', router);

app.listen(PORT, (err) => {
  if(err){
    console.log('there was an error connecting to Server', err)
  } else {
    console.log('You have connected to the server! ' + PORT)
  }
});


module.exports = app;
