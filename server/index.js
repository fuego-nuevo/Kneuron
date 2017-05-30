const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();
const server = require('http').Server(app);
// const server = app.listen(5000);
const io = require('socket.io')(server);
// const io = require('socket.io')(server, { path: '/io' });

require('dotenv').config();
require('dotenv').load();

const router = require('./api/index');
const bodyparser = require('body-parser');
const cors = require('cors');
// const webpackDevMiddleware = require('webpack-dev-middleware');

app.use(logger('dev'));
app.use(cors());
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
// app.use(webpackDevMiddleware);

app.use('/', express.static(path.join(__dirname, '../static/')));
app.use('/api', router);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../static/index.html'));
});

app.use(express.static(path.join(__dirname, '../static')));


io.on('connection', (socket) => {
  socket.on('join', (data) => {
    console.log(`teacher${data.id} just joined`);
    socket.join(data.id);
  });
  socket.on('live-lecture', (data) => {
    const topics = data.topics;
    const teacherRoom = data.teacher;
    console.log('this is sockets live lecture event emitting ,');
    console.log(data.topics);
    console.log(teacherRoom);
    io.sockets.in(teacherRoom).emit('live-lecture', topics);
  });
  socket.on('pop-quiz', (data) => {
    const quiz = data.quiz;
    const teacherRoom = data.id;
    io.sockets.in(teacherRoom).emit('pop-quiz', { quiz });
  });
  socket.on('student-question', (data) => {
    console.log(data, 'were in here student question');
    const question = data.question;
    const topic = data.topicId;
    const student = data.name;
    const teacherRoom = data.teacher;
    console.log('we in the teacherroom of server ', teacherRoom);
    io.sockets.to(teacherRoom).emit('student-question', {
      name: student,
      question,
      topicId: topic,
    });
  });
});

if (process.env.PORT) {
  server.listen(process.env.PORT, (err) => {
    if (err) {
      console.log('There was an error connecting to the Server ', err);
    } else {
      console.log('You have connected to the server on PORT: ', process.env.PORT);
    }
  });
} else {
  server.listen(3000, (err) => {
    if (err) {
      console.log('There was an error connecting to the Server ', err);
    } else {
      console.log('You have connected to the server on PORT: ', 3000);
    }
  });
}

// Catches all 404 routes.
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).send(error);
});

module.exports = app;
