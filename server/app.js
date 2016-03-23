require('dotenv').config({ silent: true });

var express    = require('express');
var app        = express();
var server     = require('http').Server(app);
var firebase   = require("firebase");
var timeKeeper = require('./timeKeeper');
var port       = process.env.PORT || 3000;

setInterval(timeKeeper, 1000);

server.listen(port);
