const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { //same variable as defined in HTML
  console.log('New user connected');

  socket.emit('newMessage', {
    "from": "syed",
    "text": "Socket message",
    "createdAt": 123
  });

  socket.on('createMessage', (newMessage) => {
    console.log(newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`)
});
