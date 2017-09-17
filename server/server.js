const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');

var app = express();

app.use(express.static(publicPath));

// app.get('/',function (req,res) {
//   res.sendFile(publicPath+'/index.html')
// })


app.listen(process.env.PORT||3000,function () {
  console.log('Server is running');
})
