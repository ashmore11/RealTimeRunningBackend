Meteor.methods({

  createUser: function createUser(data) {

    Users.upsert({ fbid: data.id }, { $set: data });

  },

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

    var race = RaceModel.findOne({ _id: raceId });

    if (_.contains(race.competitors, userId)) {

      Races.update({ _id: id }, { $pull: { competitors: userId } });

    } else {

      Races.update({ _id: id }, { $addToSet: { competitors: userId } });

    }

  },

});
