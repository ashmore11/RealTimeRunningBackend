require('dotenv').config({ silent: true });

var http       = require('http');
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var io         = require('socket.io');
var Sockets    = require('./sockets');
var AppRouter  = require('./router');
var timeKeeper = require('./timeKeeper');

var app  = express();
var port = process.env.PORT || 3000;

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
AppRouter.updateRace(router.route('/races'));

// all of our routes will be prefixed with /api
app.use('/api', router);

// Start the server
// app.listen(port);

var server = http.createServer(app);

server.listen(port, function() {

  console.log('Listening on http://localhost: ' + port);

  Sockets.init(server);

});

setInterval(timeKeeper, 1000);
