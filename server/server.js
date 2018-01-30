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

  socket.emit('newMessage',{
    "from": "Admin",
    "message": "Welcome to chat app"
  });

  socket.broadcast.emit('newMessage',{
    "from": "Admin",
    "message": "New user joined",
    "createdAt": new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    console.log(newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`)
});
