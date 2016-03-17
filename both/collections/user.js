Users = new Mongo.Collection('users');

UsersSchema = new SimpleSchema({
  fbid: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  profileImage: {
    type: String,
  },
});

Users.attachSchema(UsersSchema);
