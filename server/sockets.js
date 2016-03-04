var Sockets = {

  io: null,
  sockets: [],

  init: function init(io, socket) {

    console.log('socket connected');

    this.io = io;

    this.sockets.push(socket);

    this.bind(socket);

  },

  bind: function bind(socket) {

    this.io.clients[socket.id].on('raceUpdated', this.raceUpdated.bind(this));
    this.io.clients[socket.id].on('positionUpdate', this.positionUpdateReceived.bind(this));

    this.io.clients[socket.id].on('disconnect', this.disconnected.bind(this));

  },

  raceUpdated: function raceUpdated(index, id) {

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
