require('dotenv').config({ silent: true });

var https    = require('https');
var express  = require('express');
var socketio = require('./sockets');
var redis    = require('redis');
var url      = require('url');
var app      = express();

app.use(express.static(process.cwd() + '/static'));
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {

  console.log('Express server listening on port ' + server.address().port);

});

/**
 * REDIS
 */
var redisConfig = url.parse(process.env.REDISURL);
var client = redis.createClient(redisConfig.port, redisConfig.hostname);

if (redisConfig.auth !== null) {

  client.auth(redisConfig.auth.split(':')[1]);

}

client.on('error', function(e) {

  console.log(e);

});
/** REDIS **/

socketio(server, client);
