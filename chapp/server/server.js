const debug = require('debug')('server');
const socketio = require('socket.io');
const express = require('express');

// SETUP
const app = express();
const port = process.env.PORT || 5000;

// ROUTES
app.get('/api/headers', (req, res) => {
  res.json({ headers: req.headers, address: req.connection.remoteAddress });
});

// START SERVER
const server = app.listen(port, '127.0.0.1', () => console.log(`Listening on port ${port}...`));
const io = socketio.listen(server);

// WEBSOCKET CALLS
const users = [];
const messages = [];
io.on('connection', (socket) => {
  debug(`Client connected - ${socket.id}`);

  socket.on('tryUsername', (payload) => {
    if (users.find(u => u.name === payload)) {
      socket.emit('usernameTaken', 'username already taken.');
      return;
    }

    users.push({ id: socket.id, name: payload });
    debug(`NEW USER: ${payload} - ${socket.id}`);
    debug(users);

    socket.emit('usernameAccepted', { username: payload, messages });
    io.emit('usersChanged', users);
  });

  socket.on('createMessage', (payload) => {
    const user = users.find(u => u.id === socket.id);
    if (!user) return;

    const message = {
      socket: socket.id,
      body: payload,
      name: user.name,
      date: new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
    };
    if (messages.length > 100) messages.splice(0, 50);
    messages.push(message);

    io.emit('messageCreated', message);
  });

  socket.on('disconnect', () => {
    debug(`Client disconnected - ${socket.id}`);

    const userIndex = users.findIndex(u => u.id === socket.id);
    if (userIndex > -1) users.splice(userIndex, 1);
    debug(`USER DELETED: ${socket.id}`);
    debug(users);

    io.emit('usersChanged', users);
  });
});
