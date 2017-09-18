var generateMessage = function (from,text) {
  return {
    from:from,
    text:text,
    createdAt: new Date().getTime()
  }
}

var generateLocationMessage = function (user,latitude,longitude) {
console.log("https://www.google.co.in/maps/?q="+latitude+','+longitude);
  return {
    user:user,
    url:"https://www.google.co.in/maps/?q="+latitude+','+longitude,
    createdAt: new Date().getTime()
  }
}


module.exports.generateMessage = generateMessage;
module.exports.generateLocationMessage = generateLocationMessage;
