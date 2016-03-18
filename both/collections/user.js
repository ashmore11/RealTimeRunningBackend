Users = new Mongo.Collection('users');

UsersSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
});

Users.attachSchema(UsersSchema);
