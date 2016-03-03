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
    this.socket.on('positionUpdate', this.positionUpdateReceived.bind(this));

    this.socket.on('disconnect', this.disconnected.bind(this));

  },

  raceUpdated: function raceUpdated(index, id) {

    this.io.emit('reloadRaceView', index, id);

  },

  positionUpdateReceived: function positionUpdateReceived(id, distance, speed) {

    console.log(id, distance, speed);

    this.io.emit('positionUpdateReceived', id, distance, speed);

  },

  disconnected: function disconnected() {

    console.log('socket disconnected');

  },

};

module.exports = Sockets;
