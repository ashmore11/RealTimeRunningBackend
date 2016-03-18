Meteor.methods({

  createRace: function createRace() {

    Races.insert({
      createdAt: new Date().toJSON(),
      competitors: [],
      distance: 1,
      live: false,
    });

  },

  removeRace: function removeRace() {

    Races.remove({ live: true });

  },

  setRaceLive: function setRaceLive() {

    var race = Races.find({}, { sort: { createdAt: 1 } }).fetch()[0];

    if (race) {

      Races.update({ _id: race._id }, { $set: { "live": true } });

    }

  },

  updateCompetitors: function updateCompetitors(userId, raceId) {

    var race = Races.findOne({ _id: raceId });

    if (_.contains(race.competitors, userId)) {

      Races.update({ _id: raceId }, { $pull: { competitors: userId } });

    } else {

      Races.update({ _id: raceId }, { $addToSet: { competitors: userId } });

    }

  },

});
