Meteor.publish('users', function() {

  return Users.find({}, { fields: { email: 0 } });

});

Meteor.publish('races', function() {

  return Races.find({}, { sort: { createdAt: 1 } });

});
