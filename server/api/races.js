var _         = require('underscore');
var RaceModel = require('../models/race');

var RaceApi = {

  get: function get(id, res) {

    var params = id !== null ? { _id: id } : {}

    RaceModel.find(params).sort({ createdAt: 1 }).exec(function(err, races) {

      if (err) res.send(err);

      res.json(races);

    });

  },

  update: function update(id, data, res) {

    RaceModel.find({ _id: id }, (err, race) => {

      if (_.contains(race[0].competitors, data.id)) {

        this.pullUserFromRace(id, data.id, res);

      } else {

        this.addUserToRace(id, data.id, res);

      }

    });

  },

  addUserToRace: function addUserToRace(raceId, userId, res) {

    RaceModel.update(
      { _id: raceId },
      { $addToSet: { 'competitors': userId } },
      { safe: true, upsert: true },
      function(err) {

        if (err) res.send(err);

        console.log('user added to race');

        res.json({ message: 'user added to race' });

      }

    );

  },

  pullUserFromRace: function pullUserFromRace(raceId, userId, res) {

    RaceModel.update(
      { _id: raceId },
      { $pull: { 'competitors': userId } },
      function(err) {

        if (err) res.send(err);

        console.log('user pulled from race');

        res.json({ message: 'user pulled from race' });

      }

    );

  },

};

module.exports = RaceApi;
