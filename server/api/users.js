var EventEmitter = require('../eventEmitter');
var UserModel    = require('../models/user');

var UserApi = {

  create: function create(data, res) {

    var user = UserModel({
      fbid: data.fbid,
      name: data.name,
      email: data.email,
      profileImage: data.profileImage,
    });

    user.save(function(err) {

      if (err) res.send(err);

      res.json({ message: 'Successfully created user...' });

      EventEmitter.emit('user:created');

    });

  },

  get: function get(id, res) {

    var params = id !== null ? { fbid: id } : {}

    UserModel.find(params, function(err, users) {

      if (err) res.send(err);

      res.json(users);

    });

  },

  update: function update(id, data, res) {

    UserModel.update(
      { fbid: id },
      { $set: data },
      { upsert: true },
      function(err, doc) {

        if (err) res.send(err);

        res.json({ message: 'Successfully updated user...' });

        EventEmitter.emit('user:updated');

      }

    );

  },

  remove: function remove(id, res) {

    UserModel.remove({ fbid: id }, function(err) {

      if (err) res.send(err);

      res.json({ message: 'Successfully deleted user...' });

      EventEmitter.emit('user:removed');

    });

  },

};

module.exports = UserApi;
