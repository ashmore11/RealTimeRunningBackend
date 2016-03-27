var app        = require('express')();
var server     = require('http').Server(app);
var timeKeeper = require('./timeKeeper');
var port       = process.env.PORT || 3000;

setInterval(timeKeeper, 1000);

server.listen(port);
