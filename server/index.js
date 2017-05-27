const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('dotenv').config();
require('dotenv').load();

const router = require('./api/index');
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(logger('dev'));
app.use(cors());
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', express.static(path.join(__dirname, '../static/')));
app.use('/api', router);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../static/index.html'));
});

app.use(express.static(path.join(__dirname, '../static')));

// io.on('connection', (client) => {
//   const nsp = io.of('/lectures');
//   nsp.on('join', (data) => {
//     nsp.join(data.lecture);
//   });
//   nsp.on('topic', (data) => {
//     io.of(data.name).emit('topic', data);
//   });

//   nsp.on('students', (data) => {
//     io.of(data.name).emit('quiz', data);
//   });
//   nsp.on('quiz', (data) => {
//     io.of(data.name).emit('answer', data);
//   });
// });

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('there was an error connecting to Server', err);
  } else {
    console.log('You have connected to the server on PORT: ', process.env.PORT);
  }
});

// // Catches all 404 routes.
// app.use((error, req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = app;
