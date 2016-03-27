var app        = require('express')();
var server     = require('http').Server(app);
var timeKeeper = require('./timeKeeper');
var port       = process.env.PORT || 3000;

app.get('/', function(req, res) {

  var style = `style="
    position: absolute; 
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
  "`

  res.send(`<h1 ${style}>REAL TIME RUNNING</h1>`);

});

setInterval(timeKeeper, 1000);

server.listen(port);
