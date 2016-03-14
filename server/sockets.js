var RaceHandler = require('./raceHandler');

var Sockets = {

  io: null,

  init: function init(io, socket) {

    console.log('client connected', socket.id);

    this.io = io;

    socket.on('updateCompetitors', this.updateCompetitors.bind(this));
    // socket.on('raceUpdated', this.raceUpdated.bind(this));
    socket.on('positionUpdate', this.positionUpdateReceived.bind(this));

    socket.on('disconnect', this.disconnected.bind(this));

  },

  updateCompetitors: function updateCompetitors(userId, raceId) {

    RaceHandler.update(userId, raceId (err, success) => {

      if (err !== null) return;

      this.io.emit('competitorsUpdated', raceId, userId);

    })

  },

  // raceUpdated: function raceUpdated(raceId, userId) {

  //   this.io.emit('reloadCompetitors', raceId, userId);

  // },

  positionUpdateReceived: function positionUpdateReceived(id, distance, pace) {

    this.io.emit('positionUpdateReceived', id, distance, pace);

  },

  disconnected: function disconnected() {

    console.log('socket disconnected');

  },

};

module.exports = Sockets;
