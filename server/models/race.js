var Mongoose = require('mongoose');

var raceSchema = new Mongoose.Schema({
  createdAt: {
    type: String,
    required: true,
  },
  competitors: {
    type: Array,
    required: false,
  },
  distance: {
    type: Number,
    required: true,
  },
  live: {
    type: Boolean,
    required: true,
  },
});

var Race = Mongoose.model('Race', raceSchema);

module.exports = Race;
