var socket = io();
var btnLocation = document.getElementById('send-location');


socket.emit('createMessage',{
    from:'ww@wb.com',
    text:'K'
}, function (data) {
    console.log('Acknowledged',data);
});


var form = document.getElementById('message-form');

form.addEventListener("submit", function(e){

    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:document.getElementsByName("message")[0].value
    } , function() {
        document.getElementsByName("message")[0].value="";
        document.getElementsByName("message")[0].focus();
    });

},false);


socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect',function () {
    console.log('Disconnected from server');
});

socket.on('newMessage',function (obj) {

    var formattedTime = moment(obj.createdAt).format(' h:mm a');
    var template = document.getElementById("message-template").innerHTML;
    
    var html = Mustache.render(template,{
        text:obj.text,
        from:obj.from,
        createdAt:formattedTime
    });
    console.log(typeof html);
    /*var li =document.createElement("li");
    li.classList.add('message'); 
    var text = document.createTextNode(obj.from+formattedTime+":"+obj.text);
    li.appendChild(text);*/
    var ul = document.getElementById("messages").insertAdjacentHTML("beforebegin",html);
});



socket.on('newLocationMessage', function (coords) {

    var formattedTime = moment(coords.createdAt).format(' h:mm a');
    var template = document.getElementById("location-message-template").innerHTML;
    /*var newLi =document.createElement("li");
    var a =document.createElement("a");
    var text = document.createTextNode('My Location');
    a.textContent = 'My Location';
    a.setAttribute('href',coords.url);
    newLi.classList.add('message'); 
    newLi.textContent = coords.user+formattedTime+':';
    newLi.appendChild(a);*/
     var html = Mustache.render(template,{
        user:coords.user,
        url:coords.url,
        createdAt:formattedTime
    });

     var ul = document.getElementById("messages").insertAdjacentHTML("beforebegin",html);

});



btnLocation.addEventListener('click', function() {

    btnLocation.disabled = true;
    btnLocation.textContent = "Sending Location... "
    if(!navigator.geolocation) {
        return alert('Geo Location not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
        socket.emit('createLocationMessage', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    } , function() {
        alert('Unable to fetch location');
    });
    btnLocation.disabled = false;
    btnLocation.textContent = "Send Location";
});


console.log(moment().valueOf());