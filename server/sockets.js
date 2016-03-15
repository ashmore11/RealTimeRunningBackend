var socketio = require('socket.io');
var repo     = require('./repository');
var expire   = 7200;

function initSockets(server, client) {

  var io = socketio.listen(server);

  io.of('/users').on('connection', function (socket) {

    socket.on('createUser', function(user) {

      repo.createUser(user, client)

        .done(function() {

          socket.emit('userCreated', user);

        }, function(err) {

          console.log(err, 'Something went wrong!');

        });

    });

  });

  io.of('/races').on('connection', function (socket) {

    socket.on('createRace', function(userId, raceId) {

      repo.createRace(client)

        .done(function() {

          socket.emit('raceCreated');

        }, function(err) {

          console.log(err, 'Something went wrong!');

        });

    });

    socket.on('getRace', function(raceId) {

      repo.getRace(raceId, client)

        .done(function(result) {

          socket.emit('raceFound', result);

        }, function(err) {

          console.log(err, 'Something went wrong!');

        });

    });

  });

};

module.exports = initSockets;
