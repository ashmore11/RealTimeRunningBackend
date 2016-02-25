var EventEmitter = require('./eventEmitter');
var io           = require('socket.io');

var Sockets = {

  server: null,
  socket: null,

  init: function init(server) {

    this.server = io.listen(server);

    this.server.sockets.on('connection', this.clientConnected.bind(this));

  },

  clientConnected: function clientConnected(socket) {

    console.log('Client Connected');

    this.socket = socket;

    this.bind();

  },

  bind: function bind() {

    EventEmitter.once('user:created', this.userCreated.bind(this));
    EventEmitter.once('user:updated', this.userUpdated.bind(this));

  },

  userCreated: function userCreated() {

    console.log('user created');

  },

  userUpdated: function userUpdated() {

    this.socket.emit('user:updated');

  },

};

module.exports = Sockets;
