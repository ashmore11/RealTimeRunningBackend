var q       = require('q');
var shortid = require('shortid');
var flatten = require('flat');

var RaceModel = {

  createUser: function createUser(user, expire, client) {

    var key = 'user:' + user.fbid;

    return q.Promise(function(resolve, reject, notify) {

      client.hmset(key, user, function(err) {

        if(err === null) {

          resolve();

        } else {

          reject(err);

        }

      });

    });

  },

  createRace: function createRace(expire, client) {

    var id = shortid.generate();
    var key = 'race:' + id;

    var race = flatten({
      id: id,
      createdAt: new Date().toJSON(),
      competitors: ['12345', '67891'],
      distance: 1,
      live: false
    });

    return q.Promise(function(resolve, reject, notify) {

      client.hmset(key, race, function(err) {

        if(err === null) {

          resolve();

        } else {

          reject(err);

        }

      });

    });

  },

  getRace: function getRace(id, expire, client) {

    return q.Promise(function(resolve, reject, notify) {

      client.hgetall(`race:${id}`, function(err, result) {

        if(err === null) {

          resolve(flatten.unflatten(result));

        } else {

          reject(err);

        }

      });

    });

  },

  updateCompetitors: function updateCompetitors(userId, raceId, expire, client) {

    return q.Promise(function(resolve, reject, notify) {

      var obj = {
        'users': [userId]
      };

      client
        .hmset(raceId, obj)
        .exec(function(err) {

          if(err === null) {

            resolve();

          } else {

            reject(err);

          }

        });

    });

  },

}

module.exports = RaceModel;
