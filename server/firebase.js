var Firebase = require('firebase');
var Ref      = new Firebase('https://real-time-running.firebaseio.com/races');

var FirebaseTokenGenerator = require('firebase-token-generator');
var tokenGenerator = new FirebaseTokenGenerator(process.env.FIREBASE_SECRET);
var token = tokenGenerator.createToken({ uid: 'realTimeRunningAuth' });

Ref.authWithCustomToken(token, function(error) {

  if (error) {

    console.log('Login Failed!', error);

  } else {

    console.log('Login Succeeded!');

  }

});

module.exports = Ref;