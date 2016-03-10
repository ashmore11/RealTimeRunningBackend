require('dotenv').config({ silent: true });

var cluster    = require('cluster');
var numCPUs    = require('os').cpus().length;
var express    = require('express');
var app        = express();
var server     = require('http').Server(app);
var io         = require('socket.io')(server);
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Sockets    = require('./sockets');
var AppRouter  = require('./router');
var timeKeeper = require('./timeKeeper');
var port       = process.env.PORT || 3000;

if (cluster.isMaster) {

  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {

    cluster.fork();

  }

  cluster.on('exit', (worker, code, signal) => {

    console.log(`worker ${worker.process.pid} died`);

  });

} else {

  server.listen(port);

  io.on('connection', function(socket) {

    // Sockets.init(io, socket);

    var newConnection = Object.create(Sockets);

    newConnection.init(io, socket);

  });

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  mongoose.connect(process.env.MONGOLAB_URI);

  // Routes for our api
  var router = express.Router();

  // middleware to use for all requests
  router.use(function(req, res, next) {

    // make sure we go to the next routes and don't stop here
    next();

  });

  AppRouter.home(router.route('/'));
  AppRouter.createUser(router.route('/users'));
  AppRouter.getUsers(router.route('/users'));
  AppRouter.getUser(router.route('/users/:id'));
  AppRouter.updateUser(router.route('/users/:id'));
  AppRouter.removeUser(router.route('/users/:id'));
  AppRouter.createRace(router.route('/races'));
  AppRouter.getRaces(router.route('/races'));
  AppRouter.getRace(router.route('/races/:id'));
  AppRouter.updateRace(router.route('/races/:id'));

  // all of our routes will be prefixed with /api
  app.use('/api', router);

  setInterval(timeKeeper, 1000);

}
