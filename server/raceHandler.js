var _         = require('underscore');
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

  updateCompetitors: function updateCompetitors(userId, raceId, callback) {

    RaceModel.find({ _id: raceId }, (err, race) => {

      if (err) {
        console.log(err);
        return;
      }

      if (_.contains(race[0].competitors, userId)) {

        RaceModel.update(
          { _id: raceId },
          { $pull: { 'competitors': userId } },
          function(err) {

            if (err) {
              callback(err);
              return;
            }

            console.log('user pulled from race');

            callback();

          }

        );

      } else {

        RaceModel.update(
          { _id: raceId },
          { $addToSet: { 'competitors': userId } },
          { safe: true, upsert: true },
          function(err) {

            if (err) {
              callback(err);
              return;
            }

            console.log('user added to race');

            callback();

          }

        );

      }

    });

  },

};

module.exports = RaceHandler;
