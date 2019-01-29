// APP DEPENDENCIES
const fs = require('fs');
const path = require('path');
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
  console.log('Client connected.');
  users.push({ id: socket.id, name: socket.id });
  io.emit('usersChanged', users);

  socket.on('disconnect', () => {
    console.log('Client disconnected.', socket.id);
    users.splice(users.indexOf(u => u.id === socket.id), 1);
    io.emit('usersChanged', users);
  });
});
