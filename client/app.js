if (Meteor.isClient) {

  Meteor.subscribe('races');

  Template.races.helpers({

    races: function() {

      console.log(Races.find({}).fetch());
      
      return Races.find().fetch().count

    }

  })

}