var UserApi = require('./api/users');
var RaceApi = require('./api/races');

var AppRouter = {

  home: function home(route) {

    route.get(function(req, res) {

      res.json({ message: 'Welcome to the Real Time Running api!' });

    });

  },

  createUser: function createUser(route) {

    route.post(function(req, res) {

      UserApi.create(req.body, res);

    });

  },

  getUsers: function getUsers(route) {

    route.get(function(req, res) {

      UserApi.get(req.body, res);

    });

  },

  getUser: function getUser(route) {

    route.get(function(req, res) {

      UserApi.get(req.params.id, res);

    });

  },

  updateUser: function updateUser(route) {

    route.put(function(req, res) {

      UserApi.update(req.params.id, req.body, res);

    });

  },

  removeUser: function removeUser(route) {

    route.delete(function(req, res) {

      UserApi.remove(req.params.id, res);

    });

  },

  createRace: function createRace(route) {

    route.post(function(req, res) {

      RaceApi.create(req.body, res);

    });

  },

  getRaces: function getRaces(route) {

    route.get(function(req, res) {

      RaceApi.get(null, res);

    });

  },

  getRace: function getRace(route) {

    route.get(function(req, res) {

      RaceApi.get(req.params.id, res);

    });

  },

  updateRace: function updateRace(route) {

    route.put(function(req, res) {

      RaceApi.update(req.params.id, req.body, res);

    });

  },

};

module.exports = AppRouter;
