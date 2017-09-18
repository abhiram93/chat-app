var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect',function () {
    console.log('Disconnected from server');
});

socket.on('newMessage',function (obj) {
    console.log('Message received',obj);
    
    var li =document.createElement("li");
    var text = document.createTextNode(obj.from+":"+obj.text);
    li.appendChild(text);
    var ul = document.getElementById("messages").appendChild(li);
});

/*socket.emit('createMessage',{
    from:'ww@wb.com',
    text:'K'
}, function (data) {
    console.log('Acknowledged',data);
});*/


var form = document.getElementById('message-form');

form.addEventListener("submit", function(e){
    
    e.preventDefault();
    
    socket.emit('createMessage',{
        from:'User',
        text:document.getElementsByName("message")[0].value
    } , function() {
      console.log('Acknowledge');  
    });
    
},false);
