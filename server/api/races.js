var RaceModel = require('../models/race');

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

  get: function get(res) {

    RaceModel.find(function(err, races) {

      if (err) res.send(err);

      res.json(races);

    });

  },

  update: function update(id, data, res) {

    RaceModel.update(
      { _id: id },
      { $set: data },
      { upsert: false },
      function(err, doc) {

        if (err) res.send(err);

        res.json({ message: 'Successfully updated user...' });

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
