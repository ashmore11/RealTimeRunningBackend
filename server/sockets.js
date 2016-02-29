var Sockets = {

  socket: null,

  init: function init(socket) {

    console.log('socket connected');

    this.socket = socket;

    this.bind();

  },

  bind: function bind() {

    this.socket.on('raceUpdated', this.raceUpdated.bind(this));

    this.socket.on('disconnect', this.disconnected.bind(this));

  },

  raceUpdated: function raceUpdated() {

    this.socket.emit('reloadRaceView');

  },

  disconnected: function disconnected() {

    console.log('socket disconnected');

  },

};

module.exports = Sockets;
