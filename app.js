if (Meteor.isServer) {

  Event = new EventEmitter();

  Meteor.startup(function() {

    timeKeeper();

  });

}
