Meteor.methods({

  createUser(id, name, email, image) {

    Users.insert({
      _id: id,
      name: name,
      email: email,
      image: image
    }, function(err) {

      if (err) {
        console.log(err);
        return
      }

      Event.emit('userCreated');

    });

  },

  removeRace() {

    Races.remove({ live: true }, function(err) {

      if (err) {
        console.log(err);
        return
      }

      Event.emit('raceRemoved');

    });

  },

  setRaceLive() {

    var race = Races.find({}, { sort: { createdAt: 1 } }).fetch()[0];

    if (race) {

      Races.update({ _id: race._id },{ $set: { 'live': true } },

        function(err) {

          if (err) {
            console.log(err);
            return
          }

          Event.emit('raceSetLive');

      });

    }

  },

  createRace() {

    Races.insert({
      createdAt: new Date().toJSON(),
      competitors: [],
      distance: 1,
      live: false,
    }, function(err) {

      if (err) {
        console.log(err);
        return
      }

      Event.emit('raceCreated');

    });

  },

  updateCompetitors(userId, raceId) {

    console.log('updating competitors for race:', raceId);

    var race = Races.findOne({ _id: raceId });

    if (race) {

      if (_.contains(race.competitors, userId)) {

        Races.update({ _id: raceId }, { $pull: { competitors: userId } });

      } else {

        Races.update({ _id: raceId }, { $addToSet: { competitors: userId } });

      }

    } else {

      console.log('ERROR: couldn\'t find race...');

    }

  },

});
