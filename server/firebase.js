var Firebase         = require('firebase');
var FireBaseTokenGen = require('firebase-token-generator');

var Races    = new Firebase('https://real-time-running.firebaseio.com/races');
var tokenGen = new FireBaseTokenGen(process.env.FIREBASE_SECRET);
var uid      = { uid: 'realTimeRunningServer' };
var token    = tokenGen.createToken(uid);

Races.authWithCustomToken(token, function(error) {

  if (error) {

    console.log('Login Failed!', error);

  } else {

    console.log('Login Succeeded!');

  }

});

module.exports = Races;