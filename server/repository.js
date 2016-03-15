var q       = require('q');
var shortid = require('shortid');
var flatten = require('flat');

var RaceModel = {

  createUser: function createUser(user, client) {

    return q.Promise(function(resolve, reject, notify) {

      client.hmset(`users${user.fbid}`, user, function(err) {

        if(err === null) {

          resolve();

        } else {

          reject(err);

        }

      });

    });

  },

  createRace: function createRace(client) {

    var race = flatten({
      id: shortid.generate(),
      createdAt: new Date().toJSON(),
      competitors: ['12345', '67891'],
      distance: 1,
      live: false
    });

    return q.Promise(function(resolve, reject, notify) {

      client.hmset(`races:${race.id}`, race, function(err) {

        if(err === null) {

          resolve();

        } else {

          reject(err);

        }

      });

    });

  },

  getRace: function getRace(id, client) {

    return q.Promise(function(resolve, reject, notify) {

      client.hgetall(`races:${id}`, function(err, result) {

        if(err === null) {

          resolve(flatten.unflatten(result));

        } else {

          reject(err);

        }

      });

    });

  },

}

module.exports = RaceModel;
