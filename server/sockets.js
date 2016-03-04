var Sockets = {

  io: null,

  init: function init(io, socket) {

    console.log('client connected', socket.id);

    this.io = io;

    socket.on('raceUpdated', this.raceUpdated.bind(this));
    socket.on('positionUpdate', this.positionUpdateReceived.bind(this));

    socket.on('disconnect', this.disconnected.bind(this));

  },

  raceUpdated: function raceUpdated(index, id) {

    console.log('event received');

    this.io.emit('reloadRaceView', index, id);

  },

  positionUpdateReceived: function positionUpdateReceived(id, distance, speed) {

    this.io.emit('positionUpdateReceived', id, distance, speed);

  },

  disconnected: function disconnected() {

    console.log('socket disconnected');

  },

};

module.exports = Sockets;
