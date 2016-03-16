if (Meteor.isServer) {

  Meteor.startup(function () {

    process.env.MONGO_URL = 'mongodb://ashmore11:13-cheese-ass@ds015398.mongolab.com:15398/real_time_running'

    console.log('server started');

    timeKeeper();

  });

  function timeKeeper() {

    var time = new Date;
    var mins = time.getMinutes();
    var mins = (59 - mins) % 1;
    var secs = time.getSeconds();

    // Convert seconds to count down from 60 & if seconds is 60, make it 0
    if (secs !== 60) {

      secs = (59 - secs) % 5;

    } else {

      secs = 0;

    }

    // Create array to hold mins and time
    time = [Number(mins), Number(secs)];

    // If one hour has passed
    if (mins === 0 && secs === 0) {

      Meteor.call('removeRace');
      Meteor.call('setRaceLive');
      Meteor.call('createRace');

    }

    Meteor.setTimeout(timeKeeper, 1000);

  }

}
