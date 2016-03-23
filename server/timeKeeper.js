var RaceHandler = require('./raceHandler');

module.exports = function timeKeeper() {

  var time = new Date;
  var mins = time.getMinutes();
  var mins = (59 - mins) % 60;
  var secs = time.getSeconds();

  // Convert seconds to count down from 60 & if seconds is 60, make it 0
  if (secs !== 60) {

    secs = (59 - secs) % 60;

  } else {

    secs = 0;

  }

  // Create array to hold mins and time
  time = [Number(mins), Number(secs)];

  // If one hour has passed
  if (mins === 0 && secs === 0) {

    RaceHandler.create(function(createError) {

      if (createError) {

        console.log('create error', createError);

      } else {

        console.log('race successfully created');

        RaceHandler.remove(function(removeError) {

          if (removeError) {

            console.log('remove error', removeError);

          } else {

            console.log('race successfully removed');

            RaceHandler.setLive(function(setLiveError) {

              if (setLiveError) {

                console.log('set live error', setLiveError);

              } else {

                console.log('race successfully set live');

              }

            });

          }

        });

      }

    });

  }

}
