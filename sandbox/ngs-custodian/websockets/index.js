// WEBSOCKET CALLS
function websockets(io) {
  io.on('connection', (socket) => {
    console.log('Client connected to "/"', socket.id);

    socket.on('heartbeat', (payload) => {
      socket.emit('heartbeat', payload);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected from "/"');
    });
  });
}

module.exports = websockets;
