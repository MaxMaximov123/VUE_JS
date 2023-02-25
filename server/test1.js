const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8000, path: '/test'});

server.on('connection', (socket) => {
  console.log('A client connected!');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Echo the message back to the client
    socket.send(`You sent: ${message}`);
  });

  socket.on('close', () => {
    console.log('A client disconnected!');
  });
});
