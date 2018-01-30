var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconencted from server');
});

socket.on('newMessage', function(message){
  console.log(message);
});
