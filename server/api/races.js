var _         = require('underscore');
var RaceModel = require('../models/race');

var RaceApi = {

  get: function get(id, res) {

    var params = id !== null ? { _id: id } : {}

    RaceModel.find(params).sort({ createdAt: 1 }).exec(function(err, races) {

      if (err) res.send(err);

      res.json(races);

    });

  }

};

module.exports = RaceApi;
