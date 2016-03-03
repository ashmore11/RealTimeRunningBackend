var Sockets = {

  io: null,
  socket: null,

  init: function init(io, socket) {

    console.log('socket connected');

    this.io = io;
    this.socket = socket;

    this.bind();

  },

  bind: function bind() {

    this.socket.on('raceUpdated', this.raceUpdated.bind(this));
    this.socket.on('positionUpdate', this.positionUpdateRecieved.bind(this));

    this.socket.on('disconnect', this.disconnected.bind(this));

  },

  raceUpdated: function raceUpdated(index, id) {

    this.io.emit('reloadRaceView', index, id);

  },

  positionUpdateRecieved: function positionUpdateRecieved(id, distance, speed) {

    this.io.emit('positionUpdateRecieved', id, distance, speed);

  },

  disconnected: function disconnected() {

    console.log('socket disconnected');

  },

};

module.exports = Sockets;
