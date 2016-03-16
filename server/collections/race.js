Races = new Mongo.Collection('races');

RacesSchema = new SimpleSchema({
  createdAt: {
    type: String,
  },
  competitors: {
    type: [String],
  },
  distance: {
    type: Number,
  },
  live: {
    type: Boolean,
  },
});

Races.attachSchema(RacesSchema);
