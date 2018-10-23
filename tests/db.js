const mongoose = require("mongoose");
const User = require("../src/api/user/user.model.js");
const Guest = require("../src/api/guest/guest.model");

mongoose.Promise = global.Promise;

const models = {
  user: User,
  guest: Guest
};

const cleanDB = async done => {
  await models.user.remove({});
  await models.guest.remove({});
  done();
};

const connectToDB = async () => {
  const connection = await mongoose.connect("mongodb://localhost/done-test");
  console.log(connection);
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
