Meteor.publish('users', function() {

  return Users.find({});

});

Meteor.publish('races', function() {

  return Races.find({}, { sort: { createdAt: 1 } });

});
