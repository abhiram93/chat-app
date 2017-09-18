var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect',function () {
  console.log('Disconnected from server');
});

socket.on('newMessage',function (obj) {
  console.log('Message received',obj);
});

socket.emit('createMessage',{
  from:'ww@wb.com',
  text:'K'
});
