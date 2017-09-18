const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const generateMessage = require('./util/message').generateMessage;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
  console.log('New User connected');

  socket.on('disconnect', function () {
    console.log(' inside disConnect');
  });

  socket.emit('newMessage', generateMessage('Admin','Welcome to chat application'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',function (message,callback) {
    console.log('Message received',message);

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is from server');
    // socket.broadcast.emit('newMessage', {
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // });

  })

});

server.listen(process.env.PORT||3000,function () {
  console.log('Server is running');
})
