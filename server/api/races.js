var EventEmitter = require('../eventEmitter');
var RaceModel    = require('../models/race');

var RaceApi = {

  create: function create(data, res) {

    var race = RaceModel({
      startTime: data.startTime,
      competitors: data.competitors,
      distance: data.distance,
    });

    race.save(function(err) {

      if (err) res.send(err);

      res.json({ message: 'Successfully created race...' });

    });

  },

  get: function get(id, res) {

    var params = id !== null ? { _id: id } : {}

    RaceModel.find(params, function(err, races) {

      if (err) res.send(err);

      res.json(races);

    });

  },

  update: function update(id, data, res) {

    RaceModel.update(
      { _id: id },
      { $addToSet: { "competitors": data.id } },
      { safe: true, upsert: true },
      function(err) {

        if (err) res.send(err);

        res.json({ message: 'Successfully updated race...' });

      }

    );

  },

  remove: function remove(id, res) {

    RaceModel.remove({ _id: id }, function(err) {

      if (err) res.send(err);

      res.json({ message: 'Successfully deleted race...' });

    });

  },

};

module.exports = RaceApi;
