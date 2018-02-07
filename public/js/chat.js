var socket = io();
var params = $.deparam(window.location.search);

function scrollToBottom (){
  //Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {

  socket.emit('join', params, function(error){
    if(error){
      alert(error);
      window.location.href = "/";
    }else{
      console.log("No error");
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconencted from server');
});

socket.on('updateUserList', function(users){
  var ol = $('<ol></ol>');
  users.forEach(function(user){
    if(params.name === user){
        ol.append($('<li class="active-user"></li>').text(user));
    }else{
      ol.append($('<li></li>').text(user));
    }
  });

  $('#users').html(ol);
});

socket.on('newMessage', function(message){
  if(params.name === message.from){
    message.style="float-right"
  }else{
    message.style="float-left"
  }
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
    style: message.style
  });
  $('#messages').append(html);
  scrollToBottom();
});


socket.on('newLocationMessage', function(message){
  if(params.name === message.from){
    message.style="float-right"
  }else{
    message.style="float-left"
  }
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime,
    style: message.style
  });
  $('#messages').append(html);
  scrollToBottom();
});


$('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextBox = $('[name=message]')

  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function(text){
    messageTextBox.val('');
  });
});


var locationButton = $('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by user');
  }
  locationButton.attr('disabled','disabled').text('Sending location..');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled','disabled').text('Send location');;
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function() {
    locationButton.removeAttr('disabled','disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
