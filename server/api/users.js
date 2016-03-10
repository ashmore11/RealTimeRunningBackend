var UserModel = require('../models/user');

var UserApi = {

  create: function create(data) {

    var user = UserModel({
      fbid: data.fbid,
      name: data.name,
      email: data.email,
      profileImage: data.profileImage,
    });

    user.save(function(err) {

      if (err) res.send(err);

      res.json({ message: 'Successfully created user...' });

    });

  },

  get: function get(id, res) {

    var params = id !== null ? { fbid: id } : {}

    UserModel.find(params, function(err, users) {

      if (err) res.send(err);

      res.json(users);

    });

  },

  getRange: function(data, res) {

    var query = { 'fbid': { $in: data.ids } };

    UserModel.find(query, function(err, users) {

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

      }

    );

  },

};

module.exports = UserApi;
