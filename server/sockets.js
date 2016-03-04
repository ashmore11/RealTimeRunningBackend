var Sockets = {

  init: function init(io, socket) {

    console.log('client connected', socket.id);

    socket.on('raceUpdated', function(index, id) {

      io.emit('reloadRaceView', index, id);

    });

    socket.on('disconnect', function() {

      console.log('socket disconnected');

    });

  },

};

module.exports = Sockets;
