var Races = require('./firebase')

var RaceHandler = {

  create: function create(callback) {

    var race = {
      createdAt: new Date().toJSON(),
      competitors: [],
      distance: 1,
      live: false,
    };

    Races.push().set(race, function(error) {

      if (error) {

        callback(error);

      } else {

        callback();

      }

    });

  },

  remove: function remove(callback) {

    Races.once('value', function(races) {

      races.forEach(function(race) {

        if (race.child('live').val() == true) {

          Races.child(race.key()).remove(function(error) {

            if (error) {

              callback(error);

            } else {

              callback();

            }

          });

        }

      })

    })

  },

  setLive: function setLive(callback) {

    Races
      .orderByChild('createdAt')
      .limitToFirst(1)
      .once('value', function(races) {

        races.forEach(function(race) {

          Races.child(race.key()).update({ live: true }, function(error) {

            if (error) {

                callback(error);

              } else {

                callback();

              }

          });

        });

      });

  },

};

module.exports = RaceHandler;
