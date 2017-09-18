const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
  console.log('New User connected');

  socket.on('disconnect', function () {
    console.log(' inside disConnect');
  });

  socket.emit('newMessage', {
    from:'Admin',
    text:'Welcome to the chat',
    createdAt:new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from:'Admin',
    text:'New usser joined',
    createdAt:new Date().getTime()
  })

  socket.on('createMessage',function (message) {
    console.log('Message received',message);

    // io.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // });

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
