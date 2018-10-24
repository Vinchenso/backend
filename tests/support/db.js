const mongoose = require('mongoose');
const User = require('../../src/api/user/user.model.js');
const Guest = require('../../src/api/guest/guest.model');

mongoose.Promise = global.Promise;

const models = {
  user: User,
  guest: Guest
};

const cleanDB = async done => {
  await models.user.deleteOne({});
  await models.guest.deleteOne({});
  done();
};

const connectToDB = async () => {
  const connection = await mongoose.connect(
    'mongodb://localhost:27017/rsvp-test'
  );
  return connection;
};

const disconnectDB = (done = () => {}) => {
  mongoose.disconnect(done);
};

module.exports = {
  cleanDB,
  connectToDB,
  disconnectDB,
  models
};
