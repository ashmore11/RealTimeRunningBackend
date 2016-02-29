var RaceModel = require('./models/race');

var RaceHandler = {

  create: function create(callback) {

    var race = RaceModel({
      createdAt: new Date().toJSON(),
      competitors: [],
      distance: 1,
      live: false,
    });

    race.save(function(err) {

      if (err) {

        callback(err);

      } else {

        callback();

      }

    });

  },

  remove: function remove(callback) {

    RaceModel.remove({ live: true }, function(err) {

      if (err) {

        callback(err);

      } else {

        callback();

      }

    });

  },

  setLive: function setLive(callback) {

    RaceModel.find({}).sort({ createdAt: 1 }).exec(function(err, races) {

      RaceModel.update(
        { _id: races[0]._id },
        { $set: { "live": true } },
        function(err) {

          if (err) {

            callback(err);

          } else  {

            callback();

          }

        }

      );

    });

  },

};

module.exports = RaceHandler;
