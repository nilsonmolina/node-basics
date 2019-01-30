// APP DEPENDENCIES
const fs = require('fs');
const path = require('path');
const debug = require('debug')('server');
const morgan = require('morgan');
const socketio = require('socket.io');
const express = require('express');

// SETUP
const app = express();
const port = process.env.PORT || 5000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/morgan.log'), { flags: 'a' });

// LOAD MIDDLEWARE
app.use(morgan('combined', { stream: accessLogStream }));

// LOAD STATIC ROUTES
app.use(express.static('public'));

// START SERVER
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
const io = socketio.listen(server);

// WEBSOCKET CALLS
const users = [];
// const messages = [];
io.on('connection', (socket) => {
  debug(`Client connected - ${socket.id}`);

  socket.on('setUsername', (payload) => {
    if (users.findIndex(u => u.id === socket.id) > -1) {
      debug(`*********** user already exists! - ${socket.id}`);
      return;
    }
    users.push({ id: socket.id, name: payload.name });
    debug(users);

    io.emit('usersChanged', users);
  });

  socket.on('sendMessage', (payload) => {
    const user = users.find(u => u.id === socket.id);
    if (!user) return;

    const message = {
      socket: socket.id,
      body: payload.message,
      name: user.name,
      date: new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
    };

    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    debug(`Client disconnected - ${socket.id}`);
    debug(users);
    users.splice(users.findIndex(u => u.id === socket.id), 1);
    debug(users);
    io.emit('usersChanged', users);
  });
});
