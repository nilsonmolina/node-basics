// APP DEPENDENCIES
const morgan = require('morgan');
const socketio = require('socket.io');
const express = require('express');

const files = require('./routes/files');

// SETUP
const app = express();
const port = process.env.PORT || 3000;

// LOAD MIDDLEWARE
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// app.use(morgan(':remote-addr - :method :url :status :res[content-length] - :response-time ms'));

// LOAD API ROUTES
app.use(express.static('public'));
app.use('/api/files', files);

// START SERVER - listens for http and websockets
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
const io = socketio.listen(server);

// WEBSOCKET CALLS
io.on('connection', (socket) => {
  console.log('Client connected.');

  socket.on('heartbeat', (payload) => {
    socket.emit('heartbeat', payload);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});
